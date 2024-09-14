import { IFindPaginatedOptions } from "./../../models/find-paginated-options";
import { DeleteResult, FindOptionsWhere, ObjectType, Repository, UpdateResult } from "typeorm";
import { DB } from "../../../config/db";
import { IFindOptions } from "../../models/find-options";
import { IGenericRepository } from "./../abstractions/generic-repository";
import { IRelationFiltrationOptions } from "../../models/relation-filtration-options";

export class GenericRepository<T> implements IGenericRepository<T> {
  private type: ObjectType<T>;
  private readonly dbRepository: Repository<any>;

  constructor(type: ObjectType<T>) {
    this.type = type;
    this.dbRepository = DB.getRepository(this.type);
  }

  findOne(findOptions: IFindOptions): Promise<T> {
    return this.dbRepository.findOne({
      relations: findOptions.relations,
      where: findOptions.where,
      select: findOptions.selectedColumns,
    });
  }

  find(findOptions: IFindPaginatedOptions): Promise<T[]> {
    return this.dbRepository.find({
      where: findOptions.where,
      relations: findOptions.relations,
      skip: findOptions.skip,
      take: findOptions.take,
      select: findOptions.selectedColumns,
      order: findOptions.order,
    });
  }

  async findAndCount(findOptions: IFindPaginatedOptions): Promise<{ pagedData: T[]; totalCount: number }> {
    const [pagedData, totalCount] = await this.dbRepository.findAndCount({
      where: findOptions.where,
      relations: findOptions.relations,
      skip: findOptions.skip,
      take: findOptions.take,
      select: findOptions.selectedColumns,
      order: findOptions.order,
    });
    return { pagedData, totalCount };
  }

  async findQueryBuilder(findOptions: IRelationFiltrationOptions): Promise<{ pagedData: T[]; totalCount: number }> {
    let query = this.dbRepository.createQueryBuilder(findOptions.queryBuilderCreationPropertyName);

    if (findOptions.tableRelationsAndSelect)
      findOptions.tableRelationsAndSelect.forEach((element) => {
        query = query.leftJoinAndSelect(element.navigationPropertyName, element.selector);
      });

    if (findOptions.tableRelations)
      findOptions.tableRelations.forEach((element) => {
        query = query.leftJoin(element.navigationPropertyName, element.selector);
      });

    if (findOptions.where) query = query.where(findOptions.where);

    if (findOptions.andWhereConditions) {
      findOptions.andWhereConditions.forEach((element) => {
        query = query.andWhere(element);
      });
    }

    const [pagedData, totalCount] = await query.skip(findOptions.skip).take(findOptions.take).getManyAndCount();
    return { pagedData, totalCount };
  }

  create(model: T): Promise<T> {
    return this.dbRepository.save(model);
  }

  update(criteria: string | number | number[] | FindOptionsWhere<any>, model: Partial<T>): Promise<UpdateResult> {
    return this.dbRepository.update(criteria, model);
  }

  delete(criteria: string | number | number[] | FindOptionsWhere<any>): Promise<DeleteResult> {
    return this.dbRepository.delete(criteria);
  }
}
