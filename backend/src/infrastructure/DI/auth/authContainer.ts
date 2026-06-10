import { CreateUserUseCase } from '@application/usecases/auth/CreateUserUseCase';
import { ForgotPasswordUseCase } from '@application/usecases/auth/ForgotPasswordUseCase';
import { GoogleSignUpUseCase } from '@application/usecases/auth/GoogleSignUpUseCase';
import { ResetPasswordUseCase } from '@application/usecases/auth/ResetPasswordUseCase';
import { VerifyEmailUseCase } from '@application/usecases/auth/VerifyEmailUseCase';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { EmailService } from '@infrastructure/services/EmailService';
import { GoogleService } from '@infrastructure/services/GoogleService';
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
const googleService = new GoogleService();

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  passwordHasher,
  emailService,
  otpService,
  redisService,
);
const verifyEmailUseCase = new VerifyEmailUseCase(redisService, userRepository, jwtService);
const googleSignUpUseCase = new GoogleSignUpUseCase(userRepository, googleService, jwtService);
const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  emailService,
  jwtService,
  redisService,
);
const resetPasswordUseCase = new ResetPasswordUseCase(
  userRepository,
  redisService,
  jwtService,
  passwordHasher,
);
export const authController = new AuthController(
  createUserUseCase,
  verifyEmailUseCase,
  googleSignUpUseCase,
  forgotPasswordUseCase,
  resetPasswordUseCase,
);
