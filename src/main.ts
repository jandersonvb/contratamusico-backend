// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Importe ConfigService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita a validação global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // Lança erro se houver propriedades não permitidas
    transform: true, // Transforma payloads de entrada em instâncias DTO
    transformOptions: {
      enableImplicitConversion: true, // Converte tipos automaticamente (ex: '123' para 123)
    },
  }));


  // Habilita CORS para permitir requisições do frontend
  app.enableCors({
    origin: '*', // Permite todas as origens. Em produção, restrinja! ex: ['https://www.contratamusico.com.br']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Se você for usar cookies/sessões
  });

  // Pega o serviço de configuração para acessar variáveis de ambiente
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') ?? 3000; // 'port' definido em configuration.ts, fallback para 3000

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();