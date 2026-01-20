---
name: Roadmap Completo Backend
overview: Roadmap completo para evolução do backend Contrata Musico, organizando todas as funcionalidades faltantes em fases priorizadas (MVP Completion, Fase 2 - Experiência, Fase 3 - Escala, Fase 4 - Inovação).
todos:
  - id: phase1-stripe
    content: "Fase 1.1: Integração completa com Stripe (checkout, webhooks, cancelamento, portal)"
    status: pending
  - id: phase1-notifications
    content: "Fase 1.2: Sistema de notificações push e in-app"
    status: pending
  - id: phase1-email-verify
    content: "Fase 1.3: Verificação de email com token"
    status: pending
  - id: phase2-websocket
    content: "Fase 2.1: Chat em tempo real com WebSocket"
    status: pending
  - id: phase2-calendar
    content: "Fase 2.2: Calendário de disponibilidade do músico"
    status: pending
  - id: phase2-proposals
    content: "Fase 2.3: Sistema de propostas e negociação de preço"
    status: pending
  - id: phase2-tags
    content: "Fase 2.4: Sistema de tags customizadas"
    status: pending
  - id: phase2-photos
    content: "Fase 2.5: Múltiplas fotos de perfil"
    status: pending
  - id: phase2-preview
    content: "Fase 2.6: Preview de vídeos externos (YouTube, Vimeo)"
    status: pending
  - id: phase3-kyc
    content: "Fase 3.1: Verificação de identidade (KYC)"
    status: pending
  - id: phase3-moderation
    content: "Fase 3.2: Sistema de denúncias e moderação"
    status: pending
  - id: phase3-contracts
    content: "Fase 3.3: Sistema de contratos digitais com PDF"
    status: pending
  - id: phase3-geo
    content: "Fase 3.4: Geolocalização e busca por proximidade"
    status: pending
  - id: phase3-analytics
    content: "Fase 3.5: Analytics avançado (músico e admin)"
    status: pending
  - id: phase3-ratelimit
    content: "Fase 3.6: Rate limiting avançado com Redis"
    status: pending
  - id: phase4-events
    content: "Fase 4.1: Agenda de eventos públicos do músico"
    status: pending
  - id: phase4-social
    content: "Fase 4.2: Integração com redes sociais (OAuth, importação)"
    status: pending
  - id: phase4-ai-recommendations
    content: "Fase 4.3: Sistema de recomendações com IA"
    status: pending
  - id: phase4-search-ai
    content: "Fase 4.4: Busca inteligente com NLP/Elasticsearch"
    status: pending
  - id: phase4-packages
    content: "Fase 4.5: Pacotes e serviços adicionais"
    status: pending
  - id: phase4-referrals
    content: "Fase 4.6: Sistema de afiliados e indicações"
    status: pending
  - id: phase4-pwa
    content: "Fase 4.7: Modo offline e PWA support"
    status: pending
---

# 🗺️ Roadmap Completo - Contrata Músico Backend

## Visão Geral

Este roadmap organiza todas as funcionalidades necessárias para transformar o backend atual (85% MVP) em uma plataforma madura e competitiva, dividido em 4 fases estratégicas.---

## 📊 Estado Atual vs Objetivo

| Aspecto | Atual | Objetivo ||---------|-------|----------|| **MVP** | 85% | 100% || **Experiência do Usuário** | 60% | 95% || **Escalabilidade** | 70% | 95% || **Recursos Avançados** | 30% | 90% |---

## 🎯 Fase 1: MVP Completion (Essencial para Lançamento)

**Objetivo:** Completar funcionalidades críticas para monetização e experiência básica**Duração Estimada:** 2-3 semanas**Prioridade:** 🔴 CRÍTICA

### 1.1 Integração Completa com Stripe

**Status:** 70% completo (estrutura pronta, falta implementação)**Tarefas:**

