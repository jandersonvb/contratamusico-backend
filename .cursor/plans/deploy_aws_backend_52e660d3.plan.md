---
name: Deploy AWS Backend
overview: Este documento descreve o estado atual do backend ContrataMúsico e fornece um guia passo a passo completo para deploy na AWS, incluindo criação de conta e configuração de todos os serviços necessários.
todos:
  - id: create-aws-account
    content: Criar conta AWS e configurar IAM com usuários e permissões
    status: pending
  - id: setup-s3
    content: Criar e configurar bucket S3 para upload de imagens
    status: pending
    dependencies:
      - create-aws-account
  - id: setup-rds
    content: Criar instância RDS MySQL e configurar security groups
    status: pending
    dependencies:
      - create-aws-account
  - id: setup-ses
    content: Configurar Amazon SES para envio de emails (opcional)
    status: pending
    dependencies:
      - create-aws-account
  - id: deploy-ec2
    content: Fazer deploy do backend em EC2 ou App Runner
    status: pending
    dependencies:
      - setup-s3
      - setup-rds
  - id: setup-domain-ssl
    content: Configurar domínio customizado e certificado SSL/HTTPS
    status: pending
    dependencies:
      - deploy-ec2
---

# Estado Atual e Deploy na AWS - ContrataMúsico Backend

## Estado Atual do Backend

O backend está bem estruturado e funcional com as seguintes tecnologias e recursos:

### Stack Tecnológica

- **Framework**: NestJS 10 com TypeScript
- **ORM**: Prisma com MySQL
- **Autenticação**: JWT com Passport
- **Upload**: AWS S3 SDK
- **Email**: Nodemailer
- **Documentação**: Swagger (acessível em `/api`)
- **Segurança**: Rate limiting, CORS, validação de payloads

### Módulos Implementados

```mermaid
graph TB
    subgraph core [Core]
        Auth[Auth - Login/Registro/Recuperação]
        User[User - Perfil/Avatar]
        Prisma[Prisma - Banco de Dados]
    end
    
    subgraph musician [Perfil Músico]
        Musician[Musician - CRUD/Busca]
        Portfolio[Portfolio - Fotos/Videos]
        Review[Review - Avaliações]
    end
    
    subgraph lookup [Dados de Referência]
        Genre[Genre - Gêneros]
        Instrument[Instrument - Instrumentos]
        Location[Location - Locais]
    end
    
    subgraph business [Negócio]
        Booking[Booking - Agendamentos]
        Plan[Plan - Planos de Assinatura]
        FAQ[FAQ - Perguntas Frequentes]
        Contact[Contact - Formulário]
    end
    
    subgraph services [Serviços]
        Upload[Upload - S3]
        Email[Email - SMTP]
    end
    
    Auth --> User
    User --> Musician
    Musician --> Portfolio
    Musician --> Review
    Upload --> User
    Email --> Auth
```



### Endpoints Principais Disponíveis

| Endpoint | Descrição ||----------|-----------|| `POST /auth/register` | Registro de usuário || `POST /auth/login` | Login com JWT || `POST /auth/forgot-password` | Recuperação de senha || `GET /users/me` | Dados do usuário logado || `POST /users/me/avatar` | Upload de foto de perfil || `GET /musicians` | Busca de músicos com filtros || `GET /musicians/:id` | Perfil público do músico || `GET /genres`, `/instruments` | Dados de referência |---

## Passo a Passo para Deploy na AWS

### Fase 1: Criar Conta AWS e Configuração Inicial

#### 1.1 Criar Conta AWS

