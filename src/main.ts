import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /**
   * Новый конфиг для swagger
   */
  const config = new DocumentBuilder().setTitle('Block list').build();
  /**
   * Новый swagger документ на основании конфига
   */
  const document = SwaggerModule.createDocument(app,config);
  /**
   * Хостим урл api для swagger
   */
  SwaggerModule.setup('api',app,document);

  await app.listen(3000);
}
bootstrap();
