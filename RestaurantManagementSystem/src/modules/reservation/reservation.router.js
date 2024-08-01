import { Router } from "express";
import * as reservationController from "./controller/reservation.controller.js"
import * as reservationValidation from "./reservation.validation.js"
import auth from "../../middleware/auth.js";
import { reservationEndpoints } from "./reservation.endPoints.js";
import validation from "../../middleware/validation.js";

const router=Router()

router
    .post("/createReservation",
        validation(reservationValidation.createReservationSchema),
        auth(reservationEndpoints.create),
        reservationController.createReservation
    )

    .get("/getReservations",
        validation(reservationValidation.updateReservationSchema),
        auth(reservationEndpoints.get),
        reservationController.getAllReservation
    )

    .get("/getOneReservation/:reservationId",
        auth(reservationEndpoints.get),
        reservationController.getOneReservation
    )
   
    .delete("/deleteReservation/:reservationId",
            auth(reservationEndpoints.delete),
            reservationController.deleteReservation
    )

    .put("/updateReservation/:reservationId",
        auth(reservationEndpoints.update),
        reservationController.updateReservation
   )

    
 
export default router