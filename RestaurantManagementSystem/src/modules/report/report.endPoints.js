import { roles } from "../../middleware/auth.js";


export const reportEndpoints={
    get:[roles.Admin],
}