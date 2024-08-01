import joi from "joi";
import generalFields from "../../utils/generalFields.js";

export const updateSchema=joi.object({
    userId:generalFields._id,
    name:joi.string().min(1).max(20),
    email:generalFields.email,
    password:generalFields.password,
    role:joi.string()
})
