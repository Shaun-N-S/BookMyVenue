import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '@shared/constants/routes';
import { profileController } from '@infrastructure/DI/profile/profileContainer';
import { authMiddleware } from '@presentation/middleware/auth.middleware';

export class Profile_Router {
  private _route: Router;

  constructor() {
    this._route = Router();

    this._setRoutes();
  }

  private _setRoutes(): void {
    this._route.post(
      ROUTES.PROFILE.USER_PROFILE,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        profileController.getUserProfile(req, res, next);
      },
    );
  }

  public get_router(): Router {
    return this._route;
  }
}
