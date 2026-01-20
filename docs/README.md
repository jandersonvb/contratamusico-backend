# 📚 Documentação do Backend - Contrata Músico

Bem-vindo à documentação completa do backend da plataforma Contrata Músico!

## 📖 Índice Geral

### 🚀 Começando
- [README Principal](../README.md) - Configuração inicial e visão geral do projeto
- [Variáveis de Ambiente](.env.example) - Template de configuração

### 💳 Integração com Stripe (Pagamentos)
- [Exemplos da API](./EXEMPLOS_API_STRIPE.md) - Como usar os endpoints de pagamento
- [Guia de Testes](./TESTES_STRIPE.md) - Testes locais e com Stripe CLI
- [Checklist de Produção](./CHECKLIST_STRIPE_PRODUCAO.md) - O que verificar antes do deploy
- [Plano de Implementação](../.cursor/plans/integracao_stripe_completa.plan.md) - Detalhes técnicos da implementação

### 📋 Outras Documentações
- [Documentação Geral](../DOCUMENTACAO.md) - Visão geral da arquitetura e módulos
- [Implementação MVP](../IMPLEMENTACAO_MVP.md) - Status do MVP e funcionalidades
- [Recuperação de Senha](../RECUPERACAO_SENHA.md) - Como funciona o fluxo de senha
- [Instruções de Migration](../INSTRUCOES_MIGRATION.md) - Como gerenciar migrations do Prisma

---

## 🎯 Guias Rápidos

### Para Desenvolvedores

**Iniciar o projeto:**
```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env (copiar do .env.example)
cp .env.example .env

# 3. Rodar migrations
npx prisma migrate dev

# 4. Seed do banco (opcional)
npm run seed

# 5. Iniciar servidor
npm run start:dev
```

**Testar integração Stripe:**
```bash
# 1. Configurar variáveis do Stripe no .env
# 2. Iniciar Stripe CLI
stripe listen --forward-to localhost:3000/payments/webhook

# 3. Copiar webhook secret exibido
# 4. Testar checkout
curl -X POST http://localhost:3000/payments/create-checkout \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"planId":2,"billingInterval":"monthly"}'
```

### Para DevOps

**Deploy checklist:**
1. ✅ Verificar [Checklist de Produção](./CHECKLIST_STRIPE_PRODUCAO.md)
2. ✅ Configurar todas as variáveis de ambiente
3. ✅ Criar produtos/preços no Stripe (Live Mode)
4. ✅ Configurar webhook em produção
5. ✅ Testar em staging primeiro
6. ✅ Monitorar logs após deploy

**Variáveis críticas:**
```bash
DATABASE_URL=            # MySQL connection string
JWT_SECRET=              # Mínimo 32 caracteres
STRIPE_SECRET_KEY=       # sk_live_...
STRIPE_WEBHOOK_SECRET=   # whsec_...
FRONTEND_URL=            # URL do frontend em produção
SMTP_HOST=               # Servidor de email
```

### Para QA

**Testar funcionalidades:**
- [ ] Cadastro de usuário (Cliente e Músico)
- [ ] Login e autenticação
- [ ] Recuperação de senha
- [ ] Upload de avatar
- [ ] Criação de checkout
- [ ] Processamento de pagamento (usar cartões de teste)
- [ ] Cancelamento de assinatura
- [ ] Reativação de assinatura
- [ ] Portal do cliente
- [ ] Webhooks (verificar logs)
- [ ] Envio de emails

**Cartões de teste:**
- ✅ `4242 4242 4242 4242` - Sucesso
- ❌ `4000 0000 0000 0002` - Falha
- 🔐 `4000 0025 0000 3155` - 3D Secure

---

## 🏗️ Arquitetura

```
src/
├── auth/              # Autenticação (JWT, Guards)
├── user/              # Gestão de usuários
├── musician/          # Perfil de músicos
├── payment/           # 💳 Integração Stripe
├── booking/           # Contratações
├── chat/              # Mensagens
├── review/            # Avaliações
├── favorite/          # Favoritos
├── portfolio/         # Portfólio (fotos/vídeos)
├── plan/              # Planos de assinatura
├── genre/             # Gêneros musicais
├── instrument/        # Instrumentos
├── location/          # Localização (cidades/estados)
├── faq/               # Perguntas frequentes
├── contact/           # Contato/Suporte
├── email/             # Envio de emails
├── upload/            # Upload de arquivos (S3)
├── admin/             # Painel administrativo
└── prisma/            # Database service
```

---

## 🔌 Endpoints Principais

