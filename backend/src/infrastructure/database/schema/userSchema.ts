import mongoose from 'mongoose';

import { AccountStatus } from '@domain/enums/accountStatus';
import { DocumentType } from '@domain/enums/documentType';
import { KycStatus } from '@domain/enums/kycStatus';
import { UserRole } from '@domain/enums/userRole';
import { AuthProvider } from '@domain/enums/AuthProvider';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    googleId: {
      type: String,
    },

    passwordHash: {
      type: String,
    },

    authProvider: {
      type: String,
      enum: Object.values(AuthProvider),
      default: AuthProvider.LOCAL,
    },

    profileImage: {
      type: String,
      default: '',
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },

    lastLoginAt: {
      type: Date,
    },

    venueOwnerProfile: {
      kycStatus: {
        type: String,
        enum: Object.values(KycStatus),
        default: KycStatus.NOT_SUBMITTED,
      },

      identityProof: {
        documentType: {
          type: String,
          enum: Object.values(DocumentType),
        },

        documentNumber: {
          type: String,
          trim: true,
        },

        documentImage: {
          type: String,
        },
      },

      bankDetails: {
        accountHolderName: {
          type: String,
          trim: true,
        },

        bankName: {
          type: String,
          trim: true,
        },

        accountNumber: {
          type: String,
          trim: true,
        },

        ifscCode: {
          type: String,
          trim: true,
        },

        cancelledChequeImage: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ accountStatus: 1 });

userSchema.index({
  role: 1,
  accountStatus: 1,
});

userSchema.index({
  fullName: 'text',
  email: 'text',
});

export default userSchema;
