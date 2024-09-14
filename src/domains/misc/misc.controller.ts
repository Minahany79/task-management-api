import { sanitizedConfig } from "../../../config";
import { StatusCodes } from "./../../shared/enums/status-codes";
import { ResponseHandlingService } from "./../../shared/services/response-handling.service";
import { Response } from "express";

export class MiscController {
  public ping(res: Response) {
    return new ResponseHandlingService(
      res,
      `PONG !! from ${sanitizedConfig.SERVICE_NAME} - ${new Date()}`,
      StatusCodes.OK,
    );
  }
}
