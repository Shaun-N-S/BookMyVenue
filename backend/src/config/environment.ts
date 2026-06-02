import dotenv from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface Environment {
  PORT: number;
  NODE_ENV: string;
  MONGO_URI: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: SignOptions['expiresIn'];
  JWT_REFRESH_EXPIRES_IN: SignOptions['expiresIn'];
}

const getEnvOrThrow = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is missing!`);
  }
  return value;
};

export const env: Environment = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: getEnvOrThrow('MONGO_URI'),
  JWT_ACCESS_SECRET: getEnvOrThrow('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: getEnvOrThrow('JWT_REFRESH_SECRET'),
  JWT_ACCESS_EXPIRES_IN: (process.env.JWT_ACCESS_EXPIRES_IN || '15m') as SignOptions['expiresIn'],
  JWT_REFRESH_EXPIRES_IN: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
};
