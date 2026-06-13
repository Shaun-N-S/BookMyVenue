import { VenueOwnerUpgradeDto } from '@application/dto/profile/VenueOwnerUpgradeDto';
import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { ISubmitVenueOwnerUpgradeUseCase } from '@application/interfaces/usecases/profile/ISubmitVenueOwnerUpgradeUseCase';
import { ProfileMapper } from '@application/mappers/ProfileMapper';
import { NotFoundError } from '@shared/errors/app.error';

export class SubmitVenueOwnerUpgradeUseCase implements ISubmitVenueOwnerUpgradeUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(userId: string, dto: VenueOwnerUpgradeDto): Promise<void> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }
    ProfileMapper.mapVenueOwnerUpgrade(user, dto);
    await this._userRepository.save(user);
  }
}
