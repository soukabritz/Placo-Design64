const fs = require("fs");
const path = require("path");

function copyStandaloneAssets() {
  const root = process.cwd();
  const standaloneDir = path.join(root, ".next", "standalone");

  if (!fs.existsSync(path.join(standaloneDir, "server.js"))) {
    return false;
  }

  function copyDir(from, to) {
    if (!fs.existsSync(from)) return;
    fs.cpSync(from, to, { recursive: true });
    console.log(
      "Copié :",
      path.relative(root, from),
      "->",
      path.relative(root, to),
    );
  }

  copyDir(path.join(root, "public"), path.join(standaloneDir, "public"));
  copyDir(
    path.join(root, ".next", "static"),
    path.join(standaloneDir, ".next", "static"),
  );
  return true;
}

if (require.main === module) {
  copyStandaloneAssets();
}

module.exports = copyStandaloneAssets;
