import { AccountStatus } from '@domain/enums/accountStatus';
import { AuthProvider } from '@domain/enums/AuthProvider';
import { DocumentType } from '@domain/enums/documentType';
import { KycStatus } from '@domain/enums/kycStatus';
import { UserRole } from '@domain/enums/userRole';

export interface GetUserProfileResponseDto {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  profileImage?: string;

  role: UserRole;
  authProvider: AuthProvider;

  isEmailVerified: boolean;
  accountStatus: AccountStatus;

  createdAt?: Date;

  venueOwnerProfile?: {
    kycStatus: KycStatus;
  };
}

export interface GetVenueOwnerProfileResponseDto {
  id: string;

  fullName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  role: UserRole;
  accountStatus: AccountStatus;

  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  venueOwnerProfile: {
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
}
