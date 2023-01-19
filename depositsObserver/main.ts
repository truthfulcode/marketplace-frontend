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

async function processAddresses(addresses:string[], amounts:[]){
    //api/user?address=0x...
    if(addresses.length !== amounts.length) throw Error("mismatch of addresses and amount size");
    // change later on, the base url
    let arrStr = encodeURIComponent(JSON.stringify(formatRequestAddresses(addresses)))
    await axios.get(`http://localhost:3000/api/user?addresses=${arrStr}`).then(async(res)=>{
        let state = res.data.state;
        if(Array.isArray(state) && state.length > 0){
            // call prisma to update the balance
            await axios.put(`http://localhost:3000/api/user`,{addresses:[],amount:[]})
        }
    }).catch((err)=>{
        console.log(err)
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
        // if(Number(value) >= 1e6 ) {

        // }
        // check for minimum of 1 USDC
        // check `to` that it is among the receiver addresses
        // await 
        // credit 
        console.log(JSON.stringify(transferEvent, null, 4))
    })
}
main();

