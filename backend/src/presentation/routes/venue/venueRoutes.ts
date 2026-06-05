import { NextFunction, Request, Response, Router } from 'express';

import { venueController } from '@infrastructure/DI/venue/venueContainer';
import { ROUTES } from '@shared/constants/routes';
import { upload } from '@presentation/middleware/multer.middleware';
// import { authMiddleware } from '@presentation/middleware/auth.middleware';

export class Venue_Router {
  private _route: Router;

  constructor() {
    this._route = Router();

    this._setRoutes();
  }

  private _setRoutes(): void {
    this._route.post(
      ROUTES.VENUES.CREATE,
      // authMiddleware,
      upload.fields([
        {
          name: 'coverImage',
          maxCount: 1,
        },
        {
          name: 'images',
          maxCount: 10,
        },
      ]),
      (req: Request, res: Response, next: NextFunction) => {
        venueController.createVenue(req, res, next);
      },
    );
  }

  public get_router(): Router {
    return this._route;
  }
}
