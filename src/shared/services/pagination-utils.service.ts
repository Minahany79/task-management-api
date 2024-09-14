import { Request } from "express";
import { IPaginatedRequest } from "../models/paginated-request";
import { IPaginatedResponse } from "../models/paginated-response";

export class PaginationUtils {
  public static getPaginatedResponse<T>(
    pageNumber: number,
    pageSize: number,
    data: Array<T>,
    dataLength?: number,
  ): IPaginatedResponse<T> {
    return {
      pageNumber,
      pageSize,
      data,
      totalNumberOfRecords: dataLength || data.length,
      totalNumberOfPages: this.calculateTotalNumberOfPages(dataLength || data.length, pageSize),
    };
  }

  public static getPaginationRequirementsFromRequest(req: Request): IPaginatedRequest {
    const pageNumber = parseInt(req.query.pageNumber as string);
    const pageSize = parseInt(req.query.pageSize as string);
    return {
      pageNumber,
      pageSize,
      take: pageSize || undefined,
      skip: (pageNumber - 1) * pageSize || undefined,
    };
  }

  private static calculateTotalNumberOfPages(recordsLength: number, pageSize: number): number {
    const totalNumberOfPages = Math.ceil(recordsLength / pageSize);

    return totalNumberOfPages > 1 ? totalNumberOfPages : 1;
  }
}