- [ ] Instalar e configurar SDK do Stripe
- [ ] Implementar criação de Customer no Stripe
- [ ] Criar endpoint de checkout session (`POST /payments/create-checkout`)
- [ ] Implementar webhook handler para eventos Stripe
- [ ] Processar eventos: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- [ ] Criar endpoint de cancelamento (`POST /payments/cancel`)
- [ ] Criar endpoint para portal do cliente (`POST /payments/portal`)
- [ ] Atualizar tabela Subscription com dados do Stripe
- [ ] Registrar transações em PaymentHistory
- [ ] Testes de integração com Stripe Test Mode
- [ ] Documentar fluxo de pagamento

**Arquivos a criar/modificar:**

- `src/payment/stripe.service.ts` (expandir)
- `src/payment/payment.controller.ts` (novos endpoints)
- `src/payment/payment.service.ts` (lógica de negócio)
- `src/payment/dto/create-checkout.dto.ts` (novo)
- `src/payment/dto/stripe-webhook.dto.ts` (novo)

### 1.2 Sistema de Notificações Push

**Status:** 0% (apenas email existe)**Tarefas:**

- [ ] Escolher provider (Firebase Cloud Messaging ou OneSignal)
- [ ] Criar modelo `NotificationToken` (armazenar tokens de dispositivos)
- [ ] Criar `NotificationModule` e `NotificationService`
- [ ] Endpoint para registrar token: `POST /notifications/register-token`
- [ ] Endpoint para atualizar preferências: `PATCH /notifications/preferences`
- [ ] Integrar notificações nos eventos principais:
- Nova solicitação de booking
- Mudança de status de booking
- Nova mensagem no chat
- Nova avaliação recebida
- Favorito (músico foi favoritado)
- [ ] Sistema de notificações in-app (tabela `Notification`)
- [ ] Endpoint para listar notificações: `GET /notifications`
- [ ] Endpoint para marcar como lida: `PATCH /notifications/:id/read`
- [ ] Endpoint para contador: `GET /notifications/unread/count`

**Arquivos a criar:**

- `src/notification/notification.module.ts`
- `src/notification/notification.service.ts`
- `src/notification/notification.controller.ts`
- `prisma/schema.prisma` (adicionar modelos Notification e NotificationToken)

### 1.3 Verificação de Email

**Status:** 0%**Tarefas:**

- [ ] Adicionar campo `emailVerified` em User
- [ ] Adicionar campos `verificationToken` e `verificationTokenExpiry`
- [ ] Criar endpoint: `POST /auth/send-verification`
- [ ] Criar endpoint: `POST /auth/verify-email`
- [ ] Template de email de verificação
- [ ] Middleware para checar email verificado em ações sensíveis
- [ ] Badge de "verificado" no perfil

---

## 🚀 Fase 2: Experiência do Usuário (Diferenciação)

**Objetivo:** Melhorar significativamente a experiência e engajamento**Duração Estimada:** 3-4 semanas**Prioridade:** 🟡 ALTA

### 2.1 Chat em Tempo Real (WebSocket)

**Status:** 0% (atual é REST)**Tarefas:**

- [ ] Instalar `@nestjs/websockets` e `socket.io`
- [ ] Criar `ChatGateway` para WebSocket
- [ ] Eventos: `join_conversation`, `send_message`, `typing`, `read_message`
- [ ] Broadcast de mensagens em tempo real
- [ ] Indicador de "digitando..."
- [ ] Status online/offline dos usuários
- [ ] Notificação visual de novas mensagens
- [ ] Fallback para REST se WebSocket falhar
- [ ] Limitar conexões por usuário (prevenir abuso)

**Arquivos a criar/modificar:**

- `src/chat/chat.gateway.ts` (novo)
- `src/chat/chat.service.ts` (adicionar métodos para WS)
- Atualizar frontend para usar Socket.io client

### 2.2 Calendário de Disponibilidade

**Status:** 0%**Tarefas:**

