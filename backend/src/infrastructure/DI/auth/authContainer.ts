import { CreateUserUseCase } from '@application/usecases/auth/CreateUserUseCase';
import { VerifyEmailUseCase } from '@application/usecases/auth/VerifyEmailUseCase';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { EmailService } from '@infrastructure/services/EmailService';
import { JwtService } from '@infrastructure/services/jwtService';
import { OtpService } from '@infrastructure/services/OtpService';
import { PasswordHasher } from '@infrastructure/services/PasswordHasher';
import { RedisService } from '@infrastructure/services/RedisService';
import { AuthController } from '@presentation/controllers/auth/AuthController';
const userRepository = new UserRepository();
const jwtService = new JwtService();
const passwordHasher = new PasswordHasher();
const emailService = new EmailService();
const redisService = new RedisService();
const otpService = new OtpService();

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  passwordHasher,
  emailService,
  otpService,
  redisService,
);
const verifyEmailUseCase = new VerifyEmailUseCase(redisService, userRepository, jwtService);
export const authController = new AuthController(createUserUseCase, verifyEmailUseCase);
