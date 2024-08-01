
import mongoose, { Schema } from "mongoose";


export const eventSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String,
    },
    
    date:{
        type:String,
        required:true,
    },

    location:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})



const eventModel=mongoose.model("Event",eventSchema)

export default eventModel