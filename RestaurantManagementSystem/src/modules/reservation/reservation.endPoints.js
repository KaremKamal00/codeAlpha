import { roles } from "../../middleware/auth.js";


export const reservationEndpoints={
    create:[roles.User],
    get:[roles.Admin,roles.User],
    update:[roles.User],
    delete:[roles.Admin,roles.User]
}