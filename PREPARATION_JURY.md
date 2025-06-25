# Résumé du Projet Placo Design 64 pour la Soutenance

## 1. Architecture Générale

Le projet est une application "full-stack" composée de :
-   Un **Backend** en Node.js avec le framework Express, servant une API REST.
-   Une base de données **MongoDB** gérée via l'ORM Mongoose.
-   Un **Frontend** en React (créé avec Vite), qui consomme l'API du backend.
-   L'authentification est basée sur les **JSON Web Tokens (JWT)**, stockés de manière sécurisée dans des **cookies httpOnly**.

---

## 2. Analyse du Backend (Serveur)

#### `app.js` (Fichier Principal)
-   **Rôle :** Point d'entrée du serveur.
-   **Détails :** Charge les variables d'environnement, établit la connexion à la base de données, et configure tous les middlewares essentiels :
    -   `cors` : Autorise les requêtes depuis le frontend.
    -   `express.json` : Pour lire les corps de requête en JSON.
    -   `compression` : Compresse les réponses pour de meilleures performances.
    -   **Headers de sécurité** : Ajoute des en-têtes (CSP, HSTS) pour durcir la sécurité contre les attaques XSS.
    -   Définit les routes principales de l'API (`/api/admin`, `/api/realisations`).
    -   Active le gestionnaire d'erreurs global.

#### `config/` (Dossier de Configuration)
-   `database.js` : Gère la connexion à MongoDB avec `async/await` et une gestion des erreurs robuste.
-   `cloudinary.js` : Configure l'accès à l'API de Cloudinary en utilisant les clés secrètes des variables d'environnement.

#### `middleware/` (Dossier des Middlewares)
-   `authMiddleware.js` : **(TRÈS IMPORTANT)** Le gardien des routes admin.
    1.  Vérifie la présence d'un token JWT dans les cookies ou les en-têtes.
    2.  Valide la signature et l'expiration du token.
    3.  **Point clé :** Vérifie dans la base de données que l'admin correspondant au token existe toujours, prévenant l'accès par des comptes supprimés.
-   `uploadImage.js` : Configure Multer pour envoyer directement les images sur Cloudinary. Valide les formats (`jpg`, `png`...) et transforme les images pour optimiser leur taille.
-   `validateRequest.js` : Récupère les erreurs de `express-validator` et renvoie une réponse 400 claire si la validation échoue.
-   `errorHandler.js` : Middleware final qui attrape toutes les erreurs du serveur pour les logger et renvoyer une réponse JSON propre.

#### `src/controllers/` (Dossier des Contrôleurs)
-   `adminController.js` : **(TRÈS IMPORTANT)** Contient la logique de connexion.
    1.  Valide le reCAPTCHA côté serveur pour bloquer les robots.
    2.  Vérifie l'email et le mot de passe avec `bcrypt`.
    3.  Renvoie des messages d'erreur génériques pour la sécurité.
    4.  Crée le JWT et l'envoie dans un cookie `httpOnly`, la méthode la plus sécurisée.
-   `realisationController.js` : Gère toute la logique métier des réalisations (Créer, Lire, Mettre à jour, Supprimer - CRUD).

#### `src/models/` (Dossier des Modèles)
-   `Admin.js` : Schéma Mongoose pour l'administrateur.
    1.  Contient un **hook `pre('save')`** qui hache automatiquement le mot de passe avec `bcryptjs` avant chaque sauvegarde.
    2.  Définit une méthode `comparePassword` pour rendre le code du contrôleur plus propre.
-   `Realisation.js` : Schéma simple pour les réalisations avec des validations (`required`) et des valeurs par défaut (`date`, `showOnHome`).

---

## 3. Analyse du Frontend (Client React)

#### `client/src/authContext.jsx`
-   **Rôle :** Gère l'état d'authentification global de l'application.
-   **Détails :**
    1.  Utilise un **`useEffect` au chargement** pour appeler une route de vérification sur le backend. Cela permet de maintenir l'utilisateur connecté s'il rafraîchit la page.
    2.  Gère un état `isLoading` pour éviter les affichages incorrects pendant la vérification.
    3.  Expose l'état `isAuth` (un booléen) et des fonctions comme `logout` à tous les composants de l'application.

