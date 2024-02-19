import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 미들웨어
import { LoggerMiddleware } from './common/middleware/logger.middleware';

// API Module
import { UserModule } from './common/versioning/user.module';
import { GameModule } from './common/versioning/game.module';
import { ShopModule } from './common/versioning/shop.module';
import { TypeOrmModule  } from '@nestjs/typeorm';
//import { gameTypeORMConfigClass, gateTypeORMConfigClass } from './configs/typeorm.config';
//import { validate } from 'src/config/env.validation.config';

import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('GAME_DATABASE_HOST'),
          port: Number(configService.get('GAME_DATABASE_PORT')),
          database: configService.get('GAME_DATABASE_NAME'),
          username: configService.get('GAME_DATABASE_USERNAME'),
          password: configService.get('GAME_DATABASE_PASSWORD'),
          logging: Boolean(configService.get('TYPEORM_LOGGING')),
          synchronize: false,
          entities: ['dist/**/entities/game/*.entity.{ts,js}'],
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'gateDB',
      useFactory: async (configService: ConfigService) => {
        return {
          name: 'gateDB',
          type: 'mysql',
          host: configService.get('GATE_DATABASE_HOST'),
          port: Number(configService.get('GATE_DATABASE_PORT')),
          database: configService.get('GATE_DATABASE_NAME'),
          username: configService.get('GATE_DATABASE_USERNAME'),
          password: configService.get('GATE_DATABASE_PASSWORD'),
          logging: Boolean(configService.get('TYPEORM_LOGGING')),
          synchronize: false,
          entities: ['dist/**/entities/gate/*.entity.{ts,js}'],
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'user0DB',
      useFactory: async (configService: ConfigService) => {
        return {
          name: 'user0DB',
          type: 'mysql',
          host: configService.get('USER0_DATABASE_HOST'),
          port: Number(configService.get('USER0_DATABASE_PORT')),
          database: configService.get('USER0_DATABASE_NAME'),
          username: configService.get('USER0_DATABASE_USERNAME'),
          password: configService.get('USER0_DATABASE_PASSWORD'),
          logging: Boolean(configService.get('TYPEORM_LOGGING')),
          synchronize: false,
          entities: ['dist/**/entities/user/*.entity.{ts,js}'],
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'user1DB',
      useFactory: async (configService: ConfigService) => {
        return {
          name: 'user1DB',
          type: 'mysql',
          host: configService.get('USER1_DATABASE_HOST'),
          port: Number(configService.get('USER1_DATABASE_PORT')),
          database: configService.get('USER1_DATABASE_NAME'),
          username: configService.get('USER1_DATABASE_USERNAME'),
          password: configService.get('USER1_DATABASE_PASSWORD'),
          logging: Boolean(configService.get('TYPEORM_LOGGING')),
          synchronize: false,
          entities: ['dist/**/entities/user/*.entity.{ts,js}'],
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'user2DB',
      useFactory: async (configService: ConfigService) => {
        return {
          name: 'user2DB',
          type: 'mysql',
          host: configService.get('USER2_DATABASE_HOST'),
          port: Number(configService.get('USER2_DATABASE_PORT')),
          database: configService.get('USER2_DATABASE_NAME'),
          username: configService.get('USER2_DATABASE_USERNAME'),
          password: configService.get('USER2_DATABASE_PASSWORD'),
          logging: Boolean(configService.get('TYPEORM_LOGGING')),
          synchronize: false,
          entities: ['dist/**/entities/user/*.entity.{ts,js}'],
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'user3DB',
      useFactory: async (configService: ConfigService) => {
        return {
          name: 'user3DB',
          type: 'mysql',
          host: configService.get('USER3_DATABASE_HOST'),
          port: Number(configService.get('USER3_DATABASE_PORT')),
          database: configService.get('USER3_DATABASE_NAME'),
          username: configService.get('USER3_DATABASE_USERNAME'),
          password: configService.get('USER3_DATABASE_PASSWORD'),
          logging: Boolean(configService.get('TYPEORM_LOGGING')),
          synchronize: false,
          entities: ['dist/**/entities/user/*.entity.{ts,js}'],
        };
      },
    }),  
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
          ),
        }),
      ],
    }),
    UserModule, 
    GameModule,
    ShopModule,
  ],
  //controllers: [AppController],
  //providers: [GameService, UserService],
})


//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}