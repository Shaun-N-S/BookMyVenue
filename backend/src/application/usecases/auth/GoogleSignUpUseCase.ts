import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IGoogleService } from '@application/interfaces/services/IGoogleService';
import { IJwtService } from '@application/interfaces/services/JwtServiceInterface';
import { IGoogleSignUpUseCase } from '@application/interfaces/usecases/auth/IGoogleSignUpUseCase';
import { UserMapper } from '@application/mappers/UserMapper';
import { User } from '@domain/entities/user';

export class GoogleSignUpUseCase implements IGoogleSignUpUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _googleService: IGoogleService,
    private _jwtService: IJwtService,
  ) {}

  async execute(idToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const googleUser = await this._googleService.verifyToken(idToken);

    let user: User;

    const existingUser = await this._userRepository.findByGoogleId(googleUser.googleId!);

    if (existingUser) {
      user = existingUser;
    } else {
      const userEntity = UserMapper.createToEntity(googleUser);

      user = await this._userRepository.save(userEntity);
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
    };
  }
}
