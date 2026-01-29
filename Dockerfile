# Stage 1: Build
FROM node:22-alpine AS builder

# Instalar OpenSSL para o Prisma
RUN apk add --no-cache openssl libc6-compat

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

# Gerar Prisma Client (não precisa de DATABASE_URL no Prisma 6)
RUN npx prisma generate

# Fazer build do NestJS
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

# Instalar OpenSSL para o Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar Prisma Client gerado do stage de build
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copiar o código compilado do stage anterior
COPY --from=builder /app/dist ./dist

# Expor a porta (ajuste se necessário)
EXPOSE 3000

# Comando de start: executar migrations e iniciar aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]