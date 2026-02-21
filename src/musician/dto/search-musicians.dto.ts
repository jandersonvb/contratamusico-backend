import { IsOptional, IsString, IsNumber, Min, Max, IsArray, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';

// Helper para transformar string ou array em array
const toArray = (value: any): string[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  return [value];
};

export class SearchMusiciansDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase())
  @IsIn(['musician', 'client', 'all'], { message: 'userType must be musician, client or all.' })
  userType?: 'musician' | 'client' | 'all' = 'musician';

  @IsOptional()
  @Transform(({ value }) => toArray(value))
  @IsArray()
  @IsString({ each: true })
  genres?: string[]; // slugs dos gêneros (ex: ?genres=rock&genres=mpb)

  @IsOptional()
  @Transform(({ value }) => toArray(value))
  @IsArray()
  @IsString({ each: true })
  instruments?: string[]; // slugs dos instrumentos (ex: ?instruments=violao&instruments=guitarra)

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number; // rating mínimo

  @IsOptional()
  @IsString()
  search?: string; // busca textual (nome, bio, categoria)

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 12;

  @IsOptional()
  @IsString()
  sortBy?: 'rating' | 'priceFrom' | 'eventsCount' | 'createdAt' | 'verified' = 'rating';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase())
  sortOrder?: 'asc' | 'desc' = 'desc';
}

