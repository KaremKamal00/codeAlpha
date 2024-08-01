import { Router } from "express";
import * as eventController from "./controller/event.controller.js"
import auth from "../../middleware/auth.js"
import { eventEndPoints } from "./event.endPoints.js";


const router=Router()

router
    .post("/createEvent"
     ,auth(eventEndPoints.create)
     ,eventController.createEvent
     
    )

    .get("/allEvents"
        ,auth(eventEndPoints.get)
        ,eventController.getAllEvents
    )

    .get("/oneEvent"
        ,auth(eventEndPoints.get)
        ,eventController.getOneEvent
    )

    .delete("/:eventId"
        ,auth(eventEndPoints.delete)
        ,eventController.deleteEvent
    )

    .put("/:eventId"
        ,auth(eventEndPoints.update)
        ,eventController.updateEvent
    )


export default router