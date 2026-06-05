export const ROUTES = {
  HEALTH: '/health',

  VENUES: {
    BASE: '/venues',

    CREATE: '/',

    GET_BY_ID: '/:venueId',

    UPDATE: '/:venueId',

    DELETE: '/:venueId',
  },

  VARIANTS: {
    BASE: '/variants',
  },

  REVIEWS: {
    BASE: '/reviews',
  },

  NOTIFICATIONS: {
    BASE: '/notifications',
  },
} as const;
