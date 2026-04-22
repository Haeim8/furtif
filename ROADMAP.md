# 🗺️ Roadmap - Montreal Car Rental

## Phase 1: Fondations (✅ COMPLÉTÉ)

### Infrastructure
- ✅ Setup Next.js 15 + TypeScript
- ✅ Configuration Chakra UI avec thème glassmorphism
- ✅ Schéma Prisma complet
- ✅ Structure de dossiers organisée
- ✅ Configuration des variables d'environnement

### Admin - Base
- ✅ Layout admin avec sidebar
- ✅ Dashboard avec statistiques
- ✅ Page de gestion des véhicules (liste)

---

## Phase 2: Admin CRM Complet (🚀 85% COMPLÉTÉ)

### Véhicules
- ✅ Liste des véhicules avec filtres
- ✅ **Formulaire ajout de véhicule** (Modal complet)
- ✅ **Formulaire modification de véhicule**
- ✅ **Upload de photos** (UI prête, backend Cloudinary à connecter)
- ✅ Gestion de disponibilité (UI)
- 🔲 API CRUD véhicules (Prisma à implémenter)

### Réservations
- ✅ **Liste des réservations** (vue hebdomadaire)
- ✅ **Onglets Départs/Retours**
- ✅ Filtres (statut, dates, client)
- ✅ Détails d'une réservation
- ✅ Validation manuelle (UI)
- ✅ Modification de réservation (UI)
- ✅ Annulation (UI)
- 🔲 API CRUD réservations (Prisma à implémenter)

### Clients
- ✅ **Liste des clients** avec recherche
- ✅ **Modal détaillé client** (3 onglets: Info, Documents, Historique)
- ✅ Upload permis de conduire (UI)
- ✅ Upload RIB/IBAN (UI)
- ✅ Historique de locations
- ✅ Notes admin
- ✅ **Modal validation documents**
- 🔲 API backend (Prisma à implémenter)

### Inspections Digitales
- ✅ **Modal inspection départ/retour**
- ✅ **15 photos requises** (face avant, arrière, jantes, intérieur, coffre, etc.)
- ✅ Upload jusqu'à 40 photos
- ✅ Capture photo via webcam/mobile (input capture="environment")
- ✅ **Signature électronique** (react-signature-canvas) - Agent + Client
- ✅ État du véhicule (kilométrage, niveau carburant)
- ✅ Remarques/Observations
- ✅ Validation photos requises avant soumission
- 🔲 Page /admin/inspections (liste)
- 🔲 Historique des inspections
- 🔲 API backend Prisma

### Facturation
- ✅ **Page /admin/invoices**
- ✅ Liste des factures avec filtres
- ✅ Intégration Payment ID Stripe
- ✅ Statuts paiement (payé, en attente, échoué, remboursé)
- ✅ Gestion cautions (retenue, remboursée, utilisée)
- ✅ Stats financières (revenus, cautions retenues)
- 🔲 Génération PDF automatique
- 🔲 Templates PDF personnalisables
- 🔲 Numérotation automatique
- 🔲 Envoi par email automatique
- 🔲 API backend Prisma

