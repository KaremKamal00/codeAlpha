import { Router } from "express";
import * as inventoryController from "./controller/inventory.controller.js"
import { inventoryEndpoints } from "./inventory.endPoints.js";
import auth from "../../middleware/auth.js";


const router=Router()

router
    .post("/addItem",
        auth(inventoryEndpoints.create),
        inventoryController.addItem
    )

    .get("/getItems",
        auth(inventoryEndpoints.get),
        inventoryController.getAllItems
    )

    .get("/getOneItem/:inventoryId",
        auth(inventoryEndpoints.get),
        inventoryController.getOneItem
    )
   
    .delete("/deleteItem/:inventoryId",
            auth(inventoryEndpoints.delete),
            inventoryController.deleteItem
    )

    .put("/updateItem/:inventoryId",
        auth(inventoryEndpoints.update),
        inventoryController.updateItem
   )

    
 
export default router