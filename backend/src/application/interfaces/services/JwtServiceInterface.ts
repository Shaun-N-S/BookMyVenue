import { UserRole } from '@domain/enums/userRole';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface IJwtService {
  generateAccessToken(payload: JwtPayload): string;
  generateRefreshToken(payload: JwtPayload): string;
  verifyAccessToken(token: string): JwtPayload;
  verifyRefreshToken(token: string): JwtPayload;
  generateResetToken(email: string): string;
  verifyResetToken(token: string): { email: string; type: string };
}
