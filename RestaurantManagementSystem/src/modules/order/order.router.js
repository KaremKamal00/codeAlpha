import { Router } from "express";
import * as orderController from "./controller/order.controller.js"
import * as ordervalidation from "./order.validation.js"
import { orderEndpoints } from "./order.endPoints.js";
import auth from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";


const router=Router()

router
    .post("/makeOrder",
        auth(orderEndpoints.create),
        validation(ordervalidation.makeOrderSchema),
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
        validation(ordervalidation.updateOrderSchema),
        orderController.updateOrder
   )

    
 
export default router