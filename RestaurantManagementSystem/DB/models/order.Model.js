import mongoose, { Schema, Types } from "mongoose";


export const orderSchema=new Schema({
   
      items: [
        {
          menuItem: {
            type:Types.ObjectId,
            ref: 'Menu',
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending',
      },
      tableId: {
        type:Types.ObjectId,
        ref: 'Menu',
        required:true
      },
      createdBy: {
        type:Types.ObjectId,
        ref: 'User',
        required:true
      },

},
{
    timestamps:true
})



const orderModel=mongoose.model("Order",orderSchema)

export default orderModel

 