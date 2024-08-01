
import mongoose, { Schema, Types } from "mongoose";


export const registrationSchema=new Schema({

    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    },
    event:{
        type:Types.ObjectId,
        ref:"Event"
    },
    date:{
        type:String,
        default:Date.now
    }
},
{
    timestamps:true
})



const registrationModel=mongoose.model("Registration",registrationSchema)

export default registrationModel