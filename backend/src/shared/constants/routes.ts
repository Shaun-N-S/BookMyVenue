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

  AUTH: {
    BASE: '/auth',
    SIGN_UP: '/sign-up',
    VERIFY_EMAIL: '/verify-email',
  },
} as const;
