import { VenueOwnerUpgradeDto } from '@application/dto/profile/VenueOwnerUpgradeDto';

export interface ISubmitVenueOwnerUpgradeUseCase {
  execute(userId: string, dto: VenueOwnerUpgradeDto): Promise<void>;
}
