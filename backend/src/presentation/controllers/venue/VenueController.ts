import { NextFunction, Request, Response } from 'express';
import { CreateVenueDTO } from '@application/dto/venue/CreateVenueDTO';
import { ICreateVenueUseCase } from '@application/interfaces/usecases/venue/ICreateVenueUseCase';
import { BadRequestError, UnauthorizedError } from '@shared/errors/app.error';
import { createVenueSchema } from '@shared/validations/venue/createVenueValidator';
import { HTTP_STATUS } from '@shared/constants/httpStatus';
import { SUCCESS_MESSAGES } from '@shared/constants/successMessages';
import { ResponseHelper } from '@shared/helpers/responseHelper';
import { ERROR_MESSAGES } from '@shared/constants/errorMessages';

export class VenueController {
  constructor(private readonly _createVenueUseCase: ICreateVenueUseCase) {}

  async createVenue(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ownerId = res.locals.user?.userId;
      const files = req.files as {
        coverImage?: Express.Multer.File[];
        images?: Express.Multer.File[];
      };

      if (!ownerId) {
        throw new UnauthorizedError(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
      }

      const parsed = createVenueSchema.safeParse(req.body);

      if (!parsed.success) {
        throw new BadRequestError(
          parsed.error.issues[0]?.message ?? ERROR_MESSAGES.VENUE.INVALID_DATA,
        );
      }

      const dto: CreateVenueDTO = {
        ...parsed.data,

        coverImage: files.coverImage?.[0],

        images: files.images,
      };

      const venue = await this._createVenueUseCase.createVenue(dto, ownerId);

      ResponseHelper.success(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.VENUE.CREATED, venue);
    } catch (error) {
      next(error);
    }
  }
}
