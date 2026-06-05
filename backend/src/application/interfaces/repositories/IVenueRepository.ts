import { Venue } from '@domain/entities/Venue';

import { IBaseRepository } from './IBaseRepository';

export interface IVenueRepository extends IBaseRepository<Venue> {
  findByOwnerId(ownerId: string): Promise<Venue[]>;

  findByName(name: string): Promise<Venue | null>;

  findByCity(city: string): Promise<Venue[]>;
}
