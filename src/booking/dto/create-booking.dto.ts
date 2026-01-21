import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  musicianProfileId: number;

  @IsDateString()
  @IsNotEmpty()
  eventDate: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  eventType: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  message: string;
}