1. Acesse [aws.amazon.com](https://aws.amazon.com)
2. Clique em "Create an AWS Account"
3. Preencha email, senha e nome da conta
4. Escolha "Personal" ou "Business" (para projetos pessoais, Personal é suficiente)
5. Adicione cartão de crédito (necessário, mas muitos serviços têm free tier)
6. Complete verificação de identidade (SMS)
7. Escolha o plano "Basic Support - Free"

#### 1.2 Configurar IAM (Segurança)

1. No Console AWS, vá para **IAM** (Identity and Access Management)
2. Crie um novo usuário administrativo:

- Users > Add User
- Nome: `admin-contratamusico`
- Access type: Programmatic access + Console access
- Attach policy: `AdministratorAccess`

3. Crie um usuário específico para a aplicação:

- Nome: `contratamusico-backend`
- Attach policies: `AmazonS3FullAccess`, `AmazonSESFullAccess`
- Salve as credenciais (Access Key ID e Secret Access Key)

---

### Fase 2: Configurar Amazon S3 (Upload de Imagens)

#### 2.1 Criar Bucket S3

1. Vá para **S3** no Console AWS
2. Clique em "Create bucket"
3. Configurações:

- Bucket name: `contratamusico-uploads` (deve ser único globalmente)
- Region: `us-east-1` (ou `sa-east-1` para menor latência no Brasil)
- Object Ownership: ACLs enabled
- Block Public Access: Desmarque "Block all public access"
- Confirme o aviso de acesso público

4. Crie o bucket

#### 2.2 Configurar Política do Bucket

Na aba "Permissions" do bucket, adicione esta Bucket Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::contratamusico-uploads/*"
    }
  ]
}
```



#### 2.3 Configurar CORS

Na aba "Permissions" > CORS, adicione:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["http://localhost:3001", "https://seu-dominio.com"],
    "ExposeHeaders": []
  }
]
```

---

### Fase 3: Configurar Banco de Dados (Amazon RDS)

#### 3.1 Criar Instância RDS MySQL

1. Vá para **RDS** no Console AWS
2. Clique em "Create database"
3. Configurações:

- Engine: MySQL 8.0
- Template: Free tier (para começar)
- DB instance identifier: `contratamusico-db`
- Master username: `admin`
- Master password: (crie uma senha forte)
- Instance class: `db.t3.micro` (free tier)
- Storage: 20 GB (ajustável depois)
- Public access: **Yes** (para desenvolvimento; No em produção com VPC)

4. Clique em "Create database" e aguarde ~10 minutos

#### 3.2 Configurar Security Group

1. Na instância RDS, clique no Security Group vinculado
2. Edite Inbound Rules:

- Type: MySQL/Aurora
- Port: 3306
- Source: `0.0.0.0/0` (desenvolvimento) ou seu IP específico

#### 3.3 Criar o Schema

Conecte ao banco usando o endpoint do RDS:

```bash
mysql -h contratamusico-db.xxxxxx.us-east-1.rds.amazonaws.com -u admin -p
```



```sql
CREATE DATABASE contratamusico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### Fase 4: Configurar Amazon SES (Email) - Opcional

Se preferir usar AWS SES em vez de Gmail/SMTP externo:

#### 4.1 Verificar Domínio ou Email

1. Vá para **SES** (Simple Email Service)
2. Em "Verified identities", adicione seu email ou domínio
3. Siga as instruções de verificação

#### 4.2 Solicitar Saída do Sandbox

Por padrão, SES está em sandbox (só envia para emails verificados):

1. Em SES > Account dashboard
2. Clique em "Request production access"
3. Preencha o formulário explicando o uso

---

### Fase 5: Deploy do Backend

#### Opção A: Amazon EC2 (Mais Controle)

1. Criar instância EC2:

- AMI: Amazon Linux 2023 ou Ubuntu 22.04
- Instance type: `t3.micro` (free tier)
- Key pair: Crie ou use existente
- Security Group: Libere portas 22 (SSH), 80 (HTTP), 443 (HTTPS), 3000

2. Conectar via SSH e configurar:
```bash
# Instalar Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs git

# Clonar projeto
git clone https://github.com/seu-usuario/contratamusico-backend.git
cd contratamusico-backend

# Instalar dependências
npm install

# Criar arquivo .env
nano .env
```




3. Configurar `.env`:
```env
# Banco de Dados
DATABASE_URL="mysql://admin:SUA_SENHA@contratamusico-db.xxxxxx.rds.amazonaws.com:3306/contratamusico"

# JWT
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui
JWT_EXPIRES_IN=1d

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_S3_BUCKET=contratamusico-uploads

# Email (Gmail ou SES)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-app-password

# Frontend URL
FRONTEND_URL=https://seu-dominio.com

# Porta
PORT=3000
```




4. Rodar migrations e seed:
```bash
npx prisma migrate deploy
npm run seed
```




5. Compilar e rodar:
```bash
npm run build
npm run start:prod
```




6. Configurar PM2 para manter online:
```bash
npm install -g pm2
pm2 start dist/main.js --name contratamusico-api
pm2 startup
pm2 save
```




#### Opção B: AWS App Runner (Mais Simples)

1. Crie um `Dockerfile` no projeto:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "dist/main.js"]
```




2. No Console AWS, vá para **App Runner**
3. Conecte ao repositório GitHub
4. Configure variáveis de ambiente
5. Deploy automático a cada push

---

### Fase 6: Configurar Domínio e HTTPS

#### 6.1 Registrar Domínio (Route 53 ou externo)

1. Em **Route 53** > Registered domains
2. Registre ou transfira seu domínio

#### 6.2 Configurar SSL com Let's Encrypt (EC2)

```bash
sudo yum install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.contratamusico.com
```



#### 6.3 Usar Load Balancer com ACM (Produção)

1. Em **ACM** (Certificate Manager), solicite certificado SSL gratuito
2. Crie um **Application Load Balancer**
3. Configure HTTPS listener com o certificado

---

## Checklist Final de Variáveis de Ambiente

```env
# Obrigatórias
DATABASE_URL=mysql://user:pass@host:3306/contratamusico
JWT_SECRET=sua_chave_secreta_muito_longa_e_segura

# AWS S3 (para upload de imagens)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxx
AWS_S3_BUCKET=contratamusico-uploads

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=email@gmail.com
SMTP_PASS=app-password

# URLs
FRONTEND_URL=https://contratamusico.com
PORT=3000
```

---

## Custos Estimados (Free Tier)

| Serviço | Free Tier | Após Free Tier ||---------|-----------|----------------|| EC2 t3.micro | 750h/mês (12 meses) | ~$8/mês || RDS db.t3.micro | 750h/mês (12 meses) | ~$15/mês || S3 | 5GB storage | ~$0.023/GB || SES | 62.000 emails/mês | ~$0.10/1000 || **Total inicial** | **$0** | **~$25-30/mês** |---

## Próximos Passos Sugeridos para o Backend

Com base no README, ainda faltam implementar:

1. Sistema de notificações (push/email)
2. Chat entre músico e cliente
3. Integração com gateway de pagamento (Stripe/PagSeguro)
4. Dashboard de métricas/analytics