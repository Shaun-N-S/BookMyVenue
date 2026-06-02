import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '@shared/errors/app.error';
import { env } from '@config/environment';

export const errorMiddleware: ErrorRequestHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = 'An unexpected error occurred';
  let errors: unknown = undefined;

  // Custom Application Error
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Handle Mongoose cast errors or validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors = Object.values((err as any).errors).map((e: any) => e.message);
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message = `Invalid format for field ${(err as any).path}`;
  }

  // Log server-side errors
  if (statusCode === 500) {
    console.error('SERVER ERROR:', err);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(errors ? { errors } : {}),
    ...(env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
