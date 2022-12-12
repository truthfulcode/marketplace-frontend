import mongoose,{Schema} from "mongoose"
import { OrderStatus } from "../utils/types";

const orderSchema = new Schema({
    price:Number,
    freelancerId:Schema.Types.ObjectId,
    listingId:Schema.Types.ObjectId,
    title:String,
    date:Date,
    status:OrderStatus
})

export default mongoose.model("Order",orderSchema);