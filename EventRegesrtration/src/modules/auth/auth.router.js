import { Router } from "express";
import * as authController from "./controller/auth.controller.js"
import * as authValidation from "./auth.validation.js"
import validation from "../../middleware/validation.js";
const router=Router()

router
    .post("/register",
        validation(authValidation.signUpSchema)
        ,authController.registerUser
        )

    .post("/login",
         validation(authValidation.loginSchema)
        ,authController.login
    )
    
 

export default router