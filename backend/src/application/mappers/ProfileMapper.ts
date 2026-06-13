import { GetUserProfileResponseDto } from '@application/dto/profile/GetProfileResponseDto';
import { VenueOwnerUpgradeDto } from '@application/dto/profile/VenueOwnerUpgradeDto';
import { User } from '@domain/entities/user';
import { DocumentType } from '@domain/enums/documentType';
import { KycStatus } from '@domain/enums/kycStatus';

export class ProfileMapper {
  static toGetUserProfileResponseDto(user: User): GetUserProfileResponseDto {
    return {
      id: user.id!,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      profileImage: user.profileImage,
      role: user.role,
      authProvider: user.authProvider,
      isEmailVerified: user.isEmailVerified,
      accountStatus: user.accountStatus,
      createdAt: user.createdAt,
      venueOwnerProfile: user.venueOwnerProfile
        ? {
            kycStatus: user.venueOwnerProfile.kycStatus,
          }
        : undefined,
    };
  }
  static mapVenueOwnerUpgrade = (user: User, dto: VenueOwnerUpgradeDto): User => {
    user.venueOwnerProfile = {
      kycStatus: KycStatus.PENDING,
      identityProof: {
        documentType: dto.documentType as DocumentType,
        documentNumber: dto.documentNumber,
        documentImage: dto.documentImage,
      },

      bankDetails: {
        accountHolderName: dto.accountHolderName,
        bankName: dto.bankName,
        accountNumber: dto.accountNumber,
        ifscCode: dto.ifscCode,
        cancelledChequeImage: dto.cancelledChequeImage,
      },
    };

    return user;
  };
}
