# 🚗 Montreal Car Rental - Setup & Testing Guide

## 📋 Prérequis

- Node.js 18+ installé
- PostgreSQL installé et démarré
- Yarn installé

## 🚀 Installation Rapide

### 1. Installer les dépendances

```bash
yarn install
```

### 2. Configuration de l'environnement

Le fichier `.env.local` existe déjà avec toutes les clés de test configurées.

**Important:** Assurez-vous que PostgreSQL tourne et mettez à jour `DATABASE_URL` dans `.env.local` si nécessaire :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/rent_car_db?schema=public"
```

### 3. Initialiser la base de données

**Option A - Script automatique (recommandé):**

```bash
./scripts/setup-db.sh
```

**Option B - Manuellement:**

```bash
# Générer le client Prisma
yarn db:generate

# Pousser le schéma vers la BDD
yarn db:push

# Ajouter des données de test
yarn db:seed
```

## ✅ Données de Test Créées

Le script de seed crée automatiquement :

- **1 Admin**: admin@montrealrental.com
- **3 Clients** avec permis et RIB
- **6 Véhicules** (Toyota, Ford, Tesla, BMW, Honda, Mercedes)
- **3 Réservations** (Pending, Confirmed, Active)
- **2 Problèmes** signalés
- **2 Campagnes Email**

## 🧪 Tester le Système

### 1. Démarrer le serveur

```bash
yarn dev
```

Le serveur démarre sur http://localhost:3000

### 2. Tester les API Routes

**Option A - Script automatique:**

```bash
./scripts/test-api.sh
```

**Option B - Manuellement avec curl:**

```bash
# Véhicules
curl http://localhost:3000/api/vehicles

# Réservations
curl http://localhost:3000/api/reservations

# Clients
curl http://localhost:3000/api/clients

# Inspections
curl http://localhost:3000/api/inspections

# Problèmes
curl http://localhost:3000/api/problems
```

### 3. Accéder aux pages admin

- **Dashboard**: http://localhost:3000/admin
- **Véhicules**: http://localhost:3000/admin/vehicles
- **Réservations**: http://localhost:3000/admin/reservations
- **Clients**: http://localhost:3000/admin/clients
- **Problèmes**: http://localhost:3000/admin/problems
- **Factures**: http://localhost:3000/admin/invoices
- **Paiements Stripe**: http://localhost:3000/admin/payments
- **Inspections**: http://localhost:3000/admin/inspections
- **Promo Cars**: http://localhost:3000/admin/promo-cars
- **Email**: http://localhost:3000/admin/email
- **Paramètres**: http://localhost:3000/admin/settings

### 4. Prisma Studio (visualiser la BDD)

```bash
yarn db:studio
```

Ouvre http://localhost:5555

## 🏗️ Build Production

### Tester le build

```bash
yarn build
```

Si le build réussit, vous pouvez démarrer en production :

```bash
yarn start
```

## 🔑 Clés de Test Configurées

### Stripe (mode test)
- Clés de test Stripe configurées
- Utilisez les cartes de test Stripe :
  - **Succès**: 4242 4242 4242 4242
  - **Échec**: 4000 0000 0000 0002

### Google OAuth (clés de test)
- Les clés de test sont déjà dans `.env.local`
- Pour production: configurer de vraies clés Google OAuth

### Resend (Email)
- Clé API à configurer pour envoyer des emails réels

## 📦 Structure des API Routes

```
/api
├── auth/[...nextauth]     # NextAuth authentification
├── vehicles               # CRUD véhicules
│   └── [id]
├── reservations           # CRUD réservations
│   └── [id]
├── clients                # CRUD clients
│   └── [id]
├── inspections            # CRUD inspections
│   └── [id]
├── problems               # CRUD problèmes
│   └── [id]
└── stripe                 # Paiements Stripe
    ├── create-payment-intent
    ├── capture-payment
    └── cancel-payment
```

## 🐛 Dépannage

### Erreur: Cannot find module 'ts-node'

```bash
yarn add -D ts-node @types/node
```

### Erreur: Database connection

Vérifiez que PostgreSQL tourne :

```bash
# macOS
brew services start postgresql

# Vérifier la connexion
psql -U postgres
```

### Erreur: Prisma schema

Régénérer le client :

```bash
yarn db:generate
```

### Reset complet de la BDD

```bash
yarn db:reset
```

## 📊 Commandes Utiles

```bash
# Développement
yarn dev                    # Démarrer le serveur de dev
yarn db:studio              # Ouvrir Prisma Studio

# Base de données
yarn db:generate            # Générer le client Prisma
yarn db:push                # Push du schéma vers la BDD
yarn db:seed                # Ajouter des données de test
yarn db:reset               # Reset complet (supprime tout!)

# Build & Production
yarn build                  # Build pour production
yarn start                  # Démarrer en mode production
yarn lint                   # Linter le code

# Tests
./scripts/test-api.sh       # Tester toutes les API routes
./scripts/setup-db.sh       # Setup complet de la BDD
```

## 🎯 État du Projet

### ✅ Complété (95%)

- [x] Interface admin complète (11 pages)
- [x] API Routes Prisma (CRUD complet)
- [x] Intégration Stripe (pré-autorisations)
- [x] Design glassmorphism + Dark mode
- [x] Système d'inspections digitales
- [x] Script de seed avec données de test
- [x] NextAuth corrigé (v5 compatible)

### ⚠️ À Faire (5%)

- [ ] Connecter Cloudinary pour upload réel d'images
- [ ] Implémenter envoi emails Resend
- [ ] Webhooks Stripe pour sync auto
- [ ] Protection des routes admin (middleware)

## 📞 Support

Pour toute question ou problème :
- Vérifier ce README
- Consulter `ROADMAP.md` et `ADMIN_GUIDE.md`
- Tester avec `./scripts/test-api.sh`

---

**Dernière mise à jour**: 2025-01-11
**Version**: 1.1.0
**Prêt pour build**: ✅ OUI
