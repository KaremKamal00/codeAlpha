import menuModel from "../../../../DB/models/menuModel.js";
import orderModel from "../../../../DB/models/order.Model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



// Create a new order
export const makeOrder = asyncHandler(async (req, res, next) => {
  // Destructure items, tableId, and createdBy from the request body
  const { items, tableId, createdBy } = req.body;

  // Validate the request body
  if (!items || items.length === 0) {
    return next(new Error('Items are required', { cause: 400 }));
  }
  if (!tableId) {
    return next(new Error('Table ID is required', { cause: 400 }));
  }
  if (!createdBy) {
    return next(new Error('User ID (createdBy) is required', { cause: 400 }));
  }

  // Calculate the total price of the order
  let totalPrice = 0;

  // Map through each item to calculate the price and check if the item exists
  for (const item of items) {
    const menuItem = await menuModel.findById(item.menuItem);
    if (!menuItem) {
      return next(new Error(`Menu item with ID ${item.menuItem} not found`, { cause: 404 }));
    }
    totalPrice += menuItem.price * item.quantity;
  }
  // Create a new order with the calculated total price and other details
  const order = await orderModel.create({
    items,
    totalPrice,
    tableId,
    createdBy: req.user._id,
    
  });

  // Return the created order
  return res.status(201).json({
    message: 'Order created successfully',
    order,
  });
});


export const getAllOrders=asyncHandler(
    async(req,res,next)=>{
        
        const order=await orderModel.find()

        if(!order){
            return next(new Error ("No orders Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",order})
    }
)


export const getOneOrder=asyncHandler(
    async(req,res,next)=>{
        const {orderId}=req.params
        const item=await orderModel.findOne({_id:orderId})

        if(!item){
            return next(new Error ("Items Not Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",item})
    }
)



export const updateOrder = asyncHandler(async (req, res, next) => {
  // Extract the order ID from the request parameters and other data from the request body
  const { orderId } = req.params;
  const { items, status, tableId } = req.body;

  // Find the order by ID
  const order = await orderModel.findById(orderId);
  
  // Check if the order exists
  if (!order) {
    return next(new Error('Order not found', { cause: 404 }));
  }

  // Update items if provided
  if (items) {
    // Validate and calculate the total price again
    let totalPrice = 0;
    for (const item of items) {
      const menuItem = await menuModel.findById(item.menuItem);
      if (!menuItem) {
        return next(new Error(`Menu item with ID ${item.menuItem} not found`, { cause: 404 }));
      }
      totalPrice += menuItem.price * item.quantity;
    }
    order.items = items; // Update items
    order.totalPrice = totalPrice; // Update total price
  }

  // Update status if provided
  if (status) {
    if (!['Pending', 'In Progress', 'Completed', 'Cancelled'].includes(status)) {
      return next(new Error('Invalid status value', { cause: 400 }));
    }
    order.status = status; // Update status
  }

  // Update tableId if provided
  if (tableId) {
    order.tableId = tableId; // Update table ID
  }

  // Save the updated order to the database
  await order.save();

  // Respond with the updated order
  return res.status(200).json({
    message: 'Order updated successfully',
    order,
  });
}
)


export const deleteOrder=asyncHandler(
    async(req,res,next)=>{
        const {orderId}=req.params
        const order=await orderModel.findOne({_id:orderId})

        if(!order){
            return next(new Error ("order Not Found",{cause:400}))
        }

        const deleteorder=await orderModel.findByIdAndDelete({_id:orderId})
        return res.status(200).json({message:"Done"})
    }
)
