import mongoose from 'mongoose';

import { ApprovalStatus } from '@domain/enums/ApprovalStatus';
import { CancellationPolicy } from '@domain/enums/CancellationPolicy';
import { VenueCategory } from '@domain/enums/VenueCategory';
import { VenueType } from '@domain/enums/VenueType';

const venueSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: Object.values(VenueCategory),
      required: true,
    },

    venueType: {
      type: String,
      enum: Object.values(VenueType),
      required: true,
    },

    approvalStatus: {
      type: String,
      enum: Object.values(ApprovalStatus),
      default: ApprovalStatus.PENDING,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    coverImage: {
      type: String,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    zipCode: {
      type: String,
      required: true,
    },

    googleMapLink: {
      type: String,
    },

    cancellationPolicy: {
      type: String,
      enum: Object.values(CancellationPolicy),
      required: true,
    },

    rules: {
      type: [String],
      default: [],
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Single-field indexes
venueSchema.index({ ownerId: 1 });
venueSchema.index({ city: 1 });
venueSchema.index({ category: 1 });
venueSchema.index({ approvalStatus: 1 });

// Compound indexes
venueSchema.index({
  ownerId: 1,
  approvalStatus: 1,
});

// Full-text search
venueSchema.index({
  name: 'text',
  description: 'text',
});

export default venueSchema;
