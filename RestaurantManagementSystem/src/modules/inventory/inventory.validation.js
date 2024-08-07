import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addItemSchema = joi.object({
    
    itemName: joi.string().required(),
    quantity: joi.number().integer().min(0).required(),
    unit:joi.string().required(),
    category: joi.string(),
    price: joi.number().min(0),
    restockLevel:joi.number().integer().min(0).required(),
    supplier: joi.string().optional(),
    receivedDate: joi.date().optional(),
    expiryDate: joi.date().greater(joi.ref('receivedDate')).optional(),
  }).required();


  export const updateItemSchema = joi.object({
    inventoryId:generalFields._id.required(),
    itemName: joi.string(),
    quantity: joi.number().integer().min(0),
    unit:joi.string(),
    category: joi.string(),
    price: joi.number().min(0),
    restockLevel:joi.number().integer().min(0),
    supplier: joi.string().optional(),
    receivedDate: joi.date().optional(),
    expiryDate: joi.date().greater(joi.ref('receivedDate')).optional(),
  });