- [ ] Criar modelo `Availability` (dias da semana, horários, datas específicas bloqueadas)
- [ ] Criar modelo `AvailabilityException` (férias, eventos já agendados)
- [ ] CRUD de disponibilidade: `POST/GET/PATCH/DELETE /musicians/me/availability`
- [ ] Endpoint público: `GET /musicians/:id/availability?month=2025-06`
- [ ] Validação de conflitos ao criar booking
- [ ] Sugestão de horários disponíveis
- [ ] Integração com Google Calendar (opcional)
- [ ] Visualização de calendário no frontend

**Arquivos a criar:**

- `src/availability/availability.module.ts`
- `src/availability/availability.service.ts`
- `src/availability/availability.controller.ts`
- `prisma/schema.prisma` (modelos Availability e AvailabilityException)

### 2.3 Sistema de Propostas e Negociação

**Status:** 0% (booking é direto)**Tarefas:**

- [ ] Criar modelo `Proposal` (valor proposto, detalhes, status)
- [ ] Cliente cria proposta: `POST /bookings/:id/proposals`
- [ ] Músico pode contra-propor: `POST /bookings/:id/proposals/:proposalId/counter`
- [ ] Aceitar/rejeitar proposta: `PATCH /proposals/:id/accept` ou `/reject`
- [ ] Histórico de negociação visível
- [ ] Notificações a cada nova proposta
- [ ] Limite de contra-propostas (ex: 3 por booking)

**Arquivos a criar:**

- `src/proposal/proposal.module.ts`
- `src/proposal/proposal.service.ts`
- `src/proposal/proposal.controller.ts`
- `prisma/schema.prisma` (modelo Proposal)

### 2.4 Sistema de Tags Customizadas

**Status:** 0% (apenas gêneros/instrumentos predefinidos)**Tarefas:**

- [ ] Criar modelo `Tag` (nome, categoria, contagem de uso)
- [ ] Criar modelo junction `MusicianTag`
- [ ] Endpoint para adicionar tags: `POST /musicians/me/tags`
- [ ] Endpoint para buscar por tags: `GET /musicians?tags[]=casamento&tags[]=festa-corporativa`
- [ ] Sugestões de tags populares: `GET /tags/popular`
- [ ] Autocomplete de tags: `GET /tags/search?q=casa`
- [ ] Limite de tags por músico (ex: 10)
- [ ] Moderação de tags ofensivas

**Arquivos a criar:**

- `src/tag/tag.module.ts`
- `src/tag/tag.service.ts`
- `src/tag/tag.controller.ts`
- `prisma/schema.prisma` (modelos Tag e MusicianTag)

### 2.5 Múltiplas Fotos de Perfil

**Status:** 0% (apenas 1 avatar)**Tarefas:**

- [ ] Criar modelo `ProfileImage` (userId, url, isMain, order)
- [ ] Upload de múltiplas fotos: `POST /users/me/photos`
- [ ] Definir foto principal: `PATCH /users/me/photos/:id/set-main`
- [ ] Reordenar fotos: `PATCH /users/me/photos/reorder`
- [ ] Deletar foto: `DELETE /users/me/photos/:id`
- [ ] Limite de fotos (ex: 5 fotos no plano básico, 15 no premium)
- [ ] Galeria de fotos no perfil público

**Arquivos a criar:**

- Modificar `src/user/user.controller.ts` (novos endpoints)
- Modificar `src/user/user.service.ts`
- `prisma/schema.prisma` (modelo ProfileImage)

### 2.6 Preview de Vídeos Externos

**Status:** 0%**Tarefas:**

- [ ] Detectar URLs do YouTube, Vimeo, SoundCloud
- [ ] Extrair ID do vídeo via regex
- [ ] Buscar metadata (título, thumbnail, duração) via API
- [ ] Armazenar thumbnail e metadata no PortfolioItem
- [ ] Endpoint para adicionar link externo: `POST /musicians/me/portfolio/external`
- [ ] Validação de URLs
- [ ] Renderização de embed no frontend

**Arquivos a modificar:**

