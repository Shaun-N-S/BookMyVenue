export interface ILoginUseCase {
  execute(
    email: string,
    password: string,
  ): Promise<{
    accessToken?: string;
    refreshToken?: string;
    emailVerificationRequired: boolean;
  }>;
}
