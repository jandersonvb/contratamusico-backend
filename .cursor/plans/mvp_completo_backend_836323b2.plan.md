---
name: MVP Completo Backend
overview: Plano completo para finalizar o backend do ContrataMúsico antes do deploy, incluindo pagamentos, chat, portfólio expandido, favoritos, notificações, painel admin, Swagger completo e CI/CD.
todos:
  - id: swagger-docs
    content: Adicionar documentação Swagger completa em todos os endpoints
    status: completed
  - id: favorites-module
    content: Criar módulo de favoritos (model, controller, service)
    status: completed
    dependencies:
      - swagger-docs
  - id: portfolio-upload
    content: Expandir upload para suportar vídeos e áudios no portfólio
    status: completed
    dependencies:
      - swagger-docs
  - id: chat-module
    content: Criar sistema de chat/mensagens entre usuários
    status: completed
    dependencies:
      - portfolio-upload
  - id: email-notifications
    content: Implementar notificações por email para bookings, mensagens, reviews
    status: completed
    dependencies:
      - chat-module
  - id: payment-integration
    content: Integrar Stripe para pagamentos e assinaturas de planos
    status: completed
    dependencies:
      - email-notifications
  - id: admin-panel
    content: Criar painel administrativo com dashboard e gestão
    status: completed
    dependencies:
      - payment-integration
  - id: cicd-pipeline
    content: Configurar GitHub Actions para CI/CD e criar .env.example
    status: completed
    dependencies:
      - admin-panel
---

# Plano de Implementacao - MVP Completo ContrataMúsico

## Visao Geral

Este plano cobre todas as funcionalidades necessárias para um MVP completo antes do deploy na AWS. A implementação está organizada em fases com dependências claras.

```mermaid
gantt
    title Roadmap de Implementacao
    dateFormat  YYYY-MM-DD
    section Fase 1 - Base
    Swagger Completo           :f1, 2026-01-07, 2d
    Sistema de Favoritos       :f2, 2026-01-07, 2d
    Upload Portfolio           :f3, after f1, 3d
    section Fase 2 - Comunicacao
    Sistema de Chat            :f4, after f3, 5d
    Notificacoes Email         :f5, after f4, 3d
    section Fase 3 - Monetizacao
    Integracao Pagamentos      :f6, after f5, 5d
    section Fase 4 - Admin
    Painel Administrativo      :f7, after f6, 5d
    section Fase 5 - DevOps
    CI/CD Pipeline             :f8, after f7, 2d
```

---

## Fase 1: Fundacao (Estimativa: 1 semana)

### 1.1 Documentacao Swagger Completa

**Arquivos a modificar:**

- [src/main.ts](src/main.ts) - Configuração base do Swagger
- Todos os controllers - Adicionar decorators

**O que implementar:**

- Decorators `@ApiTags`, `@ApiOperation`, `@ApiResponse` em todos os endpoints
- Schemas de request/response com `@ApiProperty`
- Exemplos de uso
- Autenticação Bearer documentada
- Agrupamento por módulos

**Dependências npm:** Nenhuma nova (já tem `@nestjs/swagger`)---

### 1.2 Sistema de Favoritos

**Novo modelo no Prisma:**

```prisma
model Favorite {
  id                Int             @id @default(autoincrement())
  userId            Int
  musicianProfileId Int
  user              User            @relation(fields: [userId], references: [id])
  musicianProfile   MusicianProfile @relation(fields: [musicianProfileId], references: [id])
  createdAt         DateTime        @default(now())
  
  @@unique([userId, musicianProfileId])
}
```

**Novos arquivos:**

- `src/favorite/favorite.module.ts`
- `src/favorite/favorite.controller.ts`
- `src/favorite/favorite.service.ts`

**Endpoints:**| Método | Rota | Descricao ||--------|------|-----------|| POST | `/favorites/:musicianId` | Adicionar aos favoritos || DELETE | `/favorites/:musicianId` | Remover dos favoritos || GET | `/favorites` | Listar favoritos do usuário || GET | `/favorites/check/:musicianId` | Verificar se é favorito |---

### 1.3 Upload de Portfolio (Video/Audio)

**Modificar arquivos existentes:**

