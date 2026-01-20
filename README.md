# Contrata Músico - Backend

API responsável por todo o fluxo de autenticação, cadastro e gestão dos perfis de músicos e clientes na plataforma **Contrata Músico**.

## Tecnologias principais

- [NestJS 10](https://nestjs.com) e TypeScript
- [Prisma ORM](https://www.prisma.io/) com MySQL
- JWT para autenticação
- Class Validator / Transformer para validação de payloads

## Requisitos

- Node.js >= 18
- npm >= 9
- Banco MySQL com um schema criado (ex.: `contratamusico`)

## Configuração

1. Copie o arquivo `.env.example` para `.env` e ajuste os valores:
   - `DATABASE_URL` com o usuário/senha do MySQL
   - Segredos de JWT (`JWT_SECRET`, `JWT_EXPIRES_IN`)
   - Portas e tempos de expiração
   - Configurações do AWS S3 para upload de imagens (veja abaixo)
   - Configurações SMTP para envio de e-mails (veja abaixo)
2. Instale as dependências:

```bash
npm install
```

3. Gere o cliente do Prisma e aplique as migrations:

```bash
npx prisma migrate deploy
# ou para desenvolver
npx prisma migrate dev
```

4. Rode o servidor:

```bash
npm run start:dev
```

O servidor inicializa em `http://localhost:3000` com CORS liberado para integração com o front.

## Configuração do AWS S3 (Upload de Imagens)

Para habilitar o upload de imagem de perfil, configure as seguintes variáveis de ambiente:

```bash
# Região do bucket S3
AWS_REGION=us-east-1

# Credenciais da AWS (IAM user com permissão de escrita no S3)
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key

# Nome do bucket S3
AWS_S3_BUCKET=nome-do-seu-bucket
```

**Requisitos do bucket S3:**
- Permissões de ACL habilitadas (para `public-read`)
- Política de bucket permitindo acesso público aos objetos (para URLs públicas)
- Ou configure CloudFront para servir os arquivos de forma privada

## Configuração do Serviço de Email (Recuperação de Senha)

Para habilitar a recuperação de senha via e-mail, configure as seguintes variáveis de ambiente:

```bash
# Configuração SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false  # true para porta 465, false para outras portas
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-ou-app-password
SMTP_FROM=noreply@contratamusico.com  # Opcional, usa SMTP_USER se não definido

# URL do frontend (para o link de recuperação de senha)
FRONTEND_URL=http://localhost:3001
```

**Nota para Gmail:**
- Se você usa autenticação de dois fatores, precisa gerar uma [senha de aplicativo](https://myaccount.google.com/apppasswords)
- Use essa senha de aplicativo no `SMTP_PASS` ao invés da senha regular

**Outras opções de SMTP:**
- **AWS SES**: host=`email-smtp.us-east-1.amazonaws.com`, port=`587`
- **SendGrid**: host=`smtp.sendgrid.net`, port=`587`
- **Mailgun**: host=`smtp.mailgun.org`, port=`587`

## Scripts úteis

- `npm run start:dev` – Hot reload
- `npm run start:prod` – Executa código compilado
- `npm run build` – Compila para `dist`
- `npm run test` / `npm run test:e2e` – Testes unitários e end-to-end

## Estrutura de módulos

- `auth` – Login e registro com JWT, estratégia `Bearer` e guard
- `user` – Criação e consulta do usuário logado (`/user/me`)
- `prisma` – Serviço compartilhado de banco

Cada registro de músico cria automaticamente um `MusicianProfile` vazio, garantindo relacionamento 1:1 entre usuário e perfil.

## Modelos principais

O arquivo `prisma/schema.prisma` define:

- `User` com enum `UserType` (`CLIENT`, `MUSICIAN`)
- `MusicianProfile`, `PortfolioItem`, `Genre`, `Instrument`
- Áreas de negócio (bookings, reviews, planos, FAQ, contato)

Após alterar o schema execute `npx prisma generate` e a migration correspondente.

## Endpoints já disponíveis

### Autenticação
- `POST /auth/register` – Registro (cliente ou músico) + retorno do token
- `POST /auth/login` – Autenticação por email/senha
- `POST /auth/forgot-password` – Solicita recuperação de senha (envia e-mail com token)
- `POST /auth/reset-password` – Redefine senha com token recebido por e-mail

### Usuário
- `GET /users/me` – Retorna dados do usuário logado (requer `Authorization: Bearer <token>`)
- `PATCH /users/me` – Atualiza dados pessoais do usuário logado
- `POST /users/me/avatar` – Upload de imagem de perfil (multipart/form-data, campo `file`)
  - Aceita: `image/jpeg`, `image/png`, `image/webp`
  - Tamanho máximo: 5MB

## Segurança e Rate Limiting

A API implementa rate limiting usando `@nestjs/throttler`:

- **Padrão global**: 10 requisições por minuto
- **Recuperação de senha**: 
  - `/auth/forgot-password`: 3 requisições a cada 15 minutos
  - `/auth/reset-password`: 5 requisições a cada 15 minutos

O token de recuperação de senha expira em **1 hora** após a solicitação.

## Integração com Stripe (Pagamentos)

A plataforma utiliza o **Stripe** para processar assinaturas recorrentes dos planos Premium e Profissional.

### Configuração do Stripe

1. **Crie uma conta no Stripe** em [stripe.com](https://stripe.com)

2. **Obtenha as chaves da API** (Dashboard > Developers > API keys):
   ```bash
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

3. **Crie os produtos e preços** no Stripe Dashboard:

   **Plano Profissional:**
   - Produto: "Plano Profissional"
   - Preço mensal: R$ 49,90 (4990 centavos)
   - Preço anual: R$ 479,00 (47900 centavos)
   - Copie os Price IDs para as variáveis:
     ```bash
     STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_xxx
     STRIPE_PRICE_PROFESSIONAL_YEARLY=price_yyy
     ```

   **Plano Premium:**
   - Produto: "Plano Premium"
   - Preço mensal: R$ 99,90 (9990 centavos)
   - Preço anual: R$ 959,00 (95900 centavos)
   - Copie os Price IDs para as variáveis:
     ```bash
     STRIPE_PRICE_PREMIUM_MONTHLY=price_zzz
     STRIPE_PRICE_PREMIUM_YEARLY=price_www
     ```

4. **Configure o Webhook** (Dashboard > Developers > Webhooks):
   - Endpoint URL: `https://sua-api.com/payments/webhook`
   - Selecione os eventos:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copie o Webhook Secret:
     ```bash
     STRIPE_WEBHOOK_SECRET=whsec_...
     ```

### Endpoints de Pagamento

**Obter assinatura:**
```http
GET /payments/subscription
Authorization: Bearer <token>
```

**Criar checkout:**
```http
POST /payments/create-checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "planId": 2,
  "billingInterval": "monthly"
}
```

**Cancelar assinatura:**
```http
POST /payments/cancel
Authorization: Bearer <token>
```

**Reativar assinatura:**
```http
POST /payments/reactivate
Authorization: Bearer <token>
```

**Portal do cliente:**
```http
POST /payments/portal
Authorization: Bearer <token>
Content-Type: application/json

{
  "returnUrl": "https://contratamusico.com/perfil"
}
```

**Histórico de pagamentos:**
```http
GET /payments/history?page=1&limit=10
Authorization: Bearer <token>
```

### Testar Localmente

1. **Instale o Stripe CLI:**
   ```bash
   # Windows (com Chocolatey)
   choco install stripe-cli
   
   # Linux/Mac
   brew install stripe/stripe-cli/stripe
   ```

2. **Faça login:**
   ```bash
   stripe login
   ```

3. **Forward webhooks para localhost:**
   ```bash
   stripe listen --forward-to localhost:3000/payments/webhook
   ```
   Copie o webhook secret exibido para a variável `STRIPE_WEBHOOK_SECRET`

4. **Cartões de teste:**
   - ✅ Sucesso: `4242 4242 4242 4242`
   - ❌ Falha: `4000 0000 0000 0002`
   - 🔐 3D Secure: `4000 0025 0000 3155`
   - Data: Qualquer data futura
   - CVV: Qualquer 3 dígitos
   - CEP: Qualquer 5 dígitos

5. **Testar fluxo completo:**
   ```bash
   # 1. Criar usuário e fazer login
   # 2. Chamar POST /payments/create-checkout
   # 3. Acessar a URL retornada
   # 4. Preencher com cartão de teste
   # 5. Verificar webhook no terminal
   # 6. Confirmar assinatura criada no banco
   ```

### Fluxo de Pagamento

```
1. Usuário escolhe plano → POST /payments/create-checkout
2. Backend cria customer no Stripe (se necessário)
3. Backend retorna URL de checkout
4. Frontend redireciona para Stripe Checkout
5. Usuário preenche dados do cartão
6. Stripe processa pagamento
7. Stripe envia webhook → POST /payments/webhook
8. Backend cria/atualiza assinatura no banco
9. Backend envia email de confirmação
10. Stripe redireciona para success_url
```

### Observações Importantes

- O **Plano Básico** (planId 1) é gratuito e não requer pagamento
- Assinaturas canceladas mantêm acesso até o fim do período pago
- Webhooks são essenciais - configure corretamente para sincronizar status
- Use **Test Mode** para desenvolvimento e **Live Mode** apenas em produção
- O Portal do Cliente permite que usuários gerenciem seus próprios métodos de pagamento

## 🚀 Deploy em Produção

### Quick Start

Para colocar a API no ar rapidamente, siga:

**📖 Guia Rápido:** [`QUICK_START_PRODUCTION.md`](QUICK_START_PRODUCTION.md)

### Guias Completos de Deploy

| Plataforma | Tempo | Custo | Dificuldade | Guia |
|------------|-------|-------|-------------|------|
| **Railway** ⭐ | 2-3h | $15/mês | ⭐ Fácil | [`DEPLOY_RAILWAY.md`](DEPLOY_RAILWAY.md) |
| **AWS** | 1 dia | $30/mês | ⭐⭐⭐⭐ Difícil | [`.cursor/plans/deploy_aws_backend_52e660d3.plan.md`](.cursor/plans/deploy_aws_backend_52e660d3.plan.md) |

### Guias de Configuração

- 🔐 **Variáveis de Ambiente:** [`ENV_PRODUCTION_TEMPLATE.md`](ENV_PRODUCTION_TEMPLATE.md)
- 🪣 **AWS S3 (Uploads):** [`S3_SETUP_GUIDE.md`](S3_SETUP_GUIDE.md)
- 💳 **Stripe (Pagamentos):** [`STRIPE_SETUP_GUIDE.md`](STRIPE_SETUP_GUIDE.md)
- 📊 **Monitoramento:** [`MONITORING_GUIDE.md`](MONITORING_GUIDE.md)
- ✅ **Checklist Completo:** [`PRODUCTION_CHECKLIST.md`](PRODUCTION_CHECKLIST.md)

### Scripts Úteis

```bash
# Deploy automatizado no Railway
./scripts/deploy-railway.sh

# Testar API em produção
./scripts/test-production.sh https://sua-api.com
```

---

## 📊 Status do Projeto

### Completude: ~95%

**Funcionalidades Implementadas:**
- ✅ Autenticação completa (JWT, recuperação de senha)
- ✅ Sistema de músicos (CRUD, busca avançada, filtros)
- ✅ Upload para S3 (avatares, portfólio: imagens/vídeos/áudios)
- ✅ Sistema de agendamentos/bookings
- ✅ Chat/mensagens entre usuários
- ✅ Sistema de favoritos
- ✅ Sistema de avaliações (reviews)
- ✅ Integração completa com Stripe (assinaturas)
- ✅ Painel administrativo
- ✅ Sistema de notificações por email
- ✅ Documentação Swagger completa

**O Que Falta:**
- ⚠️ Testes automatizados (unitários, integração, E2E)
- ⚠️ Rate limiting avançado com Redis
- ⚠️ Cache de queries frequentes

**Pronto para Produção:** ✅ **SIM**

---

## Próximos passos sugeridos

- Implementar testes automatizados (Jest/Supertest)
- Adicionar cache com Redis
- Implementar WebSocket para chat em tempo real
- Sistema de notificações push
- Dashboard de analytics avançado
- Modo offline/PWA support

---

## 📞 Suporte

**Documentação:**
- 📖 [Documentação Completa](DOCUMENTACAO.md) - Guia completo para desenvolvedores
- 🚀 [Quick Start Production](QUICK_START_PRODUCTION.md) - Deploy rápido

**Comunidade:**
Com dúvidas ou sugestões, registre issues e pull requests neste repositório. Vamos construir a melhor experiência para contratação de músicos! 💜
