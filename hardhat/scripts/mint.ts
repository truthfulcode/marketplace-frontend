import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const TO = "0x669d5Ed56e165a9a3E3fdd73ebe99d2F4da7a6D6";
  const AMOUNT = 100 * 1e6;
  const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const USDC = await ethers.getContractFactory("MockUSDC");
  const token = USDC.attach(CONTRACT_ADDRESS);
  await token.mintOwner(TO, AMOUNT);
  console.log(await token.balanceOf(TO));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
