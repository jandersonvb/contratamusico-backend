# 🔐 Upload com Signed URLs - Railway Bucket

## Visão Geral

Implementamos um sistema de **URLs assinadas (Signed URLs)** para acesso seguro aos arquivos no Railway Bucket. As URLs são temporárias e expiram após 7 dias por padrão.

## 🎯 Vantagens das Signed URLs

- ✅ **Segurança**: Arquivos privados no bucket, acesso controlado via URLs temporárias
- ✅ **Controle de Acesso**: URLs expiram após determinado tempo
- ✅ **Performance**: Sem necessidade de proxy, acesso direto ao bucket
- ✅ **Flexibilidade**: Renove URLs quando necessário

## 📦 Como Funciona

### 1. Upload de Arquivo

Quando você faz upload de um arquivo:

```http
POST /users/me/avatar
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [arquivo]
```

**Resposta:**
```json
{
  "id": 1,
  "profileImageUrl": "https://storage.railway.app/contrata-musico-bucket-xwrwf/avatars/1/uuid.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...",
  "email": "usuario@exemplo.com"
}
```

A URL retornada é uma **Signed URL** válida por **7 dias** (604.800 segundos).

### 2. Renovar URL (quando expirar)

Quando a URL expirar (após 7 dias), você pode gerar uma nova:

```http
GET /upload/signed-url?key=avatars/1/uuid.jpg
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "key": "avatars/1/uuid.jpg",
  "url": "https://storage.railway.app/contrata-musico-bucket-xwrwf/avatars/1/uuid.jpg?X-Amz-Algorithm=...",
  "expiresIn": 604800
}
```

### 3. Renovar Múltiplas URLs

Para renovar URLs de múltiplos arquivos de uma vez (útil para portfólio):

```http
GET /upload/signed-urls?keys=avatars/1/file1.jpg,portfolio/1/image/file2.jpg
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "urls": [
    {
      "key": "avatars/1/file1.jpg",
      "url": "https://storage.railway.app/..."
    },
    {
      "key": "portfolio/1/image/file2.jpg",
      "url": "https://storage.railway.app/..."
    }
  ],
  "expiresIn": 604800
}
```

## 🚀 Testando Localmente

### 1. Iniciar o servidor

```bash
npm run start:dev
```

### 2. Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu-email@exemplo.com","password":"sua-senha"}'
```

Copie o `accessToken` retornado.

### 3. Fazer upload de avatar

```bash
curl -X POST http://localhost:3000/users/me/avatar \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -F "file=@/caminho/para/imagem.jpg"
```

### 4. Acessar a imagem

Copie a URL retornada no campo `profileImageUrl` e cole no navegador. A imagem deve carregar normalmente! 🎉

### 5. Renovar URL (após expiração)

```bash
curl -X GET "http://localhost:3000/upload/signed-url?key=avatars/1/uuid.jpg" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 📋 Endpoints Disponíveis

### Upload de Avatar
- **Rota**: `POST /users/me/avatar`
- **Auth**: Sim (JWT)
- **Retorna**: URL assinada válida por 7 dias

### Upload de Portfólio
- **Rota**: `POST /musicians/me/portfolio/upload`
- **Auth**: Sim (JWT, apenas músicos)
- **Retorna**: URL assinada válida por 7 dias

### Gerar Signed URL
- **Rota**: `GET /upload/signed-url?key={key}&expiresIn={seconds}`
- **Auth**: Sim (JWT)
- **Params**:
  - `key` (obrigatório): Chave do arquivo (ex: `avatars/1/uuid.jpg`)
  - `expiresIn` (opcional): Tempo em segundos (padrão: 604800 = 7 dias)

### Gerar Múltiplas Signed URLs
- **Rota**: `GET /upload/signed-urls?keys={key1,key2,key3}&expiresIn={seconds}`
- **Auth**: Sim (JWT)
- **Params**:
  - `keys` (obrigatório): Chaves separadas por vírgula
  - `expiresIn` (opcional): Tempo em segundos

## 🔧 Configuração

Certifique-se de que as variáveis de ambiente estão configuradas:

```env
AWS_ENDPOINT=https://storage.railway.app
AWS_REGION=auto
AWS_S3_BUCKET=contrata-musico-bucket-xwrwf
AWS_ACCESS_KEY_ID=tid_...
AWS_SECRET_ACCESS_KEY=tsec_...
```

## 🎨 Integração Frontend

### Exemplo React/Next.js

```typescript
// Upload de avatar
const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3000/users/me/avatar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  console.log('Avatar URL:', data.profileImageUrl);
  // URL válida por 7 dias!
};

// Renovar URL quando expirar
const renewUrl = async (key: string) => {
  const response = await fetch(
    `http://localhost:3000/upload/signed-url?key=${key}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.url; // Nova URL válida por 7 dias
};

// Detectar quando URL expirou e renovar automaticamente
const getValidUrl = async (currentUrl: string, key: string) => {
  try {
    // Tentar carregar a imagem
    const response = await fetch(currentUrl);
    if (response.ok) {
      return currentUrl; // URL ainda válida
    }
  } catch (error) {
    // URL expirada, renovar
  }
  
  return await renewUrl(key);
};
```

## 💡 Dicas

1. **Armazene a `key` no banco de dados**: Além da URL, salve sempre a `key` do arquivo para poder regenerar a URL quando necessário.

2. **Cache no Frontend**: Como as URLs duram 7 dias, você pode fazer cache local para evitar requisições desnecessárias.

3. **Renovação Proativa**: Renove as URLs alguns dias antes de expirarem para evitar problemas.

4. **Múltiplos Arquivos**: Use o endpoint `/upload/signed-urls` para renovar várias URLs de uma vez (mais eficiente).

## 🐛 Troubleshooting

### Erro: "Access Denied"
- ✅ **Resolvido!** Agora usamos Signed URLs, o acesso é controlado pela assinatura.

### Erro: "URL expirada"
- Renove a URL usando o endpoint `/upload/signed-url`

### Erro: "Chave do arquivo não fornecida"
- Verifique se você está passando o parâmetro `key` corretamente

## 📊 Tempo de Expiração Personalizado

Você pode customizar o tempo de expiração:

```bash
# URL válida por 1 dia (86400 segundos)
GET /upload/signed-url?key=avatars/1/uuid.jpg&expiresIn=86400

# URL válida por 30 dias (2592000 segundos)
GET /upload/signed-url?key=avatars/1/uuid.jpg&expiresIn=2592000
```

## ✅ Checklist de Implementação

- [x] Instalar `@aws-sdk/s3-request-presigner`
- [x] Adicionar método `getSignedUrl` no UploadService
- [x] Modificar uploads para retornar Signed URLs
- [x] Criar UploadController com endpoints
- [x] Atualizar UploadModule
- [x] Documentação completa

## 🎉 Pronto!

Agora seu sistema de upload está **100% funcional e seguro** com Signed URLs!

---

**Dúvidas?** Consulte a documentação do AWS SDK: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-s3-request-presigner/
