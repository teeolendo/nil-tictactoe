import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

module.exports = buildModule("SyncTicTacToe", (m) => {
  const syncTicTacToe = m.contract("SyncTicTacToe");

  return { syncTicTacToe };
});
