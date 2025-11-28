import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  console.log('\n✅ Seed concluído com sucesso!');
  console.log(`📊 Resumo:`);
  console.log(`   Gêneros: ${genresCreated} criados, ${genresUpdated} atualizados`);
  console.log(`   Instrumentos: ${instrumentsCreated} criados, ${instrumentsUpdated} atualizados`);
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
