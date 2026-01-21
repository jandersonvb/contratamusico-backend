#!/bin/bash

# =========================================
# Script de Testes de Produção
# =========================================
# 
# Uso: ./test-production.sh https://sua-api.railway.app
# 
# Testa todos os endpoints críticos da API
# =========================================

set -e

# Verificar se URL foi fornecida
if [ -z "$1" ]; then
    echo "❌ Erro: URL da API não fornecida"
    echo ""
    echo "Uso: ./test-production.sh https://sua-api.railway.app"
    exit 1
fi

API_URL="$1"
PASSED=0
FAILED=0

echo "🧪 Iniciando testes de produção..."
echo "🔗 API URL: $API_URL"
echo ""

# Função para testar endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local expected_status=$4
    local data=$5
    
    echo -n "Testing: $description... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" -X GET "$API_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    status_code=$(echo "$response" | tail -n1)
    
    if [ "$status_code" = "$expected_status" ]; then
        echo "✅ PASS ($status_code)"
        ((PASSED++))
    else
        echo "❌ FAIL (expected $expected_status, got $status_code)"
        ((FAILED++))
    fi
}

# ===========================================
# TESTES DE INFRAESTRUTURA
# ===========================================
echo "=== Infraestrutura ==="
echo ""

test_endpoint "GET" "/" "Health Check" "200"
test_endpoint "GET" "/api" "Swagger Documentation" "200"

echo ""

# ===========================================
# TESTES DE DADOS DE REFERÊNCIA
# ===========================================
echo "=== Dados de Referência ==="
echo ""

test_endpoint "GET" "/genres" "Listar Gêneros" "200"
test_endpoint "GET" "/instruments" "Listar Instrumentos" "200"
test_endpoint "GET" "/locations/states" "Listar Estados" "200"
test_endpoint "GET" "/plans" "Listar Planos" "200"
test_endpoint "GET" "/faq" "Listar FAQs" "200"

echo ""

# ===========================================
# TESTES DE MÚSICOS (PÚBLICO)
# ===========================================
echo "=== Músicos (Público) ==="
echo ""

test_endpoint "GET" "/musicians" "Buscar Músicos" "200"
test_endpoint "GET" "/musicians/featured" "Músicos em Destaque" "200"

echo ""

# ===========================================
# TESTES DE AUTENTICAÇÃO
# ===========================================
echo "=== Autenticação ==="
echo ""

# Registrar usuário de teste
TEST_EMAIL="test-$(date +%s)@example.com"
REGISTER_DATA="{
  \"email\": \"$TEST_EMAIL\",
  \"password\": \"Test123!\",
  \"passwordConfirm\": \"Test123!\",
  \"firstName\": \"Test\",
  \"lastName\": \"User\",
  \"userType\": \"CLIENT\",
  \"acceptTerms\": true
}"

echo -n "Testing: Registrar Usuário... "
register_response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d "$REGISTER_DATA")

status_code=$(echo "$register_response" | tail -n1)
if [ "$status_code" = "201" ]; then
    echo "✅ PASS ($status_code)"
    ((PASSED++))
    TOKEN=$(echo "$register_response" | head -n-1 | grep -o '"token":"[^"]*' | cut -d'"' -f4)
else
    echo "❌ FAIL (expected 201, got $status_code)"
    ((FAILED++))
    TOKEN=""
fi

# Login
LOGIN_DATA="{
  \"email\": \"$TEST_EMAIL\",
  \"password\": \"Test123!\"
}"

test_endpoint "POST" "/auth/login" "Login" "201" "$LOGIN_DATA"

echo ""

# ===========================================
# TESTES AUTENTICADOS
# ===========================================
if [ -n "$TOKEN" ]; then
    echo "=== Endpoints Autenticados ==="
    echo ""
    
    echo -n "Testing: Obter Perfil... "
    profile_response=$(curl -s -w "\n%{http_code}" -X GET "$API_URL/users/me" \
        -H "Authorization: Bearer $TOKEN")
    
    status_code=$(echo "$profile_response" | tail -n1)
    if [ "$status_code" = "200" ]; then
        echo "✅ PASS ($status_code)"
        ((PASSED++))
    else
        echo "❌ FAIL (expected 200, got $status_code)"
        ((FAILED++))
    fi
    
    echo -n "Testing: Obter Assinatura... "
    subscription_response=$(curl -s -w "\n%{http_code}" -X GET "$API_URL/payments/subscription" \
        -H "Authorization: Bearer $TOKEN")
    
    status_code=$(echo "$subscription_response" | tail -n1)
    if [ "$status_code" = "200" ]; then
        echo "✅ PASS ($status_code)"
        ((PASSED++))
    else
        echo "❌ FAIL (expected 200, got $status_code)"
        ((FAILED++))
    fi
    
    echo ""
fi

# ===========================================
# RESUMO
# ===========================================
echo "========================================="
echo "RESUMO DOS TESTES"
echo "========================================="
echo ""
echo "✅ Passou: $PASSED"
echo "❌ Falhou: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🎉 Todos os testes passaram!"
    exit 0
else
    echo "⚠️  Alguns testes falharam. Verifique os erros acima."
    exit 1
fi
