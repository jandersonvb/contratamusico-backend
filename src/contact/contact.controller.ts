import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('Contato')
@Controller('contact')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ 
    summary: 'Enviar mensagem de contato',
    description: 'Envia uma mensagem através do formulário de contato da plataforma' 
  })
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateContactDto) {
    return this.contactService.create(data);
  }
}

