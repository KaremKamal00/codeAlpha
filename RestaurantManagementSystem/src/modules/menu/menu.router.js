import { Router } from "express";
import * as menuController from "./controller/menu.controller.js"
import auth from "../../middleware/auth.js";
import { menuEndpoints } from "./menu.endPoints.js";

const router=Router()

router
    .post("/addItem",
        auth(menuEndpoints.create),
        menuController.addItemToMenu
    )

    .get("/getItems",
    
        menuController.getAllItems
    )

    .get("/getOneItem/:itemId",
        
        menuController.getOneItem
    )
   
    .delete("/deleteItem/:itemId",
            auth(menuEndpoints.delete),
            menuController.deleteItem
    )

    .put("/updateItem/:itemId",
        auth(menuEndpoints.update),
        menuController.updateItem
   )

    
 
export default router