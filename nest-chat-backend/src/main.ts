import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configObject } from '@core/configs/global';
import { ResponseInterceptor } from '@core/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose'],
    cors: true,
  });
  app.useGlobalInterceptors(new ResponseInterceptor());

  const configService = app.get(ConfigService);
  const contextPath =
    configService.get<string>(configObject.CONTEXT_PATH) || '';
  const port = configService.get<number>(configObject.PORT) || '';
  app.setGlobalPrefix(contextPath);

  const configSwagger = new DocumentBuilder()
    .setTitle('Yoimphx Chat APIs')
    .setDescription('The Yoimphx API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Enable CORS
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  await app.listen(port ?? 3000);
  Logger.log('Yoimphx Chat application started', 'Bootstrap');
}
void bootstrap();
