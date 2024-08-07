import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const makeOrderSchema = joi.object({
  
  items: joi.array().items(
    joi.object({
      menuItem: joi.string().hex().length(24).required(),
      quantity: joi.number().integer().positive().required()
    })
  ).min(1).required(),

  tableId: joi.string().hex().length(24).required(),
  createdBy: joi.string().hex().length(24).required()
}).required()


export const updateOrderSchema = joi.object({
  
    items: joi.array().items(
      joi.object({
        menuItem: joi.string().hex().length(24),
        quantity: joi.number().integer().positive()
      })
    ).min(1).required(),
  
    tableId: joi.string().hex().length(24),
    orderId: joi.string().hex().length(24),
    createdBy: joi.string().hex().length(24)
  })