#!/bin/bash

# =========================================
# Script de Deploy Automatizado - Railway
# =========================================
# 
# Uso: ./deploy-railway.sh
# 
# Pré-requisitos:
# - Railway CLI instalado: npm i -g @railway/cli
# - Login feito: railway login
# - Projeto vinculado: railway link
# =========================================

set -e  # Exit on error

echo "🚂 Iniciando deploy no Railway..."
echo ""

# Verificar se Railway CLI está instalado
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI não encontrado!"
    echo "   Instale com: npm i -g @railway/cli"
    exit 1
fi

# Verificar se está logado
echo "🔐 Verificando autenticação..."
if ! railway whoami &> /dev/null; then
    echo "❌ Não autenticado no Railway!"
    echo "   Execute: railway login"
    exit 1
fi

# Confirmar deploy
echo "⚠️  Este script irá:"
echo "   1. Fazer push do código para Railway"
echo "   2. Executar migrations do Prisma"
echo "   3. Popular banco com seed"
echo ""
read -p "Deseja continuar? (s/N): " confirm
if [[ ! $confirm =~ ^[Ss]$ ]]; then
    echo "❌ Deploy cancelado"
    exit 0
fi

# Build local primeiro (para validar)
echo ""
echo "🔨 Validando build local..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build falhou! Corrija os erros antes de fazer deploy"
    exit 1
fi

# Push para Railway
echo ""
echo "📤 Fazendo push para Railway..."
railway up

# Aguardar deploy
echo ""
echo "⏳ Aguardando deploy..."
sleep 10

# Executar migrations
echo ""
echo "🗄️  Executando migrations do Prisma..."
railway run npx prisma migrate deploy

if [ $? -ne 0 ]; then
    echo "⚠️  Migrations falharam, mas o deploy foi feito"
    echo "   Execute manualmente: railway run npx prisma migrate deploy"
fi

# Executar seed (apenas primeira vez)
echo ""
read -p "Deseja popular o banco com dados iniciais (seed)? (s/N): " seed
if [[ $seed =~ ^[Ss]$ ]]; then
    echo "🌱 Executando seed..."
    railway run npm run seed
fi

# Abrir logs
echo ""
echo "✅ Deploy concluído!"
echo ""
read -p "Deseja ver os logs? (s/N): " logs
if [[ $logs =~ ^[Ss]$ ]]; then
    railway logs
fi

echo ""
echo "🎉 Processo finalizado!"
echo ""
echo "📝 Próximos passos:"
echo "   1. Verificar se a API está respondendo"
echo "   2. Testar endpoints críticos"
echo "   3. Configurar webhook do Stripe"
echo ""
echo "🔗 Links úteis:"
echo "   - Dashboard: https://railway.app"
echo "   - Logs: railway logs"
echo "   - Variáveis: railway vars"
