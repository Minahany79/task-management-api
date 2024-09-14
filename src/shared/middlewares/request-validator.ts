import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse } from "../models/error-response";
import { StatusCodes } from "../enums/status-codes";

export class RequestValidator {
  public static validateWithRules(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ErrorResponse("Validation error", StatusCodes.BadRequest, result.array());
    }
    next();
  }
}
