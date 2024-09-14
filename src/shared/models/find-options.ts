import { IOrderByOptions } from "./order-by-options";

export interface IFindOptions {
  where?: any;
  relations?: any;
  selectedColumns?: string[] | object;
  order?: IOrderByOptions;
}
