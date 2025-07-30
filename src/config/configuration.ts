export default () => {


  console.log('Carregando configurações do ambiente...');
  console.log(`Variável de ambiente PORT: ${process.env.PORT}`);
  console.log(`Variável de ambiente DATABASE_TYPE: ${process.env.DATABASE_TYPE}`);
  console.log(`Variável de ambiente JWT_SECRET: ${process.env.JWT_SECRET}`);
  console.log(`Variável de ambiente NEXT_PUBLIC_FRONTEND_BASE_URL: ${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`);
  console.log(`Variável de ambiente GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID}`);
  console.log(`Variável de ambiente FACEBOOK_CLIENT_ID: ${process.env.FACEBOOK_CLIENT_ID}`);
  console.log(`Variável de ambiente DATABASE_HOST: ${process.env.DATABASE_HOST}`);
  console.log(`Variável de ambiente DATABASE_PORT: ${process.env.DATABASE_PORT}`);
  console.log(`Variável de ambiente DATABASE_USERNAME: ${process.env.DATABASE_USERNAME}`);
  console.log(`Variável de ambiente DATABASE_PASSWORD: ${process.env.DATABASE_PASSWORD}`);



  return {
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
      type: process.env.DATABASE_TYPE || 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'umSuperSegredoMuitoComplexoParaDesenvolvimento', // Use uma variável de ambiente real!
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  };
};