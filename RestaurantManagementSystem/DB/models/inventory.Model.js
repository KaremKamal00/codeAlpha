import mongoose, { Schema } from "mongoose";


export const inventorySchema=new Schema({
    itemName: {
        type: String,
        required: true,
        unique:true
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      supplier: {
        type: String,
      },
      restockLevel: {
        type: Number,
        required: true,
      },
},
{
    timestamps:true
})



const inventoryModel=mongoose.model("Inventory",inventorySchema)

export default inventoryModel

 