import mongoose, { model }  from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            lowercase:true,
            index:true,
            trim:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:[true , 'Password is required']
        },
        refreshToken:{
            type:String,
        }
    },
    {
        timestamps:true
    }
);


userSchema.pre('save' , async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next();

})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.accessTokenGenerate = function(){
    return jwt.sign(
        // 1-->value(Payload)
        {
            id:this._id,
            userName:this.userName,
            email:this.email
        },
        // 2--> secret key is generated
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            // options
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.refreshTokenGenerate = function(){
    return jwt.sign(
        // 1-->value(Payload)
        {
            id:this._id,
        
        },
        // 2--> secret key is generated
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            // options
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User =  mongoose.model('User', userSchema);