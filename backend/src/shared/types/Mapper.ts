export type Mapper<TEntity, TModel> = {
  toMongooseDocument(entity: TEntity): Partial<TModel>;

  fromMongooseDocument(document: TModel): TEntity;
};
