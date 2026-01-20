import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { getPriceIdForPlan, isFreePlan } from './stripe.config';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!secretKey) {
      this.logger.warn('STRIPE_SECRET_KEY não configurada. Funcionalidades do Stripe estarão desabilitadas.');
    }

    this.stripe = new Stripe(secretKey || '', {
      apiVersion: '2025-12-15.clover',
    });
  }

  /**
   * Verifica se o Stripe está configurado corretamente
   */
  isConfigured(): boolean {
    return !!process.env.STRIPE_SECRET_KEY;
  }

  /**
   * Criar customer no Stripe
   */
  async createCustomer(email: string, name: string, metadata?: Record<string, string>): Promise<Stripe.Customer> {
    this.logger.log(`Criando customer no Stripe para: ${email}`);
    
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
        metadata: {
          platform: 'contratamusico',
          ...metadata,
        },
      });

      this.logger.log(`Customer criado com sucesso: ${customer.id}`);
      return customer;
    } catch (error) {
      this.logger.error(`Erro ao criar customer: ${error.message}`);
      throw new BadRequestException('Erro ao criar conta de pagamento');
    }
  }

  /**
   * Buscar customer por ID
   */
  async getCustomer(customerId: string): Promise<Stripe.Customer | null> {
    try {
      const customer = await this.stripe.customers.retrieve(customerId);
      
      if (customer.deleted) {
        return null;
      }
      
      return customer as Stripe.Customer;
    } catch (error) {
      this.logger.error(`Erro ao buscar customer ${customerId}: ${error.message}`);
      return null;
    }
  }

  /**
   * Buscar customer por email
   */
  async getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
    try {
      const customers = await this.stripe.customers.list({
        email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        return customers.data[0];
      }
      
      return null;
    } catch (error) {
      this.logger.error(`Erro ao buscar customer por email ${email}: ${error.message}`);
      return null;
    }
  }

  /**
   * Criar sessão de checkout para assinatura
   */
  async createCheckoutSession(
    customerId: string,
    priceId: string,
    metadata: { planId: string; userId: string },
  ): Promise<Stripe.Checkout.Session> {
    this.logger.log(`Criando checkout session para customer ${customerId}, price ${priceId}`);

    try {
      const session = await this.stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/planos?canceled=true`,
        metadata,
        subscription_data: {
          metadata,
        },
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        locale: 'pt-BR',
      });

      this.logger.log(`Checkout session criada: ${session.id}`);
      return session;
    } catch (error) {
      this.logger.error(`Erro ao criar checkout session: ${error.message}`);
      throw new BadRequestException('Erro ao criar sessão de pagamento');
    }
  }

  /**
   * Recuperar uma sessão de checkout
   */
  async retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
    try {
      return await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription', 'customer'],
      });
    } catch (error) {
      this.logger.error(`Erro ao recuperar checkout session ${sessionId}: ${error.message}`);
      return null;
    }
  }

  /**
   * Recuperar uma assinatura
   */
  async retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription | null> {
    try {
      return await this.stripe.subscriptions.retrieve(subscriptionId);
    } catch (error) {
      this.logger.error(`Erro ao recuperar subscription ${subscriptionId}: ${error.message}`);
      return null;
    }
  }

  /**
   * Cancelar assinatura (no final do período)
   */
  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    this.logger.log(`Cancelando assinatura ${subscriptionId}`);

    try {
      const subscription = await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      this.logger.log(`Assinatura ${subscriptionId} marcada para cancelamento no fim do período`);
      return subscription;
    } catch (error) {
      this.logger.error(`Erro ao cancelar assinatura ${subscriptionId}: ${error.message}`);
      throw new BadRequestException('Erro ao cancelar assinatura');
    }
  }

  /**
   * Reativar assinatura cancelada (se ainda não expirou)
   */
  async reactivateSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    this.logger.log(`Reativando assinatura ${subscriptionId}`);

    try {
      const subscription = await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,
      });

      this.logger.log(`Assinatura ${subscriptionId} reativada`);
      return subscription;
    } catch (error) {
      this.logger.error(`Erro ao reativar assinatura ${subscriptionId}: ${error.message}`);
      throw new BadRequestException('Erro ao reativar assinatura');
    }
  }

  /**
   * Cancelar assinatura imediatamente
   */
  async cancelSubscriptionImmediately(subscriptionId: string): Promise<Stripe.Subscription> {
    this.logger.log(`Cancelando assinatura ${subscriptionId} imediatamente`);

    try {
      const subscription = await this.stripe.subscriptions.cancel(subscriptionId);
      this.logger.log(`Assinatura ${subscriptionId} cancelada imediatamente`);
      return subscription;
    } catch (error) {
      this.logger.error(`Erro ao cancelar assinatura imediatamente ${subscriptionId}: ${error.message}`);
      throw new BadRequestException('Erro ao cancelar assinatura');
    }
  }

  /**
   * Criar sessão do portal do cliente
   */
  async createPortalSession(
    customerId: string,
    returnUrl: string,
  ): Promise<Stripe.BillingPortal.Session> {
    this.logger.log(`Criando portal session para customer ${customerId}`);

    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      this.logger.log(`Portal session criada: ${session.url}`);
      return session;
    } catch (error) {
      this.logger.error(`Erro ao criar portal session: ${error.message}`);
      throw new BadRequestException('Erro ao criar sessão do portal');
    }
  }

  /**
   * Construir e validar evento de webhook
   */
  constructWebhookEvent(
    payload: Buffer,
    signature: string,
  ): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new BadRequestException('Webhook secret não configurado');
    }

    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch (error) {
      this.logger.error(`Erro ao validar webhook: ${error.message}`);
      throw new BadRequestException('Assinatura do webhook inválida');
    }
  }

  /**
   * Obter Price ID para um plano e intervalo específicos
   */
  getPriceIdForPlan(planId: number, interval: 'monthly' | 'yearly'): string | null {
    return getPriceIdForPlan(planId, interval);
  }

  /**
   * Verificar se um plano é gratuito
   */
  isFreePlan(planId: number): boolean {
    return isFreePlan(planId);
  }

  /**
   * Listar faturas de um customer
   */
  async listInvoices(customerId: string, limit = 10): Promise<Stripe.Invoice[]> {
    try {
      const invoices = await this.stripe.invoices.list({
        customer: customerId,
        limit,
      });
      return invoices.data;
    } catch (error) {
      this.logger.error(`Erro ao listar faturas do customer ${customerId}: ${error.message}`);
      return [];
    }
  }

  /**
   * Recuperar uma fatura específica
   */
  async retrieveInvoice(invoiceId: string): Promise<Stripe.Invoice | null> {
    try {
      return await this.stripe.invoices.retrieve(invoiceId);
    } catch (error) {
      this.logger.error(`Erro ao recuperar fatura ${invoiceId}: ${error.message}`);
      return null;
    }
  }
}
