#!/bin/bash

# Script d'installation de toutes les dépendances
# Usage: ./scripts/install-deps.sh

echo "📦 Installation des dépendances"
echo "==============================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "1️⃣  Installation des dépendances principales..."
yarn install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Dépendances principales installées${NC}"
else
  echo -e "${RED}✗ Échec de l'installation${NC}"
  exit 1
fi
echo ""

echo "2️⃣  Installation de ts-node pour le seeding..."
yarn add -D ts-node @types/node
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ ts-node installé${NC}"
else
  echo -e "${RED}✗ Échec de l'installation de ts-node${NC}"
  exit 1
fi
echo ""

echo -e "${GREEN}🎉 Toutes les dépendances sont installées !${NC}"
echo ""
echo "📋 Prochaines étapes :"
echo "  1. Configurer PostgreSQL dans .env.local"
echo "  2. Lancer: ./scripts/setup-db.sh"
echo "  3. Démarrer le serveur: yarn dev"
