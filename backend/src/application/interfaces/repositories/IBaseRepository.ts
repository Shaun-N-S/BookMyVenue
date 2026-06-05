import { ClientSession } from 'mongoose';

export interface IBaseRepository<T> {
  save(data: T, session?: ClientSession): Promise<T>;

  findById(id: string): Promise<T | null>;

  update(id: string, data: Partial<T>, session?: ClientSession): Promise<T | null>;
}
