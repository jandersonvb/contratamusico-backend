// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true, },
  }));

  const configService = app.get(ConfigService);
  // Pega a URL do frontend do .env (NEXT_PUBLIC_FRONTEND_BASE_URL)
  const frontendUrl = configService.get<string>('NEXT_PUBLIC_FRONTEND_BASE_URL'); // Pega do .env via config

  app.enableCors({
    // Use a URL do frontend para produção e localhost para desenvolvimento
    origin: [
      'http://localhost:3001', // Para seu desenvolvimento local
      'https://www.contratamusico.com.br', // <--- ADICIONE ESTA LINHA (DOMÍNIO DE PRODUÇÃO DO SEU FRONTEND)
      frontendUrl // Se você definir NEXT_PUBLIC_FRONTEND_BASE_URL no Railway para o mesmo domínio
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = configService.get<number>('port') ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();