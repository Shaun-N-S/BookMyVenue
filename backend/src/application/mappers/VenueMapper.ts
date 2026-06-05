import { Types } from 'mongoose';

import { Venue } from '@domain/entities/Venue';

import { IVenueModel } from '@infrastructure/database/models/VenueModel';

import { Mapper } from '@shared/types/Mapper';

export class VenueMapper {
  static fromMongooseDocument(doc: IVenueModel): Venue {
    return {
      id: doc._id.toString(),

      ownerId: doc.ownerId.toString(),

      name: doc.name,
      description: doc.description,

      category: doc.category,
      venueType: doc.venueType,

      approvalStatus: doc.approvalStatus,

      openingTime: doc.openingTime,
      closingTime: doc.closingTime,

      amenities: doc.amenities,

      images: doc.images,
      coverImage: doc.coverImage,

      isFeatured: doc.isFeatured,
      isActive: doc.isActive,

      address: doc.address,
      city: doc.city,
      state: doc.state,
      country: doc.country,
      zipCode: doc.zipCode,

      googleMapLink: doc.googleMapLink,

      cancellationPolicy: doc.cancellationPolicy,

      rules: doc.rules,

      averageRating: doc.averageRating,
      totalReviews: doc.totalReviews,
      totalBookings: doc.totalBookings,

      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toMongooseDocument(venue: Venue): Partial<IVenueModel> {
    return {
      ownerId: new Types.ObjectId(venue.ownerId),

      name: venue.name,
      description: venue.description,

      category: venue.category,
      venueType: venue.venueType,

      approvalStatus: venue.approvalStatus,

      openingTime: venue.openingTime,
      closingTime: venue.closingTime,

      amenities: venue.amenities,

      images: venue.images,
      coverImage: venue.coverImage,

      isFeatured: venue.isFeatured,
      isActive: venue.isActive,

      address: venue.address,
      city: venue.city,
      state: venue.state,
      country: venue.country,
      zipCode: venue.zipCode,

      googleMapLink: venue.googleMapLink,

      cancellationPolicy: venue.cancellationPolicy,

      rules: venue.rules,

      averageRating: venue.averageRating,

      totalReviews: venue.totalReviews,

      totalBookings: venue.totalBookings,
    };
  }
}

export const venueMapper: Mapper<Venue, IVenueModel> = VenueMapper;
