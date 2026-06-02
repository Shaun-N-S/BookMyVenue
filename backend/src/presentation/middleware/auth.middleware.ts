import { Request, Response, NextFunction } from 'express';
import { JwtUtils } from '@shared/utils/jwt.utils';
import { UnauthorizedError } from '@shared/errors/app.error';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token is missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('Authentication token is missing');
    }

    const decoded = JwtUtils.verifyToken(token);
    req.user = decoded; // Attached to custom extended Request object

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new UnauthorizedError(error.message));
    } else {
      next(new UnauthorizedError('Authentication failed'));
    }
  }
};
