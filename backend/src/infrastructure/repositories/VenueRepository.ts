import { IVenueRepository } from '@application/interfaces/repositories/IVenueRepository';
import { VenueMapper, venueMapper } from '@application/mappers/VenueMapper';

import { Venue } from '@domain/entities/Venue';

import { IVenueModel, venueModel } from '@infrastructure/database/models/VenueModel';

import { BaseRepository } from './BaseRepository';

export class VenueRepository
  extends BaseRepository<Venue, IVenueModel>
  implements IVenueRepository
{
  constructor() {
    super(venueModel, venueMapper);
  }

  async findByOwnerId(ownerId: string): Promise<Venue[]> {
    const docs = await this._model.find({
      ownerId,
    });

    return docs.map((doc) => VenueMapper.fromMongooseDocument(doc));
  }

  async findByCity(city: string): Promise<Venue[]> {
    const docs = await this._model.find({
      city,
    });

    return docs.map((doc) => VenueMapper.fromMongooseDocument(doc));
  }

  async findByName(name: string): Promise<Venue | null> {
    const doc = await this._model.findOne({
      name,
    });

    if (!doc) return null;

    return VenueMapper.fromMongooseDocument(doc);
  }
}
