import { roles } from "../../middleware/auth.js";


export const inventoryEndpoints={
    create:[roles.Admin],
    get:[roles.Admin,roles],
    update:[roles.Admin],
    delete:[roles.Admin]
}