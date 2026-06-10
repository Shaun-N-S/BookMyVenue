import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IJwtService } from '@application/interfaces/services/JwtServiceInterface';
import { IRefreshTokenUseCase } from '@application/interfaces/usecases/auth/IRefreshTokenUseCase';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _jwtService: IJwtService,
  ) {}

  async execute(refreshToken: string): Promise<{
    accessToken: string;
  }> {
    const payload = this._jwtService.verifyRefreshToken(refreshToken);

    const user = await this._userRepository.findById(payload.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = this._jwtService.generateAccessToken({
      email: user.email,
      role: user.role,
      userId: user.id!,
    });

    return {
      accessToken,
    };
  }
}
