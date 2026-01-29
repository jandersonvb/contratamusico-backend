# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar todas as dependências (incluindo dev)
RUN npm ci

# Copiar código fonte
COPY src ./src

# Fazer build do NestJS (sem gerar Prisma Client aqui)
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar o código compilado do stage anterior
COPY --from=builder /app/dist ./dist

# Expor a porta (ajuste se necessário)
EXPOSE 3000

# Comando de start: gerar Prisma Client, executar migrations e iniciar aplicação
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/main"]