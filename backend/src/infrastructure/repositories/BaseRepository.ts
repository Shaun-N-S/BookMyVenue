import { ClientSession, Document, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { Mapper } from '@shared/types/Mapper';

export abstract class BaseRepository<TEntity, TModel extends Document> {
  constructor(
    protected _model: Model<TModel>,
    protected mapper: Mapper<TEntity, TModel>,
  ) {}

  async save(data: TEntity, session?: ClientSession): Promise<TEntity> {
    const doc = this.mapper.toMongooseDocument(data);

    const savedDocs = session
      ? await this._model.create([doc], {
          session,
        })
      : await this._model.create([doc]);

    return this.mapper.fromMongooseDocument(savedDocs[0]);
  }

  async findById(id: string): Promise<TEntity | null> {
    const doc = await this._model.findById(id);

    if (!doc) return null;

    return this.mapper.fromMongooseDocument(doc);
  }

  async update(
    id: string,
    data: Partial<TEntity>,
    session?: ClientSession,
  ): Promise<TEntity | null> {
    const options: QueryOptions<TModel> = {
      new: true,
      ...(session ? { session } : {}),
    };

    const updated = await this._model.findByIdAndUpdate(id, data as UpdateQuery<TModel>, options);

    if (!updated) return null;

    return this.mapper.fromMongooseDocument(updated);
  }
}
