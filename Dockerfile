# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar todas as dependências (incluindo dev)
RUN npm ci

# Copiar código fonte
COPY src ./src

# Gerar Prisma Client
RUN npx prisma generate

# Fazer build do NestJS
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar Prisma Client gerado do stage anterior
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copiar o código compilado do stage anterior
COPY --from=builder /app/dist ./dist

# Expor a porta (ajuste se necessário)
EXPOSE 3000

# Comando de start com migrations
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]