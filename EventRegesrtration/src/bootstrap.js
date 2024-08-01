import { connection } from "../DB/connection.js";
import userRouter from "./modules/user/user.router.js"
import eventRouter from "./modules/event/event.router.js"
import registrationRouter from "./modules/registration/registration.router.js"
import authRouter from "./modules/auth/auth.router.js"
import { globalError } from "./utils/errorHandling.js";

function bootstrap(app, express) {
  //Convert Buffer Data
  app.use(express.json());

  app.use('/auth', authRouter)
  app.use('/user', userRouter)
  app.use('/event', eventRouter)
  app.use('/registration', registrationRouter)




  connection();
  app.use(globalError);
}

export default bootstrap;
