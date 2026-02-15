import { IsOptional, IsString, IsNumber, IsArray, Min } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  category?: string; // Ex: Cantora, Banda, DJ

  @IsOptional()
  @IsString()
  bio?: string; // Biografia

  @IsOptional()
  @IsString()
  location?: string; // Cidade, Estado

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceFrom?: number; // Preço de partida

  @IsOptional()
  @IsString()
  experience?: string; // Ex: Iniciante, Profissional

  @IsOptional()
  @IsString()
  equipment?: string; // Equipamentos Próprios

  @IsOptional()
  @IsString()
  availability?: string; // Ex: "weekends,evenings"
}

export class UpdateGenresDto {
  @IsArray()
  @IsString({ each: true })
  genres: string[]; // array de slugs
}

export class UpdateInstrumentsDto {
  @IsArray()
  @IsString({ each: true })
  instruments: string[]; // array de slugs
}

