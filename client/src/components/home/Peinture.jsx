import React from 'react';
import './servicePage.scss';
import peintureImgWebp from '../../assets/peinture.webp';

const Peinture = () => {
  return (
    <div className="service-root">
      <div className="container">
        {/* HEADER HARMONIEUX */}
        <section className="section-header">
          <h1 className="section-header-title">Peinture intérieure et extérieure au Pays Basque</h1>
          <p className="section-header-sub">Placo Design 64 réalise tous vos travaux de peinture, décoration et rénovation, pour un rendu impeccable et durable.</p>
          <div className="section-header-contact">
            <span className="section-header-label">Réponse rapide</span>
            <span className="section-header-phone" style={{fontWeight: 700, fontSize: '1.13rem', display: 'inline-flex', alignItems: 'center'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{verticalAlign: 'middle', marginRight: '0.4em', display: 'inline-block'}} aria-label="Téléphone">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" fill="#222"/>
              </svg>
              06 65 05 29 99
            </span>
          </div>
        </section>

        {/* BLOC PRINCIPAL */}
        <section className="service-main-block">
          <div className="service-main-text">
            <h2>Nos services de peinture</h2>
            <p>Nous intervenons pour tous vos <b>travaux de peinture intérieure et extérieure</b> : murs, plafonds, boiseries, ferronneries, façades, rénovation et décoration.</p>
            <ul>
              <li>Préparation soignée des supports et finitions haut de gamme.</li>
              <li>Conseils personnalisés sur le choix des couleurs et des matériaux.</li>
            </ul>
            <p>Nous utilisons des peintures professionnelles respectueuses de l'environnement et adaptées à chaque support.</p>
            <a href="/contact" className="contact-btn" style={{marginTop: '1.2rem', textDecoration: 'none'}}>
              <i className="fas fa-envelope" style={{marginRight: '0.6em'}}></i>
              Contactez-nous
            </a>
          </div>
          <div className="service-main-img">
            <picture>
              <img src={peintureImgWebp} alt="Travaux de peinture Placo Design 64" width="400" height="300" />
            </picture>
          </div>
        </section>

        {/* CARTES */}
        <section className="service-cards-row">
          <div className="service-card-large dark">
            <h3>Nos prestations</h3>
            <ul>
              <li><a href="/services/platrerie">Plâtrerie</a></li>
              <li><a href="/services/peinture">Peinture</a></li>
              <li><a href="/services/carrelage">Carrelage</a></li>
              <li><a href="/services/menuiserie">Menuiserie</a></li>
              <li><a href="/services/cuisine">Cuisine</a></li>
              <li><a href="/services/revetement">Revêtements</a></li>
              <li><a href="/services/terrasse">Terrasses</a></li>
            </ul>
          </div>
          <div className="service-card-large">
            <h3>Zone d'intervention</h3>
            <ul>
              <li>Pays Basque, Landes et alentours</li>
              <li>Intervention rapide sur tout le secteur</li>
            </ul>
          </div>
        </section>

        {/* ARGUMENTAIRE */}
        <section className="service-argument-block">
          <div className="service-argument-text">
            <h2>Des peintres qualifiés à votre service</h2>
            <p>Notre équipe vous garantit un travail soigné, des finitions irréprochables et le respect des délais. Nous vous accompagnons dans tous vos projets de peinture, du conseil à la réalisation.</p>
            <p>Nous nous adaptons à vos envies et à votre budget pour sublimer votre intérieur ou votre façade.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Peinture; 