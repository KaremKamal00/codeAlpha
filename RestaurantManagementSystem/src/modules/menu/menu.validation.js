import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const addItemSchema=joi.object({
    name:joi.string().min(1).max(20).required(),
    description:joi.string().min(2).max(30).required(),
    price:joi.string().required(),
    category:joi.string().required(),
}).required()



export const updateItemSchema=joi.object({
    name:joi.string().min(1).max(20),
    description:joi.string().min(2).max(30),
    price:joi.string(),
    category:joi.string(),
}).required()


export const deleteItemSchema=joi.object({
    id:generalFields.id
}).required()