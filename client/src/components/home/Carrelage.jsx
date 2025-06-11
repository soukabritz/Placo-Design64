import React from 'react';
import './servicePage.scss';
import carrelageImgWebp from '../../assets/carrelage.webp';

const Carrelage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pose de carrelage au Pays Basque",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Placo Design 64",
      "telephone": "+33665052999",
      "areaServed": "Pays Basque"
    },
    "description": "Placo Design 64 réalise la pose de carrelage, faïence et mosaïque pour tous vos projets de rénovation ou de construction.",
    "serviceType": "Pose de carrelage",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <div className="service-root">
        <div className="container">
          {/* HEADER HARMONIEUX */}
          <section className="section-header">
            <h1 className="section-header-title">Pose de carrelage au Pays Basque</h1>
            <p className="section-header-sub">Placo Design 64 réalise la pose de carrelage, faïence et mosaïque pour tous vos projets de rénovation ou de construction.</p>
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
              <h2>Nos services de carrelage</h2>
              <p>Nous posons tous types de <b>carrelages, faïences et mosaïques</b> : sols, murs, salles de bains, cuisines, terrasses.</p>
              <ul>
                <li>Préparation des supports et pose dans les règles de l'art.</li>
                <li>Conseils sur le choix des matériaux et des motifs.</li>
              </ul>
              <p>Nous assurons un rendu esthétique, durable et facile d'entretien.</p>
              <a href="/contact" className="contact-btn" style={{marginTop: '1.2rem', textDecoration: 'none'}}>
                <i className="fas fa-envelope" style={{marginRight: '0.6em'}}></i>
                Contactez-nous
              </a>
            </div>
            <div className="service-main-img">
              <picture>
                <source srcSet={carrelageImgWebp} type="image/webp" />
                <img src={carrelageImgWebp} alt="Pose de carrelage Placo Design 64" width="400" height="300" />
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
              <h2>Des carreleurs expérimentés à votre service</h2>
              <p>Nous vous garantissons une pose précise, des finitions soignées et le respect des délais. Nous intervenons sur tous types de chantiers, neufs ou rénovations.</p>
              <p>Faites confiance à Placo Design 64 pour sublimer vos sols et murs avec un carrelage de qualité.</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Carrelage; 