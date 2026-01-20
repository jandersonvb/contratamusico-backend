# 📖 Exemplos de Uso da API - Stripe

Este documento contém exemplos práticos de como usar os endpoints de pagamento da API.

## 📋 Índice

1. [Autenticação](#autenticação)
2. [Consultar Assinatura](#consultar-assinatura)
3. [Criar Checkout](#criar-checkout)
4. [Cancelar Assinatura](#cancelar-assinatura)
5. [Reativar Assinatura](#reativar-assinatura)
6. [Portal do Cliente](#portal-do-cliente)
7. [Histórico de Pagamentos](#histórico-de-pagamentos)
8. [Tratamento de Erros](#tratamento-de-erros)

---

## Autenticação

Todos os endpoints (exceto o webhook) requerem autenticação JWT.

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "senha123"
  }'
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "firstName": "João",
    "lastName": "Silva",
    "userType": "MUSICIAN"
  }
}
```

Use o `access_token` no header `Authorization: Bearer <token>` nas próximas requisições.

---

## Consultar Assinatura

Verifica se o usuário tem assinatura ativa e detalhes do plano.

### Request
```bash
curl -X GET http://localhost:3000/payments/subscription \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Response (com assinatura)
```json
{
  "hasSubscription": true,
  "subscription": {
    "id": 1,
    "status": "active",
    "currentPeriodStart": "2024-01-01T00:00:00.000Z",
    "currentPeriodEnd": "2024-02-01T00:00:00.000Z",
    "cancelAtPeriodEnd": false,
    "plan": {
      "id": 2,
      "title": "Plano Profissional",
      "description": "Para músicos que querem crescer",
      "monthlyPrice": 4990,
      "yearlyPrice": 47900,
      "features": [
        {
          "id": 1,
          "description": "Perfil destacado nas buscas"
        },
        {
          "id": 2,
          "description": "Portfólio ilimitado"
        }
      ]
    }
  }
}
```

### Response (sem assinatura)
```json
{
  "hasSubscription": false
}
```

---

## Criar Checkout

Cria uma sessão de checkout no Stripe para assinar um plano.

### Request - Plano Mensal
```bash
curl -X POST http://localhost:3000/payments/create-checkout \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "planId": 2,
    "billingInterval": "monthly"
  }'
```

### Request - Plano Anual
```bash
curl -X POST http://localhost:3000/payments/create-checkout \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "planId": 3,
    "billingInterval": "yearly"
  }'
```

### Response
```json
{
  "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6"
}
```

**Próximos passos:**
1. Redirecione o usuário para a `checkoutUrl`
2. Usuário preenche dados do cartão no Stripe
3. Após pagamento, Stripe redireciona para `success_url`
4. Webhook processa o evento e cria a assinatura no banco

### Erros Comuns

**Plano gratuito:**
```json
{
  "statusCode": 400,
  "message": "Este plano é gratuito e não requer pagamento"
}
```

**Assinatura ativa existente:**
```json
{
  "statusCode": 400,
  "message": "Você já possui uma assinatura ativa. Acesse o portal para gerenciá-la."
}
```

**Price ID não configurado:**
```json
{
  "statusCode": 400,
  "message": "Configuração de preço não encontrada para este plano"
}
```

---

## Cancelar Assinatura

Cancela a assinatura do usuário. O acesso é mantido até o fim do período pago.

### Request
```bash
curl -X POST http://localhost:3000/payments/cancel \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Response
```json
{
  "message": "Sua assinatura será cancelada em 01/02/2024. Você continuará tendo acesso até essa data.",
  "subscription": {
    "id": 1,
    "status": "active",
    "currentPeriodEnd": "2024-02-01T00:00:00.000Z",
    "cancelAtPeriodEnd": true,
    "plan": {
      "id": 2,
      "title": "Plano Profissional"
    }
  }
}
```

### Erros Comuns

**Sem assinatura:**
```json
{
  "statusCode": 404,
  "message": "Você não possui uma assinatura ativa"
}
```

**Já cancelada:**
```json
{
  "statusCode": 400,
  "message": "Esta assinatura já está cancelada"
}
```

---

## Reativar Assinatura

Reativa uma assinatura que foi cancelada mas ainda está dentro do período pago.

### Request
```bash
curl -X POST http://localhost:3000/payments/reactivate \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Response
```json
{
  "message": "Sua assinatura foi reativada com sucesso!",
  "subscription": {
    "id": 1,
    "status": "active",
    "currentPeriodEnd": "2024-02-01T00:00:00.000Z",
    "cancelAtPeriodEnd": false,
    "plan": {
      "id": 2,
      "title": "Plano Profissional"
    }
  }
}
```

### Erros Comuns

**Assinatura não está cancelada:**
```json
{
  "statusCode": 400,
  "message": "Esta assinatura não está marcada para cancelamento"
}
```

**Período expirado:**
```json
{
  "statusCode": 400,
  "message": "O período da assinatura já expirou. Faça uma nova assinatura."
}
```

---

## Portal do Cliente

Gera um link para o portal de gerenciamento do Stripe, onde o usuário pode:
- Atualizar método de pagamento
- Ver histórico de faturas
- Cancelar assinatura
- Baixar recibos

### Request
```bash
curl -X POST http://localhost:3000/payments/portal \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "returnUrl": "https://contratamusico.com/perfil"
  }'
```

**Nota:** O campo `returnUrl` é opcional. Se não fornecido, usa `FRONTEND_URL/perfil`.

### Response
```json
{
  "portalUrl": "https://billing.stripe.com/p/session/test_YWNjdF8xT..."
}
```

Redirecione o usuário para a `portalUrl`.

### Erro Comum

**Sem assinatura:**
```json
{
  "statusCode": 400,
  "message": "Você precisa ter uma assinatura para acessar o portal"
}
```

---

## Histórico de Pagamentos

Lista todos os pagamentos do usuário com paginação.

### Request
```bash
curl -X GET "http://localhost:3000/payments/history?page=1&limit=10" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Response
```json
{
  "data": [
    {
      "id": 1,
      "amount": 4990,
      "currency": "BRL",
      "status": "succeeded",
      "description": "Assinatura Plano Profissional - 01/01/2024",
      "stripePaymentId": "pi_3AbCdEfGhIjKlMnO",
      "createdAt": "2024-01-01T10:00:00.000Z"
    },
    {
      "id": 2,
      "amount": 4990,
      "currency": "BRL",
      "status": "succeeded",
      "description": "Renovação Plano Profissional - 01/02/2024",
      "stripePaymentId": "pi_3PqRsTuVwXyZaBcD",
      "createdAt": "2024-02-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

### Parâmetros de Query

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| page | number | 1 | Página atual |
| limit | number | 10 | Itens por página |

---

## Tratamento de Erros

### Erros de Autenticação

**Token inválido ou expirado:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**Sem token:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### Erros de Validação

**Campos obrigatórios faltando:**
```json
{
  "statusCode": 400,
  "message": [
    "O ID do plano é obrigatório",
    "O intervalo de cobrança é obrigatório"
  ],
  "error": "Bad Request"
}
```

**Valor inválido:**
```json
{
  "statusCode": 400,
  "message": [
    "Intervalo deve ser \"monthly\" ou \"yearly\""
  ],
  "error": "Bad Request"
}
```

### Erros do Stripe

**Stripe não configurado:**
```json
{
  "statusCode": 400,
  "message": "Sistema de pagamentos não está configurado"
}
```

**Erro na comunicação com Stripe:**
```json
{
  "statusCode": 400,
  "message": "Erro ao criar sessão de pagamento"
}
```

### Erros de Negócio

**Plano não encontrado:**
```json
{
  "statusCode": 404,
  "message": "Plano não encontrado"
}
```

**Usuário não encontrado:**
```json
{
  "statusCode": 404,
  "message": "Usuário não encontrado"
}
```

---

## 🔄 Fluxo Completo de Assinatura

### 1. Usuário sem assinatura

```bash
# 1. Login
TOKEN=$(curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"senha123"}' \
  | jq -r '.access_token')

# 2. Verificar assinatura
curl -X GET http://localhost:3000/payments/subscription \
  -H "Authorization: Bearer $TOKEN"
# Retorna: { "hasSubscription": false }

# 3. Criar checkout
CHECKOUT_URL=$(curl -X POST http://localhost:3000/payments/create-checkout \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"planId":2,"billingInterval":"monthly"}' \
  | jq -r '.checkoutUrl')

# 4. Redirecionar usuário para $CHECKOUT_URL
# 5. Usuário paga no Stripe
# 6. Webhook processa checkout.session.completed
# 7. Assinatura criada no banco
```

### 2. Usuário com assinatura ativa

```bash
# Verificar assinatura
curl -X GET http://localhost:3000/payments/subscription \
  -H "Authorization: Bearer $TOKEN"
# Retorna detalhes da assinatura

# Acessar portal para gerenciar
curl -X POST http://localhost:3000/payments/portal \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"returnUrl":"https://contratamusico.com/perfil"}'
```

### 3. Cancelar e reativar

```bash
# Cancelar
curl -X POST http://localhost:3000/payments/cancel \
  -H "Authorization: Bearer $TOKEN"
# Assinatura marcada para cancelamento

# Mudou de ideia? Reativar
curl -X POST http://localhost:3000/payments/reactivate \
  -H "Authorization: Bearer $TOKEN"
# Assinatura reativada
```

---

## 🧪 Testando com curl

### Script de Teste Completo

Salve como `test-stripe.sh`:

```bash
#!/bin/bash

# Configuração
API_URL="http://localhost:3000"
EMAIL="teste@example.com"
PASSWORD="senha123"

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🧪 Testando API de Pagamentos"
echo "================================"

# 1. Login
echo -e "\n${GREEN}1. Fazendo login...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.access_token')

if [ "$TOKEN" = "null" ]; then
  echo -e "${RED}❌ Erro no login${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Login bem-sucedido${NC}"

# 2. Verificar assinatura
echo -e "\n${GREEN}2. Verificando assinatura...${NC}"
curl -s -X GET "$API_URL/payments/subscription" \
  -H "Authorization: Bearer $TOKEN" | jq

# 3. Criar checkout
echo -e "\n${GREEN}3. Criando checkout...${NC}"
CHECKOUT_RESPONSE=$(curl -s -X POST "$API_URL/payments/create-checkout" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"planId":2,"billingInterval":"monthly"}')

CHECKOUT_URL=$(echo $CHECKOUT_RESPONSE | jq -r '.checkoutUrl')

if [ "$CHECKOUT_URL" != "null" ]; then
  echo -e "${GREEN}✅ Checkout criado${NC}"
  echo "URL: $CHECKOUT_URL"
else
  echo -e "${RED}❌ Erro ao criar checkout${NC}"
  echo $CHECKOUT_RESPONSE | jq
fi

# 4. Histórico
echo -e "\n${GREEN}4. Buscando histórico de pagamentos...${NC}"
curl -s -X GET "$API_URL/payments/history?page=1&limit=5" \
  -H "Authorization: Bearer $TOKEN" | jq

echo -e "\n${GREEN}✅ Testes concluídos${NC}"
```

Execute:
```bash
chmod +x test-stripe.sh
./test-stripe.sh
```

---

## 📚 Recursos Adicionais

- [Documentação completa do Stripe](https://stripe.com/docs)
- [Swagger da API](http://localhost:3000/api)
- [Guia de testes](./TESTES_STRIPE.md)
- [Checklist de produção](./CHECKLIST_STRIPE_PRODUCAO.md)

---

**Dúvidas?** Abra uma issue no repositório ou consulte a documentação oficial do Stripe.
