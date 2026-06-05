export const ERROR_MESSAGES = {
  COMMON: {
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    VALIDATION_ERROR: 'Validation Error',
    UNKNOWN_ERROR: 'An unexpected error occurred',
  },
  AUTH: {
    UNAUTHORIZED: 'User authentication required',
    INVALID_TOKEN: 'Invalid authentication token',
  },

  VENUE: {
    INVALID_DATA: 'Invalid venue data',
    OPENING_TIME_INVALID: 'Opening time must be earlier than closing time',
    NOT_FOUND: 'Venue not found',
    ALREADY_EXISTS: 'Venue already exists',
  },
} as const;
