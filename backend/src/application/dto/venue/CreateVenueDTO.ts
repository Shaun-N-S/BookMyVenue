import { CancellationPolicy } from '@domain/enums/CancellationPolicy';
import { VenueCategory } from '@domain/enums/VenueCategory';
import { VenueType } from '@domain/enums/VenueType';

export interface CreateVenueDTO {
  name: string;

  description: string;

  category: VenueCategory;

  venueType: VenueType;

  openingTime: string;

  closingTime: string;

  amenities: string[];

  images?: string[];

  coverImage?: string;

  address: string;

  city: string;

  state: string;

  country: string;

  zipCode: string;

  googleMapLink?: string;

  cancellationPolicy: CancellationPolicy;

  rules?: string[];
}
