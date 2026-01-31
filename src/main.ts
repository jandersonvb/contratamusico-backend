import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true, // Necessário para webhooks do Stripe validarem a assinatura
    cors: true, // Habilita CORS na criação da aplicação
  });

  // Configuração detalhada de CORS
  const corsOrigins = process.env.CORS_ORIGINS?.split(',').map(origin => origin.trim()) || [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (Postman, curl, etc)
      if (!origin) return callback(null, true);
      
      // Verifica se a origin está na lista permitida
      if (corsOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('Origin bloqueada:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    exposedHeaders: ['Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Contrata Músico API')
    .setDescription('API para contratação de músicos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
