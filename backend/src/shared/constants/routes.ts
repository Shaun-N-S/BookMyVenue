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
  PROFILE: {
    BASE: '/profile',
    USER_PROFILE: '/user_profile',
    PROFILE_IMAGE_UPLOAD: '/upload-image',
    PROFILE_IMAGE_DELETE: '/upload-delete',
    VENUE_OWNER_UPGRADE: '/venue-owner-upgrade',
    VENUE_OWNER_PROFILE: '/venue-owner',
  },

  AUTH: {
    BASE: '/auth',
    SIGN_UP: '/sign-up',
    VERIFY_EMAIL: '/verify-email',
    RESEND_OTP: '/resend-otp',
    GOOGLE_SIGNUP: '/google-signup',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    REFRESH_TOKEN: '/refresh-token',
    LOGOUT: '/logout',
  },
} as const;
