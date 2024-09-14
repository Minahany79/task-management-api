import { Request, Router } from "express";
import { sanitizedConfig } from "../../config";
import { usersRoutes } from "../domains/users/users.routes";
import { errorHandler } from "../shared/middlewares/global-error-handler";
import { ErrorResponse } from "../shared/models/error-response";
import { StatusCodes } from "../shared/enums/status-codes";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "../../swagger";
import { tasksRoutes } from "../domains/tasks/tasks.routes";

export class ApplicationRouter {
  private baseUrl = sanitizedConfig.BASE_URL;
  router: Router;

  constructor() {
    this.router = Router();
  }

  public getRoutes(): Router {
    this.router.use(`${this.baseUrl}/users`, usersRoutes);
    this.router.use(`${this.baseUrl}/tasks`, tasksRoutes);

    this.router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.router.all(`*`, (req: Request) => {
      throw new ErrorResponse(`Resource not found: ${req.originalUrl}`, StatusCodes.NotFound);
    });

    this.router.use(errorHandler);

    return this.router;
  }
}

export const applicationRoutes: Router = new ApplicationRouter().getRoutes();
