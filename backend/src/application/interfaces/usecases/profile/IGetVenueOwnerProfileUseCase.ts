import { GetVenueOwnerProfileResponseDto } from '@application/dto/profile/GetProfileResponseDto';

export interface IGetVenueOwnerProfileUseCase {
  execute(userId: string): Promise<GetVenueOwnerProfileResponseDto>;
}
