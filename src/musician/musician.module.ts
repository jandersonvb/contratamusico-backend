import { Module } from '@nestjs/common';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';

@Module({
  controllers: [MusicianController],
  providers: [MusicianService],
  exports: [MusicianService],
})
export class MusicianModule {}

