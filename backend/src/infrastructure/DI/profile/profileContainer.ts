import { GetProfileUseCase } from '@application/usecases/profile/GetUserProfileUseCase';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { ProfileController } from '@presentation/controllers/profile/ProfileController';
const userRepository = new UserRepository();
const getUserProfileUseCase = new GetProfileUseCase(userRepository);
export const profileController = new ProfileController(getUserProfileUseCase);
