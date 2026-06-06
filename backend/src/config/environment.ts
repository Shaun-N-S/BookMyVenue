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
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
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
  CLOUDINARY_CLOUD_NAME: getEnvOrThrow('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: getEnvOrThrow('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: getEnvOrThrow('CLOUDINARY_API_SECRET'),
  EMAIL_USER: getEnvOrThrow('EMAIL_USER'),
  EMAIL_PASS: getEnvOrThrow('EMAIL_PASS'),
  UPSTASH_REDIS_REST_URL: getEnvOrThrow('UPSTASH_REDIS_REST_URL'),
  UPSTASH_REDIS_REST_TOKEN: getEnvOrThrow('UPSTASH_REDIS_REST_TOKEN'),
};
