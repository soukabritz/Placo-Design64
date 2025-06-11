const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const realisationRoutes = require('./routes/realisationRoutes');
const compression = require('compression');

const app = express();

// charger les vbs d'environnement en premier
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// configuration CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// Headers de sécurité HTTP (CSP, HSTS, COOP, X-Frame-Options)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://www.google.com https://www.gstatic.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com;");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

// connexion à la base de données
connectDB();

// routes
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/realisations', realisationRoutes);

// gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée" });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build', { maxAge: '1y' }));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error("Erreur lors du démarrage du serveur:", err);
});