import { User } from '@domain/entities/user';
import { IUserModel } from '@infrastructure/database/models/userModel';
import { Mapper } from '@shared/types/Mapper';
import { AccountStatus } from '@domain/enums/accountStatus';
import { KycStatus } from '@domain/enums/kycStatus';
import { UserRole } from '@domain/enums/userRole';
import { CreateUserEntityDTO } from '@application/dto/auth/CreateUserDTO';
import { AuthProvider } from '@domain/enums/AuthProvider';

export class UserMapper {
  static fromMongooseDocument(doc: IUserModel): User {
    return {
      id: doc._id.toString(),
      fullName: doc.fullName,
      email: doc.email,
      phone: doc.phone,
      googleId: doc.googleId,
      authProvider: doc.authProvider,
      passwordHash: doc.passwordHash,
      profileImage: doc.profileImage,
      role: doc.role,
      isEmailVerified: doc.isEmailVerified,
      accountStatus: doc.accountStatus,
      lastLoginAt: doc.lastLoginAt,
      venueOwnerProfile: doc.venueOwnerProfile
        ? {
            kycStatus: doc.venueOwnerProfile.kycStatus,

            identityProof: doc.venueOwnerProfile.identityProof
              ? {
                  documentType: doc.venueOwnerProfile.identityProof.documentType,

                  documentNumber: doc.venueOwnerProfile.identityProof.documentNumber,

                  documentImage: doc.venueOwnerProfile.identityProof.documentImage,
                }
              : undefined,

            bankDetails: doc.venueOwnerProfile.bankDetails
              ? {
                  accountHolderName: doc.venueOwnerProfile.bankDetails.accountHolderName,

                  bankName: doc.venueOwnerProfile.bankDetails.bankName,

                  accountNumber: doc.venueOwnerProfile.bankDetails.accountNumber,

                  ifscCode: doc.venueOwnerProfile.bankDetails.ifscCode,

                  cancelledChequeImage: doc.venueOwnerProfile.bankDetails.cancelledChequeImage,
                }
              : undefined,
          }
        : undefined,

      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toMongooseDocument(user: User): Partial<IUserModel> {
    return {
      fullName: user.fullName,

      email: user.email,
      phone: user.phone,
      googleId: user.googleId,
      authProvider: user.authProvider,

      passwordHash: user.passwordHash,

      profileImage: user.profileImage,

      role: user.role,

      isEmailVerified: user.isEmailVerified,

      accountStatus: user.accountStatus,

      lastLoginAt: user.lastLoginAt,

      venueOwnerProfile: user.venueOwnerProfile
        ? {
            kycStatus: user.venueOwnerProfile.kycStatus,

            identityProof: user.venueOwnerProfile.identityProof,

            bankDetails: user.venueOwnerProfile.bankDetails,
          }
        : undefined,
    };
  }

  static createToEntity(dto: CreateUserEntityDTO): User {
    return {
      fullName: dto.fullName,

      email: dto.email,

      phone: dto.phone,

      passwordHash: dto.password,

      googleId: dto.googleId,

      authProvider: dto.authProvider,

      profileImage: dto.profileImage ?? '',

      role: UserRole.USER,

      isEmailVerified: dto.authProvider === AuthProvider.GOOGLE,

      accountStatus: AccountStatus.ACTIVE,

      venueOwnerProfile: {
        kycStatus: KycStatus.NOT_SUBMITTED,
      },
    };
  }
}

export const userMapper: Mapper<User, IUserModel> = UserMapper;
