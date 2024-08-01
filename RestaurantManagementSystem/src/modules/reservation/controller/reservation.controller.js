import reservationModel from "../../../../DB/models/reservationModel.js"
import tableModel from "../../../../DB/models/tableModel.js";
import { asyncHandler } from "../../../utils/errorHandling.js"



export const createReservation = asyncHandler(
    async (req, res, next) => {
        const { userId, tableId, reservationTime } = req.body; // Extract necessary details from request body

        // Step 1: Check for existing reservation by the user for the same time
        const existingReservation = await reservationModel.findOne({
            userId,
            reservationTime: {
                $gte: new Date(reservationTime).setHours(0, 0, 0, 0), // Start of the day
                $lt: new Date(reservationTime).setHours(23, 59, 59, 999) // End of the day
            }
        });

        if (existingReservation) {
            return next(new Error("You have already made a reservation for this day", { cause: 400 }));
        }

        // Step 2: Check if the table is available
        const table = await tableModel.findOne({
            _id: tableId,
            status: 'available'
        });

        if (!table) {
            return next(new Error("Table not found or already reserved", { cause: 400 }));
        }

        // Step 3: Create a new reservation
        req.body.createdBy = req.user._id;
        const createdReservation = await reservationModel.create(req.body);

        // Step 4: Update table status to 'unavailable' and set currentReservation
        await tableModel.findByIdAndUpdate(
            tableId,
            {
                status: 'unavailable',
                currentReservation: createdReservation._id
            },
            { new: true } // Return the updated table document
        );

        // Step 5: Return successful response
        return res.status(201).json({
            message: "Reservation created successfully",
            reservation: createdReservation
        });
    }
);


export const getAllReservation=asyncHandler(
    async(req,res,next)=>{
        
        const reservations=await reservationModel.find()

        if(!reservations){
            return next(new Error ("No reservations Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",reservations})
    }
)

export const getOneReservation=asyncHandler(
    async(req,res,next)=>{
        const {reservationId}=req.params
        const reservation=await reservationModel.findOne({_id:reservationId})

        if(!reservation){
            return next(new Error ("Reservation Not Found",{cause:400}))
        }

        return res.status(200).json({message:"Done",reservation})
    }
)

export const updateReservation=asyncHandler(
    async(req,res,next)=>{
        const {reservationId}=req.params
        const reservation=await reservationModel.findOne({_id:reservationId})

        if(!reservation){
            return next(new Error ("reservation Not Found",{cause:400}))
        }

        const updatereservation=await reservationModel.findByIdAndUpdate(
            {_id:reservationId},
            req.body,
            {new:true}
        )
        return res.status(200).json({message:"Done",updatereservation})
    }
)

export const deleteReservation=asyncHandler(
    async(req,res,next)=>{
        const {reservationId}=req.params
        const reservation=await reservationModel.findOne({_id:reservationId})

        if(!reservation){
            return next(new Error ("reservation Not Found",{cause:400}))
        }

        const deleteReservation=await reservationModel.findByIdAndDelete({_id:reservationId})
        return res.status(200).json({message:"Done"})
    }
)