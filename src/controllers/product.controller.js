import Product from "../models/product.schema"
import formidable from "formidable"
import { s3FileUpload, s3DeleteFile } from "../service/uploadImage"
import mongoose from "mongoose"
import asyncHandler from "../service/asynchandler.js"
import customError from "../utils/customError.js"
import config from "../config/index.js"

export const product = asyncHandler(async(req,res)=>{
    const form = formidable({multiples:true, keepExtensions:true})
    form.parse(req,async function(err,fields,err){
        if(err){
            throw new customError("something went wrong",500)
        }
        let productId = new mongoose.Types.ObjectId.toHexString();
        
    })
})