# 🌳 Arborescence Backend

## 📁 Structure des Dossiers

```
backend/
├── 📁 config/
│ ├── database.js # Configuration MongoDB
│ └── multer.js # Upload d'images
│
├── 📁 controllers/
│ └── adminController.js # Gestion admin (projets + photos)
│
├── 📁 models/
│ ├── Admin.js # Schéma admin (un seul compte)
│ └── Project.js # Schéma projet avec photos
│
├── 📁 routes/
│ └── adminRoutes.js # Routes admin sécurisées
│
├── 📁 middleware/
│ ├── adminAuth.js # Vérification admin
│ ├── upload.js # Upload images
│ └── errorHandler.js # Gestion erreurs
│
└── 📄 server.js # Point d'entrée

## 🔄 Flux de Données

### 📋 Gestion Projets/Réalisations
```
Admin -> projectRoutes -> projectController -> Project Model -> MongoDB
```

## 🔐 Sécurité

### Middleware d'Authentification
- Vérification JWT
- Rôles utilisateurs
- Permissions

### Protection des Routes
- Rate limiting
- CORS
- Validation des données

## 📊 Base de Données

### Collections MongoDB
- Users
- Projects
- Quotes
- Messages
- Documents

## 📨 API Endpoints

### 🏗️ Projets/Réalisations
- GET /api/projects     # Afficher tous les projets
- POST /api/projects    # Ajouter un projet
- PUT /api/projects/:id # Modifier un projet
- DELETE /api/projects/:id # Supprimer un projet


## 📨 API Endpoints Admin

### 🔐 Admin
- POST /api/admin/login    # Connexion admin
- GET /api/admin/projects  # Voir tous les projets
- POST /api/admin/projects # Ajouter projet + photos
- PUT /api/admin/projects/:id # Modifier projet
- DELETE /api/admin/projects/:id # Supprimer projet
- POST /api/admin/upload   # Upload nouvelles photos


