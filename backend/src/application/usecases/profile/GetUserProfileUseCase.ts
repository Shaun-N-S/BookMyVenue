import { GetUserProfileResponseDto } from '@application/dto/profile/GetProfileResponseDto';
import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IGetUserProfileUseCase } from '@application/interfaces/usecases/profile/IGetUserProfileUseCase';
import { ProfileMapper } from '@application/mappers/ProfileMapper';
import { NotFoundError } from '@shared/errors/app.error';

export class GetProfileUseCase implements IGetUserProfileUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(userId: string): Promise<GetUserProfileResponseDto> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return ProfileMapper.toGetUserProfileResponseDto(user);
  }
}
