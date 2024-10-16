import { task } from "hardhat/config";

task("setCrossShardAddress", "Sets the address of the cross-shard contract")
  .addParam("contract", "The address of the TicTacToe contract")
  .addParam("address", "The opponent's address")
  .setAction(async (taskArgs, hre) => {
    // Get the contract
    const TicTacToe = await hre.ethers.getContractFactory("AsyncTicTacToe");
    const ticTacToe = TicTacToe.attach(taskArgs.contract);

    // Call the increment function with value
    console.log("Setting Address");
    const setAddressTx = await ticTacToe.setShard2Address(taskArgs.address);
    await setAddressTx.wait(0);

    const addressTx = await ticTacToe.shard2Address();
    console.log(`Cross Shard Address: ${addressTx}`);

  });
  