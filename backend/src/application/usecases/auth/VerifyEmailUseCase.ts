import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IRedisService } from '@application/interfaces/services/IRedisService';
import { IJwtService } from '@application/interfaces/services/JwtServiceInterface';
import { IVerifyEmailUseCase } from '@application/interfaces/usecases/auth/IVerifyEmailUseCase';

import { AUTH_ERROR_MESSAGES } from '@shared/constants/messages/errorMessage/authErrorMessage';
import { BadRequestError, NotFoundError } from '@shared/errors/app.error';

export class VerifyEmailUseCase implements IVerifyEmailUseCase {
  constructor(
    private readonly _redisService: IRedisService,
    private readonly _userRepository: IUserRepository,
    private readonly _jwtService: IJwtService,
  ) {}

  async verifyEmail(
    email: string,
    otp: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError(AUTH_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const storedOtp = await this._redisService.get(`email-verification:${email}`);

    if (!storedOtp) {
      throw new BadRequestError(AUTH_ERROR_MESSAGES.OTP_EXPIRED);
    }

    if (storedOtp != otp) {
      throw new BadRequestError(AUTH_ERROR_MESSAGES.INVALID_OTP);
    }

    user.isEmailVerified = true;

    await this._userRepository.update(user.id!, user);

    await this._redisService.delete(`email-verification:${email}`);

    const accessToken = this._jwtService.generateAccessToken({
      email: user.email,
      userId: user.id!,
      role: user.role,
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      email: user.email,
      userId: user.id!,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
