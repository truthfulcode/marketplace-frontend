import mongoose,{Schema} from "mongoose"

const paymentSchema = new Schema({
    orderId:Schema.Types.ObjectId,
    txId:Schema.Types.ObjectId,
})

export default mongoose.model("Payment",paymentSchema);