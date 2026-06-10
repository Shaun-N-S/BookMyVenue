import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IPasswordHasher } from '@application/interfaces/services/IPasswordHasher';
import { IRedisService } from '@application/interfaces/services/IRedisService';
import { IJwtService } from '@application/interfaces/services/JwtServiceInterface';
import { IResetPasswordUseCase } from '@application/interfaces/usecases/auth/IResetPasswordUseCase';
import { BadRequestError, NotFoundError } from '@shared/errors/app.error';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _redisService: IRedisService,
    private readonly _jwtService: IJwtService,
    private readonly _passwordHasher: IPasswordHasher,
  ) {}

  async execute(token: string, password: string): Promise<void> {
    const payload = this._jwtService.verifyResetToken(token);

    if (payload.type !== 'reset-password') {
      throw new BadRequestError('Invalid token type');
    }

    const email = payload.email;

    const storedToken = await this._redisService.get(`reset-password:${email}`);

    if (!storedToken) {
      throw new BadRequestError('Reset token expired');
    }

    if (storedToken !== token) {
      throw new BadRequestError('Invalid reset token');
    }

    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const hashedPassword = await this._passwordHasher.hash(password);

    await this._userRepository.update(user.id!, { passwordHash: hashedPassword });

    await this._redisService.delete(`reset-password:${email}`);
  }
}
