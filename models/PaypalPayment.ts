import mongoose, {Schema} from "mongoose";
import Transaction from "./Transaction";
const paypalSchema = new Schema({paypalTx:String, paymentEmail:String,amount:Number})
// inherit from Account model
export default Transaction.discriminator("PayPalTransaction",paypalSchema,"paypal")