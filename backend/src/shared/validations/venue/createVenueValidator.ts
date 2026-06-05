import z from 'zod';

import { VenueCategory } from '@domain/enums/VenueCategory';
import { VenueType } from '@domain/enums/VenueType';
import { CancellationPolicy } from '@domain/enums/CancellationPolicy';

export const createVenueSchema = z.object({
  name: z.string().trim().min(3, 'Venue name must be at least 3 characters'),

  description: z.string().trim().min(10, 'Description must be at least 10 characters'),

  category: z.nativeEnum(VenueCategory),

  venueType: z.nativeEnum(VenueType),

  openingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),

  closingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),

  amenities: z.array(z.string()).default([]),

  images: z.array(z.string()).optional(),

  coverImage: z.string().optional(),

  address: z.string().trim().min(5, 'Address must be at least 5 characters'),

  city: z.string().trim().min(2, 'City must be at least 2 characters'),

  state: z.string().trim().min(2, 'State must be at least 2 characters'),

  country: z.string().trim().min(2),

  zipCode: z.string().trim().min(3).max(15),

  googleMapLink: z.string().url().optional(),

  cancellationPolicy: z.nativeEnum(CancellationPolicy),

  rules: z.array(z.string()).optional(),
});
