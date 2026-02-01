import "@/styles/globals.scss";
import { Inter, Open_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

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
      <body className={`${openSans.className} ${inter.className}`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
