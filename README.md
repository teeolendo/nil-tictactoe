
<div align="center">
  <h1>Nil TicTacToe Example</h1>
</div>

## 🚀 Overview
This repository demonstrates how to deploy and interact with smart contracts on the =nil; blockchain using Hardhat and our custom plugin. The =nil; blockchain is an Ethereum Layer 2 solution based on zk-sharding, enhancing transaction efficiency and scalability.

The Tic Tac Toe game has 3 primary smart contracts designed to demonstrate how to interact with the nil cluster. These are:
- Synchronous Communication from a single shard
- Asynchronous communication across shards
- Using Currencies for rewards.

## 🔧 Installation
1. **Clone the Repository:**
   ```
   git clone https://github.com/teeolendo/nil-tictactoe.git
   cd nil-tictactoe
   ```
2. **Install Dependencies:**
   ```
   npm install
   ```

## ⚙️ Configuration
1. Create a `.env` file in the root directory based on the given `.env.example` file
2. Update the `.env` file with the RPC URL. The default value corresponds to a locally running =nil; node
3. If you don't have `nil` installed, you can download it from the official repository [here](https://github.com/NilFoundation/nil_cli).
Once you have `nil`, run the following commands to generate a new key and wallet:
    ```
    nil keygen new
    nil wallet new
    ```
4. Update the `.env` file with the private key and wallet address

## 🎯 Usage
To deploy and interact with the SyncTicTacToe contract, use the following commands:
```
# Deploy the contract
npx hardhat ignition deploy ./ignition/modules/SyncTicTacToe.ts --network nil

# Start a Game
npx hardhat startGame --network nil --contract <Contract Address> --opponent <Opponent's Address>

# View a Game's Status
npx hardhat gameStatus --network nil --contract <Contract Address> --gameid <GameID>

```

## 🎯 Testing
To run all tests, use the following command:
```bash
npm run tests
```
Make sure to configure `.env` with the RPC URL and PRIVATE_KEY

## 💪 Contributing
 Contributions are always welcome! Please feel free to submit pull requests or open issues to discuss potential changes or improvements

## 🚧 Work in Progress
**Please Note:** This project is currently under active development. Not all features are fully implemented, and you may encounter issues. If something isn't working as expected, don't hesitate to open an issue on our GitHub repository. We prioritize addressing these concerns and will get back to you promptly. Your feedback helps us improve!

Thank you for supporting our development efforts!
