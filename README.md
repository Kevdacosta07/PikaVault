# 🟡 PikaVault - Plateforme de Vente Pokémon

> **PikaVault** est une plateforme e-commerce dédiée à la vente de cartes et accessoires Pokémon. Avec une interface moderne et intuitive, elle permet aux collectionneurs et passionnés d'acheter et vendre facilement leurs produits.

> **IMPORTANT : Le site est uniquement au format DESKTOP**
> 
**Vous pouvez visiter le site et tester toutes les fonctionnalités ici : https://pikavault.vercel.app**

---

## 🚀 Fonctionnalités

- 🛒 **Boutique en ligne** : Achat et vente de cartes Pokémon.
- 🔎 **Recherche avancée** : Trouve les produits par catégorie ou édition.
- 🛍️ **Panier interactif** : Gestion des achats avec un système de paiement sécurisé.
- 📦 **Suivi des commandes** : Consulte l’état de ta commande en temps réel.
- 🛠 **Espace admin** : Gestion des utilisateurs, produits, commandes & offres.
- 🔐 **Authentification sécurisée** : Connexion via google google oauth & credentials.
- 💳 **Paiement Stripe** : Transactions rapides et fiables.

---

## ⚙️ Technologies Utilisées

- **Frontend** : Next.js (React) + TypeScript + TailwindCSS
- **Backend** : Next.js API Routes avec Prisma (PostgreSQL)
- **Base de données** : PostgreSQL via Prisma ORM
- **Authentification** : NextAuth.js
- **Paiement** : Stripe API
- **Déploiement** : Vercel

---

## 📦 Installation & Déploiement

### **1️⃣ Prérequis**
Assure-toi d'avoir :
- **Node.js** installé (`>= 16.x`)
- **Un compte Stripe** pour les paiements
- **PostgreSQL** pour la base de données

### **2️⃣ Cloner le projet & installer les dépendances**
```sh
git clone git@github.com:Kevdacosta07/PikaVault.git # Télécharger le projet
cd pikavault # Naviguer dans le dossier du projet
npm install # Installer les dépendances
```


### 4️⃣ Configurer les variables d’environnement
Crée un fichier .env.local et ajoute :
```sh
DATABASE_URL=VOTRE_DB_URL # Lien vers la BDD (postgresql)
AUTH_SECRET=VOTRE_AUTH_SECRET # PINATA
PINATA_API_KEY:VOTRE_API_PINATA_API_KEY # PINATA
PINATA_API_SECRET:VOTRE_API_PINATA_API_SECRET # PINATA
PINATA_SECRET_JWT:VOTRE_API_PINATA_SECRET_JWT # PINATA
NEXT_PUBLIC_GATEWAY_URL:VOTRE_NEXT_PUBLIC_GATEWAY_URL # PINATA
AUTH_GOOGLE_ID=VOTRE_OAUTH_ID # Google OAUTH ID
AUTH_GOOGLE_SECRET=VOTRE_OAUTH_SECRET # Google OAUTH SECRET
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx # Public STRIPE
STRIPE_SECRET_KEY=sk_test_xxx # Secret STRIPE
EMAIL_USER=TONMAIL # Utilisateur
EMAIL_PASS=SECRETPASS # Mot de passe e-mail
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=VOTRE_API_KEY # API google map
NEXT_PUBLIC_BASE_URL=http://localhost:3000 #Lien de votre app sans / à la fin
```

### 5️⃣ Générer la base de données
```sh
npm prisma generate
npm prisma migrate dev
```

### 6️⃣ Lancer le serveur
```sh
npm run dev
# ou
yarn dev
```

---

- 🎯 Contact
- 📧 Email : kevin.mntrc@gmail.com
- 🌐 Site Web : https://pikavault.vercel.app

🔥 Merci d’utiliser PikaVault ! Attrapez-les tous ! 🔥