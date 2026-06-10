import { CreateUserEntityDTO } from '@application/dto/auth/CreateUserDTO';
import { IUserRepository } from '@application/interfaces/repositories/IUserRepository';
import { IEmailService } from '@application/interfaces/services/IEmailService';
import { IOtpService } from '@application/interfaces/services/IOtpService';
import { IPasswordHasher } from '@application/interfaces/services/IPasswordHasher';
import { IRedisService } from '@application/interfaces/services/IRedisService';
import { ICreateUserUseCase } from '@application/interfaces/usecases/auth/ICreateUserUseCase';
import { UserMapper } from '@application/mappers/UserMapper';
import { AUTH_ERROR_MESSAGES } from '@shared/constants/messages/errorMessage/authErrorMessage';

import { BadRequestError } from '@shared/errors/app.error';
import { otpVerificationTemplate } from '@shared/templates/email/otpVerificationTemplate';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _emailService: IEmailService,
    private readonly _otpService: IOtpService,
    private readonly _redisService: IRedisService,
  ) {}

  async createUser(createUserDto: CreateUserEntityDTO): Promise<void> {
    const [existingUserByEmail, existingUserByPhone] = await Promise.all([
      this._userRepository.findByEmail(createUserDto.email),
      createUserDto.phone
        ? this._userRepository.findByPhone(createUserDto.phone)
        : Promise.resolve(null),
    ]);

    if (existingUserByEmail) {
      throw new BadRequestError(AUTH_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    if (existingUserByPhone) {
      throw new BadRequestError(AUTH_ERROR_MESSAGES.PHONE_ALREADY_EXISTS);
    }

    const passwordHash = await this._passwordHasher.hash(createUserDto.password as string);

    const userEntity = UserMapper.createToEntity({
      ...createUserDto,
      password: passwordHash,
    });

    await this._userRepository.save(userEntity);

    const otp = this._otpService.generateOtp();
    console.log(otp);

    await this._redisService.set(`email-verification:${userEntity.email}`, otp, 300);

    const emailHtml = otpVerificationTemplate(userEntity.fullName, otp);

    await this._emailService.sendEmail(userEntity.email, 'Verify Your Email', emailHtml);
  }
}
