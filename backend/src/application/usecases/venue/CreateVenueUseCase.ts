import { CreateVenueDTO } from '@application/dto/venue/CreateVenueDTO';
import { IVenueRepository } from '@application/interfaces/repositories/IVenueRepository';
import { ICreateVenueUseCase } from '@application/interfaces/usecases/venue/ICreateVenueUseCase';
import { Venue } from '@domain/entities/Venue';
import { VenueMapper } from '@application/mappers/VenueMapper';
import { IStorageService } from '@application/interfaces/services/IStorageService';
import { STORAGE_FOLDERS } from '@shared/constants/storageFolders';

export class CreateVenueUseCase implements ICreateVenueUseCase {
  constructor(
    private readonly _venueRepository: IVenueRepository,
    private readonly _storageService: IStorageService,
  ) {}

  async createVenue(data: CreateVenueDTO, ownerId: string): Promise<Venue> {
    let uploadedCoverImage: string | undefined;

    if (data.coverImage) {
      uploadedCoverImage = await this._storageService.upload(
        data.coverImage.buffer,
        STORAGE_FOLDERS.VENUE_COVER_IMAGES,
      );
    }

    const uploadedImages = data.images?.length
      ? await Promise.all(
          data.images.map((image) =>
            this._storageService.upload(image.buffer, STORAGE_FOLDERS.VENUE_IMAGES),
          ),
        )
      : [];

    const venueEntity = VenueMapper.createToEntity(
      {
        ...data,

        coverImage: uploadedCoverImage,

        images: uploadedImages,
      },
      ownerId,
    );

    return await this._venueRepository.save(venueEntity);
  }
}
