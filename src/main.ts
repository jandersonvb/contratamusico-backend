// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common'; // Importe ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // Retorna erro se houver propriedades não permitidas
    transform: true, // Transforma o payload em uma instância do DTO
    disableErrorMessages: false, // Garante que as mensagens de erro sejam enviadas
  }));
  // Habilitar CORS - ESSENCIAL PARA DESENVOLVIMENTO COM FRONTEND EM PORTA DIFERENTE
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'], // Adicione a origem do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Se você for usar cookies/sessões no futuro, isso é importante
  }); // <--- Verifique se está assim

  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();