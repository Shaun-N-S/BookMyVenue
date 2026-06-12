import { AccountStatus } from '@domain/enums/accountStatus';
import { AuthProvider } from '@domain/enums/AuthProvider';
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
