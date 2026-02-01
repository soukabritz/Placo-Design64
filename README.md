Placo Design 64


Ce dépôt contient le code source de l'application web et de l'interface d'administration pour Placo Design 64, une entreprise spécialisée dans les travaux de rénovation (plâtrerie, peinture, carrelage) au Pays Basque.

Le site a été conçu pour être à la fois performant, sécurisé et facile à administrer pour le client.

- Fonctionnalités

- Inerface publique :
    - Présentation des différents services de l'entreprise.
    - Galerie des réalisations.
    - Formulaire de contact sécurisé.
    - Design entièrement responsive.

- Panneau d'administration :
    - Système d'authentification sécurisé avec JWT.
    - Gestion complète des réalisations : ajout, modification et suppression.
    - Upload d'images directement sur le cloud (Cloudinary).
    - Possibilité de choisir quelles réalisations mettre en avant sur la page d'accueil.

- Technologies utilisées

- Backend :
    - Node.js avec Express pour le serveur API REST.
    - MongoDB avec Mongoose comme base de données.
    - JWT pour la gestion de l'authentification.
    - Cloudinary pour le stockage et la gestion des images.
    - Nodemaile pour l'envoi des e-mails depuis le formulaire de contact.

- Frontend :
    - React (avec Vite) pour une interface utilisateur réactive.
    - React Router pour la navigation entre les pages.
    - Sass (SCSS) pour un style modulaire.
    - Axios pour les requêtes vers l'API backend.

- Démarrage rapide

Suivre ces étapes pour lancer le projet sur une machine locale.

 - Prérequis

- Node.js
- npm
- Une base de données MongoDB 

- Installation

1.  Clonez le projet :
    bash
    git clone https://github.com/votre-utilisateur/placo-design-64.git
    cd placo-design-64
    

2.  Installez les dépendances du backend :
    bash
    npm install
    

3.  Installez les dépendances du frontend :
    bash
    cd client
    npm install
    cd .. 
    

4.  Configurez les variables d'environnement :
    Créer un fichier `.env` à la racine du projet et le remplir en se basant sur cet exemple :

    env
    Fichier .env (à la racine)

    - Base de données
    MONGODB_URI="URL"

    - Authentification
    JWT_SECRET="TOKEN"

    - E-mail de contact (pour Nodemailer)
    CONTACT_EMAIL="EMAIL"
    CONTACT_EMAIL_PASSWORD="MDP"

    - Cloudinary
    CLOUDINARY_CLOUD_NAME="NOM"
    CLOUDINARY_API_KEY="KEY"
    CLOUDINARY_API_SECRET="SECRET-KEY"
    ```

 - Lancement

Lancer le serveur et le client dans deux terminaux séparés :

- Pour le backend :
    bash
    npm run server
    
    Le serveur est sur `http://localhost:3001`.

- Pour le frontend :
    bash
    cd client
    npm run dev
    
    Le site sera visible sur `http://localhost:5173`.

- Administration

Pour se connecter au panneau d'administration en local, se rendre sur `/login` et utiliser les identifiants créés dans la base de données (script `node scripts/createAdmin.js`).

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

### Backend (.env à la racine en prod)
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
