import { NextFunction, Request, Response } from 'express';
import { ICreateUserUseCase } from '@application/interfaces/usecases/auth/ICreateUserUseCase';
import { IVerifyEmailUseCase } from '@application/interfaces/usecases/auth/IVerifyEmailUseCase';
import { validateRequest } from '@shared/utils/validateRequest';
import { HTTP_STATUS } from '@shared/constants/httpStatus';
import { AUTH_SUCCESS_MESSAGES } from '@shared/constants/messages/successMessage/authSuccessMessage';
import { ResponseHelper } from '@shared/helpers/responseHelper';
import { AuthProvider } from '@domain/enums/AuthProvider';
import { createUserSchema } from '@shared/validations/auth/createUserValidation';
import { verifyEmailSchema } from '@shared/validations/auth/verifyEmailValidation';
import { AuthCookieUtil } from '@shared/utils/authCookie';
import { IGoogleSignUpUseCase } from '@application/interfaces/usecases/auth/IGoogleSignUpUseCase';
import { IForgotPasswordUseCase } from '@application/interfaces/usecases/auth/IForgotPasswordUseCase';
import { IResetPasswordUseCase } from '@application/interfaces/usecases/auth/IResetPasswordUseCase';
import { forgotPasswordSchema } from '@shared/validations/auth/forgotPasswordValidation';
import { resetPasswordSchema } from '@shared/validations/auth/resetPasswordValidation';
import { IRefreshTokenUseCase } from '@application/interfaces/usecases/auth/IRefreshTokenUseCase';
import { ILoginUseCase } from '@application/interfaces/usecases/auth/ILoginUseCase';

export class AuthController {
  constructor(
    private readonly _createUserUseCase: ICreateUserUseCase,
    private readonly _verifyEmailUseCase: IVerifyEmailUseCase,
    private readonly _googleSignUpUseCase: IGoogleSignUpUseCase,
    private readonly _forgotPasswordUseCase: IForgotPasswordUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    private readonly _refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly _loginUseCase: ILoginUseCase,
  ) {}

  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = validateRequest(createUserSchema, req.body);

      await this._createUserUseCase.createUser({
        ...validatedData,
        authProvider: AuthProvider.LOCAL,
      });

      ResponseHelper.success(res, HTTP_STATUS.CREATED, AUTH_SUCCESS_MESSAGES.USER_REGISTERED);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = validateRequest(verifyEmailSchema, req.body);

      const { accessToken, refreshToken } = await this._verifyEmailUseCase.verifyEmail(
        validatedData.email,
        validatedData.otp,
      );

      AuthCookieUtil.setRefreshTokenCookie(res, refreshToken, process.env.JWT_REFRESH_EXPIRES_IN!);

      ResponseHelper.success(res, HTTP_STATUS.OK, AUTH_SUCCESS_MESSAGES.EMAIL_VERIFIED, {
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async googleSignUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idToken } = req.body;

      const { accessToken, refreshToken } = await this._googleSignUpUseCase.execute(idToken);

      AuthCookieUtil.setRefreshTokenCookie(res, refreshToken, process.env.JWT_REFRESH_EXPIRES_IN!);
      ResponseHelper.success(
        res,
        HTTP_STATUS.CREATED,
        AUTH_SUCCESS_MESSAGES.GOOGLE_SIGNUP_SUCCESS,
        accessToken,
      );
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = validateRequest(forgotPasswordSchema, req.body);

      await this._forgotPasswordUseCase.execute(validatedData.email);

      ResponseHelper.success(res, HTTP_STATUS.OK, AUTH_SUCCESS_MESSAGES.PASSWORD_RESET_LINK_SENT);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = validateRequest(resetPasswordSchema, req.body);

      await this._resetPasswordUseCase.execute(validatedData.token, validatedData.password);

      ResponseHelper.success(res, HTTP_STATUS.OK, AUTH_SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }

      const result = await this._refreshTokenUseCase.execute(refreshToken);

      ResponseHelper.success(res, HTTP_STATUS.OK, 'Access token refreshed', result);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await this._loginUseCase.execute(email, password);

      if (result.emailVerificationRequired) {
        ResponseHelper.success(
          res,
          HTTP_STATUS.OK,
          'Please verify your email. OTP has been sent.',
          {
            email,
            emailVerificationRequired: true,
          },
        );

        return;
      }

      AuthCookieUtil.setRefreshTokenCookie(
        res,
        result.refreshToken!,
        process.env.JWT_REFRESH_EXPIRES_IN!,
      );

      ResponseHelper.success(res, HTTP_STATUS.OK, AUTH_SUCCESS_MESSAGES.LOGIN_SUCCESS, {
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }

      AuthCookieUtil.clearRefreshTokenCookie(res);

      ResponseHelper.success(res, HTTP_STATUS.OK, AUTH_SUCCESS_MESSAGES.LOGOUT_SUCCESS);
    } catch (error) {
      next(error);
    }
  }
}