- [src/upload/upload.service.ts](src/upload/upload.service.ts) - Adicionar suporte a video/audio
- [src/portfolio/portfolio.controller.ts](src/portfolio/portfolio.controller.ts) - Endpoint de upload
- [src/portfolio/portfolio.service.ts](src/portfolio/portfolio.service.ts) - Lógica de criação

**Tipos permitidos:**

- Video: `video/mp4`, `video/webm`, `video/quicktime`
- Audio: `audio/mpeg`, `audio/wav`, `audio/ogg`
- Limite: 50MB para videos, 10MB para áudios

**Novo endpoint:**| Método | Rota | Descricao ||--------|------|-----------|| POST | `/portfolio/upload` | Upload de arquivo de portfolio || DELETE | `/portfolio/:id` | Remover item do portfolio |---

## Fase 2: Comunicacao (Estimativa: 1.5 semanas)

### 2.1 Sistema de Chat/Mensagens

**Novos modelos no Prisma:**

```prisma
model Conversation {
  id                Int       @id @default(autoincrement())
  clientId          Int
  musicianProfileId Int
  client            User      @relation("ClientConversations", fields: [clientId], references: [id])
  musicianProfile   MusicianProfile @relation(fields: [musicianProfileId], references: [id])
  messages          Message[]
  lastMessageAt     DateTime  @default(now())
  createdAt         DateTime  @default(now())
  
  @@unique([clientId, musicianProfileId])
}

model Message {
  id             Int          @id @default(autoincrement())
  conversationId Int
  senderId       Int
  content        String       @db.Text
  isRead         Boolean      @default(false)
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  sender         User         @relation(fields: [senderId], references: [id])
  createdAt      DateTime     @default(now())
}
```

**Novos arquivos:**

- `src/chat/chat.module.ts`
- `src/chat/chat.controller.ts`
- `src/chat/chat.service.ts`
- `src/chat/dto/send-message.dto.ts`

**Endpoints:**| Método | Rota | Descricao ||--------|------|-----------|| GET | `/conversations` | Listar conversas do usuário || GET | `/conversations/:id` | Detalhes da conversa com mensagens || POST | `/conversations/:musicianId/messages` | Enviar mensagem || PATCH | `/conversations/:id/read` | Marcar como lida || GET | `/conversations/unread-count` | Contador de não lidas |**Opcional futuro:** WebSocket com `@nestjs/websockets` para tempo real---

### 2.2 Sistema de Notificacões por Email

**Novos templates de email:**

- Novo booking recebido (músico)
- Booking confirmado/cancelado (cliente)
- Nova mensagem recebida
- Nova avaliação recebida
- Boas-vindas ao cadastrar

**Modificar arquivos:**

- [src/email/email.service.ts](src/email/email.service.ts) - Adicionar novos métodos e templates

**Novos métodos:**

```typescript
sendBookingNotification(musician, booking)
sendNewMessageNotification(recipient, sender)
sendReviewNotification(musician, review)
sendWelcomeEmail(user)
```

**Novo modelo para preferências:**

```prisma
model NotificationPreference {
  id            Int     @id @default(autoincrement())
  userId        Int     @unique
  user          User    @relation(fields: [userId], references: [id])
  emailBookings Boolean @default(true)
  emailMessages Boolean @default(true)
  emailReviews  Boolean @default(true)
  emailNews     Boolean @default(true)
}
```

---

## Fase 3: Monetizacao (Estimativa: 1 semana)

### 3.1 Integracao com Gateway de Pagamento

**Opção recomendada:** Stripe (mais fácil) ou PagSeguro (mais brasileiro)**Dependências:**

```bash
npm install stripe
# ou
npm install pagseguro
```

**Novos modelos:**

```prisma
model Subscription {
  id                    Int       @id @default(autoincrement())
  userId                Int       @unique
  user                  User      @relation(fields: [userId], references: [id])
  planId                Int
  plan                  Plan      @relation(fields: [planId], references: [id])
  stripeSubscriptionId  String?   @unique
  stripeCustomerId      String?
  status                String    // active, canceled, past_due
  currentPeriodStart    DateTime
  currentPeriodEnd      DateTime
  cancelAtPeriodEnd     Boolean   @default(false)
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
}

model PaymentHistory {
  id             Int      @id @default(autoincrement())
  userId         Int
  user           User     @relation(fields: [userId], references: [id])
  amount         Int      // em centavos
  currency       String   @default("BRL")
  status         String   // succeeded, failed, pending
  stripePaymentId String?
  createdAt      DateTime @default(now())
}
```

