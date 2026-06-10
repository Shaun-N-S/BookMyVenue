export interface IGoogleSignUpUseCase {
  execute(idToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}
