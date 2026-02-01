# Placo Design 64

Site vitrine pour Placo Design 64, une entreprise de plâtrerie et rénovation.

## Structure du Projet

```
placo-design-64/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── styles/        # Styles SCSS
│   │   └── ...
│   └── ...
├── src/                    # Backend Node.js
│   ├── controllers/       # Contrôleurs
│   ├── models/           # Modèles MongoDB
│   └── ...
└── ...
```

## Technologies Utilisées

### Frontend
- React
- Vite
- SCSS
- React Router
- ReCAPTCHA

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Cloudinary
- Nodemailer

## Installation

1. Cloner le repository
```bash
git clone [URL_DU_REPO]
```

2. Installer les dépendances
```bash
# Backend
npm install

# Frontend
cd client
npm install
```

3. Configuration des variables d'environnement
- Créer un fichier `.env` à la racine du projet
- Créer un fichier `.env` dans le dossier `client`

4. Démarrer le développement
```bash
# Backend
npm run server

# Frontend
cd client
npm run dev
```

## Déploiement (mode production)

### Option 1 : Tout sur un seul serveur (ex. Render, Railway)
1. Définir `NODE_ENV=production` sur le serveur.
2. À la racine : `npm install` puis `npm run build` (build le client dans `client/build`).
3. Lancer : `npm start` (serve Express + API + front build).
4. Variables d'environnement : voir ci-dessous. En prod, `CORS_ORIGIN` peut rester vide si le front est servi par le même domaine.
5. **Ne pas** définir `VITE_API_URL` dans le client si le front est servi par le même serveur (requêtes en same-origin).

### Option 2 : Front (Vercel) + Backend (Render)
- **Backend** : sur Render, définir `NODE_ENV=production`, `CORS_ORIGIN=https://ton-site.vercel.app`.
- **Frontend** : sur Vercel, définir `VITE_API_URL=https://ton-api.render.com` (URL de ton API), puis build. Le build doit être fait avec cette variable pour que les appels API pointent vers le backend.

### Commandes production (racine)
```bash
npm run build   # build le client (client/build)
NODE_ENV=production npm start   # lance le serveur (serve API + front en prod)
```

## Variables d'Environnement

### Backend (.env à la racine)
```
NODE_ENV=production
MONGODB_URI=
JWT_SECRET=
RECAPTCHA_SECRET_KEY=
CONTACT_EMAIL=
CONTACT_EMAIL_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CORS_ORIGIN=   # optionnel ; ex. https://ton-front.vercel.app si front et back sur des domaines différents
```

### Frontend (client/.env, pour build prod si front sur un autre domaine)
```
VITE_API_URL=   # URL de l'API en prod (ex. https://ton-api.render.com). Vide si même domaine que le back.
VITE_RECAPTCHA_SITE_KEY=
```

## Fonctionnalités

- Authentification admin
- Gestion des réalisations
- Formulaire de contact
- Galerie de photos
- Responsive design
