import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import type { NilHardhatUserConfig } from "@nilfoundation/hardhat-plugin";
import * as dotenv from "dotenv";
import "@nilfoundation/hardhat-plugin";

// Import tasks
import "./tasks/startgame";
import "./tasks/gameStatus";
import "./tasks/makeMove";
import "./tasks/setCrossShardAddress";

dotenv.config();

const config: NilHardhatUserConfig = {
  solidity: "0.8.24",
  ignition: {
    requiredConfirmations: 1,
  },
  networks: {
    nil: {
      url: process.env.NIL_RPC_ENDPOINT,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  walletAddress: process.env.WALLET_ADDR?.toLowerCase(),
  debug: true,
  shardId: 1,
};
export default config;
  