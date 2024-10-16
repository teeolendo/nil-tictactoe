import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

module.exports = buildModule("AsyncTicTacToe", (m) => {
  const asyncTicTacToe = m.contract("AsyncTicTacToe");

  return { asyncTicTacToe };
});
