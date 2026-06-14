import { IDeleteProfileImageUseCase } from '@application/interfaces/usecases/profile/IDeleteProfileImageUseCase';
import { IGetUserProfileUseCase } from '@application/interfaces/usecases/profile/IGetUserProfileUseCase';
import { IGetVenueOwnerProfileUseCase } from '@application/interfaces/usecases/profile/IGetVenueOwnerProfileUseCase';
import { ISubmitVenueOwnerUpgradeUseCase } from '@application/interfaces/usecases/profile/ISubmitVenueOwnerUpgradeUseCase';
import { IUploadProfileImageUseCase } from '@application/interfaces/usecases/profile/IUploadProfileImageUseCase';
import { HTTP_STATUS } from '@shared/constants/httpStatus';
import { BadRequestError, UnauthorizedError } from '@shared/errors/app.error';
import { ResponseHelper } from '@shared/helpers/responseHelper';
import { validateRequest } from '@shared/utils/validateRequest';
import { venueOwnerUpgradeSchema } from '@shared/validations/profile/venueOwnerUpgradeValidation';
import { Request, Response, NextFunction } from 'express';

export class ProfileController {
  constructor(
    private readonly _getUserProfileUseCase: IGetUserProfileUseCase,
    private readonly _submitVenueOwnerUpgradeUseCase: ISubmitVenueOwnerUpgradeUseCase,
    private readonly _getVenueOwnerProfileUseCase: IGetVenueOwnerProfileUseCase,
    private readonly _uploadProfileImageUseCase: IUploadProfileImageUseCase,
    private readonly _deleteProfileImageUseCase: IDeleteProfileImageUseCase,
  ) {}
  async getUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!res.locals.user) {
        throw new UnauthorizedError('User not authenticated');
      }

      const { usrId } = res.locals.user;

      if (!usrId) {
        throw new BadRequestError('User id is required');
      }
      const response = await this._getUserProfileUseCase.execute(usrId);
      ResponseHelper.success(res, HTTP_STATUS.OK, 'Profile fetched successfully', response);
    } catch (error) {
      next(error);
    }
  }

  async submitVenueOwnerUpgrade(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = res.locals.user.userId;

      const dto = validateRequest(venueOwnerUpgradeSchema, req.body);

      await this._submitVenueOwnerUpgradeUseCase.execute(userId, dto);
      ResponseHelper.success(
        res,
        HTTP_STATUS.OK,
        'Venue owner upgrade request submitted successfully',
      );
    } catch (error) {
      next(error);
    }
  }
  async getVenueOwnerProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = res.locals.user;

      const profile = await this._getVenueOwnerProfileUseCase.execute(userId);

      ResponseHelper.success(
        res,
        HTTP_STATUS.OK,
        'Venue owner profile fetched successfully',
        profile,
      );
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { usrId } = res.locals.user;

      if (!req.file) {
        throw new BadRequestError('Image file is required');
      }

      await this._uploadProfileImageUseCase.execute(usrId, req.file);

      ResponseHelper.success(res, HTTP_STATUS.OK, 'Profile image uploaded successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { usrId } = res.locals.user;

      await this._deleteProfileImageUseCase.execute(usrId);

      ResponseHelper.success(res, HTTP_STATUS.OK, 'Profile image deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
