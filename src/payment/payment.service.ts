import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from './stripe.service';
import { EmailService } from '../email/email.service';
import Stripe from 'stripe';
import { isFreePlan, getPlanConfig } from './stripe.config';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
    private readonly emailService: EmailService,
  ) { }

  /**
   * Obter assinatura do usuário
   */
  async getSubscription(userId: number) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      include: {
        plan: {
          include: {
            features: true,
          },
        },
      },
    });

    if (!subscription) {
      return { hasSubscription: false };
    }

    return {
      hasSubscription: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        plan: subscription.plan,
      },
    };
  }

  /**
   * Obter histórico de pagamentos
   */
  async getPaymentHistory(userId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.prisma.paymentHistory.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.paymentHistory.count({ where: { userId } }),
    ]);

    return {
      data: payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Criar sessão de checkout para assinatura
   */
  async createCheckout(
    userId: number,
    planId: number,
    billingInterval: 'monthly' | 'yearly',
  ): Promise<string> {
    this.logger.log(`Criando checkout para usuário ${userId}, plano ${planId}, intervalo ${billingInterval}`);

    // Verificar se Stripe está configurado
    if (!this.stripeService.isConfigured()) {
      throw new BadRequestException('Sistema de pagamentos não está configurado');
    }

    // Verificar se o plano é gratuito
    if (isFreePlan(planId)) {
      throw new BadRequestException('Este plano é gratuito e não requer pagamento');
    }

    // Buscar usuário
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se já tem assinatura ativa
    if (user.subscription?.status === 'active' && !user.subscription.cancelAtPeriodEnd) {
      throw new BadRequestException('Você já possui uma assinatura ativa. Acesse o portal para gerenciá-la.');
    }

    // Verificar se o plano existe
    const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      throw new NotFoundException('Plano não encontrado');
    }

    // Obter Price ID do Stripe
    const priceId = this.stripeService.getPriceIdForPlan(planId, billingInterval);
    if (!priceId) {
      throw new BadRequestException('Configuração de preço não encontrada para este plano');
    }

    // Buscar ou criar customer no Stripe
    let stripeCustomerId = user.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      // Verificar se já existe customer com este email
      const existingCustomer = await this.stripeService.getCustomerByEmail(user.email);

      if (existingCustomer) {
        stripeCustomerId = existingCustomer.id;
      } else {
        // Criar novo customer
        const customer = await this.stripeService.createCustomer(
          user.email,
          `${user.firstName} ${user.lastName}`,
          { userId: userId.toString() },
        );
        stripeCustomerId = customer.id;
      }
    }

    // Criar checkout session
    const session = await this.stripeService.createCheckoutSession(
      stripeCustomerId,
      priceId,
      {
        planId: planId.toString(),
        userId: userId.toString(),
      },
    );

    this.logger.log(`Checkout session criada: ${session.id} para usuário ${userId}`);

    return session.url;
  }

  /**
   * Processar webhook do Stripe
   */
  async handleWebhook(rawBody: Buffer, signature: string): Promise<void> {
    const event = this.stripeService.constructWebhookEvent(rawBody, signature);

    this.logger.log(`Processando evento webhook: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutComplete(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await this.handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        this.logger.log(`Evento não tratado: ${event.type}`);
    }
  }

  /**
   * Processar checkout completado
   */
  private async handleCheckoutComplete(session: Stripe.Checkout.Session): Promise<void> {
    this.logger.log(`Processando checkout.session.completed: ${session.id}`);

    const metadata = session.metadata;
    if (!metadata?.userId || !metadata?.planId) {
      this.logger.error('Metadata inválida no checkout session');
      return;
    }

    const userId = parseInt(metadata.userId, 10);
    const planId = parseInt(metadata.planId, 10);
    const stripeCustomerId = session.customer as string;
    const stripeSubscriptionId = session.subscription as string;

    // Buscar detalhes da subscription no Stripe
    const stripeSubscription = await this.stripeService.retrieveSubscription(stripeSubscriptionId);
    if (!stripeSubscription) {
      this.logger.error(`Não foi possível recuperar subscription ${stripeSubscriptionId}`);
      return;
    }

    // Criar ou atualizar subscription no banco
    // No Stripe SDK v20+, current_period_start/end estão nos SubscriptionItems
    const firstItem = stripeSubscription.items.data[0];
    const periodStart = firstItem?.current_period_start || stripeSubscription.created;
    const periodEnd = firstItem?.current_period_end || (stripeSubscription.created + 30 * 24 * 60 * 60);

    await this.prisma.subscription.upsert({
      where: { userId },
      update: {
        planId,
        stripeSubscriptionId,
        stripeCustomerId,
        status: 'active',
        currentPeriodStart: new Date(periodStart * 1000),
        currentPeriodEnd: new Date(periodEnd * 1000),
        cancelAtPeriodEnd: false,
      },
      create: {
        userId,
        planId,
        stripeSubscriptionId,
        stripeCustomerId,
        status: 'active',
        currentPeriodStart: new Date(periodStart * 1000),
        currentPeriodEnd: new Date(periodEnd * 1000),
        cancelAtPeriodEnd: false,
      },
    });

    await this.syncMusicianPrivileges(userId);

    // Registrar pagamento no histórico
    const planConfig = getPlanConfig(planId);
    const amount = session.amount_total || 0;

    await this.prisma.paymentHistory.create({
      data: {
        userId,
        amount,
        currency: session.currency?.toUpperCase() || 'BRL',
        status: 'succeeded',
        stripePaymentId: session.payment_intent as string,
        description: `Assinatura ${planConfig?.name || 'Premium'} - ${new Date().toLocaleDateString('pt-BR')}`,
      },
    });

    // Buscar usuário para enviar email
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      await this.emailService.sendPaymentConfirmationEmail(
        user.email,
        user.firstName,
        planConfig?.name || 'Premium',
        amount / 100,
      );
    }

    this.logger.log(`Subscription criada/atualizada para usuário ${userId}`);
  }

  /**
   * Processar atualização de subscription
   */
  private async handleSubscriptionUpdated(stripeSubscription: Stripe.Subscription): Promise<void> {
    this.logger.log(`Processando customer.subscription.updated: ${stripeSubscription.id}`);

    const subscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: stripeSubscription.id },
    });

    if (!subscription) {
      this.logger.warn(`Subscription não encontrada no banco: ${stripeSubscription.id}`);
      return;
    }

    // Mapear status do Stripe para nosso status
    const statusMap: Record<string, string> = {
      active: 'active',
      past_due: 'past_due',
      canceled: 'canceled',
      unpaid: 'past_due',
      incomplete: 'incomplete',
      incomplete_expired: 'canceled',
      trialing: 'active',
      paused: 'paused',
    };

    // No Stripe SDK v20+, current_period_start/end estão nos SubscriptionItems
    const firstItem = stripeSubscription.items.data[0];
    const periodStart = firstItem?.current_period_start || stripeSubscription.created;
    const periodEnd = firstItem?.current_period_end || (stripeSubscription.created + 30 * 24 * 60 * 60);

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: statusMap[stripeSubscription.status] || stripeSubscription.status,
        currentPeriodStart: new Date(periodStart * 1000),
        currentPeriodEnd: new Date(periodEnd * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      },
    });

    await this.syncMusicianPrivileges(subscription.userId);

    this.logger.log(`Subscription ${subscription.id} atualizada para status: ${stripeSubscription.status}`);
  }

  /**
   * Processar subscription deletada/cancelada
   */
  private async handleSubscriptionDeleted(stripeSubscription: Stripe.Subscription): Promise<void> {
    this.logger.log(`Processando customer.subscription.deleted: ${stripeSubscription.id}`);

    const subscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: stripeSubscription.id },
      include: { user: true },
    });

    if (!subscription) {
      this.logger.warn(`Subscription não encontrada no banco: ${stripeSubscription.id}`);
      return;
    }

    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'canceled',
        cancelAtPeriodEnd: true,
      },
    });

    await this.syncMusicianPrivileges(subscription.userId);

    // Enviar email de confirmação de cancelamento
    if (subscription.user) {
      await this.emailService.sendSubscriptionCanceledEmail(
        subscription.user.email,
        subscription.user.firstName,
        subscription.currentPeriodEnd,
      );
    }

    this.logger.log(`Subscription ${subscription.id} marcada como cancelada`);
  }

  /**
   * Processar pagamento de fatura bem-sucedido
   */
  private async handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    this.logger.log(`Processando invoice.payment_succeeded: ${invoice.id}`);

    // Ignorar faturas de primeira cobrança (já tratadas no checkout)
    if (invoice.billing_reason === 'subscription_create') {
      return;
    }

    // Extrair subscription ID do parent (estrutura do Stripe SDK v20)
    const invoiceAny = invoice as any;
    const subscriptionId = invoiceAny.parent?.subscription_details?.subscription
      || (typeof invoiceAny.subscription === 'string' ? invoiceAny.subscription : invoiceAny.subscription?.id);

    if (!subscriptionId) {
      this.logger.warn('Invoice sem subscription associada');
      return;
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: { user: true, plan: true },
    });

    if (!subscription) {
      return;
    }

    // Extrair payment_intent ID se disponível
    const paymentIntentId = invoiceAny.payment_intent
      ? (typeof invoiceAny.payment_intent === 'string' ? invoiceAny.payment_intent : invoiceAny.payment_intent?.id)
      : null;

    await this.prisma.paymentHistory.create({
      data: {
        userId: subscription.userId,
        amount: invoice.amount_paid || 0,
        currency: invoice.currency?.toUpperCase() || 'BRL',
        status: 'succeeded',
        stripePaymentId: paymentIntentId,
        description: `Renovação ${subscription.plan.title} - ${new Date().toLocaleDateString('pt-BR')}`,
      },
    });

    this.logger.log(`Pagamento recorrente registrado para usuário ${subscription.userId}`);
  }

  /**
   * Processar falha de pagamento de fatura
   */
  private async handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    this.logger.log(`Processando invoice.payment_failed: ${invoice.id}`);

    // Extrair subscription ID do parent (estrutura do Stripe SDK v20)
    const invoiceAny = invoice as any;
    const subscriptionId = invoiceAny.parent?.subscription_details?.subscription
      || (typeof invoiceAny.subscription === 'string' ? invoiceAny.subscription : invoiceAny.subscription?.id);

    if (!subscriptionId) {
      this.logger.warn('Invoice sem subscription associada');
      return;
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: { user: true },
    });

    if (!subscription) {
      return;
    }

    // Extrair payment_intent ID se disponível
    const paymentIntentId = invoiceAny.payment_intent
      ? (typeof invoiceAny.payment_intent === 'string' ? invoiceAny.payment_intent : invoiceAny.payment_intent?.id)
      : null;

    await this.prisma.paymentHistory.create({
      data: {
        userId: subscription.userId,
        amount: invoice.amount_due || 0,
        currency: invoice.currency?.toUpperCase() || 'BRL',
        status: 'failed',
        stripePaymentId: paymentIntentId,
        description: `Falha no pagamento - ${new Date().toLocaleDateString('pt-BR')}`,
      },
    });

    // Atualizar status da subscription
    await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: 'past_due' },
    });

    // Enviar email de aviso
    if (subscription.user) {
      await this.emailService.sendPaymentFailedEmail(
        subscription.user.email,
        subscription.user.firstName,
      );
    }

    this.logger.log(`Falha de pagamento registrada para usuário ${subscription.userId}`);
  }

  /**
   * Cancelar assinatura do usuário
   */
  async cancelSubscription(userId: number): Promise<{ message: string; subscription: any }> {
    this.logger.log(`Cancelando assinatura do usuário ${userId}`);

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      include: { plan: true },
    });

    if (!subscription) {
      throw new NotFoundException('Você não possui uma assinatura ativa');
    }

    if (subscription.status === 'canceled') {
      throw new BadRequestException('Esta assinatura já está cancelada');
    }

    if (!subscription.stripeSubscriptionId) {
      throw new BadRequestException('Assinatura sem vínculo com o Stripe');
    }

    // Cancelar no Stripe (no final do período)
    await this.stripeService.cancelSubscription(subscription.stripeSubscriptionId);

    // Atualizar no banco
    const updated = await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: true },
      include: { plan: true },
    });

    await this.syncMusicianPrivileges(userId);

    this.logger.log(`Assinatura do usuário ${userId} marcada para cancelamento`);

    return {
      message: `Sua assinatura será cancelada em ${updated.currentPeriodEnd.toLocaleDateString('pt-BR')}. Você continuará tendo acesso até essa data.`,
      subscription: {
        id: updated.id,
        status: updated.status,
        currentPeriodEnd: updated.currentPeriodEnd,
        cancelAtPeriodEnd: updated.cancelAtPeriodEnd,
        plan: updated.plan,
      },
    };
  }

  /**
   * Reativar assinatura cancelada
   */
  async reactivateSubscription(userId: number): Promise<{ message: string; subscription: any }> {
    this.logger.log(`Reativando assinatura do usuário ${userId}`);

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      include: { plan: true },
    });

    if (!subscription) {
      throw new NotFoundException('Você não possui uma assinatura');
    }

    if (!subscription.cancelAtPeriodEnd) {
      throw new BadRequestException('Esta assinatura não está marcada para cancelamento');
    }

    if (!subscription.stripeSubscriptionId) {
      throw new BadRequestException('Assinatura sem vínculo com o Stripe');
    }

    // Verificar se ainda está dentro do período
    if (subscription.currentPeriodEnd < new Date()) {
      throw new BadRequestException('O período da assinatura já expirou. Faça uma nova assinatura.');
    }

    // Reativar no Stripe
    await this.stripeService.reactivateSubscription(subscription.stripeSubscriptionId);

    // Atualizar no banco
    const updated = await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: false },
      include: { plan: true },
    });

    await this.syncMusicianPrivileges(userId);

    this.logger.log(`Assinatura do usuário ${userId} reativada`);

    return {
      message: 'Sua assinatura foi reativada com sucesso!',
      subscription: {
        id: updated.id,
        status: updated.status,
        currentPeriodEnd: updated.currentPeriodEnd,
        cancelAtPeriodEnd: updated.cancelAtPeriodEnd,
        plan: updated.plan,
      },
    };
  }

  /**
   * Criar sessão do portal do cliente
   */
  async createPortalSession(userId: number, returnUrl?: string): Promise<string> {
    this.logger.log(`Criando portal session para usuário ${userId}`);

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription?.stripeCustomerId) {
      throw new BadRequestException('Você precisa ter uma assinatura para acessar o portal');
    }

    const portalUrl = returnUrl || `${process.env.FRONTEND_URL}/perfil`;

    const session = await this.stripeService.createPortalSession(
      subscription.stripeCustomerId,
      portalUrl,
    );

    return session.url;
  }

  /**
   * Verificar e atualizar assinaturas expiradas (job de manutenção)
   */
  async checkExpiredSubscriptions(): Promise<void> {
    this.logger.log('Verificando assinaturas expiradas...');

    const expiredSubscriptions = await this.prisma.subscription.findMany({
      where: {
        status: 'active',
        cancelAtPeriodEnd: true,
        currentPeriodEnd: { lt: new Date() },
      },
    });

    for (const sub of expiredSubscriptions) {
      await this.prisma.subscription.update({
        where: { id: sub.id },
        data: { status: 'canceled' },
      });
      await this.syncMusicianPrivileges(sub.userId);
      this.logger.log(`Subscription ${sub.id} marcada como expirada`);
    }

    this.logger.log(`${expiredSubscriptions.length} assinaturas atualizadas`);
  }


  async syncMusicianPrivileges(userId: number) {
    // 1. Buscar assinatura ativa com detalhes do plano
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      include: { plan: true }
    });

    const musicianProfile = await this.prisma.musicianProfile.findUnique({
      where: { userId }
    });

    if (!musicianProfile) return; // Se não for músico, ignora

    // 2. Definir regras
    // O usuário tem destaque se: Tiver assinatura Ativa E o plano tiver hasSpotlight
    const isActive = subscription && (subscription.status === 'active' || subscription.status === 'trialing');
    const shouldHaveSpotlight = isActive ? subscription.plan.hasSpotlight : false;

    // 3. Atualizar apenas se mudou
    if (musicianProfile.isFeatured !== shouldHaveSpotlight) {
      await this.prisma.musicianProfile.update({
        where: { id: musicianProfile.id },
        data: { isFeatured: shouldHaveSpotlight }
      });
      this.logger.log(`Privilégios sincronizados para User ${userId}: Destaque=${shouldHaveSpotlight}`);
    }
  }
}
