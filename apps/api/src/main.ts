import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NorthForge Freight API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // TODO: Swagger is exposed with no authentication gate, which is fine for now but should be protected in production (e.g. with basic auth or IP whitelisting).
  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  const configService = app.get(ConfigService);
  const allowedOrigin = configService.get<string>('ALLOWED_ORIGIN');

  if (!allowedOrigin?.trim()) {
    throw new Error(
      'Missing required ALLOWED_ORIGIN configuration for credentialed CORS',
    );
  }

  app.use(helmet());
  app.enableCors({
    origin: allowedOrigin, // e.g. https://yourapp.com
    credentials: true,
  });
  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);
}

void bootstrap();
