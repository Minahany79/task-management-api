import { Router, Response } from "express";
import { MiscController } from "./misc.controller";
import { IRouterBase } from "../../shared/models/router-base";

class MiscRouter implements IRouterBase<MiscController> {
  router!: Router;
  readonly controller!: MiscController;

  constructor() {
    this.router = Router();
    this.controller = new MiscController();
    this.addRoutes();
  }
  addRoutes(): void {
    this.router.get("/Ping", (_, res: Response) => {
      this.controller.ping(res);
    });
  }
  getRouter(): Router {
    return this.router;
  }
}

export const MiscRoutes = new MiscRouter().getRouter();
