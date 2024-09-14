import { ErrorRequestHandler, Request, Response } from "express";
import { logger } from "../services/logger.service";
import { ErrorResponse } from "../models/error-response";
import { sanitizedConfig } from "../../../config";
import { ResponseHandlingService } from "../services/response-handling.service";
import { StatusCodes } from "../enums/status-codes";

/**
 * Middleware to handle API errors.
 *
 * This function acts as an Express error handling middleware.
 * It logs the error details, prepares an error response payload, and sends it using the ResponseHandlingService.
 * It conditionally includes the stack trace in the response only if the environment is development (dev).
 *
 * @param error - The error object captured by Express.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param _ - The next middleware function (unused in this handler).
 *
 * @returns void
 */
export const errorHandler: ErrorRequestHandler = (error: ErrorResponse, req: Request, res: Response, _) => {
  logError(error);
  const statusCode = error.statusCode || StatusCodes.InternalServerError;
  return new ResponseHandlingService(
    res,
    {
      error: {
        statusCode,
        message: error.message,
        additionalInfo: error.additionalInfo,
        ...(sanitizedConfig.NODE_ENV === "dev" && { stack: error?.stack ?? "N/A" }),
      },
    },
    statusCode,
  );
};

// Logs error message, status code, and stack trace
const logError = (error: ErrorResponse) => {
  logger.error(`Message: ${error.message}`);
  logger.error(`Status Code: ${error.statusCode}`);
  logger.error(`Stack ${error?.stack ?? "N/A"}`);
};

// Listens and logs unhandled promise rejections
export const unhandledRejectionHandler = () => {
  process.on("unhandledRejection", (error: Error) => {
    logger.error(`Unhandled Rejection Reason: ${error.message}`);
    logger.error(`Unhandled Rejection Stack Trace: ${error?.stack ?? "N/A"}`);
  });
};

// Listens and logs uncaught exceptions
export const uncaughtExceptionHandler = () => {
  process.on("uncaughtException", (error: Error) => {
    logger.error(`UncaughtException Reason: ${error.message}}`);
    logger.error(`UncaughtException Stack Trace: ${error?.stack ?? "N/A"}`);
  });
};
