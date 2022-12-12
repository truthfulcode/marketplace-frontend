import mongoose, {Schema} from "mongoose";
import { TokenType } from "../utils/types";
import Transaction from "./Transaction";
const ceyptoSchema = new Schema({onChainTx:String, tokenType:TokenType,amount:Number})
// inherit from Account model
export default Transaction.discriminator("CryptoTransaction",ceyptoSchema,"crypto")