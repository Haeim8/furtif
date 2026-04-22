#!/bin/bash

# Script d'initialisation de la base de données
# Usage: ./scripts/setup-db.sh

echo "🚀 Initialisation de la base de données"
echo "========================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier que DATABASE_URL existe
if [ -z "$DATABASE_URL" ]; then
  if [ -f .env.local ]; then
    export $(cat .env.local | grep DATABASE_URL | xargs)
  else
    echo -e "${RED}❌ Erreur: .env.local introuvable${NC}"
    echo "Créez un fichier .env.local avec DATABASE_URL"
    exit 1
  fi
fi

echo "📦 Étape 1: Génération du client Prisma"
yarn db:generate
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Client Prisma généré${NC}"
else
  echo -e "${RED}✗ Échec de la génération${NC}"
  exit 1
fi
echo ""

echo "🗄️  Étape 2: Push du schéma vers la base de données"
yarn db:push
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Schéma poussé vers la BDD${NC}"
else
  echo -e "${RED}✗ Échec du push${NC}"
  exit 1
fi
echo ""

echo "🌱 Étape 3: Seeding de données de test"
yarn db:seed
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Données de test ajoutées${NC}"
else
  echo -e "${RED}✗ Échec du seeding${NC}"
  exit 1
fi
echo ""

echo -e "${GREEN}🎉 Base de données initialisée avec succès !${NC}"
echo ""
echo "📊 Vous pouvez maintenant :"
echo "  - Lancer le serveur: yarn dev"
echo "  - Ouvrir Prisma Studio: yarn db:studio"
echo "  - Tester les APIs: ./scripts/test-api.sh"
