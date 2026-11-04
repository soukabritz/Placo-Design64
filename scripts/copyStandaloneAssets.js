const fs = require("fs");
const path = require("path");

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");

if (!fs.existsSync(standaloneDir)) {
  console.log("Pas de dossier standalone, copie ignorée.");
  process.exit(0);
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) {
    console.warn("Dossier absent, copie ignorée :", from);
    return;
  }
  fs.cpSync(from, to, { recursive: true });
  console.log("Copié :", path.relative(root, from), "->", path.relative(root, to));
}

copyDir(path.join(root, "public"), path.join(standaloneDir, "public"));
copyDir(
  path.join(root, ".next", "static"),
  path.join(standaloneDir, ".next", "static"),
);
