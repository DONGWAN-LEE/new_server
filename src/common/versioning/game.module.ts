import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RedisModule } from '../../cache/redis.module';
//import { GameV1_0_3Module } from '../../v1_0_3/game/game.module';
import { GameV1_0_4Module } from '../../v1_0_4/game/game.module';

@Module({
  imports: [
    //GameV1_0_3Module,
    GameV1_0_4Module,
    RouterModule.register([
      /*
      {
        path:'v1_0_3',
        module: GameV1_0_3Module
      },
      */
      {
        path:'v1_0_4',
        module: GameV1_0_4Module
      }
    ])
    
  ]
})
export class GameModule {}