- `src/portfolio/portfolio.service.ts` (adicionar métodos de parsing)
- `src/portfolio/dto/create-portfolio-item.dto.ts` (aceitar externalUrl)

---

## ⚖️ Fase 3: Confiança e Escalabilidade

**Objetivo:** Segurança, moderação e preparação para crescimento**Duração Estimada:** 3-4 semanas**Prioridade:** 🟢 MÉDIA

### 3.1 Verificação de Identidade (KYC)

**Status:** 0%**Tarefas:**

- [ ] Integração com serviço de KYC (Stripe Identity, Veriff, ou similar)
- [ ] Criar modelo `IdentityVerification` (status, documentType, verificadoEm)
- [ ] Endpoint para iniciar verificação: `POST /users/me/verify-identity`
- [ ] Webhook para processar resultado da verificação
- [ ] Badge "Verificado" no perfil
- [ ] Filtro de busca por músicos verificados
- [ ] Dashboard admin para revisar verificações manuais (fallback)

**Arquivos a criar:**

- `src/verification/verification.module.ts`
- `src/verification/verification.service.ts`
- `src/verification/verification.controller.ts`
- `prisma/schema.prisma` (modelo IdentityVerification)

### 3.2 Sistema de Denúncias e Moderação

**Status:** 0%**Tarefas:**

- [ ] Criar modelo `Report` (tipo, targetId, targetType, reason, status, evidências)
- [ ] Endpoint para denunciar: `POST /reports`
- [ ] Tipos: PROFILE, MESSAGE, REVIEW, PORTFOLIO_ITEM
- [ ] Razões: SPAM, INAPPROPRIATE_CONTENT, HARASSMENT, FAKE_PROFILE, OTHER
- [ ] Dashboard admin para revisar denúncias: `GET /admin/reports`
- [ ] Ações: DISMISS, WARN_USER, SUSPEND_USER, DELETE_CONTENT
- [ ] Endpoint para tomar ação: `PATCH /admin/reports/:id/action`
- [ ] Email para usuário quando ação é tomada
- [ ] Sistema de suspensão temporária (campo `suspendedUntil` em User)
- [ ] Histórico de infrações por usuário

**Arquivos a criar:**

- `src/report/report.module.ts`
- `src/report/report.service.ts`
- `src/report/report.controller.ts`
- Expandir `src/admin/admin.controller.ts` (endpoints de moderação)
- `prisma/schema.prisma` (modelo Report)

### 3.3 Sistema de Contratos Digitais

**Status:** 0%**Tarefas:**

- [ ] Criar modelo `Contract` (bookingId, termos, assinaturaCliente, assinaturaMúsico, dataCriação, dataAssinatura)
- [ ] Template de contrato padrão (configurável)
- [ ] Gerar PDF do contrato: `POST /bookings/:id/contract`
- [ ] Assinar contrato digitalmente: `POST /contracts/:id/sign`
- [ ] Download do contrato: `GET /contracts/:id/download`
- [ ] Armazenar PDF no S3
- [ ] Campos customizáveis (valor, data, local, condições especiais)
- [ ] Status: DRAFT, AWAITING_SIGNATURES, SIGNED, CANCELLED

**Arquivos a criar:**

- `src/contract/contract.module.ts`
- `src/contract/contract.service.ts`
- `src/contract/contract.controller.ts`
- Instalar biblioteca de geração de PDF (ex: pdfmake)
- `prisma/schema.prisma` (modelo Contract)

### 3.4 Geolocalização e Mapas

**Status:** 0% (apenas cidade/estado em texto)**Tarefas:**

- [ ] Adicionar campos `latitude` e `longitude` em MusicianProfile
- [ ] Endpoint para geocodificar endereço: `POST /musicians/me/geocode`
- [ ] Integração com Google Maps API ou Mapbox
- [ ] Busca por proximidade: `GET /musicians?lat=-23.550&lng=-46.633&radius=50` (km)
- [ ] Ordenar resultados por distância
- [ ] Exibir músicos no mapa (frontend)
- [ ] Privacidade: mostrar apenas área aproximada (não endereço exato)

