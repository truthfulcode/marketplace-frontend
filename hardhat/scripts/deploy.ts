import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const USDC = await ethers.getContractFactory("MockUSDC");
  const token = await USDC.deploy();
  let [owner, ] = await ethers.getSigners();
  await token.deployed();
  await token.mintOwner(owner.address, 100 * 1e6);
  console.log(await token.balanceOf(owner.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
