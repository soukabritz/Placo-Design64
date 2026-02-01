const Realisation = require('../models/Realisation');

// pour obtenir toutes les réalisations
exports.getAllRealisations = async (req, res) => {
  try {
    const realisations = await Realisation.find().sort({ date: -1 });
    res.json(realisations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// pour obtenir les réalisations à mettre en avant (pour l'accueil)
exports.getFeaturedRealisations = async (req, res) => {
  try {
    const realisations = await Realisation.find({ showOnHome: true }).sort({ date: -1 });
    res.json(realisations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// pour creer une nouvelle realisation
exports.createRealisation = async (req, res) => {
  try {
    const { titre, description, showOnHome } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Cloudinary renvoie l'URL dans file.path

    if (!imageUrl) {
      return res.status(400).json({ message: "L'image est requise" });
    }

    const realisation = new Realisation({ titre, description, imageUrl, showOnHome });
    await realisation.save();
    res.status(201).json(realisation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error });
  }
};

// pour mettre à jour une realisation
exports.updateRealisation = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, imageUrl, showOnHome } = req.body;
    const realisation = await Realisation.findByIdAndUpdate(
      id,
      { titre, description, imageUrl, showOnHome },
      { new: true, runValidators: true }
    );
    if (!realisation) return res.status(404).json({ message: 'Réalisation non trouvée' });
    res.json(realisation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la modification', error });
  }
};

// pour supprimer une realisation
exports.deleteRealisation = async (req, res) => {
  try {
    const { id } = req.params;
    const realisation = await Realisation.findByIdAndDelete(id);
    if (!realisation) return res.status(404).json({ message: 'Réalisation non trouvée' });
    res.json({ message: 'Réalisation supprimée' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la suppression', error });
  }
}; 