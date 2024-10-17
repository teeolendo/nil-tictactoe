import { task } from "hardhat/config";
import {PublicClient, HttpTransport, Faucet, convertEthToWei, waitTillCompleted } from "@nilfoundation/niljs";
import * as dotenv from "dotenv";

dotenv.config();

task("startGame", "Starts a new game of TicTacToe")
  .addParam("contract", "The address of the TicTacToe contract")
  .addParam("opponent", "The opponent's address")
  .setAction(async (taskArgs, hre) => {
    // Get the contract
    const TicTacToe = await hre.ethers.getContractFactory("AsyncTicTacToe");
    const ticTacToe = TicTacToe.attach(taskArgs.contract);

    const client = new PublicClient({
      transport: new HttpTransport({
        endpoint: process.env.NIL_RPC_ENDPOINT as string,
      }),
      shardId: 1,
    });
    
    const faucet = new Faucet(client);

    const faucetHash = await faucet.withdrawToWithRetry(
      taskArgs.contract,
      convertEthToWei(10),
    );
    await waitTillCompleted(client, 1, faucetHash);

    console.log("Faucet Hash");
    console.log(faucetHash);

    // Call the increment function with value
    console.log("Starting game");
    const startGameTx = await ticTacToe.startGame(taskArgs.opponent);
    await startGameTx.wait(0);

    console.log(startGameTx);

  });
