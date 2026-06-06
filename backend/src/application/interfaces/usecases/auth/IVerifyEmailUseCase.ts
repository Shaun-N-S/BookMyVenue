export interface IVerifyEmailUseCase {
  verifyEmail(email: string, otp: string): Promise<{ accessToken: string; refreshToken: string }>;
}
