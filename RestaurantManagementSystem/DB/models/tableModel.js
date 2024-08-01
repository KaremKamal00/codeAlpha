import mongoose, { Schema, Types } from "mongoose";


export const tableSchema=new Schema({

    tableNumber: {
        type: Number,
        required: true,
        unique: true, // Ensures each table number is unique
      },
      capacity: {
        type: Number,
        required: true,
        min: 1, // Ensures at least one seat per table
      },
      status: {
        type: String,
        enum: ['available', 'reserved', 'occupied'], // Limit status to these values
        default: 'available',
      },
      currentReservation: {
        type: Types.ObjectId,
        ref: 'Reservation',
        default: null, // No reservation by default
      },
      location: {
        type: String,
        enum: ['inside', 'outside'], // Define locations if applicable
        default: 'inside',
      },
      createdBy:{
        type: Types.ObjectId,
        ref: 'User'
        
      }
},
{
    timestamps:true
})



const tableModel=mongoose.model("Table",tableSchema)

export default tableModel

 