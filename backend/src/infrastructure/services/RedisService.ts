import { IRedisService } from '@application/interfaces/services/IRedisService';
import { redisClient } from '@config/redis';

export class RedisService implements IRedisService {
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await redisClient.set(key, value, {
        ex: ttlSeconds,
      });

      return;
    }

    await redisClient.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await redisClient.get<string>(key);
  }

  async delete(key: string): Promise<void> {
    await redisClient.del(key);
  }
}
