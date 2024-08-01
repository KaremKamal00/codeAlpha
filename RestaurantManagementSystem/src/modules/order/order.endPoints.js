import { roles } from "../../middleware/auth.js";


export const orderEndpoints={
    create:[roles.User],
    get:[roles.Admin,roles.User],
    update:[roles.Admin,roles.User],
    delete:[roles.Admin,roles.User]
}