import { VenueRepository } from '@infrastructure/repositories/VenueRepository';
import { CreateVenueUseCase } from '@application/usecases/venue/CreateVenueUseCase';
import { VenueController } from '@presentation/controllers/venue/VenueController';
import { CloudinaryStorageService } from '@infrastructure/services/CloudinaryService';

const venueRepository = new VenueRepository();
const storageService = new CloudinaryStorageService();

const createVenueUseCase = new CreateVenueUseCase(venueRepository, storageService);

export const venueController = new VenueController(createVenueUseCase);
