import mongoose, { Schema, Types } from "mongoose";

export const reservationSchema=new Schema({
    
      customerName: {
        type: String,
        required: true,
      },

      customerContact: {
        type: String,
        required: true,
      },
      numberOfGuests: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        // required: true,
        default:Date.now
      },
      time: {
        type: String,
        required: true,
      },
     
      status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
      },

      createdBy: {
        type: Types.ObjectId,
        ref:"User",
        required: true
      },

      tableId:{
        type:Types.ObjectId,
        ref:"Table",
        required: true
      }

},
{
    timestamps:true
})



const reservationModel=mongoose.model("Reservation",reservationSchema)

export default reservationModel

 