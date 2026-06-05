import mongoose from 'mongoose';
import { env } from '@config/environment';

export class Database {
  private static isConnected = false;

  public static async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('=> Database connection is already active.');
      return;
    }

    try {
      mongoose.connection.on('connected', () => {
        console.log('MongoDB successfully connected.');
        this.isConnected = true;
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected.');
        this.isConnected = false;
      });

      await mongoose.connect(env.MONGO_URI);
    } catch (error) {
      console.error('Failed to connect to MongoDB on startup:', error);
      throw error;
    }
  }

  public static async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      console.log('MongoDB connection closed gracefully.');
      this.isConnected = false;
    } catch (error) {
      console.error('Error during MongoDB disconnection:', error);
    }
  }
}