**Novos arquivos:**

- `src/payment/payment.module.ts`
- `src/payment/payment.controller.ts`
- `src/payment/payment.service.ts`
- `src/payment/stripe.service.ts`
- `src/payment/webhook.controller.ts`

**Endpoints:**| Método | Rota | Descricao ||--------|------|-----------|| POST | `/payments/create-checkout` | Criar sessão de checkout || POST | `/payments/webhook` | Webhook do Stripe || GET | `/payments/subscription` | Status da assinatura || POST | `/payments/cancel` | Cancelar assinatura || GET | `/payments/history` | Histórico de pagamentos || POST | `/payments/portal` | Link para portal do cliente |---

## Fase 4: Painel Administrativo (Estimativa: 1 semana)

### 4.1 Módulo Admin

**Novo guard de admin:**

- `src/auth/guards/admin.guard.ts`

**Adicionar role ao User:**

```prisma
enum UserRole {
  USER
  ADMIN
}

model User {
  // ... campos existentes
  role UserRole @default(USER)
}
```

**Novos arquivos:**

- `src/admin/admin.module.ts`
- `src/admin/admin.controller.ts`
- `src/admin/admin.service.ts`

**Endpoints Admin:**| Método | Rota | Descricao ||--------|------|-----------|| GET | `/admin/dashboard` | Métricas gerais || GET | `/admin/users` | Listar usuários || PATCH | `/admin/users/:id` | Editar usuário || DELETE | `/admin/users/:id` | Remover usuário || GET | `/admin/musicians` | Listar músicos || PATCH | `/admin/musicians/:id/featured` | Destacar músico || GET | `/admin/bookings` | Listar agendamentos || GET | `/admin/subscriptions` | Listar assinaturas || GET | `/admin/revenue` | Relatório de receita || POST | `/admin/faq` | Criar FAQ || PATCH | `/admin/faq/:id` | Editar FAQ || DELETE | `/admin/faq/:id` | Remover FAQ |**Dashboard retorna:**

```json
{
  "totalUsers": 150,
  "totalMusicians": 45,
  "totalClients": 105,
  "totalBookings": 89,
  "activeSubscriptions": 32,
  "monthlyRevenue": 159800,
  "recentSignups": [...],
  "recentBookings": [...]
}
```

---

## Fase 5: DevOps (Estimativa: 2-3 dias)

### 5.1 Pipeline CI/CD com GitHub Actions

**Novo arquivo:** `.github/workflows/ci.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run build
      
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Deploy to EC2
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /app/contratamusico-backend
            git pull origin main
            npm ci --production
            npx prisma migrate deploy
            pm2 restart contratamusico-api
```



### 5.2 Arquivo .env.example

**Novo arquivo:** `.env.example`

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/contratamusico"

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@contratamusico.com

# Stripe (Pagamentos)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PUBLIC_KEY=pk_test_xxxxx

# URLs
FRONTEND_URL=http://localhost:3001
PORT=3000
```

---

## Resumo de Arquivos a Criar

| Fase | Módulo | Arquivos ||------|--------|----------|| 1 | Favorite | module, controller, service || 1 | Upload | Modificar service existente || 2 | Chat | module, controller, service, dto || 2 | Email | Modificar service existente || 3 | Payment | module, controller, service, stripe.service, webhook || 4 | Admin | module, controller, service, guard || 5 | DevOps | .github/workflows/ci.yml, .env.example |---

## Ordem de Implementacao Recomendada

1. **Swagger Completo** - Documenta o que já existe
2. **Favoritos** - Simples, independente
3. **Upload Portfolio** - Expande funcionalidade existente
4. **Notificações Email** - Melhora UX do que já existe
5. **Chat** - Nova funcionalidade core
6. **Pagamentos** - Monetização
7. **Admin** - Gestão da plataforma
8. **CI/CD** - Automação do deploy

---

## Estimativa Total

| Fase | Tempo Estimado ||------|----------------|| Fase 1 - Base | 5-7 dias || Fase 2 - Comunicação | 7-10 dias || Fase 3 - Monetização | 5-7 dias || Fase 4 - Admin | 5-7 dias || Fase 5 - DevOps | 2-3 dias |