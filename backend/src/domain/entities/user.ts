import { AuthProvider } from '@domain/enums/AuthProvider';
import { AccountStatus } from '../enums/accountStatus';
import { DocumentType } from '../enums/documentType';
import { KycStatus } from '../enums/kycStatus';
import { UserRole } from '../enums/userRole';

export interface User {
  id?: string;

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

  createdAt?: Date;
  updatedAt?: Date;
}
