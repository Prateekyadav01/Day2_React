import {User} from '../models/user.model.js'



export const signIn = async (req,res)=>{
    const {email,password,userName} = req.body;

    if(
        [email , password , userName].some((field)=>field?.trim()=="")
    ){
        return res.status(400).json({
            message : "Please fill all the fields"
        })
    }

    const exitingUser = await User.findOne({
        $or: [ {userName}, {email}]
    })

    if(exitingUser){
        return res.status(400).json({
            message : "User already exists"
        })
    }
   
    const user = await User.create({
        email,
        password,
        userName
    })

    const creatingUserRefresToken = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!creatingUserRefresToken){
        return res.status(500).json({
            message : "Something went wrong"
        })
    }

    return res.status(200).json({
        message:"user created successfully",
    })
    

}