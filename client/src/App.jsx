import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';
import Navbar from './components/navigation/Navbar';
import Login from './components/login/Login';
import Home from './components/home/home';
import PolitiqueConfidentialite from './components/home/PolitiqueConfidentialite';
import PrivateRoute from './components/privateRoute';
import ContactPage from './components/home/ContactPage';
import Footer from './components/navigation/Footer';
import RealisationsPage from './components/home/RealisationsPage';
import Platrerie from './components/home/Platrerie';
import Peinture from './components/home/Peinture';
import Carrelage from './components/home/Carrelage';
import Menuiserie from './components/home/Menuiserie';
import Cuisine from './components/home/Cuisine';
import Revetement from './components/home/Revetement';
import Terrasse from './components/home/Terrasse';

const App = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Placo Design 64",
    "image": "https://placodesign64.fr/logo.png",
    "description": "Entreprise de rénovation et construction au Pays Basque. Spécialiste en plâtrerie, peinture, carrelage et menuiserie.",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Pays Basque",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.4833",
      "longitude": "-1.4833"
    },
    "url": "https://placodesign64.fr",
    "telephone": "+33665052999",
    "priceRange": "€€",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/placodesign64",
      "https://www.instagram.com/placodesign64"
    ]
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/realisations" element={<RealisationsPage />} />
            <Route path="/services/platrerie" element={<Platrerie />} />
            <Route path="/services/peinture" element={<Peinture />} />
            <Route path="/services/carrelage" element={<Carrelage />} />
            <Route path="/services/menuiserie" element={<Menuiserie />} />
            <Route path="/services/cuisine" element={<Cuisine />} />
            <Route path="/services/revetement" element={<Revetement />} />
            <Route path="/services/terrasse" element={<Terrasse />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </AuthProvider>
  );
};

export default App;