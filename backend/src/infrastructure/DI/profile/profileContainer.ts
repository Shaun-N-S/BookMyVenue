import { GetProfileUseCase } from '@application/usecases/profile/GetUserProfileUseCase';
import { SubmitVenueOwnerUpgradeUseCase } from '@application/usecases/profile/SubmitVenueOwnerUpgradeUseCase';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { ProfileController } from '@presentation/controllers/profile/ProfileController';
const userRepository = new UserRepository();
const getUserProfileUseCase = new GetProfileUseCase(userRepository);
const submitVenueOwnerUpgradeUseCase = new SubmitVenueOwnerUpgradeUseCase(userRepository);
export const profileController = new ProfileController(
  getUserProfileUseCase,
  submitVenueOwnerUpgradeUseCase,
);
