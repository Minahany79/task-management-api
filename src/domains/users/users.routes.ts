import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { IRouterBase } from "../../shared/models/router-base";
import { UsersController } from "./users.controller";
import { authenticationAndAuthorizationMiddleware } from "../../shared/middlewares/authentication-and-authorization.middleware";
import { UserRoles } from "../../shared/models/user-roles";
import { UsersValidator } from "./users.validators";

class UsersRouter implements IRouterBase<UsersController> {
  router: Router;
  controller: UsersController;

  constructor() {
    this.router = Router();
    this.controller = new UsersController();
    this.addRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  addRoutes(): void {
    this.router.get(
      "/current",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.getCurrentUser(req, res);
      }),
    );

    this.router.put(
      "/current",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      UsersValidator.updateUser(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.updateCurrentUser(req, res);
      }),
    );

    this.router.put(
      "/changePassword",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      UsersValidator.changePassword(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.changePassword(req, res);
      }),
    );

    this.router.delete(
      "/",
      authenticationAndAuthorizationMiddleware([UserRoles.User.name]),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.deleteUser(req, res);
      }),
    );

    this.router.post(
      "/login",
      UsersValidator.loginUser(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.login(req, res);
      }),
    );

    this.router.post(
      "/register",
      UsersValidator.registerUser(),
      asyncHandler(async (req: Request, res: Response) => {
        await this.controller.register(req, res);
      }),
    );
  }
}

export const usersRoutes: Router = new UsersRouter().getRouter();
