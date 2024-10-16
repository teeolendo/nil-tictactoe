import { task } from "hardhat/config";

task("makeMove", "Make a move in a game of TicTacToe")
  .addParam("contract", "The address of the TicTacToe contract")
  .addParam("gameid", "The Game ID")
  .addParam("position", "The move to make")
  .setAction(async (taskArgs, hre) => {
    // Get the contract
    const SyncTicTacToe = await hre.ethers.getContractFactory("AsyncTicTacToe");
    const syncTicTacToe = SyncTicTacToe.attach(taskArgs.contract);

    console.log("Making Move");
    const makeMoveTx = await syncTicTacToe.makeMove(taskArgs.gameid, taskArgs.position);
    await makeMoveTx.wait(0);

    // Check transaction status

    const gameIdTx = await syncTicTacToe.games(taskArgs.gameid);

    console.log(`Player 1: ${gameIdTx[0]}`);
    console.log(`Player 2: ${gameIdTx[1]}`);
    console.log(`Current Turn: ${gameIdTx[2]}`);
    console.log(`Game Status: ${gameIdTx[3]}`);

  });
