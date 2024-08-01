import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const signUpSchema=joi.object({
    name:joi.string().min(1).max(20).required(),
    email:generalFields.email.required(),
    password:generalFields.password.required(),
    role:joi.string()
}).required()



export const loginSchema=joi.object({
    email:generalFields.email.required(),
    password:generalFields.password.required()
    
}).required()