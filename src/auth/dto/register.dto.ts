// // src/auth/dtos/register.dto.ts
// import {
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   Matches,
//   MinLength,
// } from 'class-validator';

// import { UserType } from '@prisma/client';

// export class RegisterDto {
//   @IsString()
//   @IsNotEmpty()
//   firstName: string;

//   @IsString()
//   @IsNotEmpty()
//   lastName: string;

//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @IsString()
//   @MinLength(8)
//   @IsNotEmpty()
//   password: string;

//   @IsString()
//   @MinLength(8)
//   @IsNotEmpty()
//   @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
//     message: 'Passwords do not match the required pattern',
//   })
//   confirmPassword: string;

//   @IsOptional()
//   @IsString()
//   phone?: string;

//   @IsOptional()
//   @IsString()
//   city?: string;

//   @IsOptional()
//   @IsString()
//   state?: string;

//   @IsOptional()
//   @IsEnum(UserType)
//   userType?: UserType; // default CLIENTE

//   // Músico
//   @IsOptional()
//   instruments?: string[]; // envia array do front

//   @IsOptional()
//   genres?: string[];

//   @IsOptional()
//   @IsString()
//   experience?: string;

//   @IsOptional()
//   @IsString()
//   priceRange?: string;
// }