#### `client/src/components/login/Login.jsx`
-   **Rôle :** Fournit le formulaire de connexion pour l'administrateur.
-   **Détails :**
    1.  Utilise le composant `react-google-recaptcha` pour l'interface utilisateur du CAPTCHA.
    2.  Envoie les identifiants et le token reCAPTCHA à l'API backend.
    3.  Après une connexion réussie, il appelle la fonction `checkAuth` du contexte pour mettre à jour l'état de l'application et redirige l'utilisateur.

#### `client/src/components/home/RealisationsPage.jsx`
-   **Rôle :** Affiche la galerie de réalisations et gère toutes les actions CRUD côté client.
-   **Détails :** C'est le meilleur exemple de l'utilisation du contexte.
    1.  Récupère l'état `isAuth` via le hook `useAuth`.
    2.  Utilise le **rendu conditionnel** pour afficher ou masquer les boutons "Ajouter", "Modifier" et "Supprimer". La syntaxe est `{isAuth && <MonBoutonAdmin />}`.
    3.  Gère l'état de plusieurs modales (ajout, édition, confirmation de suppression) pour une expérience utilisateur fluide.

---

## 4. Questions & Réponses Clés du Jury

**Q1 : Quelle est la différence entre le hachage et le cryptage, et pourquoi utiliser l'un ou l'autre ?**
> **R :** Le **hachage** (avec `bcrypt` pour mes mots de passe) est un processus **à sens unique et irréversible**. On ne peut pas retrouver la donnée d'origine. C'est parfait pour les mots de passe, car je n'ai jamais besoin de les relire, seulement de comparer les hashs pour vérifier l'identité. Le **cryptage** est **réversible** avec une clé. On l'utilise pour des données qu'on a besoin de protéger mais aussi de consulter plus tard, comme un message privé. Utiliser le cryptage pour les mots de passe serait dangereux car si la clé est volée, tous les mots de passe sont compromis.

**Q2 : Votre middleware d'authentification semble complexe. Pourquoi vérifier l'admin dans la base de données si le token JWT est déjà valide ?**
> **R :** C'est une mesure de sécurité cruciale. Le token JWT peut être mathématiquement valide, mais l'utilisateur pourrait avoir été supprimé ou désactivé de la base de données entre-temps. Cette vérification (`Admin.findById`) garantit que l'accès est révoqué **instantanément** et empêche un utilisateur supprimé de continuer à utiliser son token jusqu'à son expiration. C'est une défense contre les accès non autorisés persistants.

**Q3 : Comment vous assurez-vous que seuls les administrateurs voient les boutons "Modifier" ou "Supprimer" sur la page des réalisations ?**
> **R :** J'utilise une approche de **rendu conditionnel** dans React. Mon `authContext` fournit un booléen, `isAuth`, qui est `true` si l'admin est connecté. Dans mon composant `RealisationsPage`, j'enveloppe simplement les boutons d'administration dans une condition : `{isAuth && <button>Modifier</button>}`. Si `isAuth` est faux, le bouton n'est tout simplement pas ajouté au DOM et reste invisible pour les visiteurs normaux.

**Q4 : Comment gérez-vous la sécurité des uploads d'images ?**
> **R :** J'utilise une stratégie à plusieurs niveaux. Premièrement, avec `multer-storage-cloudinary`, j'envoie directement les fichiers sur Cloudinary sans les stocker sur mon serveur. Deuxièmement, je configure une liste blanche de **formats autorisés** (`allowed_formats`) pour n'accepter que les images. Troisièmement, pour la performance et la sécurité, j'ai mis en place une **transformation à la volée** qui redimensionne les images trop grandes directement sur Cloudinary, évitant de stocker des fichiers énormes.

**Q5 : J'ai vu un bloc `<script>` avec `ld+json` dans votre code. À quoi sert-il ?**
> **R :** C'est une technique de **SEO avancé** appelée "données structurées" (Schema.org). Ce bloc explique aux moteurs de recherche, dans un langage qu'ils comprennent parfaitement, la nature de la page : "Ceci est une entreprise locale, voici son nom, son adresse, ses horaires...". Cela aide Google à mieux comprendre le site et peut lui permettre d'afficher des **"résultats enrichis"** (comme les horaires d'ouverture) directement dans la page de recherche, ce qui augmente la visibilité et le taux de clics. 