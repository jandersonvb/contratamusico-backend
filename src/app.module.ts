import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule global, acessível em todo o aplicativo
      envFilePath: '.env', // Incdica o caminho do seu arquivo .env
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
