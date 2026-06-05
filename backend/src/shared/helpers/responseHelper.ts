import { Response } from 'express';

export class ResponseHelper {
  static success<T>(res: Response, statusCode: number, message: string, data?: T): void {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
}
