import { IGetUserProfileUseCase } from '@application/interfaces/usecases/profile/IGetUserProfileUseCase';
import { HTTP_STATUS } from '@shared/constants/httpStatus';
import { BadRequestError, UnauthorizedError } from '@shared/errors/app.error';
import { ResponseHelper } from '@shared/helpers/responseHelper';
import { Request, Response, NextFunction } from 'express';

export class ProfileController {
  constructor(private readonly _getUserProfileUseCase: IGetUserProfileUseCase) {}
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
}
