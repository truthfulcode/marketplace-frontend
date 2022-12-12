import mongoose, {Schema} from "mongoose";
import Account from "./Account";
const freelancerSchema = new Schema({})
// inherit from Account model
export default Account.discriminator("Freelancer",freelancerSchema,"freelancer")