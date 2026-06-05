import { CancellationPolicy } from '../../enums/CancellationPolicy';

export const CancellationPolicyRules = {
  [CancellationPolicy.FLEXIBLE]: {
    refundPercentage: 100,
    beforeHours: 48, // 2 days
  },

  [CancellationPolicy.MODERATE]: {
    refundPercentage: 50,
    beforeHours: 168, // 7 days
  },

  [CancellationPolicy.STRICT]: {
    refundPercentage: 25,
    beforeHours: 336, // 14 days
  },

  [CancellationPolicy.NON_REFUNDABLE]: {
    refundPercentage: 0,
    beforeHours: 0,
  },
} as const;
