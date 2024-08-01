import { Router } from "express";
import * as userController from "./controller/user.controller.js"
import * as userValidation from "./user.validtion.js"
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import userEndPoint from "./user.endpoints.js";
const router=Router()

router
  

    .get("/:userId",
         auth(userEndPoint.get)
        ,userController.getUserDetails
    )

    .delete("/:userId",
         auth(userEndPoint.delete)
        ,userController.deleteUser
    )

    .put("/:userId",
        auth(userEndPoint.update),
        validation(userValidation.updateSchema)
        ,userController.updateUser
    )


export default router