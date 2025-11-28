/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User, UserType } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

export type UserWithProfile = Prisma.UserGetPayload<{ include: { musicianProfile: true } }>;

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(private readonly prismaService: PrismaService) { }

  async findByEmail(email: string): Promise<UserWithProfile | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: {
        musicianProfile: true,
      },
    });
  }

  async create(data: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Password and confirmation do not match.');
    }

    // Validate terms acceptance
    if (!data.terms) {
      throw new BadRequestException('You must accept the terms to continue.');
    }

    // Check if email already exists
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }

    try {
      const passwordHash = await bcrypt.hash(data.password, this.saltRounds);

      const user = await this.prismaService.$transaction(async (tx) => {
        // Create user
        const createdUser = await tx.user.create({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            passwordHash,
            userType: data.userType,
            phone: data.phone,
            city: data.city,
            state: data.state,
          },
        });

        // If musician, create profile with additional data
        if (createdUser.userType === UserType.MUSICIAN) {
          const musicianProfile = await tx.musicianProfile.create({
            data: {
              userId: createdUser.id,
              experience: data.experience,
              // Parse price range if provided (e.g., "500-800" -> 500)
              priceFrom: data.priceRange ? this.parsePriceRange(data.priceRange) : null,
            },
          });

          // Associate genres if provided
          if (data.genres && data.genres.length > 0) {
            const genreRecords = await tx.genre.findMany({
              where: { slug: { in: data.genres } },
            });

            if (genreRecords.length !== data.genres.length) {
              throw new BadRequestException('One or more genres are invalid.');
            }

            await tx.musicianGenre.createMany({
              data: genreRecords.map((genre) => ({
                musicianProfileId: musicianProfile.id,
                genreId: genre.id,
              })),
            });
          }

          // Associate instruments if provided
          if (data.instruments && data.instruments.length > 0) {
            const instrumentRecords = await tx.instrument.findMany({
              where: { slug: { in: data.instruments } },
            });

            if (instrumentRecords.length !== data.instruments.length) {
              throw new BadRequestException('One or more instruments are invalid.');
            }

            await tx.musicianInstrument.createMany({
              data: instrumentRecords.map((instrument) => ({
                musicianProfileId: musicianProfile.id,
                instrumentId: instrument.id,
              })),
            });
          }
        }

        return createdUser;
      });

      const { passwordHash: _passwordHash, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create user.');
    }

  }

  // Helper to parse price range from frontend format
  private parsePriceRange(priceRange: string): number | null {
    if (!priceRange) return null;
    
    // Extract first number from formats like "100-300", "500-800", "1200+"
    const match = priceRange.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

}
