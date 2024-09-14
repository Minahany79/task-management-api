import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { applicationRoutes } from "./routes/index";
import { initDB } from "./config/db/index";
import { morganMiddleware } from "./shared/middlewares/morgan.middleware";
import { sanitizedConfig } from "../config";
import { uncaughtExceptionHandler, unhandledRejectionHandler } from "./shared/middlewares/global-error-handler";

const port = sanitizedConfig.PORT;

export class Server {
  public express: Application;

  constructor() {
    this.express = express();
    this.configuration();
    this.express.use(applicationRoutes);

    initDB()
      .then(() => console.log("DB initialized successfully"))
      .catch((err) => console.log(err));
    this.express.use(morganMiddleware);
  }

  private configuration() {
    unhandledRejectionHandler();
    uncaughtExceptionHandler();
    this.express.use(morgan(sanitizedConfig.NODE_ENV));
    this.express.use(
      cors({
        origin: sanitizedConfig.HOST,
      }),
    );
    this.express.use(express.json());
    this.express.use(express.static("./"));
  }

  public start() {
    this.express.listen(port, () => {
      console.log(`Server started at http://localhost:${port} on ${sanitizedConfig.NODE_ENV}`);
    });
  }
}
