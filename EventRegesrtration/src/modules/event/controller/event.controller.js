import eventModel from "../../../../DB/models/eventModel.js";
import { asyncHandler } from "../../../utils/errorHandling.js";




export const createEvent=asyncHandler(
    async(req,res,next)=>{

        const eventExist=await eventModel.findOne({name:req.body.name})
        if(eventExist){
            return next(new Error ("Event Already Found",{cause:400}))
        }
        req.body.createdBy=req.user._id
        const createEvent=await eventModel.create(req.body)
        return res.status(201).json({message:"Done",createEvent})
    }
)


export const getAllEvents=asyncHandler(
    async(req,res,next)=>{

        const allEvents=await eventModel.find()
        return res.status(200).json({message:"Done",allEvents})
    }
)


export const getOneEvent=asyncHandler(
    async(req,res,next)=>{
        const event=await eventModel.findOne({name:req.body.name})
        if(!event){
            return next (new Error ("Event Not Found",{cause:404}))
        }
        return res.status(200).json({message:"Done",event})
    }
)

export const deleteEvent=asyncHandler(
    async(req,res,next)=>{
        const {eventId}=req.params
        const event=await eventModel.findById(eventId)
        if(!event){
            return next (new Error ("Event Not Found",{cause:404}))
        }
        const deleteEvent=await eventModel.findByIdAndDelete({_id:eventId})
        return res.status(200).json({message:"Done"})
    }
)

export const updateEvent=asyncHandler(
    async(req,res,next)=>{
        const {eventId}=req.params
        const event=await eventModel.findById(eventId)
        if(!event){
            return next (new Error ("Event Not Found",{cause:404}))
        }

        const updatedEvent= await eventModel.findOneAndUpdate(
            { _id: eventId },
            req.body,
            {new:true}
        )
        return res.status(200).json({message:"Done",updatedEvent})
    }
)
