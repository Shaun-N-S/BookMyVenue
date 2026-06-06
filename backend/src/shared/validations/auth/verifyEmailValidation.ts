import { z } from 'zod';

export const verifyEmailSchema = z.object({
  email: z.string().trim().email('Invalid email address'),

  otp: z.string().trim().length(6, 'OTP must be 6 digits'),
});

export type VerifyEmailRequestDTO = z.infer<typeof verifyEmailSchema>;
