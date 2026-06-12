import { GetUserProfileResponseDto } from '@application/dto/profile/GetProfileResponseDto';

export interface IGetUserProfileUseCase {
  execute(userId: string): Promise<GetUserProfileResponseDto>;
}
