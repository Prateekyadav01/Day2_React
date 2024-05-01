import mongoose, { model }  from "mongoose";


const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    }
);

export default User =  mongoose.model('User', userSchema);