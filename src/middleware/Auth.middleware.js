import USER from "../models/user.schema.js";
import { Jwt } from "jsonwebtoken";
import asyncHandler from "../service/asynchandler";
import config from "../config.js"
import customError from "../utils/customError.js";

export const isLoggedIn = asyncHandler(async(req,res,next)=>{
    let token;

    if(req.cookie.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
        token = req.cookie.token || req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new customError("Not authorized to accesss this resource",401)
    }

    try {
        // decodedJwtPlayload will has all the playload values by using JWT.verify() method
        const decodedJwtPlayload = JWT.verify(token, config.JWT_SECRET); 
        //By save the user in req object we can access the user in next middleware if reqire or
        //send back to frontend because it has all the use info like user_name, email, role, etc.. 
        req.user = await USER.findById(decodedJwtPlayload._id, name, "name email role");
        next()

    } catch (error) {
        throw new customError("Not authorized to accesss this resource",401)
    }

})

//Middleware to verify what kind of role the user is
export default AuthRole = (...requiredRoles) => asyncHandler((req,res,next)=>{
    if(!requiredRoles.includes(req.user.role)){
        throw new customError("Not authorized to accesss this resource",401); 
    }
    next()
})