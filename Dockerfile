# Stage de desenvolvimento para NestJS
FROM node:20-alpine3.18

WORKDIR /app

# Copia package.json e lock files para instalar dependências
# Isso permite que as camadas de dependências sejam cacheadas.
COPY package.json package-lock.json ./

RUN npm install
# Instala todas as dependências (incluindo devDependencies para start:dev)

# Copia todo o código-fonte para o container.
# Para desenvolvimento, com o volume montado, o código do host sobrescreve/sincroniza.
COPY . .

# A linha 'RUN npm run build' pode ser REMOVIDA para desenvolvimento com volumes,
# pois 'npm run start:dev' fará a compilação em tempo real a partir do volume montado.
# EX: RUN npm run build

# Expor a porta que o NestJS usa
EXPOSE 3000

# Comando padrão para iniciar a aplicação em modo de desenvolvimento.
# Com o volume de código-fonte montado, este comando usará o código do host.
CMD ["npm", "run", "start:dev"]