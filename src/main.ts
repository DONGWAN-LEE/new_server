import { 
  ValidationPipe, 
  VersioningType, 
} from '@nestjs/common';

import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/dataReturn/ExceptionFilter';
import { LoggingInterceptor } from './common/dataReturn/Common.Response';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as compression from 'compression';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'dev'
      ? '.dev.env'
      : process.env.NODE_ENV === 'stage'
        ? '.stage.env'
        : '.local.env',
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //예외 필터 연결
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * whitelist: DTO에 없은 속성은 무조건 거른다.
       * forbidNonWhitelisted: 전달하는 요청 값 중에 정의 되지 않은 값이 있으면 Error를 발생합니다.
       * transform: 네트워크를 통해 들어오는 데이터는 일반 JavaScript 객체입니다.
       *            객체를 자동으로 DTO로 변환을 원하면 transform 값을 true로 설정한다.
       * disableErrorMessages: Error가 발생 했을 때 Error Message를 표시 여부 설정(true: 표시하지 않음, false: 표시함)
       *                       배포 환경에서는 true로 설정하는 걸 추천합니다.
       */
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
      stopAtFirstError: true,
      enableDebugMessages: true
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.use(compression({
    level: 6,
    filter: () => { return true },
    threshold: 0
  }));
  
  await app.listen(3000);
}

bootstrap();
