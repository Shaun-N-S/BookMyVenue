import { ZodSchema } from 'zod';

import { BadRequestError } from '@shared/errors/app.error';

export const validateRequest = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new BadRequestError(result.error.issues[0]?.message ?? 'Validation failed');
  }

  return result.data;
};
