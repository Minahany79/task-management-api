import { StatusCodes } from "../enums/status-codes";
import { IResponseBase } from "./response-base";

export class ErrorResponse extends Error implements IResponseBase {
  constructor(
    message: string,
    public statusCode: StatusCodes,
    public additionalInfo?: any,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.additionalInfo = additionalInfo;
  }
}
