import { Router } from "express";
import * as registrationController from './controller/registration.controller.js'
import registrationEndPoints from "./registration.endpoints.js"
import auth from "../../middleware/auth.js";


const router=Router()

router

    .post("/registerEvent"
        ,auth(registrationEndPoints.create)
        ,registrationController.registerEvent
    )

    .get("/:userId",
        auth(registrationEndPoints.get),
        registrationController.registrationForUser
    )

    .get("/registrationForEvent/:eventId",
        auth(registrationEndPoints.get),
        registrationController.registrationForEvent
    )

    .delete("/:registerId",
         auth(registrationEndPoints.delete)
        ,registrationController.deleteRegistration
    )


export default router