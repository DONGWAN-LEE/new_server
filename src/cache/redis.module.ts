// redis-cache.module.ts
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

const cacheModule = CacheModule.registerAsync({
  useFactory: () => ({
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    ttl: 0,
  }),
});

@Module({
  imports: [cacheModule],
  exports: [cacheModule],
})

export class RedisModule {}