**Arquivos a modificar:**

- `src/musician/musician.service.ts` (adicionar busca geoespacial)
- `src/musician/dto/search-musicians.dto.ts` (adicionar lat, lng, radius)
- `prisma/schema.prisma` (adicionar campos latitude/longitude)

### 3.5 Analytics Avançado

**Status:** 30% (apenas métricas básicas no admin)**Tarefas:**

- [ ] Criar modelo `Analytics` (evento, userId, metadata, timestamp)
- [ ] Tracking de eventos:
- Visualizações de perfil
- Cliques em "Contatar"
- Conversões (booking confirmado)
- Taxa de resposta do músico
- Tempo médio de resposta
- [ ] Dashboard do músico: `GET /musicians/me/analytics`
- [ ] Métricas:
- Visualizações nos últimos 30 dias
- Taxa de conversão (visualizações → bookings)
- Origem do tráfego
- Performance por gênero/instrumento
- [ ] Dashboard admin expandido:
- Crescimento de usuários (gráfico temporal)
- Retenção de usuários
- Churn de assinaturas
- Top músicos por bookings
- Receita por período
- [ ] Exportar relatórios: `GET /admin/analytics/export?format=csv`

**Arquivos a criar:**

- `src/analytics/analytics.module.ts`
- `src/analytics/analytics.service.ts`
- `src/analytics/analytics.controller.ts`
- Expandir `src/admin/admin.service.ts` (métricas avançadas)
- `prisma/schema.prisma` (modelo Analytics)

### 3.6 Rate Limiting Avançado

**Status:** 50% (apenas global de 10/min)**Tarefas:**

- [ ] Rate limiting por IP e por usuário
- [ ] Limites diferenciados por plano:
- Básico: 50 req/min
- Profissional: 100 req/min
- Premium: 200 req/min
- [ ] Endpoints específicos com limites próprios:
- Upload: 5/min
- Busca: 30/min
- Criar booking: 10/hora
- [ ] Redis para cache de contadores (melhor performance)
- [ ] Headers de resposta com limite restante
- [ ] Bloqueio temporário após múltiplas violações

**Arquivos a modificar:**

- `src/app.module.ts` (configurar Throttler com Redis)
- Decorators customizados em controllers

---

## 🌟 Fase 4: Inovação e Diferenciação

**Objetivo:** Features únicas que destacam a plataforma**Duração Estimada:** 4-6 semanas**Prioridade:** 🔵 BAIXA (Nice to have)

### 4.1 Agenda de Eventos Públicos

**Status:** 0%**Tarefas:**

- [ ] Criar modelo `PublicEvent` (musicianProfileId, nome, local, data, tipo, link, isPublic)
- [ ] Músico pode cadastrar eventos: `POST /musicians/me/events`
- [ ] CRUD completo de eventos
- [ ] Endpoint público: `GET /musicians/:id/events/upcoming`
- [ ] Filtro de eventos: `GET /events?city=SP&date=2025-06`
- [ ] Integração com Google Calendar (exportar)
- [ ] Contador de interessados (usuários podem "marcar presença")

**Arquivos a criar:**

- `src/event/event.module.ts`
- `src/event/event.service.ts`
- `src/event/event.controller.ts`
- `prisma/schema.prisma` (modelo PublicEvent)

### 4.2 Integração com Redes Sociais

**Status:** 0%**Tarefas:**

- [ ] OAuth login: Login com Google, Facebook
- [ ] Vincular contas sociais: `POST /users/me/social-accounts/connect`
- [ ] Campos em MusicianProfile: `instagramUrl`, `youtubeUrl`, `spotifyUrl`, `soundcloudUrl`
- [ ] Importar conteúdo do Instagram (fotos) automaticamente
- [ ] Importar vídeos do YouTube automaticamente
- [ ] Buscar estatísticas (seguidores do Instagram) para exibir
- [ ] Compartilhar perfil em redes sociais (Open Graph tags)

