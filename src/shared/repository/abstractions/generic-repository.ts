import { IFindOptions } from "./../../models/find-options";
import { IFindPaginatedOptions } from "./../../models/find-paginated-options";
import { DeleteResult, FindOptionsWhere, UpdateResult } from "typeorm";
import { IRelationFiltrationOptions } from "../../models/relation-filtration-options";

export interface IGenericRepository<T> {
  find(findOptions: IFindPaginatedOptions): Promise<Array<T>>;

  findQueryBuilder(findOptions: IRelationFiltrationOptions): Promise<{ pagedData: T[]; totalCount: number }>;

  findOne(findOptions: IFindOptions): Promise<T>;

  findAndCount(findOptions: IFindPaginatedOptions): Promise<{ pagedData: T[]; totalCount: number }>;

  create(model: T): Promise<T>;

  update(criteria: string | number | number[] | FindOptionsWhere<any>, model: Partial<T>): Promise<UpdateResult>;

  delete(criteria: number | number[] | string | FindOptionsWhere<any>): Promise<DeleteResult>;
}
