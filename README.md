# Montreal Car Rental - Plateforme de Location de Voitures

Plateforme complète de gestion de location de voitures pour une agence à Montréal, Canada.

## 🚀 Technologies

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **UI/UX:** Chakra UI avec design glassmorphism (iOS 26)
- **Base de données:** PostgreSQL avec Prisma ORM
- **Auth:** NextAuth.js (Google, Apple OAuth)
- **Paiement:** Stripe (paiements + cautions)
- **Email:** Resend + React Email
- **Upload:** Cloudinary (photos véhicules + inspections)

## 📁 Structure du Projet

```
rent-car/
├── app/
│   ├── admin/              # Interface admin (CRM)
│   │   ├── vehicles/       # Gestion véhicules
│   │   ├── reservations/   # Gestion réservations
│   │   ├── inspections/    # Formulaires inspection
│   │   ├── clients/        # Gestion clients
│   │   ├── problems/       # Problèmes signalés
│   │   ├── email/          # Campagnes email
│   │   └── settings/       # Paramètres
│   ├── client/             # Interface client
│   ├── api/                # API Routes
│   └── globals.css
├── components/
│   ├── admin/              # Composants admin
│   ├── client/             # Composants client
│   └── shared/             # Composants partagés
├── lib/
│   ├── db/                 # Prisma client
│   ├── auth/               # NextAuth config
│   ├── stripe/             # Stripe utils
│   └── email/              # Email templates
├── prisma/
│   └── schema.prisma       # Schéma BDD complet
├── public/
│   ├── images/
│   └── uploads/
└── types/                  # TypeScript types
```

## 🗄️ Schéma de Base de Données

Le schéma Prisma inclut :

- **User** - Utilisateurs (admin/clients) avec auth
- **Vehicle** - Véhicules avec caractéristiques, prix, disponibilité
- **Reservation** - Réservations avec paiement Stripe
- **Inspection** - Formulaires départ/retour (40 photos max, signature électronique)
- **Invoice** - Facturation avec génération PDF
- **Problem** - Problèmes signalés par clients
- **EmailCampaign** - Campagnes d'emailing

## 🛠️ Installation

### 1. Cloner et installer les dépendances

```bash
cd rent-car
yarn install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env` basé sur `.env.example` :

```bash
cp .env.example .env
```

Remplissez les variables :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rent_car_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
APPLE_ID="..."
APPLE_SECRET="..."

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@votredomaine.com"

# Upload
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### 3. Configurer la base de données

```bash
# Créer la base de données PostgreSQL
createdb rent_car_db

# Générer le client Prisma
yarn db:generate

# Pusher le schéma à la DB
yarn db:push

# (Optionnel) Ouvrir Prisma Studio
yarn db:studio
```

### 4. Lancer le serveur de développement

```bash
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

Le projet utilise un design **glassmorphism** inspiré d'iOS 26 :

- Effets de flou (backdrop-filter)
- Transparence et bordures subtiles
- Animations fluides
- Palette de couleurs moderne

### Utilisation

```tsx
// Composant avec effet glass
<Box className="glass">
  Contenu
</Box>

// Bouton variant glass
<Button variant="glass">
  Cliquez
</Button>

// Input avec effet glass (par défaut)
<Input placeholder="Rechercher..." />
```

## 📋 Fonctionnalités

### Admin (CRM)

- ✅ Dashboard avec statistiques en temps réel
- ✅ Gestion complète des véhicules (CRUD)
- 🚧 Gestion des réservations
- 🚧 Formulaires d'inspection digitaux (40 photos + signature)
- 🚧 Gestion des clients (permis, RIB)
- 🚧 Paiements Stripe avec caution
- 🚧 Génération et envoi de factures
- 🚧 Campagnes d'emailing

### Client

- 🚧 Recherche de véhicules (type, dates)
- 🚧 Fiches détaillées des véhicules
- 🚧 Réservation en ligne
- 🚧 Paiement sécurisé (Stripe)
- 🚧 Compte client (historique, problèmes)
- 🚧 Signalement de problèmes 24/7
- 🚧 Info dépannage en cas d'accident

## 🔐 Authentification

NextAuth.js avec support :

- Google OAuth
- Apple Sign-In
- Email/Password (optionnel)

## 💳 Paiements

Stripe pour :

- Paiement des locations
- Gestion des cautions (deposit)
- Remboursements automatiques
- Webhooks pour synchronisation

## 📧 Emails

- Templates React Email
- Envoi via Resend
- Confirmations de réservation
- Factures
- Campagnes marketing

## 📸 Upload de Photos

Cloudinary pour :

- Photos de véhicules
- Photos d'inspection (jusqu'à 40)
- Signatures électroniques
- Optimisation automatique

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
vercel
```

### Variables d'environnement en production

N'oubliez pas de configurer toutes les variables d'environnement sur Vercel.

## 📝 Scripts Disponibles

```bash
yarn dev          # Lancer en développement
yarn build        # Build de production
yarn start        # Lancer en production
yarn lint         # Linter
yarn db:generate  # Générer Prisma Client
yarn db:push      # Push schéma à la DB
yarn db:studio    # Ouvrir Prisma Studio
```

## 🤝 Contribution

Ce projet est privé pour l'agence Montreal Car Rental.

## 📄 License

Propriétaire - Montreal Car Rental © 2025
