import express, { json, urlencoded } from "express";
import routes from "./routes";
import cors from "cors"
// import { ErrorHandler }  from "./middlewares/ErrorHandler"
// import createHttpError from "http-errors"

import "./database";


class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); 
    this.server.use(json()); 
    this.server.use(urlencoded({ extended: false }));
    this.server.use(cors())
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
