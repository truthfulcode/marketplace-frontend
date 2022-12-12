import mongoose, {Schema} from "mongoose";

const accountSchema = new Schema({
    username:String,
    password:String,
    email:String,
    firstName:String,
    lastName:String,
    address:String,
    phoneNumber:String
})

export default mongoose.model('Account',accountSchema)