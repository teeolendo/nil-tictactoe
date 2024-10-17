// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./nil/Nil.sol";

contract AsyncTicTacToe is NilBase {

    using Nil for address;

    address public shard2Address;
    address public owner;
    
    enum GameState { Active, Draw, Player1Wins, Player2Wins }
    
    struct Game {
        address player1;
        address player2;
        uint8[9] board;  // 3x3 grid represented as an array of 9
        address currentTurn;
        GameState state;
    }

    mapping(address => mapping(address => uint)) public activeGames; // Maps players' addresses to active game ids
    Game[] public games;

    modifier onlyPlayers(uint _gameId) {
        require(msg.sender == games[_gameId].player1 || msg.sender == games[_gameId].player2, "Not a player in this game");
        _;
    }

    modifier gameIsActive(uint _gameId) {
        require(games[_gameId].state == GameState.Active, "Game is not active");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    event GameStarted(uint gameId, address player1, address player2);
    event MoveMade(uint gameId, address player, uint8 position);
    event GameEnded(uint gameId, GameState result);
    event CallCompleted(address indexed dst);

    constructor() payable {
        owner = msg.sender;
    }

    receive() external payable {}

    // Start a new game between two players
    function startGame(address _opponent) external returns (uint) {
        require(msg.sender != _opponent, "Cannot play against yourself");
        require(activeGames[msg.sender][_opponent] == 0 && activeGames[_opponent][msg.sender] == 0, "Game already exists between players");
        
        Game memory newGame = Game({
            player1: msg.sender,
            player2: _opponent,
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Empty board
            currentTurn: msg.sender,
            state: GameState.Active
        });

        games.push(newGame);
        uint gameId = games.length - 1;

        // Track the active game between the two addresses
        activeGames[msg.sender][_opponent] = gameId + 1; // Store gameId + 1 to avoid collision with default 0
        activeGames[_opponent][msg.sender] = gameId + 1;

        call(shard2Address, abi.encodeWithSignature("startGame(address)", _opponent));
        emit GameStarted(gameId, msg.sender, _opponent);
        
        return gameId;
    }

    // Make a move in an active game
    function makeMove(uint _gameId, uint8 _position) external onlyPlayers(_gameId) gameIsActive(_gameId) {
        Game storage game = games[_gameId];
        
        require(game.currentTurn == msg.sender, "Not your turn");
        require(_position < 9 && game.board[_position] == 0, "Invalid position");

        // Mark the board with the player's move (1 for player1, 2 for player2)
        game.board[_position] = (msg.sender == game.player1) ? 1 : 2;
        emit MoveMade(_gameId, msg.sender, _position);
        call(shard2Address, abi.encodeWithSignature("makeMove(uint256,uint8)", _gameId, _position));
        
        if (checkWinner(game.board, (msg.sender == game.player1) ? 1 : 2)) {
            game.state = (msg.sender == game.player1) ? GameState.Player1Wins : GameState.Player2Wins;
            emit GameEnded(_gameId, game.state);
        } else if (isBoardFull(game.board)) {
            game.state = GameState.Draw;
            emit GameEnded(_gameId, GameState.Draw);
        } else {
            // Switch turn
            game.currentTurn = (msg.sender == game.player1) ? game.player2 : game.player1;
        }
    }

    //No of Games
    function currentGame() external view returns (uint){
        return games.length - 1;
    }

    // Check if the board is full (i.e., no empty spaces)
    function isBoardFull(uint8[9] memory _board) internal pure returns (bool) {
        for (uint8 i = 0; i < 9; i++) {
            if (_board[i] == 0) {
                return false;
            }
        }
        return true;
    }

    // Check for a winner
    function checkWinner(uint8[9] memory _board, uint8 _player) internal pure returns (bool) {
        uint8[3][8] memory winningPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        for (uint8 i = 0; i < 8; i++) {
            if (_board[winningPositions[i][0]] == _player &&
                _board[winningPositions[i][1]] == _player &&
                _board[winningPositions[i][2]] == _player) {
                return true;
            }
        }
        return false;
    }

    /** Async Calls */

    function setShard2Address(address _shard2Address) external onlyOwner {
        shard2Address = _shard2Address;
    }

    function call(address dst, bytes memory callData) public payable {
        dst.asyncCall(
            address(0),
            address(0),
            5000000,
            Nil.FORWARD_NONE,
            false,
            0,
            callData
        );
        emit CallCompleted(dst);
    }
}
