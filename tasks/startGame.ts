import { task } from "hardhat/config";

task("startGame", "Starts a new game of TicTacToe")
  .addParam("contract", "The address of the TicTacToe contract")
  .addParam("opponent", "The opponent's address")
  .setAction(async (taskArgs, hre) => {
    // Get the contract
    const TicTacToe = await hre.ethers.getContractFactory("AsyncTicTacToe");
    const ticTacToe = TicTacToe.attach(taskArgs.contract);

    // Call the increment function with value
    console.log("Starting game");
    const startGameTx = await ticTacToe.startGame(taskArgs.opponent);
    await startGameTx.wait(0);

    console.log(startGameTx);

  });
