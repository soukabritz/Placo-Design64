const express = require('express');
const router = express.Router();
const realisationController = require('../src/controllers/realisationController');
const { requireAuth } = require('../middleware/authMiddleware');
const { realisationValidation } = require('../validations/realisationValidations');
const { validateRequest } = require('../middleware/validateRequest');
const upload = require('../middleware/uploadImage');

// mes realisations (public)
router.get('/', realisationController.getAllRealisations);

// mes realisations à mettre en avant (public)
router.get('/home', realisationController.getFeaturedRealisations);

// ajouter une realisation (que admin avec upload image)
router.post('/', requireAuth, upload.single('image'), realisationValidation, validateRequest, realisationController.createRealisation);

// modifier une realisation (quez admin )
router.put('/:id', requireAuth, upload.single('image'), realisationValidation, validateRequest, realisationController.updateRealisation);

// supprimer une realisation (que admin )
router.delete('/:id', requireAuth, realisationController.deleteRealisation);

module.exports = router; 