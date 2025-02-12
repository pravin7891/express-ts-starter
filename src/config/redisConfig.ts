import { QueueOptions } from "bullmq";
import { Redis } from "ioredis";

const useRedis = process.env.USE_REDIS === 'true';

// const redis = new Redis({
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   port: Number(process.env.REDIS_PORT) || 6379,
// });

const redisConnection: QueueOptions | undefined  = useRedis
  ? {
      connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }
  : undefined;

export { redisConnection, useRedis };

// export default redis;