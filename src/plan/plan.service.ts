import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

// Include para retornar features do plano
const planInclude = {
  features: {
    orderBy: {
      id: 'asc' as const,
    },
  },
} satisfies Prisma.PlanInclude;

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Listar todos os planos disponíveis
   */
  async findAll(type?: 'musician' | 'client') {
    let where: Prisma.PlanWhereInput = {};

    if (type === 'musician') {
      where = { isMusicianPlan: true };
    } else if (type === 'client') {
      where = { isClientPlan: true };
    }

    const plans = await this.prisma.plan.findMany({
      where,
      include: planInclude,
      orderBy: { monthlyPrice: 'asc' },
    });

    return plans.map(this.formatPlan);
  }

  /**
   * Obter detalhes de um plano por ID
   */
  async findById(id: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
      include: planInclude,
    });

    if (!plan) {
      throw new NotFoundException('Plano não encontrado.');
    }

    return this.formatPlan(plan);
  }

  /**
   * Formatar resposta do plano
   */
  private formatPlan(plan: any) {
    return {
      id: plan.id,
      title: plan.title,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      badge: plan.badge,
      isMusicianPlan: plan.isMusicianPlan,
      isClientPlan: plan.isClientPlan,
      features: plan.features.map((f: any) => ({
        id: f.id,
        text: f.text,
        available: f.available,
        highlight: f.highlight,
      })),
      createdAt: plan.createdAt,
    };
  }
}

