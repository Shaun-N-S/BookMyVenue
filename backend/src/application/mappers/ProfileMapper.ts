import { GetUserProfileResponseDto } from '@application/dto/profile/GetProfileResponseDto';
import { User } from '@domain/entities/user';

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
}
