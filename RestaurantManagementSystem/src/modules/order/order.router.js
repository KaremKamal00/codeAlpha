import { Router } from "express";
import * as orderController from "./controller/order.controller.js"
import { orderEndpoints } from "./order.endPoints.js";
import auth from "../../middleware/auth.js";


const router=Router()

router
    .post("/makeOrder",
        auth(orderEndpoints.create),
        orderController.makeOrder
    )

    .get("/getAllOrders",
        auth(orderEndpoints.get),
        orderController.getAllOrders
    )

    .get("/getOneOrder/:orderId",
        auth(orderEndpoints.get),
        orderController.getOneOrder
    )
   
    .delete("/deleteOrder/:orderId",
            auth(orderEndpoints.delete),
            orderController.deleteOrder
    )

    .put("/updateOrder/:orderId",
        auth(orderEndpoints.update),
        orderController.updateOrder
   )

    
 
export default router