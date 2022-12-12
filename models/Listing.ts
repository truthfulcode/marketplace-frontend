import mongoose,{Schema} from "mongoose"

const listingSchema = new Schema({
    price:Number,
    freelancerId:Schema.Types.ObjectId,
    title:String,
    description:String,
    customerId:Schema.Types.ObjectId,
    files:Array<String>
})

export default mongoose.model("Listing",listingSchema);