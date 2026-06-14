import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '@shared/constants/routes';
import { profileController } from '@infrastructure/DI/profile/profileContainer';
import { authMiddleware } from '@presentation/middleware/auth.middleware';
import { upload } from '@presentation/middleware/multer.middleware';

export class Profile_Router {
  private _route: Router;

  constructor() {
    this._route = Router();

    this._setRoutes();
  }

  private _setRoutes(): void {
    this._route.get(
      ROUTES.PROFILE.USER_PROFILE,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        profileController.getUserProfile(req, res, next);
      },
    );
    this._route.post(
      ROUTES.PROFILE.VENUE_OWNER_UPGRADE,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        profileController.submitVenueOwnerUpgrade(req, res, next);
      },
    );
    this._route.get(
      ROUTES.PROFILE.VENUE_OWNER_PROFILE,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        profileController.getVenueOwnerProfile(req, res, next);
      },
    );
    this._route.patch(
      ROUTES.PROFILE.PROFILE_IMAGE_UPLOAD,
      authMiddleware,
      upload.single('profileImage'),
      (req: Request, res: Response, next: NextFunction) => {
        profileController.uploadProfileImage(req, res, next);
      },
    );
    this._route.delete(
      ROUTES.PROFILE.PROFILE_IMAGE_DELETE,
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) => {
        profileController.deleteProfileImage(req, res, next);
      },
    );
  }

  public get_router(): Router {
    return this._route;
  }
}
