import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@infrastructure/services/jwtService';
import { UnauthorizedError } from '@shared/errors/app.error';

const jwtService = new JwtService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token is missing or invalid');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Authentication token is missing');
    }

    const payload = jwtService.verifyAccessToken(token);

    res.locals.user = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new UnauthorizedError(error.message));
      return;
    }

    next(new UnauthorizedError('Authentication failed'));
  }
};
