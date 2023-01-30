import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId:31337,
      mining: {
        auto:true,
        interval:5
      }
    }
  }
};

export default config;
