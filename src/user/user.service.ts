/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User, UserType } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

export type UserWithProfile = Prisma.UserGetPayload<{ include: { musicianProfile: true } }>;

// Include para retornar dados do usuário com perfil de músico
const userWithProfileInclude = {
  musicianProfile: {
    include: {
      musicianGenres: {
        include: {
          genre: true,
        },
      },
      musicianInstruments: {
        include: {
          instrument: true,
        },
      },
    },
  },
} satisfies Prisma.UserInclude;

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

  /**
   * Buscar usuário por ID com dados completos
   */
  async findById(id: number): Promise<Omit<User, 'passwordHash'> & { musicianProfile?: any }> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: userWithProfileInclude,
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.formatUserResponse(user);
  }

  /**
   * Atualizar dados pessoais do usuário
   */
  async update(id: number, data: UpdateUserDto): Promise<Omit<User, 'passwordHash'> & { musicianProfile?: any }> {
    // Verificar se o usuário existe
    const existing = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const updated = await this.prismaService.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        city: data.city,
        state: data.state,
      },
      include: userWithProfileInclude,
    });

    return this.formatUserResponse(updated);
  }

  /**
   * Atualizar URL da imagem de perfil do usuário
   */
  async updateProfileImage(id: number, profileImageUrl: string): Promise<Omit<User, 'passwordHash'> & { musicianProfile?: any }> {
    const existing = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const updated = await this.prismaService.user.update({
      where: { id },
      data: { profileImageUrl },
      include: userWithProfileInclude,
    });

    return this.formatUserResponse(updated);
  }

  /**
   * Obter URL da imagem de perfil atual do usuário
   */
  async getProfileImageUrl(id: number): Promise<string | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: { profileImageUrl: true },
    });

    return user?.profileImageUrl || null;
  }

  /**
   * Formatar resposta do usuário (remove passwordHash e formata dados)
   */
  private formatUserResponse(user: any): Omit<User, 'passwordHash'> & { musicianProfile?: any } {
    const { passwordHash: _passwordHash, musicianProfile, ...safeUser } = user;

    // Se não tem perfil de músico, retorna apenas dados do usuário
    if (!musicianProfile) {
      return safeUser;
    }

    // Formatar perfil de músico com gêneros e instrumentos
    return {
      ...safeUser,
      musicianProfile: {
        id: musicianProfile.id,
        category: musicianProfile.category,
        bio: musicianProfile.bio,
        location: musicianProfile.location,
        priceFrom: musicianProfile.priceFrom,
        experience: musicianProfile.experience,
        equipment: musicianProfile.equipment,
        availability: musicianProfile.availability,
        rating: musicianProfile.rating,
        ratingCount: musicianProfile.ratingCount,
        eventsCount: musicianProfile.eventsCount,
        satisfactionRate: musicianProfile.satisfactionRate,
        responseTime: musicianProfile.responseTime,
        isFeatured: musicianProfile.isFeatured,
        genres: musicianProfile.musicianGenres?.map((mg: any) => ({
          id: mg.genre.id,
          name: mg.genre.name,
          slug: mg.genre.slug,
        })) || [],
        instruments: musicianProfile.musicianInstruments?.map((mi: any) => ({
          id: mi.instrument.id,
          name: mi.instrument.name,
          slug: mi.instrument.slug,
        })) || [],
        createdAt: musicianProfile.createdAt,
        updatedAt: musicianProfile.updatedAt,
      },
    };
  }

}
