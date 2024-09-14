import { IFindPaginatedOptions } from "./find-paginated-options";

export interface IPaginatedRequest extends IFindPaginatedOptions {
  pageNumber: number;
  pageSize: number;
}
