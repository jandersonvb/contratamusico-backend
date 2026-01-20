# 🧪 Guia de Testes - Integração Stripe

Este guia fornece instruções detalhadas para testar a integração com Stripe localmente e em ambientes de staging/produção.

## 📋 Índice

1. [Setup Inicial](#setup-inicial)
2. [Testes Locais com Stripe CLI](#testes-locais-com-stripe-cli)
3. [Cenários de Teste](#cenários-de-teste)
4. [Cartões de Teste](#cartões-de-teste)
5. [Testando Webhooks](#testando-webhooks)
6. [Troubleshooting](#troubleshooting)

---

## Setup Inicial

### 1. Instalar Stripe CLI

**Windows (com Chocolatey):**
```bash
choco install stripe-cli
```

**macOS (com Homebrew):**
```bash
brew install stripe/stripe-cli/stripe
```

**Linux:**
```bash
# Debian/Ubuntu
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.0/stripe_1.19.0_linux_x86_64.tar.gz
tar -xvf stripe_1.19.0_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/
```

### 2. Autenticar

```bash
stripe login
```

Isso abrirá seu navegador para autorizar o Stripe CLI.

### 3. Verificar Instalação

```bash
stripe --version
stripe config --list
```

---

## Testes Locais com Stripe CLI

### 1. Configurar Webhook Local

Para testar webhooks localmente, você precisa criar um túnel entre o Stripe e seu servidor local:

```bash
stripe listen --forward-to localhost:3000/payments/webhook
```

**Importante:** Copie o webhook secret que aparece no console:

```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

Adicione esse secret no seu arquivo `.env`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 2. Iniciar Servidor

Em outro terminal, inicie o servidor:

```bash
npm run start:dev
```

### 3. Verificar Conexão

O Stripe CLI mostrará todos os eventos recebidos em tempo real.

---

## Cenários de Teste

### 1. ✅ Checkout Bem-Sucedido

**Objetivo:** Testar fluxo completo de assinatura

**Passos:**
1. Crie um usuário e faça login
2. Faça requisição para criar checkout:
   ```bash
   curl -X POST http://localhost:3000/payments/create-checkout \
     -H "Authorization: Bearer SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"planId": 2, "billingInterval": "monthly"}'
   ```
3. Acesse a URL retornada no navegador
4. Preencha com cartão de teste: `4242 4242 4242 4242`
5. Verifique os webhooks no terminal do Stripe CLI
6. Verifique a assinatura criada no banco:
   ```sql
   SELECT * FROM Subscription WHERE userId = SEU_USER_ID;
   SELECT * FROM PaymentHistory WHERE userId = SEU_USER_ID;
   ```

**Resultado Esperado:**
- ✅ Checkout session criada
- ✅ Webhook `checkout.session.completed` recebido
- ✅ Subscription criada com status `active`
- ✅ PaymentHistory registrado com status `succeeded`
- ✅ Email de confirmação enviado

---

### 2. ❌ Checkout Cancelado

**Objetivo:** Testar quando usuário cancela o checkout

**Passos:**
1. Crie checkout session
2. Acesse a URL
3. Clique no botão "Voltar" ou feche a aba

**Resultado Esperado:**
- ✅ Redirecionamento para `cancel_url`
- ✅ Nenhuma assinatura criada
- ✅ Nenhum email enviado

---

### 3. 💳 Falha no Pagamento

**Objetivo:** Testar falha no cartão de crédito

**Passos:**
1. Crie checkout session
2. Use cartão que falha: `4000 0000 0000 0002`
3. Tente completar pagamento

**Resultado Esperado:**
- ✅ Erro exibido na interface do Stripe
- ✅ Webhook `payment_intent.payment_failed` pode ser recebido
- ✅ Nenhuma assinatura criada

---

### 4. 🔄 Pagamento Recorrente

**Objetivo:** Testar renovação automática da assinatura

**Nota:** Em produção, isso acontece automaticamente. Para testar:

1. Crie uma assinatura
2. No Dashboard do Stripe, encontre a subscription
3. Use a opção "Update subscription" para alterar o billing cycle
4. Ou use a API para criar evento de teste:

```bash
stripe trigger invoice.payment_succeeded
```

**Resultado Esperado:**
- ✅ Webhook `invoice.payment_succeeded` recebido
- ✅ PaymentHistory atualizado
- ✅ `currentPeriodEnd` atualizado na Subscription

---

### 5. 🚫 Cancelamento de Assinatura

**Objetivo:** Testar cancelamento pelo usuário

**Passos:**
1. Crie uma assinatura ativa
2. Faça requisição de cancelamento:
   ```bash
   curl -X POST http://localhost:3000/payments/cancel \
     -H "Authorization: Bearer SEU_TOKEN"
   ```

**Resultado Esperado:**
- ✅ `cancelAtPeriodEnd` = true na Subscription
- ✅ Acesso mantido até `currentPeriodEnd`
- ✅ Status permanece `active`
- ✅ Mensagem informando data de cancelamento

**Testar expiração:**
```bash
# Simular webhook de subscription deletada
stripe trigger customer.subscription.deleted
```

**Resultado Esperado:**
- ✅ Status mudado para `canceled`
- ✅ Email de cancelamento enviado

---

### 6. 🔁 Reativação de Assinatura

**Objetivo:** Testar reativação antes do fim do período

**Passos:**
1. Cancele uma assinatura ativa (passos do cenário 5)
2. Faça requisição de reativação:
   ```bash
   curl -X POST http://localhost:3000/payments/reactivate \
     -H "Authorization: Bearer SEU_TOKEN"
   ```

**Resultado Esperado:**
- ✅ `cancelAtPeriodEnd` = false
- ✅ Assinatura continua ativa normalmente
- ✅ Renovação automática habilitada

---

### 7. 💰 Portal do Cliente

**Objetivo:** Testar acesso ao portal de gerenciamento

**Passos:**
1. Tenha uma assinatura ativa
2. Faça requisição para portal:
   ```bash
   curl -X POST http://localhost:3000/payments/portal \
     -H "Authorization: Bearer SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"returnUrl": "http://localhost:3001/perfil"}'
   ```
3. Acesse a URL retornada

**Resultado Esperado:**
- ✅ Portal do Stripe aberto
- ✅ Pode atualizar método de pagamento
- ✅ Pode ver faturas
- ✅ Pode cancelar assinatura

---

### 8. ⚠️ Falha em Pagamento Recorrente

**Objetivo:** Testar quando renovação falha

**Passos:**
```bash
stripe trigger invoice.payment_failed
```

**Resultado Esperado:**
- ✅ Webhook `invoice.payment_failed` recebido
- ✅ Status da subscription muda para `past_due`
- ✅ PaymentHistory criado com status `failed`
- ✅ Email de aviso enviado ao usuário

---

## Cartões de Teste

### Cartões de Sucesso

| Número | Descrição |
|--------|-----------|
| `4242 4242 4242 4242` | Visa - Aprovado |
| `5555 5555 5555 4444` | Mastercard - Aprovado |
| `3782 822463 10005` | American Express - Aprovado |

### Cartões de Falha

| Número | Erro |
|--------|------|
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0000 0000 0069` | Expired card |
| `4000 0000 0000 0127` | Incorrect CVC |

### Cartões Especiais

| Número | Comportamento |
|--------|---------------|
| `4000 0025 0000 3155` | Requer autenticação 3D Secure |
| `4000 0000 0000 3220` | 3D Secure falha |
| `4000 0000 0000 0341` | Processamento lento (5s) |

**Dados adicionais para qualquer cartão:**
- **Data de expiração:** Qualquer data futura (ex: 12/30)
- **CVV:** Qualquer 3 dígitos (ex: 123)
- **CEP:** Qualquer 5 dígitos (ex: 12345)

---

## Testando Webhooks

### Ver Eventos em Tempo Real

```bash
stripe listen --forward-to localhost:3000/payments/webhook
```

### Testar Webhook Específico

```bash
# Simular checkout completado
stripe trigger checkout.session.completed

# Simular atualização de subscription
stripe trigger customer.subscription.updated

# Simular pagamento bem-sucedido
stripe trigger invoice.payment_succeeded

# Simular falha de pagamento
stripe trigger invoice.payment_failed

# Simular subscription deletada
stripe trigger customer.subscription.deleted
```

### Verificar Eventos no Dashboard

1. Acesse [Dashboard > Developers > Events](https://dashboard.stripe.com/test/events)
2. Veja todos os eventos recentes
3. Clique em um evento para ver detalhes
4. Use "Send test webhook" para reenviar

### Logs de Webhook

No servidor, você verá logs como:

```
[PaymentService] Processando evento webhook: checkout.session.completed
[PaymentService] Processando checkout.session.completed: cs_test_xxx
[PaymentService] Subscription criada/atualizada para usuário 1
```

---

## Troubleshooting

### ❌ Webhook não recebe eventos

**Problema:** Stripe CLI não está enviando eventos

**Solução:**
```bash
# Verifique se o CLI está rodando
stripe listen --forward-to localhost:3000/payments/webhook

# Verifique se o servidor está no ar
curl http://localhost:3000/payments/webhook

# Verifique logs do servidor
```

---

### ❌ Erro "Invalid signature"

**Problema:** Webhook secret incorreto

**Solução:**
```bash
# 1. Pare o stripe listen
# 2. Reinicie e copie o novo secret
stripe listen --forward-to localhost:3000/payments/webhook

# 3. Atualize STRIPE_WEBHOOK_SECRET no .env
# 4. Reinicie o servidor
```

---

### ❌ Price ID não encontrado

**Problema:** Price IDs não configurados

**Solução:**
1. Crie produtos/preços no [Dashboard do Stripe](https://dashboard.stripe.com/test/products)
2. Copie os Price IDs
3. Atualize `.env`:
   ```bash
   STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_xxxxx
   STRIPE_PRICE_PROFESSIONAL_YEARLY=price_yyyyy
   STRIPE_PRICE_PREMIUM_MONTHLY=price_zzzzz
   STRIPE_PRICE_PREMIUM_YEARLY=price_wwwww
   ```
4. Reinicie o servidor

---

### ❌ Customer já existe

**Problema:** Tentando criar customer duplicado

**Solução:**
O sistema já lida com isso automaticamente:
- Busca customer existente por email
- Reutiliza se encontrar
- Cria novo apenas se necessário

Se ainda assim der erro, verifique:
```typescript
// src/payment/payment.service.ts
const existingCustomer = await this.stripeService.getCustomerByEmail(user.email);
```

---

### ❌ Subscription não atualiza

**Problema:** Webhook não está processando corretamente

**Solução:**
1. Verifique logs do servidor
2. Verifique se o evento está chegando:
   ```bash
   stripe listen --print-json
   ```
3. Teste manualmente:
   ```bash
   stripe trigger customer.subscription.updated
   ```
4. Verifique banco de dados:
   ```sql
   SELECT * FROM Subscription WHERE stripeSubscriptionId = 'sub_xxx';
   ```

---

### 💡 Dicas Gerais

1. **Sempre use Test Mode** durante desenvolvimento
2. **Mantenha Stripe CLI rodando** para ver eventos em tempo real
3. **Verifique logs** tanto no servidor quanto no Stripe CLI
4. **Use Dashboard do Stripe** para inspecionar objetos criados
5. **Teste cenários de erro** além dos casos de sucesso
6. **Documente problemas** encontrados para referência futura

---

## 📚 Recursos Adicionais

- [Stripe Testing Docs](https://stripe.com/docs/testing)
- [Stripe CLI Docs](https://stripe.com/docs/stripe-cli)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe API Reference](https://stripe.com/docs/api)

---

**Dúvidas?** Consulte a [documentação oficial do Stripe](https://stripe.com/docs) ou abra uma issue no repositório.
