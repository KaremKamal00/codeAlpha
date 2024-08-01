import inventoryModel from "../../../../DB/models/inventory.Model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const addItem=asyncHandler(
    async(req,res,next)=>{
        
        const item=await inventoryModel.findOne({name:req.body.name})

        if(item){
            return next(new Error ("Item Already Found",{cause:400}))
        }

        const addItem=await inventoryModel.create(req.body)
        return res.status(201).json({message:"Done",addItem})
    }
)


export const getAllItems=asyncHandler(
    async(req,res,next)=>{
        
        const items=await inventoryModel.find()

        if(!items){
            return next(new Error ("No Items Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",items})
    }
)


export const getOneItem=asyncHandler(
    async(req,res,next)=>{
        const {inventoryId}=req.params
        const item=await inventoryModel.findOne({_id:inventoryId})

        if(!item){
            return next(new Error ("Items Not Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",item})
    }
)


export const updateItem=asyncHandler(
    async(req,res,next)=>{
        const {inventoryId}=req.params
        const item=await inventoryModel.findOne({_id:inventoryId})

        if(!item){
            return next(new Error ("Items Not Found",{cause:400}))
        }

        const updateItem=await inventoryModel.findByIdAndUpdate(
            {_id:inventoryId},
            req.body,
            {new:true}
        )
        return res.status(200).json({message:"Done",updateItem})
    }
)


export const deleteItem=asyncHandler(
    async(req,res,next)=>{
        const {inventoryId}=req.params
        const item=await inventoryModel.findOne({_id:inventoryId})

        if(!item){
            return next(new Error ("Items Not Found",{cause:400}))
        }

        const deleteItem=await inventoryModel.findByIdAndDelete({_id:inventoryId})
        return res.status(200).json({message:"Done"})
    }
)