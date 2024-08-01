import { roles } from "../../middleware/auth.js";

const userEndPoint = {
    get: [roles.User],
    // get: [roles.Admin],
    delete: [roles.User],
    // delete: [roles.Admin],
    update: [roles.User]
    // update: [roles.Admin]


};
export default userEndPoint;