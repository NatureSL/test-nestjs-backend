import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Новый конфиг для swagger
   */
  const config = new DocumentBuilder().setTitle('Block list').build();
  /**
   * Новый swagger документ на основании конфига
   */
  const document = SwaggerModule.createDocument(app, config);
  /**
   * Хостим урл api для swagger
   */
  SwaggerModule.setup('api', app, document);
  /**
   * Через middleware получаем куки
   */
  app.use(cookieParser());

  /**
   * Глобальный пайп отвечает за валидацию всех запросов
   */
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();
