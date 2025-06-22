const jwt = require("jsonwebtoken");
const Admin = require("../src/models/Admin");

exports.requireAuth = async (req, res, next) => {
  try {
    // double verification du token header authorization ou cookie
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({ message: "Non autorisé - Token manquant" });
    }

    // verifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // verifie si l'admin existe toujours
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Non autorisé - Admin non trouvé" });
    }

    // ajoute l'admin à la requête
    req.admin = admin;
    next();
  } catch (error) {
    console.error("Erreur d'authentification:", error);
    return res.status(401).json({ message: "Non autorisé - Token invalide" });
  }
};