import mongoose, {Schema} from "mongoose";
import Account from "./Account";
const customerSchema = new Schema({})
// inherit from Account model
export default Account.discriminator("Customer",customerSchema,"customer")