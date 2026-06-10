import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IEmailService } from '@application/interfaces/services/IEmailService';
import { IRedisService } from '@application/interfaces/services/IRedisService';
import { IJwtService } from '@application/interfaces/services/JwtServiceInterface';
import { IForgotPasswordUseCase } from '@application/interfaces/usecases/auth/IForgotPasswordUseCase';
import { resetPasswordTemplate } from '@shared/templates/email/resetPasswordTemplate';

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _emailService: IEmailService,
    private readonly _tokenService: IJwtService,
    private readonly _redisService: IRedisService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const token = this._tokenService.generateResetToken(user.email);
    console.log(token);

    await this._redisService.set(`reset-password:${user.email}`, token, 900);

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    const html = resetPasswordTemplate(user.fullName, resetLink);

    await this._emailService.sendEmail(user.email, 'Reset Password', html);
  }
}
