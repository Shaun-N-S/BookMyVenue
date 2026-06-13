import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IGetVenueOwnerProfileUseCase } from '@application/interfaces/usecases/profile/IGetVenueOwnerProfileUseCase';
import { ProfileMapper } from '@application/mappers/ProfileMapper';
import { ForbiddenError, NotFoundError } from '@shared/errors/app.error';
import { UserRole } from '@domain/enums/userRole';
import { GetVenueOwnerProfileResponseDto } from '@application/dto/profile/GetProfileResponseDto';

export class GetVenueOwnerProfileUseCase implements IGetVenueOwnerProfileUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(userId: string): Promise<GetVenueOwnerProfileResponseDto> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.role !== UserRole.VENUE_OWNER) {
      throw new ForbiddenError('Only venue owners can access this resource');
    }

    if (!user.venueOwnerProfile) {
      throw new NotFoundError('Venue owner profile not found');
    }

    return ProfileMapper.toVenueOwnerProfileDto(user);
  }
}
