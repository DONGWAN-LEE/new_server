import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RedisModule } from '../../cache/redis.module';
//import { GameV1_0_3Module } from '../../v1_0_3/game/game.module';
import { ShopV1_0_4Module } from '../../v1_0_4/shop/shop.module';

@Module({
  imports: [
    //GameV1_0_3Module,
    ShopV1_0_4Module,
    RouterModule.register([
      /*
      {
        path:'v1_0_3',
        module: GameV1_0_3Module
      },
      */
      {
        path:'v1_0_4',
        module: ShopV1_0_4Module
      }
    ])
    
  ]
})
export class ShopModule {}
