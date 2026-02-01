"use client";

import React from "react";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import "./footer.scss";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col footer-col-left">
            <img
              src="/LogoPlacoDesign64.webp"
              alt="Logo Placo Design 64"
              className="footer-logo"
              loading="lazy"
            />
            <div className="footer-info">
              <a href="tel:0665052999" className="footer-phone">
                <FaPhoneAlt
                  style={{ marginRight: "0.5em", verticalAlign: "middle" }}
                />
                <span>06 65 05 29 99</span>
              </a>
            </div>
          </div>
          <div className="footer-col footer-col-center">
            <nav className="footer-links">
              <Link href="/">Accueil</Link>
              <Link href="/contact">Contactez-nous</Link>
              <Link href="/conditions-utilisation">
                Conditions d'utilisation
              </Link>
              <Link href="/politique-confidentialite">
                Politique de confidentialité
              </Link>
            </nav>
          </div>
          <div className="footer-col footer-col-right">
            <h2 className="footer-title">
              L'expertise rénovation au service de votre
              <br />
              confort
            </h2>
            <p className="footer-phrase">
              Placo Design 64 vous accompagne dans tous vos projets de
              rénovation et d'aménagement.
            </p>
            <Link href="/contact" className="footer-contact-btn contact-btn">
              Contactez-nous
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <button className="footer-top-btn" onClick={scrollToTop}>
            ↑ Haut de page
          </button>
          <p>
            &copy; {new Date().getFullYear()} Placo Design 64 - Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
