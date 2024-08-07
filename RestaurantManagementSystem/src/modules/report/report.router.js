import { Router } from "express";
import * as reportController from "./controller/report.controller.js"
import auth from "../../middleware/auth.js";
import { reportEndpoints } from "./report.endPoints.js";


const router=Router()

router
    .get("/salesReport",
        auth(reportEndpoints.get),
        reportController.generateSalesReport
    )

    .get("/reservationReport",
        auth(reportEndpoints.get),
        reportController.generateReservationReport
    )

    .get("/inventoryReport",
        auth(reportEndpoints.get),
        reportController.generateInventoryReport
    )


 
export default router