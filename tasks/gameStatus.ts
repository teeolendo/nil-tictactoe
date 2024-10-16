import { task } from "hardhat/config";

task("gameStatus", "Returns the status of a game of TicTacToe")
  .addParam("contract", "The address of the TicTacToe contract")
  .addParam("gameid", "The game ID")
  .setAction(async (taskArgs, hre) => {
    // Get the contract
    const TicTacToe = await hre.ethers.getContractFactory("AsyncTicTacToe");
    const ticTacToe = TicTacToe.attach(taskArgs.contract);

    console.log("Getting status of game");
    const gameIdTx = await ticTacToe.games(taskArgs.gameid);

    // Fetch the new value
    console.log(`Player 1: ${gameIdTx[0]}`);
    console.log(`Player 2: ${gameIdTx[1]}`);
    console.log(`Current Turn: ${gameIdTx[2]}`);
    console.log(`Game Status: ${gameIdTx[3]}`);
  });
