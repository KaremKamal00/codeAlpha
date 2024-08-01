import { Router } from "express";
import * as tableController from "./controller/table.controller.js"
import auth from "../../middleware/auth.js";
import { tableEndpoints } from "./table.endPoints.js";


const router=Router()

router
    .post("/createTable",
         auth(tableEndpoints.create)
        ,tableController.createTable)


    .get("/getAllTables",
        auth(tableEndpoints.get),
        tableController.getAllTables
    )

    .get("/getOneTable/:tableId",
        auth(tableEndpoints.get),
        tableController.getOneTable
    )
   
    .delete("/deleteTable/:tableId",
            auth(tableEndpoints.delete),
            tableController.deleteTable
    )

    .put("/updateTable/:tableId",
        auth(tableEndpoints.update),
        tableController.updateTable
   )

    
 
export default router