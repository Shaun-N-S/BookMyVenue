import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IEmailService } from '@application/interfaces/services/IEmailService';
import { IOtpService } from '@application/interfaces/services/IOtpService';
import { IRedisService } from '@application/interfaces/services/IRedisService';
import { IResendOtpUseCase } from '@application/interfaces/usecases/auth/IResendOtpUseCase';

import { BadRequestError } from '@shared/errors/app.error';
import { AUTH_ERROR_MESSAGES } from '@shared/constants/messages/errorMessage/authErrorMessage';
import { otpVerificationTemplate } from '@shared/templates/email/otpVerificationTemplate';

export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _emailService: IEmailService,
    private readonly _otpService: IOtpService,
    private readonly _redisService: IRedisService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError(AUTH_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (user.isEmailVerified) {
      throw new BadRequestError(AUTH_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const otp = this._otpService.generateOtp();

    await this._redisService.set(`email-verification:${email}`, otp, 300);

    const html = otpVerificationTemplate(user.fullName, otp);

    await this._emailService.sendEmail(email, 'Verify Your Email', html);
  }
}
