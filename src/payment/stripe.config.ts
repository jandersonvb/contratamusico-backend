/**
 * Configuração e mapeamento de preços do Stripe
 * 
 * Este arquivo centraliza a configuração dos planos e seus
 * respectivos Price IDs no Stripe.
 */

export interface StripePriceMapping {
  monthly: string | null;
  yearly: string | null;
}

export interface StripePlanConfig {
  name: string;
  monthlyPriceCents: number;
  yearlyPriceCents: number;
  prices: StripePriceMapping;
}

/**
 * Mapeamento dos planos do sistema para os Price IDs do Stripe
 * 
 * planId 1 = Básico (Grátis)
 * planId 2 = Profissional (R$ 49,90/mês ou R$ 479,00/ano)
 * planId 3 = Premium (R$ 99,90/mês ou R$ 959,00/ano)
 */
export const STRIPE_PLANS: Record<number, StripePlanConfig> = {
  1: {
    name: 'Básico',
    monthlyPriceCents: 0,
    yearlyPriceCents: 0,
    prices: {
      monthly: null, // Grátis - não precisa de Price ID
      yearly: null,
    },
  },
  2: {
    name: 'Profissional',
    monthlyPriceCents: 4990, // R$ 49,90
    yearlyPriceCents: 47900, // R$ 479,00
    prices: {
      monthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY || null,
      yearly: process.env.STRIPE_PRICE_PROFESSIONAL_YEARLY || null,
    },
  },
  3: {
    name: 'Premium',
    monthlyPriceCents: 9990, // R$ 99,90
    yearlyPriceCents: 95900, // R$ 959,00
    prices: {
      monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY || null,
      yearly: process.env.STRIPE_PRICE_PREMIUM_YEARLY || null,
    },
  },
};

/**
 * Obtém o Price ID do Stripe para um plano e intervalo específicos
 */
export function getPriceIdForPlan(
  planId: number,
  interval: 'monthly' | 'yearly',
): string | null {
  const plan = STRIPE_PLANS[planId];
  if (!plan) return null;
  return plan.prices[interval];
}

/**
 * Obtém a configuração completa de um plano
 */
export function getPlanConfig(planId: number): StripePlanConfig | null {
  return STRIPE_PLANS[planId] || null;
}

/**
 * Verifica se um plano é gratuito
 */
export function isFreePlan(planId: number): boolean {
  const plan = STRIPE_PLANS[planId];
  return plan?.monthlyPriceCents === 0;
}

/**
 * Lista todos os planos pagos
 */
export function getPaidPlans(): Array<{ id: number; config: StripePlanConfig }> {
  return Object.entries(STRIPE_PLANS)
    .filter(([, config]) => config.monthlyPriceCents > 0)
    .map(([id, config]) => ({ id: parseInt(id, 10), config }));
}
