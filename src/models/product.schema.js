import mongoose, { Collection } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required : ["true","Please provide the product name"],
        trim:true,
        maxLength: [120, "Product name should not be max than 120 chars"]
    },
    price :{
        type: Number,
        required : ["true","product name should not be max than 5 chars"]
    },
    description:{
            type: String
    },
    photo:[
        {
            secure_url : {
               type: String,
               required : ["true"]
            }

        }
    ],
    stock:{
        type:Number,
        default : 0,
    },
    sold:{
        type:Number,
        default : 0,
    },
    collectoionID : {
        type: mongoose.Schema.Types.ObjectId,
        ref :"Collection",
    }

},{timestamps:true})

export default mongoose.model("Product", productSchema)