const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '../client/src/assets');

fs.readdirSync(assetsDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    const inputPath = path.join(assetsDir, file);
    const outputPath = inputPath.replace(ext, '.webp');
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`Converti : ${file} -> ${path.basename(outputPath)}`))
      .catch(err => console.error(`Erreur conversion ${file} :`, err));
  }
}); 