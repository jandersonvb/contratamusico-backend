// src/user/dto/register.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, Equals } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty({ message: 'Name is required.' })
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty({ message: 'Last name is required.' })
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail({}, { message: 'Email must be a valid address.' })
  email: string;

  @ApiProperty({ example: 'strongPassword123', minLength: 8 })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;

  // Field used for equality validation in Service
  @ApiProperty({ example: 'strongPassword123' })
  @IsNotEmpty({ message: 'Password confirmation is required.' })
  confirmPassword: string;

  @ApiProperty({ enum: UserType, example: UserType.CLIENT })
  @IsEnum(UserType, { message: 'User type must be CLIENT or MUSICIAN.' })
  @Transform(({ value }) => {
    if (value === 'cliente') return UserType.CLIENT;
    if (value === 'musico') return UserType.MUSICIAN;
    return value;
  })
  userType: UserType;

  // Optional fields
  @ApiProperty({ example: '(11) 99999-9999', required: false })
  @IsOptional()
  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, { message: 'Invalid phone number.' })
  phone?: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'SP', required: false })
  @IsOptional()
  state?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @Equals(true, { message: 'You must accept the terms.' })
  terms: boolean;

  // Musician specific fields
  @ApiProperty({ example: ['Guitar', 'Piano'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  instruments?: string[];

  @ApiProperty({ example: ['Rock', 'Jazz'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @ApiProperty({ example: '5 years of experience playing in bands', required: false })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiProperty({ example: '$$$', required: false })
  @IsOptional()
  @IsString()
  priceRange?: string;
}
