import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { AbstractBaseRepository } from "../repository/abstract.base.repository";
import { AbstractBaseMapper } from "./mapper/abstract.base.mapper";
import { BaseEntity } from "../domain/base/base.entity";
import { BaseDTO } from "./dto/base.dto";
import { AbstractBaseSearchRepository } from "../repository/search/abstract.base.search.repository";

export abstract class AbstractBaseService<E extends BaseEntity, D extends BaseDTO> {
  logger = new Logger("BaseService");

  protected constructor(
    protected _repository: AbstractBaseRepository<E>,
    protected _mapper: AbstractBaseMapper<E, D>,
    protected _relationshipNames: string[] = [],
    protected _searchRepository: AbstractBaseSearchRepository<E>,
  ) {}

  async findById(id: number): Promise<D | undefined> {
    const options = { relations: this._relationshipNames };
    const result = await this._repository.findOne(id, options);
    return this._mapper.e2d(result);
  }

  async search(keywords: string): Promise<D[] | undefined> {
    const result = await this._searchRepository.search(keywords);
    return result.map(this._mapper.e2d);
  }

  async findByFields(options: FindOneOptions<D>): Promise<D | undefined> {
    const result = await this._repository.findOne(AbstractBaseMapper.copy(options));
    return this._mapper.e2d(result);
  }

  async findAndCount(options: FindManyOptions<any>): Promise<[D[], number]> {
    options.relations = this._relationshipNames;
    const optionsCopy = AbstractBaseMapper.copy(options);
    const resultList = await this._repository.findAndCount(optionsCopy);
    const dto = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(entity => dto.push(this._mapper.e2d(entity)));
      resultList[0] = dto;
    }
    return resultList as any;
  }

  async save(dto: D, creator?: string): Promise<D | undefined> {
    const entity = this._mapper.d2e(dto);
    if (creator) {
      if (!entity.createdBy) entity.createdBy = creator;
      entity.lastModifiedBy = creator;
    }
    const result = await this._repository.save(entity as any);
    this._searchRepository.save(result);
    return this._mapper.e2d(result);
  }

  async update(dto: D, updater?: string): Promise<D | undefined> {
    const entity = this._mapper.d2e(dto);
    if (updater) entity.lastModifiedBy = updater;
    const result = await this._repository.save(entity as any);
    this._searchRepository.save(result);
    return this._mapper.e2d(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this._repository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException("Error, entity not deleted!", HttpStatus.NOT_FOUND);
    }
    this._searchRepository.delete(id);
  }
}
