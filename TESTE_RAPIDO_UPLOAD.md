# 🚀 Teste Rápido - Upload com Signed URLs

## ✅ O que foi implementado

1. **Signed URLs**: URLs temporárias e seguras (válidas por 7 dias)
2. **Armazenamento otimizado**: Keys (caminhos) salvos no banco, URLs geradas dinamicamente
3. **Endpoint de renovação**: Gere novas URLs quando expirarem
4. **Segurança**: Arquivos privados no bucket, acesso via assinatura

## ⚠️ IMPORTANTE: Migration Aplicada

O campo `profileImageUrl` foi **renomeado** para `profileImageKey` no banco de dados.
- ✅ Migration já foi aplicada automaticamente
- ✅ Agora salvamos apenas a key (ex: `avatars/1/uuid.jpg`)
- ✅ URL assinada é gerada dinamicamente

**Para mais detalhes, veja:** `MIGRACAO_PROFILE_IMAGE_KEY.md`

---

## 🧪 Testar Agora (Passo a Passo)

### 1️⃣ Iniciar o servidor

```bash
npm run start:dev
```

Aguarde até ver: `Application is running on: http://localhost:3000`

### 2️⃣ Fazer login (via Postman/Insomnia/Thunder Client)

**Request:**
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "seu-email@exemplo.com",
  "password": "sua-senha"
}
```

**Copie o `accessToken` da resposta!**

### 3️⃣ Fazer upload de avatar

**Request:**
- Método: `POST`
- URL: `http://localhost:3000/users/me/avatar`
- Headers:
  ```
  Authorization: Bearer SEU_TOKEN_AQUI
  ```
- Body: `form-data`
  - Campo `file` (tipo File): Selecione uma imagem

**Resposta esperada:**
```json
{
  "id": 1,
  "profileImageUrl": "https://storage.railway.app/contrata-musico-bucket-xwrwf/avatars/1/d8857521-7654-4a56-af45-c700a1672a93.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...",
  "email": "seu-email@exemplo.com",
  "firstName": "João"
}
```

### 4️⃣ Testar a URL no navegador

1. **Copie** a URL do campo `profileImageUrl`
2. **Cole** no navegador
3. **Resultado**: A imagem deve carregar! ✅

## 🔄 Renovar URL (quando expirar)

Após 7 dias, a URL expira. Para renovar:

**Request:**
```
GET http://localhost:3000/upload/signed-url?key=avatars/1/d8857521-7654-4a56-af45-c700a1672a93.jpg
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta:**
```json
{
  "key": "avatars/1/d8857521-7654-4a56-af45-c700a1672a93.jpg",
  "url": "https://storage.railway.app/...[NOVA URL ASSINADA]...",
  "expiresIn": 604800
}
```

## 📸 Testar Upload de Portfólio

**Request:**
- Método: `POST`
- URL: `http://localhost:3000/musicians/me/portfolio/upload`
- Headers:
  ```
  Authorization: Bearer SEU_TOKEN_AQUI
  ```
- Body: `form-data`
  - `file` (File): Imagem/vídeo/áudio
  - `title` (Text): "Minha Apresentação"
  - `description` (Text): "Show incrível" (opcional)
  - `date` (Text): "Janeiro/2025" (opcional)

**Resposta:**
```json
{
  "message": "Arquivo enviado e item criado com sucesso!",
  "item": {
    "id": 1,
    "url": "https://storage.railway.app/...[URL ASSINADA]...",
    "type": "IMAGE",
    "title": "Minha Apresentação",
    "musicianProfileId": 1
  }
}
```

## 🐛 Problemas Comuns

### ❌ "Access Denied" no navegador
- **Causa**: Você está tentando acessar uma URL antiga (pública)
- **Solução**: Faça um novo upload, a nova URL será assinada!

### ❌ "Token expirado"
- **Causa**: JWT expira em 15 minutos
- **Solução**: Faça login novamente para obter novo token

### ❌ "Apenas músicos podem acessar"
- **Causa**: Upload de portfólio requer `userType: "MUSICIAN"`
- **Solução**: Crie um usuário músico no cadastro

## 📊 Swagger UI

Acesse a documentação interativa:

```
http://localhost:3000/api
```

1. Faça login via `/auth/login`
2. Clique em "Authorize" e cole o token
3. Teste os endpoints visualmente!

## ✨ Novos Endpoints Disponíveis

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/users/me/avatar` | POST | Upload de avatar (retorna URL assinada) |
| `/musicians/me/portfolio/upload` | POST | Upload de portfólio (retorna URL assinada) |
| `/upload/signed-url` | GET | Gera nova URL assinada para um arquivo |
| `/upload/signed-urls` | GET | Gera URLs assinadas para múltiplos arquivos |

## 🎉 Tudo Funcionando?

Se a imagem carregou no navegador, **está tudo certo!** 

As URLs agora são:
- ✅ **Seguras** (assinadas criptograficamente)
- ✅ **Temporárias** (7 dias de validade)
- ✅ **Renováveis** (endpoint de renovação)
- ✅ **Privadas** (bucket não precisa ser público)

## 📝 Próximos Passos

1. **Frontend**: Implemente renovação automática de URLs expiradas
2. **Cache**: Armazene URLs no localStorage (valem por 7 dias)
3. **Monitoramento**: Adicione logs para tracking de uploads

---

**Dúvidas?** Consulte: `UPLOAD_SIGNED_URLS.md` (documentação completa)
