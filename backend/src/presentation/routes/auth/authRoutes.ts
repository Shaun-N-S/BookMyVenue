import { NextFunction, Request, Response, Router } from 'express';
import { authController } from '@infrastructure/DI/auth/authContainer';
import { ROUTES } from '@shared/constants/routes';

export class Auth_Router {
  private _route: Router;

  constructor() {
    this._route = Router();

    this._setRoutes();
  }

  private _setRoutes(): void {
    this._route.post(ROUTES.AUTH.SIGN_UP, (req: Request, res: Response, next: NextFunction) => {
      authController.signUp(req, res, next);
    });

    this._route.post(
      ROUTES.AUTH.VERIFY_EMAIL,
      (req: Request, res: Response, next: NextFunction) => {
        authController.verifyEmail(req, res, next);
      },
    );
    this._route.post(
      ROUTES.AUTH.FORGOT_PASSWORD,
      (req: Request, res: Response, next: NextFunction) => {
        authController.forgotPassword(req, res, next);
      },
    );
    this._route.post(
      ROUTES.AUTH.RESET_PASSWORD,
      (req: Request, res: Response, next: NextFunction) => {
        authController.resetPassword(req, res, next);
      },
    );
  }

  public get_router(): Router {
    return this._route;
  }
}
