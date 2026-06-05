import { CreateVenueDTO } from '@application/dto/venue/CreateVenueDTO';
import { Venue } from '@domain/entities/Venue';

export interface ICreateVenueUseCase {
  createVenue(data: CreateVenueDTO, ownerId: string): Promise<Venue>;
}
