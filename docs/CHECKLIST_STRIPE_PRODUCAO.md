# ✅ Checklist - Deploy Stripe em Produção

Este checklist garante que a integração com Stripe está pronta para produção.

## 🔐 Segurança

- [ ] **Chaves de Produção configuradas**
  - [ ] `STRIPE_SECRET_KEY` usando chave `sk_live_...` (não `sk_test_...`)
  - [ ] `STRIPE_PUBLISHABLE_KEY` usando chave `pk_live_...` (não `pk_test_...`)
  - [ ] Chaves armazenadas em variáveis de ambiente seguras (não commitadas no Git)

- [ ] **Webhook Secret configurado**
  - [ ] Webhook criado no Stripe Dashboard (Live Mode)
  - [ ] URL correta: `https://sua-api.com/payments/webhook`
  - [ ] `STRIPE_WEBHOOK_SECRET` configurado com chave `whsec_...`
  - [ ] HTTPS obrigatório (Stripe rejeita HTTP em produção)

- [ ] **Validação de Assinaturas**
  - [ ] Todas as requisições de webhook validam a assinatura
  - [ ] Erros de assinatura inválida são logados e rejeitados

- [ ] **Dados Sensíveis**
  - [ ] Nunca logar dados completos do cartão
  - [ ] Nunca expor `STRIPE_SECRET_KEY` no frontend
  - [ ] PCI compliance mantido (Stripe Checkout cuida disso)

---

## 💳 Produtos e Preços

- [ ] **Produtos criados no Stripe Dashboard (Live Mode)**
  - [ ] Plano Básico - Grátis (não requer produto Stripe)
  - [ ] Plano Profissional - R$ 49,90/mês
  - [ ] Plano Profissional - R$ 479,00/ano
  - [ ] Plano Premium - R$ 99,90/mês
  - [ ] Plano Premium - R$ 959,00/ano

- [ ] **Price IDs configurados no .env**
  - [ ] `STRIPE_PRICE_PROFESSIONAL_MONTHLY`
  - [ ] `STRIPE_PRICE_PROFESSIONAL_YEARLY`
  - [ ] `STRIPE_PRICE_PREMIUM_MONTHLY`
  - [ ] `STRIPE_PRICE_PREMIUM_YEARLY`

- [ ] **Preços corretos**
  - [ ] Valores em centavos (4990 = R$ 49,90)
  - [ ] Moeda configurada como BRL
  - [ ] Tipo de cobrança: Recorrente (Recurring)
  - [ ] Intervalo correto (monthly/yearly)

---

## 🔔 Webhooks

- [ ] **Eventos configurados**
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
  - [ ] `invoice.payment_succeeded`
  - [ ] `invoice.payment_failed`

- [ ] **Endpoint funcionando**
  - [ ] Webhook recebe eventos corretamente
  - [ ] Assinaturas são criadas/atualizadas no banco
  - [ ] Logs mostram processamento de eventos
  - [ ] Erros são tratados e logados

- [ ] **Retry e Idempotência**
  - [ ] Eventos duplicados não causam problemas
  - [ ] Sistema lida com reentrega de eventos
  - [ ] Timeout adequado (< 5 segundos por evento)

---

## 📧 Emails

- [ ] **Templates configurados**
  - [ ] Email de confirmação de pagamento
  - [ ] Email de falha de pagamento
  - [ ] Email de cancelamento de assinatura
  - [ ] Variáveis dinâmicas funcionando

- [ ] **SMTP configurado**
  - [ ] Servidor SMTP em produção
  - [ ] Credenciais válidas
  - [ ] From address verificado
  - [ ] Rate limits do provedor respeitados

- [ ] **Conteúdo dos emails**
  - [ ] Links apontam para produção
  - [ ] Formatação correta em diferentes clientes
  - [ ] Textos sem erros
  - [ ] Marca/logo da empresa

---

## 🔗 URLs e Redirecionamentos

- [ ] **URLs de produção configuradas**
  - [ ] `FRONTEND_URL` aponta para domínio de produção
  - [ ] Success URL: `${FRONTEND_URL}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`
  - [ ] Cancel URL: `${FRONTEND_URL}/planos?canceled=true`

- [ ] **Portal do Cliente**
  - [ ] Portal configurado no Stripe Dashboard
  - [ ] Return URL configurada
  - [ ] Funcionalidades habilitadas (cancelar, atualizar pagamento, ver faturas)

---

## 🗄️ Banco de Dados

- [ ] **Schema atualizado**
  - [ ] Tabela `Subscription` com todos os campos
  - [ ] Tabela `PaymentHistory` criada
  - [ ] Índices criados em campos de busca frequente
  - [ ] Migrations aplicadas

- [ ] **Dados iniciais**
  - [ ] Planos (Basic, Professional, Premium) criados
  - [ ] Features dos planos configuradas
  - [ ] Dados de seed aplicados

- [ ] **Integridade referencial**
  - [ ] Foreign keys configuradas
  - [ ] Cascade delete/update onde apropriado
  - [ ] Constraints de unicidade

---

## 🧪 Testes

- [ ] **Testes em Staging**
  - [ ] Checkout completo funcionando
  - [ ] Webhooks recebidos e processados
  - [ ] Emails sendo enviados
  - [ ] Portal do cliente acessível
  - [ ] Cancelamento funcionando
  - [ ] Reativação funcionando

