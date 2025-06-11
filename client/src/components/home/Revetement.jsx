import React from 'react';
import './servicePage.scss';
import revetementImgWebp from '../../assets/revetement.webp';

const Revetement = () => {
  return (
    <div className="service-root">
      <div className="container">
        {/* HEADER HARMONIEUX */}
        <section className="section-header">
          <h1 className="section-header-title">Pose de revêtements au Pays Basque</h1>
          <p className="section-header-sub">Placo Design 64 pose tous types de revêtements de sol et muraux pour sublimer votre intérieur.</p>
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
            <h2>Nos services de revêtements</h2>
            <p>Nous posons tous types de <b>revêtements de sol et muraux</b> : parquet, stratifié, vinyle, moquette, papier peint, lambris, etc.</p>
            <ul>
              <li>Préparation des supports et pose soignée.</li>
              <li>Conseils sur le choix des matériaux et des finitions.</li>
            </ul>
            <p>Nous vous garantissons un résultat esthétique, durable et facile d'entretien.</p>
            <a href="/contact" className="contact-btn" style={{marginTop: '1.2rem', textDecoration: 'none'}}>
              <i className="fas fa-envelope" style={{marginRight: '0.6em'}}></i>
              Contactez-nous
            </a>
          </div>
          <div className="service-main-img">
            <picture>
              <img src={revetementImgWebp} alt="Pose de revêtements Placo Design 64" width="400" height="300" />
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
            <h2>Des spécialistes des revêtements à votre service</h2>
            <p>Nous vous accompagnons dans le choix et la pose de vos revêtements pour un intérieur à votre image.</p>
            <p>Faites confiance à Placo Design 64 pour un résultat soigné et durable.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Revetement; 