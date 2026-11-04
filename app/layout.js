import "@/styles/globals.scss";
// import { AuthProvider } from "@/lib/contexts/AuthContext";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

export const metadata = {
  title: "Placo Design 64 - Plâtrerie, Peinture, Carrelage au Pays Basque",
  description:
    "Entreprise de rénovation et construction au Pays Basque. Spécialiste en plâtrerie, peinture, carrelage et menuiserie.",
  keywords:
    "plâtrerie, peinture, carrelage, rénovation, Pays Basque, Bayonne, Anglet, Biarritz, Placo Design 64",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        {/* AuthProvider disabled until environment variables are configured */}
        {/* <AuthProvider> */}
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
