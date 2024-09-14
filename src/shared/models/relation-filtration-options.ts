import { IFindPaginatedOptions } from "./find-paginated-options";
import { IRelationProperties } from "./relation";

export interface IRelationFiltrationOptions extends IFindPaginatedOptions {
  queryBuilderCreationPropertyName: string;
  tableRelationsAndSelect?: IRelationProperties[];
  tableRelations?: IRelationProperties[];
  andWhereConditions?: string[];
}
