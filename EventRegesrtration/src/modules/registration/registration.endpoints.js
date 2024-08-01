import { roles } from "../../middleware/auth.js";

const registrationEndPoint = {
    create: [roles.User],
    get: [roles.User],
    // get: [roles.Admin],
    delete: [roles.User],


};
export default registrationEndPoint;