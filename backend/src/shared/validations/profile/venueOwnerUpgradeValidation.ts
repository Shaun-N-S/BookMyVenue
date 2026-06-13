import { z } from 'zod';

export const venueOwnerUpgradeSchema = z.object({
  documentType: z.string().min(1),

  documentNumber: z.string().min(5).max(30),

  documentImage: z.string().url(),

  accountHolderName: z.string().min(3).max(100),

  bankName: z.string().min(2).max(100),

  accountNumber: z.string().min(6).max(30),

  ifscCode: z.string().min(11).max(11),

  cancelledChequeImage: z.string().url(),
});

export type VenueOwnerUpgradeInput = z.infer<typeof venueOwnerUpgradeSchema>;
