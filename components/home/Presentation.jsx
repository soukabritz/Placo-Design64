import React from "react";
import { FaEnvelope } from "react-icons/fa";

const Presentation = () => (
  <section className="home-presentation">
    <div className="container">
      <div className="presentation-flex">
        <div className="presentation-text">
          <h2>Spécialistes de la rénovation et de l'aménagement intérieur</h2>
          <p>
            Engagez Placo Design 64 pour tous vos projets de <b>rénovation</b>{" "}
            et d'aménagement. Nous intervenons sur l'ensemble du{" "}
            <b>Pays Basque</b> pour&nbsp;:
          </p>
          <ul>
            <li>
              Les travaux de <b>plâtrerie</b>
            </li>
            <li>
              La création et la rénovation de <b>cuisines sur mesure</b>
            </li>
            <li>
              L'aménagement de <b>salles de bains</b>
            </li>
            <li>
              La pose de <b>cloisons</b>, de <b>revêtements de sols</b> et de{" "}
              <b>murs</b>
            </li>
            <li>
              La <b>peinture</b>, <b>menuiserie</b> et <b>carrelage</b>
            </li>
          </ul>
          <p>
            De la conception à la réalisation, chaque projet est pensé pour
            votre confort.
          </p>
          <a
            href="/contact"
            className="contact-btn"
            style={{ textDecoration: "none" }}
          >
            <FaEnvelope
              style={{ marginRight: "0.5em", verticalAlign: "middle" }}
            />{" "}
            Contactez-nous
          </a>
        </div>
        <div className="presentation-image">
          <picture>
            <img
              src="/hero-image.webp"
              alt="Réalisation Placo Design 64"
              width="420"
              height="320"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </div>
  </section>
);

export default Presentation;
