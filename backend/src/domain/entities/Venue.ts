import { ApprovalStatus } from '../enums/ApprovalStatus';
import { CancellationPolicy } from '../enums/CancellationPolicy';
import { VenueCategory } from '../enums/VenueCategory';
import { VenueType } from '../enums/VenueType';

export interface Venue {
  id?: string;

  ownerId: string;

  name: string;
  description: string;

  category: VenueCategory;
  venueType: VenueType;

  approvalStatus: ApprovalStatus;

  openingTime: string;
  closingTime: string;

  amenities: string[];

  images: string[];
  coverImage?: string;

  isFeatured: boolean;
  isActive: boolean;

  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  googleMapLink?: string;

  cancellationPolicy: CancellationPolicy;

  rules: string[];

  averageRating: number;
  totalReviews: number;
  totalBookings: number;

  createdAt?: Date;
  updatedAt?: Date;
}
