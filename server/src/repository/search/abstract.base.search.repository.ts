import { ElasticsearchService } from "@nestjs/elasticsearch";
import { BaseEntity } from "../../domain/base/base.entity";

export abstract class AbstractBaseSearchRepository<E extends BaseEntity> {
  protected _entity: { name: string };

  protected constructor(protected readonly model: ElasticsearchService) {
    this.init();
  }

  init() {
    if (this.constructor.name.search(/SearchRepository$/g) < 0)
      log.warn("Format of class name not right:", this.constructor.name);
    this._entity = {
      name: this.constructor.name.replace(/SearchRepository$/g, "").toLowerCase(),
    };
  }

  async search(keyword: string): Promise<E[] | undefined> {
    return this.model
      .search({
        index: this._entity.name,
        body: {
          query: {
            multi_match: {
              query: keyword,
            },
          },
        },
      })
      .then(r => r.body?.hits?.hits?.map(v => v._source as E) || []);
  }

  async save(entity: E) {
    return entity?.id
      ? this.model.update({
          index: this._entity.name,
          id: entity.id?.toString(),
          body: {
            ...entity,
          },
        })
      : this.model.index({
          index: this._entity.name,
          id: entity.id?.toString(),
          body: {
            ...entity,
          },
        });
  }

  async delete(entityOrId: any) {
    const id = (entityOrId?.id || entityOrId)?.toString();
    return this.model.delete({
      index: this._entity.name,
      id,
    });
  }
}