### Problèmes Signalés
- ✅ **Liste des problèmes** (/admin/problems)
- ✅ **Modal détails** + photos (jusqu'à 40)
- ✅ Système de réponse admin
- ✅ Statuts (ouvert, en cours, résolu)
- ✅ Types (accident, panne, dommage, autre)
- ✅ Filtres par type et statut
- 🔲 Notifications temps réel
- 🔲 API backend Prisma

### Email & Marketing
- ✅ **Page /admin/email** - Campagnes marketing
- ✅ **Modal création campagne**
- ✅ Éditeur de campagnes (nom, sujet, contenu)
- ✅ Templates d'emails (React Email)
- ✅ Sélection des destinataires (tous ou individuel)
- ✅ Gestion abonnés (opt-in/opt-out)
- ✅ Planification d'envoi
- ✅ Statistiques (ouvertures, clics, taux)
- ✅ Intégration Resend (configurée)
- 🔲 API backend réelle

---

## Phase 3: Authentification & Sécurité (⚠️ 50% - ERREUR BUILD)

### NextAuth Setup
- ⚠️ **Configuration NextAuth.js** (ERREUR: authOptions export invalide)
  - Fichier: app/api/auth/[...nextauth]/route.ts:5
  - Problème: Next.js 15 + NextAuth v5 incompatibilité
  - À corriger: Migrer vers NextAuth v5 pattern
- ✅ Google OAuth configuré (clés test)
- 🔲 Apple Sign-In
- 🔲 Protection des routes admin
- ✅ Rôles utilisateurs (ADMIN/CLIENT) dans Prisma schema
- 🔲 Middleware de protection
- 🔲 Session management

### Sécurité
- 🔲 Validation des formulaires (Zod)
- 🔲 Rate limiting
- 🔲 CSRF protection
- 🔲 Sanitization des uploads
- 🔲 Permissions granulaires

---

## Phase 4: Paiements Stripe (🚀 90% COMPLÉTÉ)

### Configuration
- ✅ Setup Stripe (lib/stripe.ts complet)
- ✅ Clés de test configurées
- 🔲 Webhooks
- 🔲 Environnements test/prod

### Fonctionnalités
- ✅ **Paiement de location** (via StripePaymentForm)
- ✅ **Gestion de caution (pré-autorisation)**
  - API create-payment-intent (capture_method: manual)
  - API capture-payment (capturer tout ou partie)
  - API cancel-payment (débloquer caution)
- ✅ **Page admin /admin/payments**
  - Vue d'ensemble pré-autorisations actives
  - Boutons Capturer/Annuler
  - Statistiques temps réel
- ✅ **Composant client StripePaymentForm**
- 🔲 Remboursement automatique de caution
- 🔲 Historique complet des paiements
- 🔲 Gestion des litiges
- 🔲 Reçus automatiques PDF

---

## Phase 5: Interface Client (🎯 PRIORITÉ APRÈS ADMIN)

### Recherche & Navigation
- 🔲 Hero section avec barre de recherche
- 🔲 Filtres (type, dates, prix)
- 🔲 Grille de véhicules disponibles
- 🔲 Tri (prix, popularité, note)
- 🔲 Pagination

### Fiche Véhicule
- 🔲 Galerie de photos
- 🔲 Caractéristiques détaillées
- 🔲 Consommation
- 🔲 Prix par jour
- 🔲 Équipements (GPS, Bluetooth, etc.)
- 🔲 Modal de détails
- 🔲 Calendrier de disponibilité

### Réservation
- 🔲 Sélection des dates
- 🔲 Calcul du prix total
- 🔲 Formulaire de réservation
- 🔲 Upload documents (permis, RIB)
- 🔲 Paiement Stripe
- 🔲 Confirmation par email

### Compte Client
- 🔲 Dashboard client
- 🔲 Réservations en cours
- 🔲 Historique de locations
- 🔲 Documents uploadés
- 🔲 Signalement de problème
- 🔲 Info dépannage/accident
- 🔲 Instructions d'urgence
- 🔲 Chat/support 24/7

### Landing Page
- 🔲 Hero section moderne
- 🔲 Véhicules populaires
- 🔲 Témoignages
- 🔲 FAQ
- 🔲 Contact
- 🔲 Footer

---

## Phase 6: Fonctionnalités Avancées

### Notifications
- 🔲 Système de notifications temps réel
- 🔲 Email notifications
- 🔲 SMS (optionnel)
- 🔲 Push notifications (PWA)

### Upload & Médias
- 🔲 Intégration Cloudinary complète
- 🔲 Compression d'images
- 🔲 Génération de thumbnails
- 🔲 Upload multiple
- 🔲 Drag & drop

### Calendrier
- 🔲 Vue calendrier des réservations
- 🔲 Disponibilité véhicules
- 🔲 Blocage de dates
- 🔲 Gestion des périodes

### Rapports & Analytics
- 🔲 Dashboard analytics
- 🔲 Revenus par période
- 🔲 Taux d'occupation
- 🔲 Véhicules les plus loués
- 🔲 Statistiques clients
- 🔲 Export Excel/PDF

---

## Phase 7: Optimisations & UX

### Performance
- 🔲 Image optimization (Next.js)
- 🔲 Lazy loading
- 🔲 Code splitting
- 🔲 Caching strategy
- 🔲 CDN setup

### Mobile
- 🔲 Design 100% responsive
- 🔲 Touch gestures
- 🔲 Mobile menu
- 🔲 PWA (Progressive Web App)
- 🔲 Offline mode basique

### SEO
- 🔲 Metadata optimization
- 🔲 Sitemap
- 🔲 Robots.txt
- 🔲 Schema.org markup
- 🔲 Open Graph tags

### Accessibilité
- 🔲 ARIA labels
- 🔲 Navigation clavier
- 🔲 Contraste couleurs
- 🔲 Screen reader support

---

## Phase 8: Tests & Documentation

### Tests
- 🔲 Tests unitaires (Jest)
- 🔲 Tests d'intégration
- 🔲 Tests E2E (Playwright)
- 🔲 Tests de sécurité

### Documentation
- 🔲 Documentation API
- 🔲 Guide utilisateur admin
- 🔲 Guide utilisateur client
- 🔲 Documentation technique

---

## Phase 9: Déploiement

### Préparation
- 🔲 Configuration production
- 🔲 Variables d'environnement
- 🔲 Base de données production
- 🔲 Migration des données

### Déploiement
- 🔲 Setup Vercel
- 🔲 Custom domain
- 🔲 SSL certificate
- 🔲 Backup strategy
- 🔲 Monitoring (Sentry)

### Post-déploiement
- 🔲 Tests en production
- 🔲 Formation admin
- 🔲 Documentation
- 🔲 Support client

---

## Phase 10: Améliorations Futures

### Features Bonus
- 🔲 Système de reviews/notes
- 🔲 Programme de fidélité
- 🔲 Codes promo
- 🔲 Multi-langue (FR/EN)
- 🔲 Assurance intégrée
- 🔲 GPS tracking (optionnel)
- 🔲 App mobile native (React Native)
- 🔲 Intégration Google Maps
- 🔲 Comparateur de prix
- 🔲 Recommandations IA

---

## 📊 Estimation de Temps

| Phase | Durée Estimée |
|-------|---------------|
| Phase 1: Fondations | ✅ 1 jour |
| Phase 2: Admin CRM | 5-7 jours |
| Phase 3: Auth | 2-3 jours |
| Phase 4: Stripe | 2-3 jours |
| Phase 5: Client | 7-10 jours |
| Phase 6: Avancé | 5-7 jours |
| Phase 7: Optimisation | 3-5 jours |
| Phase 8: Tests | 3-5 jours |
| Phase 9: Déploiement | 2-3 jours |
| **TOTAL** | **30-45 jours** |

---

## 🆕 NOUVELLES PAGES AJOUTÉES

### Pages Admin Supplémentaires
- ✅ **/admin/payments** - Gestion des pré-autorisations Stripe
  - Liste pré-autorisations actives
  - Capturer/Annuler cautions
  - Stats financières temps réel
- ✅ **/admin/promo-cars** - Gestion carousel homepage
  - Ajouter/Modifier/Supprimer voitures promo
  - Upload images (PNG sans fond recommandé)
  - Prix promo vs ancien prix
  - Calcul automatique % économie

---

## ⚠️ PROBLÈMES À CORRIGER

### 1. **ERREUR BUILD CRITIQUE**
**Fichier:** `app/api/auth/[...nextauth]/route.ts:5`
**Erreur:** `"authOptions" is not a valid Route export field`
**Cause:** Next.js 15 + NextAuth v5 (beta) incompatibilité
**Solution:** Migrer vers le nouveau pattern NextAuth v5

### 2. **APIs Backend Manquantes**
Toutes les pages utilisent des données mock. Créer:
- API CRUD véhicules (Prisma)
- API CRUD réservations (Prisma)
- API CRUD clients (Prisma)
- API upload Cloudinary
- API envoi emails Resend
- Connecter à PostgreSQL

### 3. **Pages Manquantes**
- Page `/admin/inspections` (liste des inspections)
- Intégration réelle BDD sur toutes les pages

---

## 🎯 Prochaines Étapes Immédiates

1. ✅ ~~Configurer Stripe pour les paiements~~ FAIT
2. **URGENT:** Corriger erreur NextAuth build
3. Créer les API routes Prisma (CRUD)
4. Connecter Cloudinary pour uploads
5. Créer page `/admin/inspections`
6. Implémenter envoi emails Resend
7. Compléter l'interface client (réservation complète)

---

**Dernière mise à jour:** 2025-01-11
**Audit effectué par:** Claude Code
**État global:** 70% complété (UI 95%, Backend 30%)
