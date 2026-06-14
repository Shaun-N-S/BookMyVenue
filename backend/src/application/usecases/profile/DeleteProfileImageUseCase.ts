import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IDeleteProfileImageUseCase } from '@application/interfaces/usecases/profile/IDeleteProfileImageUseCase';
import { NotFoundError } from '@shared/errors/app.error';

export class DeleteProfileImageUseCase implements IDeleteProfileImageUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await this._userRepository.updateProfileImage(userId, undefined);
  }
}
