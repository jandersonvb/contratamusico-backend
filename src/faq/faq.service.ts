import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Listar todas as FAQs
   */
  async findAll(category?: string) {
    const where = category ? { category } : {};

    const faqs = await this.prisma.fAQItem.findMany({
      where,
      orderBy: { id: 'asc' },
    });

    return faqs.map(this.formatFaq);
  }

  /**
   * Listar FAQs agrupadas por categoria
   */
  async findGroupedByCategory() {
    const faqs = await this.prisma.fAQItem.findMany({
      orderBy: [{ category: 'asc' }, { id: 'asc' }],
    });

    // Agrupar por categoria
    const grouped: Record<string, any[]> = {};

    faqs.forEach((faq) => {
      const cat = faq.category || 'GERAL';
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      grouped[cat].push(this.formatFaq(faq));
    });

    return grouped;
  }

  /**
   * Listar categorias disponíveis
   */
  async getCategories() {
    const faqs = await this.prisma.fAQItem.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    return faqs
      .map((f) => f.category)
      .filter((c) => c !== null)
      .sort();
  }

  /**
   * Formatar resposta da FAQ
   */
  private formatFaq(faq: any) {
    return {
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    };
  }
}

