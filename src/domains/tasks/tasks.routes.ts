import { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";
import { IRouterBase } from "../../shared/models/router-base";
import { authenticationAndAuthorizationMiddleware } from "../../shared/middlewares/authentication-and-authorization.middleware";
import { UserRoles } from "../../shared/models/user-roles";
import asyncHandler from "express-async-handler";
import { TasksValidator } from "./tasks.validators";

class TasksRouter implements IRouterBase<TasksController> {
  router: Router;
  controller: TasksController;

  constructor() {
    this.router = Router();
    this.controller = new TasksController();
    this.addRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  addRoutes(): void {
    this.router.post(
      "/",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      TasksValidator.createTask(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.createTask(req, res);
      }),
    );

    this.router.get(
      "/",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.getAllTasks(req, res);
      }),
    );

    this.router.get(
      "/:id",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      TasksValidator.getTaskById(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.getTaskById(req, res);
      }),
    );

    this.router.put(
      "/:id",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      TasksValidator.updateTask(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.updateTask(req, res);
      }),
    );

    this.router.delete(
      "/:id",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      TasksValidator.deleteTask(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.deleteTask(req, res);
      }),
    );

    this.router.patch(
      "/:id",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      TasksValidator.updateTaskStatus(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.markTaskAsCompleted(req, res);
      }),
    );
  }
}

export const tasksRoutes: Router = new TasksRouter().getRouter();
