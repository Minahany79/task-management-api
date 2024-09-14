import { JwtService } from "./../services/jwt.service";
import { StatusCodes } from "./../enums/status-codes";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../models/error-response";

export const authenticationAndAuthorizationMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ErrorResponse("unAuthorized", StatusCodes.UnAuthorized);
    }

    const jwtService = new JwtService();
    const decodedToken = jwtService.verify(token);

    const userRole: string = decodedToken.role;

    if (roles.includes(userRole)) {
      res.locals.user = {
        userId: decodedToken.userId,
        userEmail: decodedToken.userEmail,
        userRole: decodedToken.userRole,
        token,
      };
      next();
    } else {
      throw new ErrorResponse("Access Denied", StatusCodes.Forbidden);
    }
  };
};
