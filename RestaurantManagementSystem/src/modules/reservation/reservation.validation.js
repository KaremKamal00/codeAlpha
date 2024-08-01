import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const createReservationSchema=joi.object({
    customerName:joi.string().min(1).max(20).required(),
    customerContact:joi.string().email().min(2).max(30).required(),
    numberOfGuests:joi.number().positive().required(),
    tableId:joi.string().required(),
    date:joi.date(),
    time:joi.string().required(),
}).required()



export const updateReservationSchema=joi.object({
    customerName:joi.string().min(1).max(20),
    customerContact:joi.string().email().min(2).max(30),
    numberOfGuests:joi.number().positive(),
    date:joi.date(),
    time:joi.string()
}).required()

export const deleteReservationSchema=joi.object({
    id:generalFields.id
}).required()