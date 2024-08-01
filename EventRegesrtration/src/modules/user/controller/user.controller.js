import userModel from "../../../../DB/models/userModel.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import {  hashPassword } from "../../../utils/hashAndCompare.js";



export const getUserDetails = asyncHandler(
    async (req, res, next) => {
        
        // Extract the userId from the request parameters
        const { userId } = req.params;
        
        // Find the user in the database by userId
        const user = await userModel.findById({ _id: userId });

        // If the user is not found, return an error with a 404 status code
        if (!user) {
            return next(new Error("User Not Found", { cause: 404 }));
        }

        // If the user is found, return the user details in the response with a success message
        return res.status(200).json({ message: "done", user });
    }
);


export const deleteUser = asyncHandler(
    async (req, res, next) => {
        // Extract the userId from the request parameters
        const { userId } = req.params;

        // Find the user in the database by userId
        const user = await userModel.findById({ _id: userId });
        
        // If the user is not found, return an error with a 404 status code
        if (!user) {
            return next(new Error("User Not Found", { cause: 404 }));
        }

        // If the user exists, delete the user from the database
        const deleteUser = await userModel.findOneAndDelete({ _id: userId });

        // Return a successful response indicating the user was deleted
        return res.status(200).json({ message: "Done" });
    }
);


export const updateUser = asyncHandler(
    async (req, res, next) => {
        // Extract the userId from the request parameters
        const { userId } = req.params;

        // Extract the updated user data from the request body
        const { name, email, password } = req.body;

        // Find the user in the database by userId
        const user = await userModel.findById({ _id: userId });

        // If the user is not found, return an error with a 404 status code
        if (!user) {
            return next(new Error("User Not Found", { cause: 404 }));
        }

        // Update user details
        // You can also implement additional logic here to validate each field before updating
        user.name = name || user.name;
        user.email = email || user.email;

        // If a password update is required, hash the new password before saving
        if (password) {
            // Use your password hashing function here (e.g., bcrypt)
            const hashedPassword = hashPassword({plaintext:password});
            user.password = hashedPassword;
        }

        // Save the updated user details to the database
        await user.save();

        // Return a successful response with the updated user details
        return res.status(200).json({ message: "User updated successfully", user });
    }
);