import jwt from 'jsonwebtoken';
import { env } from '@config/environment';
import { IJwtService, JwtPayload } from '@application/interfaces/services/JwtServiceInterface';

export class JwtService implements IJwtService {
  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });
  }

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
  }

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
  }
  generateResetToken(email: string): string {
    return jwt.sign({ email, type: 'reset-password' }, process.env.RESET_PASSWORD_SECRET!, {
      expiresIn: '15m',
    });
  }
  verifyResetToken(token: string) {
    return jwt.verify(token, process.env.RESET_PASSWORD_SECRET!) as {
      email: string;
      type: string;
    };
  }
}
