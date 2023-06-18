import Collection from "../models/collection.schema.js"
import asyncHandler from "../service/asynchandler.js"
import customError from "../utils/customError.js"

export const createCollections = asyncHandler(async(req,res)=>{
    const {name} = req.body

    if(!name){
        throw new customError("collection name is required",400)
    }

    const collection = await Collection.create({
        name 
    })

    res.status(200).json({
        success : true,
        message : "collection was created successfully",
        collection
    })
})

export const updateCollections = asyncHandler(async(req,res)=>{
    const {name} = req.body
    
    const {id:collectionId } = req.params
    if(!name){
        throw new customError("collection name is required",400)
    }

    const updateColl = Collection.findByIdAndUpdate(collectionId,{name},{new : true,runValidators: true})

    if(!updateColl){
        throw new customError("collection not found",400)
    }

    res.status(200).json({
        success : true,
        message : "collection updated successfully",
        collection
    })
})

export const deleteCollection = asyncHandler(async(req,res)=>{
    const {name} = req.body
    
    const {id:collectionId } = req.params
    const collectionToDelete = await collection.findById(collectionId)
    if(!collectionToDelete){
        throw new customError("collection not found",400)
    }

    collectionToDelete.remove()

    res.status(200).json({
        success : true,
        message : "collection deleted successfully",
        collection
    })
})

export const getCollection = asyncHandler(async(req,res)=>{
    
    const collections = await Collection.find();

    if(!collections){
        throw new customError("No collection found",400)
    }

    
    res.status(200).json({
        success : true,
        message : "collection deleted successfully",
        collection
    })
})