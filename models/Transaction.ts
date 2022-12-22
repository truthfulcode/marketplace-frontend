import mongoose,{Schema} from "mongoose"
import { TransactionStatus } from "../utils/types";

const transactionSchema = new Schema({
    timestamp:Number, // epoch timestamp
    status:TransactionStatus,
    description:String,
    customerId:Schema.Types.ObjectId,
    files:Array<String>
})

export default mongoose.model("Transaction",transactionSchema);