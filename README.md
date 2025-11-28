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
   - Segredos de JWT (`JWT_SECRET`, `JWT_REFRESH_SECRET`)
   - Portas e tempos de expiração
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

- `POST /auth/register` – Registro (cliente ou músico) + retorno do token
- `POST /auth/login` – Autenticação por email/senha
- `GET /user/me` – Retorna o payload do JWT (requer header `Authorization: Bearer <token>`)

## Próximos passos sugeridos

- CRUD completo de perfis de músico (bio, preço, disponibilidade, portfólio)
- Gestão de bookings, reviews, FAQ e planos
- Upload de mídia (S3/Bunny/etc.) e sistema de assinatura
- Documentação da API (Swagger) e cobertura de testes

---

Com dúvidas ou sugestões, registre issues e pull requests neste repositório. Vamos construir a melhor experiência para contratação de músicos! 💜
