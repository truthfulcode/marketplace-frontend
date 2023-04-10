import { ethers, providers } from "ethers";
import * as dotenv from "dotenv";
import {abi} from "./abi";
import axios from "axios";
import { NETWORK_OPTION } from "../utils/constants";
import { Network } from "../utils/types";
dotenv.config();

export const NetworksRPCs = {
    [Network.Localhost]: process.env.LOCAL_TESTNET_RPC,
    [Network.Goerli]: process.env.GOERLI_TESTNET_RPC,
    // add other valid networks
  }
  export const SupportedToken = {
    [Network.Localhost]: process.env.LOCAL_TOKEN_ADDRESS,
    [Network.Goerli]: process.env.GOERLI_TOKEN_ADDRESS,
    // add other valid networks
  }

async function addressDeposit(address:string, amount:string, txHash:string){
    //api/user?address=0x...
    // change later on, the base url
    await axios.put(`http://localhost:3000/api/user?address=${address}&amount=${amount}&txHash=${txHash}`,undefined,{headers:{key:process.env.DEPOSITS_KEY}}).then(async(res)=>{
        let state = res.data.state;
        if(state) console.log(`credited ${address} ${amount} USDC`)
    }).catch((err)=>{
        console.log("error accured while crediting", err)
    })
}

function main() {
    // @ts-ignore
    const provider = new ethers.providers.JsonRpcProvider(NetworksRPCs[NETWORK_OPTION]);
    const contract = new ethers.Contract(SupportedToken[NETWORK_OPTION] as string, abi, provider);
    contract.on("Transfer",async (from, to, value, event)=>{
        let transferEvent ={
            from: from,
            to: to,
            value: value,
            eventData: event,
        }
        // record deposit
        if(Number(value) >= 1e6 ) {
            console.log("Deposit =>", value)
            await addressDeposit(to, value, event.transactionHash);
        }
        // transfer out deposits
        console.log(JSON.stringify(transferEvent, null, 4))
    })
}
main();

