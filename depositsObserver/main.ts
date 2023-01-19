import { ethers, providers } from "ethers";
import * as dotenv from "dotenv";
import {abi} from "./abi";
import axios from "axios";
dotenv.config();
// make sure the address is checksum
function formatRequestAddresses(addresses:string[]){
    let formatted = "";
    addresses.map((value,index)=>{
        if(index == addresses.length-1){
            formatted+=value;
        }else{
            formatted+=value+",";
        }
    })
    return formatted;
}

async function addressDeposit(address:string, amount:string){
    //api/user?address=0x...
    // change later on, the base url
    await axios.put(`http://localhost:3000/api/user?address=${address}&amount=${amount}`,undefined,{headers:{key:process.env.DEPOSITS_KEY}}).then(async(res)=>{
        let state = res.data.state;
        if(state) console.log(`credited ${address} ${amount} USDC`)
    }).catch((err)=>{
        console.log("error accured while crediting", err)
    })
}

function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_TESTNET);
    const contract = new ethers.Contract(process.env.TOKEN_ADDRESS as string, abi, provider);
    contract.on("Transfer",async (from, to, value, event)=>{
        let transferEvent ={
            from: from,
            to: to,
            value: value,
            eventData: event,
        }
        if(Number(value) >= 1e6 ) {
            await addressDeposit(to, value);
        }
        console.log(JSON.stringify(transferEvent, null, 4))
    })
}
main();

