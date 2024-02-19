import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { Router } from 'express';
//import { UserV1_0_3Module } from '../../v1_0_3/user/user.module';
import { UserV1_0_4Module } from '../../v1_0_4/user/user.module';


@Module({
  imports: [
    //UserV1_0_3Module,
    UserV1_0_4Module,

    RouterModule.register([
      /*
      {
        path:'v1_0_3',
        module: UserV1_0_3Module
      },
      */
      {
        path:'v1_0_4',
        module: UserV1_0_4Module
      }
    ])
  ]
})

export class UserModule {}
