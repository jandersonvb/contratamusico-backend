import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Criar mensagem de contato
   */
  async create(data: CreateContactDto) {
    const message = await this.prisma.contactMessage.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    });

    return {
      id: message.id,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    };
  }
}

