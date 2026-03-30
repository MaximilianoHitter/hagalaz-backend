import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { version, 'db-version' as dbVersion } from '../package.json';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Hagalaz - Gestor de Secretos')
    .setDescription('Gestor de secretos empresariales')
    .setVersion(version)
    .addExtension('x-db-version', `DB-Version: ${dbVersion}`)
    .addTag(`DB-Version: ${dbVersion}`)
    .addTag(`App-Mode: ${process.env.APP_MODE}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
