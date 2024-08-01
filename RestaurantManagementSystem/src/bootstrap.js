import { connection } from "../DB/connection.js";
import menuRouter from "./modules/menu/menu.router.js"
import userRouter from "./modules/auth/auth.router.js"
import reservationRouter from "./modules/reservation/reservation.router.js"
import tableRouter from "./modules/table/table.router.js"
import inventoryRouter from "./modules/inventory/inventory.router.js"
import orderRouter from "./modules/order/order.router.js"
import { globalError } from "./utils/errorHandling.js";

function bootstrap(app, express) {
  //Convert Buffer Data
  app.use(express.json());

  app.use('/menu', menuRouter)
  app.use('/user', userRouter)
  app.use('/reservation', reservationRouter)
  app.use('/table', tableRouter)
  app.use('/inventory', inventoryRouter)
  app.use('/order', orderRouter)
  // app.use('/event', eventRouter)
  // app.use('/registration', registrationRouter)




  connection();
  app.use(globalError);
}

export default bootstrap;
