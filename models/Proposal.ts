import mongoose,{Schema} from "mongoose"
import { ProposalStatus } from "../utils/types";

const proposalSchema = new Schema({
    listingId:Schema.Types.ObjectId,
    freelancerId:Schema.Types.ObjectId,
    title:String,
    description:String,
    duration:Number,
    price:Number,
    status:ProposalStatus
})
export default mongoose.model("Proposal",proposalSchema);