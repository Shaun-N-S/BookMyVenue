import { DeleteProfileImageUseCase } from '@application/usecases/profile/DeleteProfileImageUseCase';
import { GetProfileUseCase } from '@application/usecases/profile/GetUserProfileUseCase';
import { GetVenueOwnerProfileUseCase } from '@application/usecases/profile/GetVenueOwnerProfileUseCase';
import { SubmitVenueOwnerUpgradeUseCase } from '@application/usecases/profile/SubmitVenueOwnerUpgradeUseCase';
import { UploadProfileImageUseCase } from '@application/usecases/profile/UploadProfileImageUseCase';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { CloudinaryStorageService } from '@infrastructure/services/CloudinaryService';
import { ProfileController } from '@presentation/controllers/profile/ProfileController';
const userRepository = new UserRepository();
const storageService = new CloudinaryStorageService();
const getUserProfileUseCase = new GetProfileUseCase(userRepository);
const submitVenueOwnerUpgradeUseCase = new SubmitVenueOwnerUpgradeUseCase(userRepository);
const getVenueOwnerProfileUseCase = new GetVenueOwnerProfileUseCase(userRepository);
const updateProfileImageUseCase = new UploadProfileImageUseCase(userRepository, storageService);
const deleteProfileImageUseCase = new DeleteProfileImageUseCase(userRepository);
export const profileController = new ProfileController(
  getUserProfileUseCase,
  submitVenueOwnerUpgradeUseCase,
  getVenueOwnerProfileUseCase,
  updateProfileImageUseCase,
  deleteProfileImageUseCase,
);
