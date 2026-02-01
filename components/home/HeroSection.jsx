"use client";

import React from "react";
import "./heroSection.scss";
import ServicesCarousel from "./ServicesCarousel";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(/home-bg2.webp)` }}
        aria-hidden="true"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="container">
          <div className="hero-flex">
            <div className="hero-left">
              <span className="hero-subtitle">
                À VOTRE SERVICE SUR TOUT LE PAYS BASQUE
              </span>
              <h1>
                Créons l'intérieur
                <br />
                parfait pour votre
                <br />
                confort
              </h1>
              <p className="hero-description">
                Nous nous chargeons de tous les projets de rénovation.
              </p>
              <div className="hero-buttons">
                <a href="/contact" className="contact-btn">
                  <FaEnvelope
                    style={{ marginRight: "0.5em", verticalAlign: "middle" }}
                  />{" "}
                  Contactez-nous
                </a>
                <a href="tel:0665052999" className="phone-btn">
                  <FaPhoneAlt
                    style={{ marginRight: "0.5em", verticalAlign: "middle" }}
                  />{" "}
                  06 65 05 29 99
                </a>
              </div>
            </div>
            <ServicesCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
