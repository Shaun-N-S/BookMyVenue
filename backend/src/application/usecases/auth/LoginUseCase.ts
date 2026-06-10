import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IPasswordHasher } from '@application/interfaces/services/IPasswordHasher';
import { IJwtService } from '@application/interfaces/services/JwtServiceInterface';
import { IEmailService } from '@application/interfaces/services/IEmailService';
import { IOtpService } from '@application/interfaces/services/IOtpService';
import { IRedisService } from '@application/interfaces/services/IRedisService';
import { ILoginUseCase } from '@application/interfaces/usecases/auth/ILoginUseCase';
import { otpVerificationTemplate } from '@shared/templates/email/otpVerificationTemplate';
import { BadRequestError } from '@shared/errors/app.error';

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _jwtService: IJwtService,
    private readonly _emailService: IEmailService,
    private readonly _otpService: IOtpService,
    private readonly _redisService: IRedisService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{
    accessToken?: string;
    refreshToken?: string;
    emailVerificationRequired: boolean;
  }> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('Invalid email or password');
    }

    const isPasswordValid = await this._passwordHasher.compare(password, user.passwordHash!);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      const otp = this._otpService.generateOtp();

      await this._redisService.set(`email-verification:${user.email}`, otp, 300);

      const html = otpVerificationTemplate(user.fullName, otp);

      await this._emailService.sendEmail(user.email, 'Verify Your Email', html);

      return {
        emailVerificationRequired: true,
      };
    }

    const accessToken = this._jwtService.generateAccessToken({
      userId: user.id!,
      email: user.email,
      role: user.role,
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      userId: user.id!,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
      emailVerificationRequired: false,
    };
  }
}
