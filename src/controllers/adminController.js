const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.login = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET manquant dans .env");
      return res.status(500).json({ message: "Configuration serveur incomplète (JWT_SECRET)" });
    }

    const { email, password, recaptchaToken } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // reCAPTCHA : obligatoire seulement si la clé est configurée (production)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return res.status(400).json({ message: "Veuillez valider le reCAPTCHA" });
      }
      try {
        const recaptchaResponse = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        );
        if (!recaptchaResponse.data.success) {
          return res.status(400).json({ message: "Échec de la vérification reCAPTCHA" });
        }
      } catch (error) {
        console.error("Erreur lors de la vérification reCAPTCHA:", error);
        return res.status(400).json({ message: "Erreur lors de la vérification reCAPTCHA" });
      }
    }

    // on verifie si l'admin existe
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // on verifie le mot de passe
    const isValidPassword = await admin.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // on cree le token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // on envoie le token dans un cookie httpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 heures
      sameSite: 'lax'
    });
    
    res.json({ 
      message: "Connexion réussie",
      admin: {
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Déconnexion réussie" });
};

exports.verifyAuth = (req, res) => {
  res.json({ 
    isAuthenticated: true,
    admin: {
      email: req.admin.email
    }
  });
};