import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // O decorador Global torna o módulo disponível em toda a aplicação sem necessidade de importação explícita
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta o PrismaService para que possa ser usado em outros módulos
})
export class PrismaModule {}
