require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../src/models/Admin');

async function createAdmin() {
  try {
    console.log('Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Supprimer l'admin existant
    console.log('Suppression de l\'admin existant...');
    await Admin.deleteMany({});
    console.log('✅ Admin existant supprimé');

    // Créer le nouveau mot de passe haché
    console.log('Hachage du mot de passe...');
    const hashedPassword = await bcrypt.hash('Placodesign123456', 10);
    console.log('✅ Mot de passe haché');

    // Créer le nouvel admin
    const admin = new Admin({
      email: 'abdelkader.biarritz@gmail.com',
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Nouvel admin créé avec succès');

    // Test de connexion
    console.log('\nTest de connexion...');
    const testAdmin = await Admin.findOne({ email: 'abdelkader.biarritz@gmail.com' });
    if (!testAdmin) {
      console.log('❌ Admin non trouvé');
      return;
    }

    const isPasswordValid = await testAdmin.comparePassword('Placodesign123456');
    console.log(isPasswordValid ? '✅ Test de connexion réussi' : '❌ Test de connexion échoué');

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Déconnecté de MongoDB');
  }
}

createAdmin(); 