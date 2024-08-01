import menuModel from "../../../../DB/models/menuModel.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const addItemToMenu=asyncHandler(
    async(req,res,next)=>{
        
        const item=await menuModel.findOne({name:req.body.name})

        if(item){
            return next(new Error ("Item Already Found",{cause:400}))
        }

        const addItem=await menuModel.create(req.body)
        return res.status(201).json({message:"Done",addItem})
    }
)


export const getAllItems=asyncHandler(
    async(req,res,next)=>{
        
        const items=await menuModel.find()

        if(!items){
            return next(new Error ("No Items Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",items})
    }
)


export const getOneItem=asyncHandler(
    async(req,res,next)=>{
        const {itemId}=req.params
        const item=await menuModel.findOne({_id:itemId})

        if(!item){
            return next(new Error ("Items Not Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",item})
    }
)


export const updateItem=asyncHandler(
    async(req,res,next)=>{
        const {itemId}=req.params
        const item=await menuModel.findOne({_id:itemId})

        if(!item){
            return next(new Error ("Items Not Found",{cause:400}))
        }

        const updateItem=await menuModel.findByIdAndUpdate(
            {_id:itemId},
            req.body,
            {new:true}
        )
        return res.status(200).json({message:"Done",updateItem})
    }
)


export const deleteItem=asyncHandler(
    async(req,res,next)=>{
        const {itemId}=req.params
        const item=await menuModel.findOne({_id:itemId})

        if(!item){
            return next(new Error ("Items Not Found",{cause:400}))
        }

        const deleteItem=await menuModel.findByIdAndDelete({_id:itemId})
        return res.status(200).json({message:"Done"})
    }
)