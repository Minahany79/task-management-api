import { FindOptionsOrder } from "typeorm";

export interface IOrderByOptions extends FindOptionsOrder<any> {
  orderPropertyName: string;
  orderBy: "ASC" | "DESC";
}
