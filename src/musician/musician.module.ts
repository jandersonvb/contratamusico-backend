import { Module } from '@nestjs/common';
import { MusicianController } from './musician.controller';
import { MusicianService } from './musician.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [MusicianController],
  providers: [MusicianService, UploadService],
  exports: [MusicianService],
})
export class MusicianModule {}

