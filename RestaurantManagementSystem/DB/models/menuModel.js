import mongoose, { Schema } from "mongoose";


export const menuSchema=new Schema({
    name: {
        type: String,
        required: true,
        unique:true
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      available: {
        type: Boolean,
        default: true,
      },
},
{
    timestamps:true
})



const menuModel=mongoose.model("Menu",menuSchema)

export default menuModel

 