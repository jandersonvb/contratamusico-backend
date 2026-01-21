import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Body,
  Headers,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  RawBodyRequest,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentService } from './payment.service';
import { CreateCheckoutDto, CreatePortalDto } from './dto';
import { Request } from 'express';

@ApiTags('Pagamentos')
@Controller('payments')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Obter minha assinatura',
    description: 'Retorna detalhes da assinatura ativa do usuário',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Detalhes da assinatura',
    schema: {
      example: {
        hasSubscription: true,
        subscription: {
          id: 1,
          status: 'active',
          currentPeriodStart: '2024-01-01T00:00:00Z',
          currentPeriodEnd: '2024-02-01T00:00:00Z',
          cancelAtPeriodEnd: false,
          plan: {
            id: 2,
            title: 'Profissional',
            monthlyPrice: 4990,
          },
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get('subscription')
  async getSubscription(@Req() req: any) {
    return this.paymentService.getSubscription(req.user.id);
  }

  @ApiOperation({
    summary: 'Histórico de pagamentos',
    description: 'Retorna histórico de pagamentos do usuário com paginação',
  })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Página (padrão: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Itens por página (padrão: 10)' })
  @ApiResponse({ status: 200, description: 'Lista de pagamentos' })
  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.paymentService.getPaymentHistory(req.user.id, parsedPage, parsedLimit);
  }

  @ApiOperation({
    summary: 'Criar sessão de checkout',
    description: 'Cria uma sessão de checkout no Stripe para assinatura de plano',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCheckoutDto })
  @ApiResponse({
    status: 200,
    description: 'URL de checkout criada com sucesso',
    schema: {
      example: {
        checkoutUrl: 'https://checkout.stripe.com/c/pay/cs_test_...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou plano gratuito' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @UseGuards(JwtAuthGuard)
  @Post('create-checkout')
  @HttpCode(HttpStatus.OK)
  async createCheckout(
    @Req() req: any,
    @Body() data: CreateCheckoutDto,
  ) {
    const checkoutUrl = await this.paymentService.createCheckout(
      req.user.id,
      data.planId,
      data.billingInterval,
    );
    return { checkoutUrl };
  }

  @ApiOperation({
    summary: 'Webhook do Stripe',
    description: 'Endpoint para receber eventos do Stripe. Este endpoint é chamado automaticamente pelo Stripe.',
  })
  @ApiResponse({ status: 200, description: 'Evento processado com sucesso' })
  @ApiResponse({ status: 400, description: 'Assinatura inválida ou evento malformado' })
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = req.rawBody;
    
    if (!rawBody) {
      throw new Error('Raw body não disponível');
    }

    await this.paymentService.handleWebhook(rawBody, signature);
    return { received: true };
  }

  @ApiOperation({
    summary: 'Cancelar assinatura',
    description: 'Cancela a assinatura do usuário. O acesso permanece até o fim do período pago.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Assinatura marcada para cancelamento',
    schema: {
      example: {
        message: 'Sua assinatura será cancelada em 01/02/2024. Você continuará tendo acesso até essa data.',
        subscription: {
          id: 1,
          status: 'active',
          currentPeriodEnd: '2024-02-01T00:00:00Z',
          cancelAtPeriodEnd: true,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Assinatura já cancelada ou não existe' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @UseGuards(JwtAuthGuard)
  @Post('cancel')
  @HttpCode(HttpStatus.OK)
  async cancelSubscription(@Req() req: any) {
    return this.paymentService.cancelSubscription(req.user.id);
  }

  @ApiOperation({
    summary: 'Reativar assinatura',
    description: 'Reativa uma assinatura que foi marcada para cancelamento (antes do fim do período)',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Assinatura reativada com sucesso',
    schema: {
      example: {
        message: 'Sua assinatura foi reativada com sucesso!',
        subscription: {
          id: 1,
          status: 'active',
          currentPeriodEnd: '2024-02-01T00:00:00Z',
          cancelAtPeriodEnd: false,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Assinatura não está marcada para cancelamento ou já expirou' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @UseGuards(JwtAuthGuard)
  @Post('reactivate')
  @HttpCode(HttpStatus.OK)
  async reactivateSubscription(@Req() req: any) {
    return this.paymentService.reactivateSubscription(req.user.id);
  }

  @ApiOperation({
    summary: 'Portal do cliente Stripe',
    description: 'Gera um link para o portal do cliente do Stripe onde é possível gerenciar métodos de pagamento e ver faturas',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePortalDto })
  @ApiResponse({
    status: 200,
    description: 'URL do portal gerada com sucesso',
    schema: {
      example: {
        portalUrl: 'https://billing.stripe.com/p/session/...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Usuário não possui assinatura' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @UseGuards(JwtAuthGuard)
  @Post('portal')
  @HttpCode(HttpStatus.OK)
  async createPortalSession(
    @Req() req: any,
    @Body() data: CreatePortalDto,
  ) {
    const portalUrl = await this.paymentService.createPortalSession(
      req.user.id,
      data.returnUrl,
    );
    return { portalUrl };
  }
}
