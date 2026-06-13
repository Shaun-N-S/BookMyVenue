import { GetProfileUseCase } from '@application/usecases/profile/GetUserProfileUseCase';
import { GetVenueOwnerProfileUseCase } from '@application/usecases/profile/GetVenueOwnerProfileUseCase';
import { SubmitVenueOwnerUpgradeUseCase } from '@application/usecases/profile/SubmitVenueOwnerUpgradeUseCase';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { ProfileController } from '@presentation/controllers/profile/ProfileController';
const userRepository = new UserRepository();
const getUserProfileUseCase = new GetProfileUseCase(userRepository);
const submitVenueOwnerUpgradeUseCase = new SubmitVenueOwnerUpgradeUseCase(userRepository);
const getVenueOwnerProfileUseCase = new GetVenueOwnerProfileUseCase(userRepository);
export const profileController = new ProfileController(
  getUserProfileUseCase,
  submitVenueOwnerUpgradeUseCase,
  getVenueOwnerProfileUseCase,
);
