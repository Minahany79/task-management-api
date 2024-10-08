import { sanitizedConfig } from "../../../config";
import { logger } from "./../services/logger.service";
import morgan, { StreamOptions } from "morgan";
class MorganMiddlewareConfig {
  private readonly stream: StreamOptions;

  constructor() {
    this.stream = {
      write: (message) => logger.error(JSON.stringify(message)),
    };
  }

  private skip() {
    const env = sanitizedConfig.NODE_ENV || "dev";
    return env !== "development";
  }

  getMiddlewarehandler() {
    return morgan(":method :url :status :res[content-length] - :response-time ms", {
      stream: this.stream,
      skip: this.skip,
    });
  }
}

export const morganMiddleware = new MorganMiddlewareConfig().getMiddlewarehandler();
