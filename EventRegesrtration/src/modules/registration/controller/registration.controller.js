import eventModel from "../../../../DB/models/eventModel.js";
import registrationModel from "../../../../DB/models/registrationModel.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



export const registerEvent = asyncHandler(
    async (req, res, next) => {
      
        const event = await eventModel.findById(req.body.event);
        if (!event) {
          return next(new Error("Event Not Found", { cause: 404 }));
        }
  
        // Check if the user is already registered for this event
        const existingRegistration = await registrationModel.findOne({
          event: req.body.event,
          createdBy: req.user._id,
        });
  
        if (existingRegistration) {
          return res.status(400).json({ message: "User already registered for this event" });
        }
  
        req.body.createdBy = req.user._id;
  
        const register = await registrationModel.create(req.body);
        return res.status(201).json({ message: "Done", register });
       
       
    }
)



export const registrationForUser = asyncHandler(
  async (req, res, next) => {
    
      // Assuming req.user._id contains the user's ID
      const {userId} = req.params

      // Query the registration model for all registrations by the specific user
      const registrations = await registrationModel.find({ createdBy: userId }).populate('event');

      // If no registrations are found, return an appropriate message
      if (!registrations.length) {
        return res.status(404).json({ message: "No registrations found for this user" });
      }

      // Return the list of registrations
      return res.status(200).json({ message: "Registrations retrieved successfully", registrations });
     
    
  }
);


export const registrationForEvent = asyncHandler(
  async (req, res, next) => {
    
      const { eventId } = req.params; // Assume event ID is provided as a URL parameter

      // Check if the event exists
      const event = await eventModel.findById(eventId);
      if (!event) {
        return next(new Error("Event Not Found", { cause: 404 }));
      }

      // Query the registration model for all registrations for the specific event
      const registrations = await registrationModel.find({ event: eventId }).populate('createdBy', 'name email');

      // If no registrations are found, return an appropriate message
      if (!registrations.length) {
        return next(new Error("No registrations found for this event", { cause: 404 }));
      }

      // Return the list of registrations
      return res.status(200).json({ message: "Registrations retrieved successfully", registrations });
    
  }
);



export const deleteRegistration=asyncHandler(
    async(req,res,next)=>{
        const {registerId}=req.params

        const registration=await registrationModel.findById({_id:registerId})

        if(!registration){
            return next(new Error("Registration Not Found", { cause: 404 }));
        }

        const deleteRegistration=await registrationModel.findByIdAndDelete(
            {_id:registerId}
        )

        return res.status(200).json({ message: "Done" });
    }
)
