import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  const genres = [
    { slug: "mpb", name: "MPB" },
    { slug: "rock", name: "Rock" },
    { slug: "pop", name: "Pop" },
    { slug: "jazz", name: "Jazz" },
    { slug: "classica", name: "Clássica" },
    { slug: "sertanejo", name: "Sertanejo" },
    { slug: "bossa-nova", name: "Bossa Nova" },
    { slug: "eletronica", name: "Eletrônica" },
  ];

  const instruments = [
    { slug: "violao", name: "Violão" },
    { slug: "guitarra", name: "Guitarra" },
    { slug: "piano", name: "Piano" },
    { slug: "teclado", name: "Teclado" },
    { slug: "bateria", name: "Bateria" },
    { slug: "baixo", name: "Baixo" },
    { slug: "vocal", name: "Vocal" },
    { slug: "saxofone", name: "Saxofone" },
    { slug: "violino", name: "Violino" },
    { slug: "flauta", name: "Flauta" },
    { slug: "clarinete", name: "Clarinete" },
    { slug: "oboe", name: "Oboe" },
    { slug: "fagote", name: "Fagote" },
    { slug: "trombone", name: "Trombone" },
    { slug: "trompete", name: "Trompete" },
    { slug: "trompa", name: "Trompa" },
    { slug: "cavaquinho", name: "Cavaquinho" },
    { slug: "bandolim", name: "Bandolim" },
    { slug: "viola", name: "Viola" },
    { slug: "sanfona", name: "Sanfona" },
  ];

  const plans = [
    {
      title: "Básico",
      description: "Perfeito para quem está começando",
      monthlyPrice: 0,
      yearlyPrice: 0,
      badge: null,
      isMusicianPlan: true,
      isClientPlan: false,
      features: [
        { text: "Perfil básico", available: true, highlight: false },
        { text: "Até 3 fotos no portfólio", available: true, highlight: false },
        { text: "Contato por mensagem", available: true, highlight: false },
        { text: "Destaque na busca", available: false, highlight: false },
        { text: "Estatísticas avançadas", available: false, highlight: false },
      ],
    },
    {
      title: "Profissional",
      description: "Para músicos que querem se destacar",
      monthlyPrice: 4990,
      yearlyPrice: 47900,
      badge: "Mais Popular",
      isMusicianPlan: true,
      isClientPlan: false,
      features: [
        { text: "Perfil completo", available: true, highlight: false },
        { text: "Até 20 fotos e 5 vídeos", available: true, highlight: true },
        { text: "Contato por mensagem e WhatsApp", available: true, highlight: false },
        { text: "Destaque na busca", available: true, highlight: true },
        { text: "Estatísticas básicas", available: true, highlight: false },
        { text: "Selo de verificado", available: false, highlight: false },
      ],
    },
    {
      title: "Premium",
      description: "Máxima visibilidade e recursos",
      monthlyPrice: 9990,
      yearlyPrice: 95900,
      badge: null,
      isMusicianPlan: true,
      isClientPlan: false,
      features: [
        { text: "Perfil completo", available: true, highlight: false },
        { text: "Portfólio ilimitado", available: true, highlight: true },
        { text: "Todos os canais de contato", available: true, highlight: false },
        { text: "Destaque premium na busca", available: true, highlight: true },
        { text: "Estatísticas avançadas", available: true, highlight: true },
        { text: "Selo de verificado", available: true, highlight: true },
        { text: "Suporte prioritário", available: true, highlight: false },
      ],
    },
  ];

  const faqs = [
    {
      question: "Como funciona a contratação de músicos?",
      answer: "Você pode buscar músicos por gênero, instrumento ou localização. Ao encontrar o profissional ideal, envie uma mensagem com os detalhes do seu evento. O músico responderá e vocês podem negociar diretamente.",
      category: "GERAL",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer: "O pagamento é negociado diretamente entre você e o músico. A plataforma não intermedia transações financeiras entre contratantes e músicos.",
      category: "GERAL",
    },
    {
      question: "Como faço para me cadastrar como músico?",
      answer: "Clique em 'Cadastre-se' no topo da página, selecione 'Sou Músico' e preencha seus dados. Após o cadastro, complete seu perfil com fotos, vídeos e informações sobre seu trabalho.",
      category: "MUSICO",
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim! Você pode cancelar sua assinatura quando quiser. O acesso aos recursos premium continua até o fim do período pago.",
      category: "PLANOS",
    },
    {
      question: "Qual a diferença entre os planos?",
      answer: "O plano Básico é gratuito e oferece recursos essenciais. O Profissional inclui destaque na busca e mais espaço no portfólio. O Premium oferece visibilidade máxima, estatísticas avançadas e selo de verificado.",
      category: "PLANOS",
    },
    {
      question: "Como funciona o destaque na busca?",
      answer: "Músicos com planos pagos aparecem com prioridade nos resultados de busca, aumentando suas chances de serem encontrados por contratantes.",
      category: "PLANOS",
    },
    {
      question: "Posso alterar meu plano depois?",
      answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Ao fazer upgrade, a diferença é calculada proporcionalmente.",
      category: "PLANOS",
    },
  ];

  let genresCreated = 0;
  let genresUpdated = 0;

  console.log('📀 Inserindo gêneros musicais...');
  for (const genre of genres) {
    const result = await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: { name: genre.name },
      create: { 
        slug: genre.slug,
        name: genre.name
      },
    });
    
    const isNew = result.id !== undefined;
    if (isNew) {
      genresCreated++;
      console.log(`  ✓ Criado: ${genre.name} (${genre.slug})`);
    } else {
      genresUpdated++;
      console.log(`  ↻ Atualizado: ${genre.name} (${genre.slug})`);
    }
  }

  let instrumentsCreated = 0;
  let instrumentsUpdated = 0;

  console.log('\n🎸 Inserindo instrumentos...');
  for (const instrument of instruments) {
    const result = await prisma.instrument.upsert({
      where: { slug: instrument.slug },
      update: { name: instrument.name },
      create: {
        slug: instrument.slug,
        name: instrument.name
      },
    });

    const isNew = result.id !== undefined;
    if (isNew) {
      instrumentsCreated++;
      console.log(`  ✓ Criado: ${instrument.name} (${instrument.slug})`);
    } else {
      instrumentsUpdated++;
      console.log(`  ↻ Atualizado: ${instrument.name} (${instrument.slug})`);
    }
  }

  let plansCreated = 0;

  console.log('\n💳 Inserindo planos...');
  for (const plan of plans) {
    const existingPlan = await prisma.plan.findUnique({
      where: { title: plan.title },
    });

    if (!existingPlan) {
      await prisma.plan.create({
        data: {
          title: plan.title,
          description: plan.description,
          monthlyPrice: plan.monthlyPrice,
          yearlyPrice: plan.yearlyPrice,
          badge: plan.badge,
          isMusicianPlan: plan.isMusicianPlan,
          isClientPlan: plan.isClientPlan,
          features: {
            create: plan.features,
          },
        },
      });
      plansCreated++;
      console.log(`  ✓ Criado: ${plan.title}`);
    } else {
      console.log(`  ↻ Já existe: ${plan.title}`);
    }
  }

  let faqsCreated = 0;

  console.log('\n❓ Inserindo FAQs...');
  for (const faq of faqs) {
    const existingFaq = await prisma.fAQItem.findFirst({
      where: { question: faq.question },
    });

    if (!existingFaq) {
      await prisma.fAQItem.create({
        data: faq,
      });
      faqsCreated++;
      console.log(`  ✓ Criado: ${faq.question.substring(0, 40)}...`);
    } else {
      console.log(`  ↻ Já existe: ${faq.question.substring(0, 40)}...`);
    }
  }

  console.log('\n✅ Seed concluído com sucesso!');
  console.log(`📊 Resumo:`);
  console.log(`   Gêneros: ${genresCreated} criados, ${genresUpdated} atualizados`);
  console.log(`   Instrumentos: ${instrumentsCreated} criados, ${instrumentsUpdated} atualizados`);
  console.log(`   Planos: ${plansCreated} criados`);
  console.log(`   FAQs: ${faqsCreated} criadas`);
}

main()
  .catch((e) => {
    console.error('\n❌ Erro ao executar seed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