### Autenticação
```
POST   /auth/register          Cadastro
POST   /auth/login             Login
POST   /auth/forgot-password   Esqueci senha
POST   /auth/reset-password    Resetar senha
```

### Usuário
```
GET    /users/me               Meus dados
PATCH  /users/me               Atualizar dados
POST   /users/me/avatar        Upload avatar
```

### Pagamentos (Stripe)
```
GET    /payments/subscription      Ver assinatura
POST   /payments/create-checkout   Criar checkout
POST   /payments/cancel            Cancelar
POST   /payments/reactivate        Reativar
POST   /payments/portal            Portal cliente
GET    /payments/history           Histórico
POST   /payments/webhook           Webhook (Stripe)
```

### Músicos
```
GET    /musicians                  Buscar músicos
GET    /musicians/:id              Detalhes do músico
PATCH  /musicians/profile          Atualizar perfil
```

### Bookings
```
GET    /bookings                   Minhas contratações
POST   /bookings                   Nova contratação
PATCH  /bookings/:id/status        Atualizar status
```

### Outras
```
GET    /genres                     Listar gêneros
GET    /instruments                Listar instrumentos
GET    /plans                      Listar planos
GET    /faq                        FAQ
POST   /contact                    Contato
```

**Documentação completa:** http://localhost:3000/api (Swagger)

---

## 🧪 Testes

### Testes Unitários
```bash
npm run test
```

### Testes E2E
```bash
npm run test:e2e
```

### Testes de Integração Stripe
Consulte: [Guia de Testes Stripe](./TESTES_STRIPE.md)

---

## 🔒 Segurança

### Autenticação
- JWT com expiração configurável
- Refresh tokens implementados
- Passwords hasheados com bcrypt

### Rate Limiting
- Global: 10 req/min
- Recuperação de senha: 3 req/15min
- Reset de senha: 5 req/15min

### Validação
- Class Validator em todos os DTOs
- Whitelist habilitado
- Transform habilitado

### Stripe
- Webhook signature validation
- Secret keys em variáveis de ambiente
- PCI compliance (via Stripe Checkout)

---

## 📊 Monitoramento

### Logs
O sistema usa Logger do NestJS com níveis:
- `log` - Informações gerais
- `warn` - Avisos
- `error` - Erros (com stack trace)

### Eventos do Stripe
Todos os eventos de webhook são logados:
```
[PaymentService] Processando evento webhook: checkout.session.completed
[PaymentService] Subscription criada/atualizada para usuário 1
```

### Métricas Importantes
- Taxa de conversão de checkout
- Taxa de falha de pagamento
- Tempo de resposta dos endpoints
- Uptime do serviço

---

## 🆘 Suporte

### Problemas Comuns

**Webhook não funciona:**
- Verifique se Stripe CLI está rodando
- Verifique `STRIPE_WEBHOOK_SECRET` no .env
- Verifique logs do servidor

**Emails não enviados:**
- Verifique configurações SMTP no .env
- Gmail requer senha de app
- Verifique logs do EmailService

**Erro ao criar checkout:**
- Verifique se Price IDs estão configurados
- Verifique se Stripe keys são válidas
- Plano Básico é gratuito (não precisa checkout)

### Contatos

- **Issues do Projeto:** [GitHub Issues](https://github.com/seu-repo/issues)
- **Stripe Support:** https://support.stripe.com/
- **Documentação Stripe:** https://stripe.com/docs

---

## 🚀 Roadmap

### ✅ Implementado
- Sistema de autenticação completo
- CRUD de usuários e músicos
- Integração completa com Stripe
- Sistema de bookings
- Chat entre usuários
- Avaliações e favoritos
- Upload de imagens (S3)
- Sistema de emails
- Recuperação de senha
- Rate limiting
- Documentação Swagger

### 🔄 Em Progresso
- Testes automatizados
- CI/CD pipeline

### 📋 Planejado
- Notificações push
- Dashboard de analytics
- Upload de vídeos/áudio
- Sistema de denúncias
- Internacionalização (i18n)

---

## 📝 Contribuindo

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Convenções de Código

- Use TypeScript
- Siga o style guide do ESLint
- Adicione testes para novas funcionalidades
- Atualize a documentação
- Use commits semânticos

---

## 📄 Licença

Este projeto é privado e proprietário.

---

## 🙏 Agradecimentos

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Stripe](https://stripe.com/)
- [AWS](https://aws.amazon.com/)

---

**Última atualização:** Janeiro 2026

**Versão da API:** 1.0.0

**Versão do Node:** 18+
