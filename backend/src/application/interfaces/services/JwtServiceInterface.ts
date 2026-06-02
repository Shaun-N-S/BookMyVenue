export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

export interface IJwtService {
  generateAccessToken(payload: JwtPayload): string;
  generateRefreshToken(payload: JwtPayload): string;

  verifyAccessToken(token: string): JwtPayload;
  verifyRefreshToken(token: string): JwtPayload;
}
