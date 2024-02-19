// redis-cache.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GateDatabaseService } from './gate_database.service'

import { RedisModule } from '../../cache/redis.module';
import { RedisService } from '../../cache/redis.service';

// Gate Table
import { user_gate } from '../entities/gate/';
import { user_gate_table } from './gate/';
// Gate Table End

@Module({
  imports: [
    TypeOrmModule.forFeature([
        user_gate,
      ], 'gateDB'),
    RedisModule
  ],
  providers: [
    RedisService,
    GateDatabaseService,
    user_gate_table,
  ],
})

export class GateDatabaseModule {
}