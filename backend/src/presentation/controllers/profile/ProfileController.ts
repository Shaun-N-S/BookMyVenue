import { IGetUserProfileUseCase } from '@application/interfaces/usecases/profile/IGetUserProfileUseCase';
import { ISubmitVenueOwnerUpgradeUseCase } from '@application/interfaces/usecases/profile/ISubmitVenueOwnerUpgradeUseCase';
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
}
