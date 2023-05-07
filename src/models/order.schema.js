import mongoose from "mongoose";
import orderStatus from "../utils/orderStatus";

const orderSchema = new mongoose.Schema({
    product :{
        type : [
            {productID :{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            count:Number,
            price:Number
        },         
        ],
        required:true
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    coupon:String,
    transationId:String,
    status : {
        type:String,
        enum:Object.values(orderStatus),
        default: orderStatus.ORDERED
    }
},{timestamps:true});

export default mongoose.model("Order",orderSchema);