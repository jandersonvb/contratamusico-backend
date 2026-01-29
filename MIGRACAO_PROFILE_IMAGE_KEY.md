# 🔄 Migração: profileImageUrl → profileImageKey

## O que mudou?

Mudamos de salvar **URLs completas** para salvar **keys (caminhos)** dos arquivos no banco de dados.

## 📝 Motivação

**Problema anterior:**
- URLs assinadas são muito longas (centenas de caracteres)
- Não cabiam no campo VARCHAR(191) do banco
- Erro: "The provided value for the column is too long"

**Solução implementada:**
- Salvar apenas a **key** (ex: `avatars/1/uuid.jpg`)
- Gerar **URL assinada dinamicamente** quando necessário
- URLs sempre válidas e atualizadas

---

## 🗄️ Mudanças no Banco de Dados

### Schema Prisma

**Antes:**
```prisma
model User {
  profileImageUrl String? // URL completa da imagem
}
```

**Depois:**
```prisma
model User {
  profileImageKey String? // Chave do arquivo (ex: avatars/1/uuid.jpg)
}
```

### Migration SQL Aplicada

```sql
ALTER TABLE `User` 
CHANGE COLUMN `profileImageUrl` `profileImageKey` VARCHAR(191) NULL;
```

---

## 💻 Mudanças no Código

### UserService

#### Métodos Atualizados:

```typescript
// Antes
async updateProfileImage(id: number, profileImageUrl: string)
async getProfileImageUrl(id: number): Promise<string | null>

// Depois
async updateProfileImage(id: number, profileImageKey: string)
async getProfileImageKey(id: number): Promise<string | null>
```

#### Método formatUserResponse

Agora é **assíncrono** e gera URL assinada automaticamente:

```typescript
private async formatUserResponse(user: any) {
  const { profileImageKey, ...rest } = user;
  
  // Gera URL assinada dinamicamente
  let profileImageUrl: string | undefined;
  if (profileImageKey) {
    profileImageUrl = await this.uploadService.getSignedUrl(profileImageKey);
  }
  
  return {
    ...rest,
    profileImageUrl, // URL assinada válida!
  };
}
```

### UserController

```typescript
// ANTES: Salvava URL completa
const { url } = await this.uploadService.uploadProfileImage(file, userId);
await this.userService.updateProfileImage(userId, url);

// DEPOIS: Salva apenas a key
const { key } = await this.uploadService.uploadProfileImage(file, userId);
await this.userService.updateProfileImage(userId, key);
```

---

## 📊 Comparação: Antes vs Depois

### Antes (❌ Não funcionava)

**Banco de dados:**
```
profileImageUrl: "https://storage.railway.app/bucket/avatars/1/file.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=..."
```
- ❌ Muito longo (excede VARCHAR(191))
- ❌ URL expira em 7 dias
- ❌ Erro ao salvar no banco

### Depois (✅ Funciona perfeitamente)

**Banco de dados:**
```
profileImageKey: "avatars/1/uuid.jpg"
```
- ✅ Curto (sempre cabe no VARCHAR(191))
- ✅ Permanente (não expira)
- ✅ URL gerada sob demanda

**API Response:**
```json
{
  "id": 1,
  "profileImageUrl": "https://storage.railway.app/...?X-Amz-Signature=...",
  "email": "usuario@exemplo.com"
}
```
- ✅ URL assinada gerada na hora
- ✅ Sempre válida (nunca expirada)
- ✅ Frontend recebe URL pronta para usar

---

## 🚀 Como Usar

### Upload de Avatar

```typescript
// POST /users/me/avatar
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/users/me/avatar', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData,
});

const data = await response.json();
console.log(data.profileImageUrl); // URL assinada válida!
```

### Buscar Usuário

```typescript
// GET /users/me
const response = await fetch('/users/me', {
  headers: { 'Authorization': `Bearer ${token}` },
});

const user = await response.json();
console.log(user.profileImageUrl); // URL assinada gerada dinamicamente!
```

---

## 🎯 Vantagens da Nova Abordagem

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Tamanho no banco** | ~500 caracteres | ~50 caracteres |
| **Expiração** | URL expira em 7 dias | URL sempre válida |
| **Performance** | Salva URL longa | Salva key curta |
| **Flexibilidade** | URL fixa | Pode mudar tempo de expiração |
| **Segurança** | URL pública no banco | Key privada, URL temporária |

---

## 🔧 Compatibilidade

### Dados Antigos no Banco

Se você tinha URLs antigas no campo `profileImageUrl`:
- A migration **renomeia** o campo para `profileImageKey`
- URLs antigas ainda estarão lá
- Mas não funcionarão (são URLs, não keys)
- **Solução**: Fazer novo upload das imagens

### Frontend

O frontend **não precisa mudar nada**! 🎉

A API continua retornando `profileImageUrl`, mas agora:
- É gerada dinamicamente
- Sempre válida
- Sempre assinada

---

## 🧪 Testando

### 1. Fazer upload de avatar

```bash
curl -X POST http://localhost:3000/users/me/avatar \
  -H "Authorization: Bearer TOKEN" \
  -F "file=@imagem.jpg"
```

**Resposta:**
```json
{
  "id": 1,
  "profileImageUrl": "https://storage.railway.app/...?X-Amz-Signature=..."
}
```

### 2. Buscar usuário

```bash
curl -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer TOKEN"
```

**Resposta:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "profileImageUrl": "https://storage.railway.app/...?X-Amz-Signature=..."
}
```

### 3. Abrir URL no navegador

Copie a URL de `profileImageUrl` e cole no navegador.

**Resultado**: Imagem carrega perfeitamente! ✅

---

## 📝 Checklist de Implementação

- [x] Atualizar schema Prisma
- [x] Criar migration SQL
- [x] Aplicar migration no banco
- [x] Atualizar UserService
- [x] Atualizar UserController
- [x] Gerar URL assinada dinamicamente
- [x] Testar upload
- [x] Documentação completa

---

## 🎉 Resultado Final

Agora o sistema funciona perfeitamente! 

- ✅ URLs assinadas não são salvas no banco
- ✅ Apenas keys (caminhos) são salvos
- ✅ URLs geradas dinamicamente quando necessário
- ✅ Sempre válidas e atualizadas
- ✅ Imagens carregam no navegador

---

## 💡 Dica para o Frontend

Se quiser evitar gerar URLs toda vez, você pode:

1. **Cachear a URL** por algumas horas (ela dura 7 dias)
2. **Renovar quando expirar** usando o endpoint `/upload/signed-url`

```typescript
// Cache simples
const cachedUrls = new Map();

async function getImageUrl(userId) {
  const cached = cachedUrls.get(userId);
  
  // Se tem cache e não expirou, usa cache
  if (cached && Date.now() < cached.expiresAt) {
    return cached.url;
  }
  
  // Busca nova URL
  const user = await fetchUser(userId);
  cachedUrls.set(userId, {
    url: user.profileImageUrl,
    expiresAt: Date.now() + (6 * 24 * 60 * 60 * 1000), // 6 dias
  });
  
  return user.profileImageUrl;
}
```

---

**Pronto!** O sistema está 100% funcional com Signed URLs e armazenamento otimizado! 🚀
