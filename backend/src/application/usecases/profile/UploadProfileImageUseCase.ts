import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IStorageService } from '@application/interfaces/services/IStorageService';
import { IUploadProfileImageUseCase } from '@application/interfaces/usecases/profile/IUploadProfileImageUseCase';
import { STORAGE_FOLDERS } from '@shared/constants/storageFolders';
import { BadRequestError, NotFoundError } from '@shared/errors/app.error';

export class UploadProfileImageUseCase implements IUploadProfileImageUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _storageService: IStorageService,
  ) {}

  async execute(userId: string, profileImage: Express.Multer.File): Promise<void> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!profileImage) {
      throw new BadRequestError('Profile image is required');
    }

    const uploadedProfileImage = await this._storageService.upload(
      profileImage.buffer,
      STORAGE_FOLDERS.PROFILE_IMAGES,
    );

    await this._userRepository.updateProfileImage(userId, uploadedProfileImage);
  }
}
