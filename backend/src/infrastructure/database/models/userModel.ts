import { Document, model } from 'mongoose';

import userSchema from '../schema/userSchema';

import { AccountStatus } from '@domain/enums/accountStatus';
import { DocumentType } from '@domain/enums/documentType';
import { KycStatus } from '@domain/enums/kycStatus';
import { UserRole } from '@domain/enums/userRole';
import { AuthProvider } from '@domain/enums/AuthProvider';

export interface IUserModel extends Document {
  fullName: string;

  email: string;
  phone?: string;
  passwordHash?: string;

  googleId?: string;
  authProvider: AuthProvider;

  profileImage?: string;

  role: UserRole;

  isEmailVerified: boolean;

  accountStatus: AccountStatus;

  lastLoginAt?: Date;

  venueOwnerProfile?: {
    kycStatus: KycStatus;

    identityProof?: {
      documentType: DocumentType;
      documentNumber: string;
      documentImage: string;
    };

    bankDetails?: {
      accountHolderName: string;
      bankName: string;
      accountNumber: string;
      ifscCode: string;
      cancelledChequeImage: string;
    };
  };

  createdAt: Date;
  updatedAt: Date;
}

export const userModel = model<IUserModel>('User', userSchema);
