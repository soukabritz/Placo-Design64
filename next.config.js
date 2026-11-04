const path = require("path");
const copyStandaloneAssets = require("./scripts/copyStandaloneAssets");

if (!global.__placoStandaloneCopy) {
  global.__placoStandaloneCopy = true;
  process.on("exit", () => {
    try {
      copyStandaloneAssets();
    } catch (error) {
      console.error("Copie des fichiers standalone impossible :", error);
    }
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