- [ ] **Casos de erro testados**
  - [ ] Cartão recusado
  - [ ] Falha de pagamento recorrente
  - [ ] Webhook inválido
  - [ ] Usuário sem assinatura tenta cancelar
  - [ ] Price ID inválido

- [ ] **Performance**
  - [ ] Checkout criado em < 2 segundos
  - [ ] Webhooks processados em < 5 segundos
  - [ ] Consultas ao banco otimizadas
  - [ ] Rate limiting configurado

---

## 📊 Monitoramento

- [ ] **Logs estruturados**
  - [ ] Todos os eventos importantes logados
  - [ ] Erros com stack trace
  - [ ] Níveis de log adequados (info, warn, error)
  - [ ] Logs indexados e pesquisáveis

- [ ] **Métricas**
  - [ ] Taxa de conversão de checkout
  - [ ] Tempo de processamento de webhook
  - [ ] Taxa de falha de pagamentos
  - [ ] Churns (cancelamentos)

- [ ] **Alertas**
  - [ ] Alerta quando webhook falha
  - [ ] Alerta quando taxa de falha > X%
  - [ ] Alerta quando Stripe está fora do ar
  - [ ] Alerta quando email não é enviado

---

## 🚀 Deploy

- [ ] **Variáveis de ambiente**
  - [ ] Todas as variáveis do Stripe configuradas
  - [ ] Variáveis não expostas publicamente
  - [ ] Documentação atualizada

- [ ] **Servidor**
  - [ ] HTTPS configurado (obrigatório)
  - [ ] Certificado SSL válido
  - [ ] Raw body middleware configurado
  - [ ] CORS configurado corretamente

- [ ] **Rollback plan**
  - [ ] Backup do banco antes do deploy
  - [ ] Versão anterior disponível para rollback
  - [ ] Processo de rollback documentado

---

## 📚 Documentação

- [ ] **README atualizado**
  - [ ] Instruções de configuração do Stripe
  - [ ] Endpoints documentados
  - [ ] Variáveis de ambiente listadas

- [ ] **API Documentation (Swagger)**
  - [ ] Endpoints de pagamento documentados
  - [ ] Exemplos de requisição/resposta
  - [ ] Códigos de erro documentados

- [ ] **Runbooks**
  - [ ] Como lidar com falha de webhook
  - [ ] Como fazer refund manualmente
  - [ ] Como investigar pagamento problemático
  - [ ] Contato de suporte do Stripe

---

## 💰 Compliance e Legal

- [ ] **Termos de Uso**
  - [ ] Política de cancelamento clara
  - [ ] Política de reembolso definida
  - [ ] Termos aceitos antes do checkout

- [ ] **Impostos**
  - [ ] Taxas brasileiras configuradas (se aplicável)
  - [ ] Notas fiscais automatizadas (se aplicável)
  - [ ] Compliance com legislação local

- [ ] **LGPD/GDPR**
  - [ ] Dados do usuário protegidos
  - [ ] Política de privacidade atualizada
  - [ ] Direito de exclusão de dados implementado

---

## 🎯 Suporte ao Cliente

- [ ] **Portal do cliente disponível**
  - [ ] Fácil acesso via interface
  - [ ] Instruções claras de uso

- [ ] **FAQ atualizado**
  - [ ] Como cancelar assinatura
  - [ ] Como atualizar cartão
  - [ ] O que acontece quando pagamento falha
  - [ ] Como fazer upgrade/downgrade

- [ ] **Canais de suporte**
  - [ ] Email de suporte configurado
  - [ ] Tempo de resposta definido
  - [ ] Equipe treinada sobre Stripe

---

## 🔍 Auditoria Final

- [ ] **Code Review**
  - [ ] Tratamento de erros adequado
  - [ ] Sem secrets hardcoded
  - [ ] Logs sensíveis removidos
  - [ ] Best practices seguidas

- [ ] **Segurança**
  - [ ] Dependências atualizadas
  - [ ] Vulnerabilidades conhecidas corrigidas
  - [ ] Rate limiting configurado
  - [ ] Input validation em todos os endpoints

- [ ] **Performance**
  - [ ] Queries otimizadas
  - [ ] Índices no banco de dados
  - [ ] Cache onde apropriado
  - [ ] Load testing realizado

---

## 📞 Contatos Importantes

- **Stripe Support:** https://support.stripe.com/
- **Stripe Status:** https://status.stripe.com/
- **Documentação:** https://stripe.com/docs

---

## ✅ Aprovação Final

- [ ] Todos os itens acima verificados
- [ ] Testes em staging passando
- [ ] Equipe de produto aprovou
- [ ] Equipe técnica aprovou
- [ ] Deploy autorizado

---

**Data do Deploy:** __________

**Responsável:** __________

**Revisado por:** __________

---

## 🔄 Pós-Deploy

Após o deploy, monitore por **48 horas**:

- [ ] Webhooks sendo recebidos
- [ ] Emails sendo enviados
- [ ] Checkouts sendo completados
- [ ] Nenhum erro crítico nos logs
- [ ] Métricas dentro do esperado

**Contato de Emergência:** __________

**Plano de Rollback Testado:** [ ] Sim [ ] Não
