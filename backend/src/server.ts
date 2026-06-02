import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from '@config/environment';
import { Database } from '@infrastructure/database/mongodb';
import { errorMiddleware } from '@presentation/middleware/error.middleware';
import { NotFoundError } from '@shared/errors/app.error';

const app = express();

// Security Middleware
app.use(helmet());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health Check Route
app.get('/health', async (_req, res, next) => {
  try {
    const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const connectionStatus = dbState[require('mongoose').connection.readyState] || 'unknown';

    res.status(200).json({
      status: 'success',
      message: 'Server is up and running',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      database: connectionStatus,
    });
  } catch (error) {
    next(error);
  }
});

// 404 Handler
app.use((req, _res, next) => {
  next(new NotFoundError(`Resource at ${req.originalUrl} not found`));
});

// Global Error Handler
app.use(errorMiddleware);

// Start Server
const startServer = async (): Promise<void> => {
  try {
    console.log('Connecting to database...');

    await Database.connect();

    app.listen(env.PORT, () => {
      console.log('=========================================');
      console.log(`🚀 Server running in ${env.NODE_ENV} mode`);
      console.log(`🎧 Listening on http://localhost:${env.PORT}`);
      console.log('=========================================');
    });
  } catch (error) {
    console.error('Initialization failed:', error);
    process.exit(1);
  }
};

startServer();
