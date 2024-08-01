import tableModel from "../../../../DB/models/tableModel.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const createTable = asyncHandler(
    async (req, res, next) => {

            const { tableNumber } = req.body;
            const existingTable = await tableModel.findOne({tableNumber});

            if(existingTable){
                return next(new Error ("Table Already Found",{cause:400}))
            }
       
            // Step 1: Count existing tables
            const existingTableCount = await tableModel.countDocuments();

            // Step 2: Check if limit is reached
            if (existingTableCount >= 10) {
                return res.status(400).json({
                    message: "Cannot create more than 10 tables."
                });
            }

            // Step 3: Add createdBy field to request body
            req.body.createdBy = req.user._id;

            // Step 4: Create a new Table
            const createTable = await tableModel.create(req.body);

            // Step 5: Respond with success message
            return res.status(201).json({
                message: "Table created successfully",
                table: createTable
            });

       
    }
)

export const getAllTables=asyncHandler(
    async(req,res,next)=>{
        
        const tables=await tableModel.find()

        if(!tables){
            return next(new Error ("No tables Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",tables})
    }
)

export const getOneTable=asyncHandler(
    async(req,res,next)=>{
        const {tableId}=req.params
        const table=await tableModel.findOne({_id:tableId})

        if(!table){
            return next(new Error ("table Not Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",table})
    }
)

export const updateTable=asyncHandler(
    async(req,res,next)=>{
        const {tableId}=req.params
        const table=await tableModel.findOne({_id:tableId})

        if(!table){
            return next(new Error ("table Not Found",{cause:400}))
        }

        const updateTable=await tableModel.findByIdAndUpdate(
            {_id:tableId},
            req.body,
            {new:true}
        )
        return res.status(200).json({message:"Done",updateTable})
    }
)

export const deleteTable=asyncHandler(
    async(req,res,next)=>{
        const {tableId}=req.params
        const table=await tableModel.findOne({_id:tableId})

        if(!table){
            return next(new Error ("table Not Found",{cause:400}))
        }

        const deletetable=await tableModel.findByIdAndDelete({_id:tableId})
        return res.status(200).json({message:"Done"})
    }
)