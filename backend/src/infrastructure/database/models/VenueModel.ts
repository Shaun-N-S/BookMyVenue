import { Document, model, Types } from 'mongoose';

import venueSchema from '../schema/venueSchema';

import { ApprovalStatus } from '@domain/enums/ApprovalStatus';
import { CancellationPolicy } from '@domain/enums/CancellationPolicy';
import { VenueCategory } from '@domain/enums/VenueCategory';
import { VenueType } from '@domain/enums/VenueType';

export interface IVenueModel extends Document {
  ownerId: Types.ObjectId;

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

  createdAt: Date;
  updatedAt: Date;
}

export const venueModel = model<IVenueModel>('Venue', venueSchema);
