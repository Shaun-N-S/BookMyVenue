import { JwtPayload } from '@application/interfaces/services/JwtServiceInterface';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export {};
