import bodyParser from "body-parser";
import { connection } from "../DB/connection.js";
import urlRouter from "./modules/url/url.router.js"
import { globalError } from "./utils/errorHandling.js";

function bootstrap(app, express) {
  //Convert Buffer Data
  app.use(express.json());

  app.use("/url",urlRouter)
  app.use(bodyParser.json())
  connection();

  
  app.use(globalError);
}

export default bootstrap;