**Arquivos a criar:**

- `src/social/social.module.ts`
- `src/social/social.service.ts`
- `src/social/social.controller.ts`
- Instalar `passport-google-oauth20`, `passport-facebook`
- `prisma/schema.prisma` (modelo SocialAccount)

### 4.3 Sistema de Recomendações (IA)

**Status:** 0%**Tarefas:**

- [ ] Algoritmo de recomendação baseado em:
- Histórico de busca do usuário
- Músicos favoritados
- Avaliações dadas
- Bookings anteriores
- Popularidade (trending)
- [ ] Endpoint: `GET /musicians/recommendations`
- [ ] Sistema de "Músicos semelhantes": `GET /musicians/:id/similar`
- [ ] Machine Learning (opcional): treinar modelo com TensorFlow
- [ ] A/B testing de algoritmos diferentes

**Arquivos a criar:**

- `src/recommendation/recommendation.module.ts`
- `src/recommendation/recommendation.service.ts`
- `src/recommendation/recommendation.controller.ts`

### 4.4 Busca com IA/NLP

**Status:** 0% (busca é apenas SQL LIKE)**Tarefas:**

- [ ] Integração com Elasticsearch ou Algolia
- [ ] Indexar músicos com campos relevantes
- [ ] Busca fuzzy (tolera erros de digitação)
- [ ] Busca semântica: "pianista para casamento romântico" encontra músicos de jazz piano
- [ ] Sinônimos e expansão de consulta
- [ ] Autocomplete inteligente
- [ ] Ranqueamento por relevância (não apenas por rating)

**Arquivos a criar:**

- `src/search/search.module.ts`
- `src/search/search.service.ts`
- Configuração de Elasticsearch/Algolia

### 4.5 Pacotes e Serviços Adicionais

**Status:** 0%**Tarefas:**

- [ ] Criar modelo `Package` (musicianProfileId, nome, descrição, preço, itensInclusos)
- [ ] Criar modelo `AddOnService` (nome, descrição, preço)
- [ ] Músico cria pacotes: `POST /musicians/me/packages`
- [ ] Cliente escolhe pacote ao fazer booking
- [ ] Add-ons: equipamento extra, horas adicionais, músicos extras
- [ ] Calculadora de preço automática

**Arquivos a criar:**

- `src/package/package.module.ts`
- `src/package/package.service.ts`
- `src/package/package.controller.ts`
- `prisma/schema.prisma` (modelos Package e AddOnService)

### 4.6 Sistema de Afiliados/Indicações

**Status:** 0%**Tarefas:**

- [ ] Criar modelo `Referral` (referrerId, referredId, status, comissão)
- [ ] Gerar código de indicação único: `GET /users/me/referral-code`
- [ ] Registrar indicações no cadastro
- [ ] Recompensas:
- Indicador: desconto ou crédito quando indicado assina plano
- Indicado: desconto no primeiro mês
- [ ] Dashboard de indicações: `GET /users/me/referrals`
- [ ] Sistema de comissão para influencers (opcional)

**Arquivos a criar:**

- `src/referral/referral.module.ts`
- `src/referral/referral.service.ts`
- `src/referral/referral.controller.ts`
- `prisma/schema.prisma` (modelo Referral)

### 4.7 Modo Offline/PWA Support

**Status:** 0%**Tarefas:**

- [ ] Service Worker para cache de assets
- [ ] Cache de listagens de músicos
- [ ] Fila de sincronização para ações offline
- [ ] Indicador de status de conexão
- [ ] Manifest.json para PWA
- [ ] Push notifications via service worker

**Arquivos a criar:**

- Configuração no frontend (service-worker.js)
- Backend: garantir headers corretos (Cache-Control)

---

## 📦 Melhorias de Infraestrutura

### Banco de Dados

