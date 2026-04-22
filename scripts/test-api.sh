#!/bin/bash

# Script de test pour toutes les API routes
# Usage: ./scripts/test-api.sh

API_URL="http://localhost:3000/api"

echo "🧪 Tests des API Routes - Montreal Car Rental"
echo "=============================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
PASSED=0
FAILED=0

# Fonction de test
test_endpoint() {
  local method=$1
  local endpoint=$2
  local description=$3

  echo -n "Testing ${method} ${endpoint} ... "

  if [ "$method" = "GET" ]; then
    response=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}${endpoint}")
  fi

  if [ "$response" = "200" ] || [ "$response" = "201" ]; then
    echo -e "${GREEN}✓ PASS${NC} (${response})"
    ((PASSED++))
  else
    echo -e "${RED}✗ FAIL${NC} (${response})"
    ((FAILED++))
  fi
}

echo "📦 1. Test API Véhicules"
echo "------------------------"
test_endpoint "GET" "/vehicles" "Liste tous les véhicules"
echo ""

echo "📅 2. Test API Réservations"
echo "------------------------"
test_endpoint "GET" "/reservations" "Liste toutes les réservations"
echo ""

echo "👥 3. Test API Clients"
echo "------------------------"
test_endpoint "GET" "/clients" "Liste tous les clients"
echo ""

echo "📋 4. Test API Inspections"
echo "------------------------"
test_endpoint "GET" "/inspections" "Liste toutes les inspections"
echo ""

echo "⚠️  5. Test API Problèmes"
echo "------------------------"
test_endpoint "GET" "/problems" "Liste tous les problèmes"
echo ""

echo "💳 6. Test API Stripe"
echo "------------------------"
echo "Stripe API routes (nécessitent un body) - À tester manuellement"
echo ""

echo "=============================================="
echo "📊 Résultats des tests:"
echo -e "${GREEN}Passed: ${PASSED}${NC}"
echo -e "${RED}Failed: ${FAILED}${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}🎉 Tous les tests sont passés !${NC}"
  exit 0
else
  echo -e "${RED}❌ Certains tests ont échoué${NC}"
  exit 1
fi
