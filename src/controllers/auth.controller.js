import asyncHandler from "../service/asynchandler";
import customError from "../utils/customError";
import User from "../models/user.schema.js";

export const cookieOption = {
    expire : new Date(Date.now()+ 3*24*60*60*1000),
    hhtpOnly : true
}



export const signUp = asyncHandler(async(req,res)=>{
    // get data from user

    const {name,email,password} = req.body;

    //validation (we need to add more validation)
    if(!name || !email || !password){
        throw new customError("Please add all feilds",400)
    }

    //lets add this data to database

    //check if user is already exist    
    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new customError("User already exist",400)
    }
    const user = await User.create({
        name,
        email,
        password,
    })

    const token = user.getJWTtoken();
    //safety
    user.password = undefined;

    //store this token in user cookie
    res.cookie("token",token,cookieOption)

    res.send(200).json({
        success:true,
        token,
        user,
    })

    


})

export const login = asyncHandler(async(req,res)=>{
    // get data from user

    const {email,password} = req.body;

    //validation (we need to add more validation)
    if(!email || !password){
        throw new customError("Please add all fields",400)
    }
    const user = User.findOne({email}).select("+password");
    if(!user){
        throw new customError("Invaild credentials",400);
    }
    const isPasswordmateched = await user.comparePassword(password)
    if(!isPasswordmateched){
        const token = user.getJWTtoken();
        user.password = undefined;
        res.cookie("token",token,cookieOption)
        return res.status.(200).json({
            success:true,
            token,
            user
    })
    }
    throw new customError("Password is incorrect",400)
})