- [ ] Adicionar índices em campos de busca (city, state, genres, instruments)
- [ ] Índices compostos para queries comuns
- [ ] Particionamento de tabelas grandes (Analytics, Messages)
- [ ] Backup automático diário
- [ ] Read replicas para queries pesadas

### Performance

- [ ] Implementar Redis para cache
- [ ] Cache de listagens populares (músicos featured, top rated)
- [ ] Cache de dados de referência (gêneros, instrumentos)
- [ ] CDN para assets estáticos
- [ ] Lazy loading de imagens
- [ ] Compressão de respostas (gzip)

### Monitoramento

- [ ] Integrar Sentry para error tracking
- [ ] Logs estruturados (Winston ou Pino)
- [ ] APM (Application Performance Monitoring) - New Relic ou Datadog
- [ ] Health checks: `GET /health`
- [ ] Métricas Prometheus
- [ ] Alertas para erros críticos

### Segurança

- [ ] Helmet.js para headers de segurança
- [ ] CSRF protection
- [ ] Input sanitization (prevenir XSS)
- [ ] SQL injection protection (Prisma já ajuda)
- [ ] Validação de arquivos (antivírus na nuvem)
- [ ] 2FA (autenticação de dois fatores)

### Testing

- [ ] Testes unitários (cobertura 80%+)
- [ ] Testes de integração
- [ ] Testes E2E
- [ ] CI/CD pipeline
- [ ] Testes de carga (k6 ou Artillery)

### Documentação

- [ ] Swagger completo e atualizado
- [ ] Postman collection
- [ ] Exemplos de integração
- [ ] Changelog versionado
- [ ] Guia de migração de versões

---

## 📈 Métricas de Sucesso

### Técnicas

- Uptime > 99.9%
- Tempo de resposta médio < 200ms
- Cobertura de testes > 80%
- Zero vulnerabilidades críticas

### Produto

- Taxa de conclusão de cadastro > 60%
- Taxa de conversão (busca → booking) > 5%
- Retenção de músicos (30 dias) > 40%
- NPS (Net Promoter Score) > 50

---

## 🎯 Priorização Recomendada

### Lançamento (4-6 semanas)

1. ✅ Stripe completo (Fase 1.1)
2. ✅ Notificações push (Fase 1.2)
3. ✅ Verificação de email (Fase 1.3)
4. ✅ Chat em tempo real (Fase 2.1)

### Pós-lançamento imediato (2-3 meses)

5. ✅ Calendário de disponibilidade (Fase 2.2)
6. ✅ Sistema de propostas (Fase 2.3)
7. ✅ Tags customizadas (Fase 2.4)
8. ✅ Verificação de identidade (Fase 3.1)

### Crescimento (3-6 meses)

9. ✅ Sistema de denúncias (Fase 3.2)
10. ✅ Geolocalização (Fase 3.4)
11. ✅ Analytics avançado (Fase 3.5)
12. ✅ Múltiplas fotos (Fase 2.5)

### Inovação (6-12 meses)

13. ✅ Integração redes sociais (Fase 4.2)
14. ✅ Recomendações IA (Fase 4.3)
15. ✅ Sistema de afiliados (Fase 4.6)

---

## 💰 Estimativa de Esforço

| Fase | Tempo | Desenvolvedores | Custo Aproximado ||------|-------|-----------------|------------------|| Fase 1 | 2-3 semanas | 1-2 | R$ 10.000 - 20.000 || Fase 2 | 3-4 semanas | 2 | R$ 20.000 - 35.000 || Fase 3 | 3-4 semanas | 2 | R$ 20.000 - 35.000 || Fase 4 | 4-6 semanas | 2 | R$ 30.000 - 50.000 || **TOTAL** | **3-4 meses** | **2** | **R$ 80.000 - 140.000** |---

## 🚦 Decisão: Próximos Passos

Você quer que eu:

1. **Detalhe apenas a Fase 1** (MVP Completion) para implementação imediata?