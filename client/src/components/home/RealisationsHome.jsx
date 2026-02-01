import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/api';
import './realisationsHome.scss';

const RealisationsHome = () => {
  const [realisations, setRealisations] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  // Gestion du swipe sur mobile pour la lightbox
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchStartX.current - touchEndX.current;
      if (Math.abs(delta) > 50) { // seuil de swipe
        if (delta > 0) {
          // swipe gauche => image suivante
          setLightboxIndex((lightboxIndex + 1) % realisations.length);
        } else {
          // swipe droite => image précédente
          setLightboxIndex((lightboxIndex - 1 + realisations.length) % realisations.length);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const fetchRealisations = async () => {
      try {
        const res = await fetch(`${API_URL}/api/realisations?showOnHome=true`);
        const data = await res.json();
        setRealisations(data);
      } catch {
        setRealisations([]);
      }
    };
    fetchRealisations();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('lightbox-overlay')) {
        setLightboxIndex(null);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [lightboxIndex]);

  if (!realisations.length) return null;

  // Version mobile : slider horizontal fluide
  if (isMobile) {
    return (
      <section className="realisations-home-section container">
        <div className="realisations-home-wrapper">
          <h2 className="realisations-home-title">Nos réalisations</h2>
          <div className="realisations-scroll" ref={scrollRef}>
            {realisations.map((real, idx) => (
              <div key={real._id} className="realisation-slide">
                <div className="slide-img-wrapper" onClick={() => setLightboxIndex(idx)} style={{cursor:'pointer'}}>
                  <picture>
                    <source srcSet={real.imageUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                    <img src={real.imageUrl} alt={real.titre || 'Réalisation Placo Design 64'} className="slide-img" width="400" height="400" />
                  </picture>
                </div>
              </div>
            ))}
          </div>
          <div className="realisations-home-cta">
            <Link to="/realisations" className="realisations-see-more">
              Voir plus
            </Link>
          </div>
        </div>
        {lightboxIndex !== null && (
          <div
            className="lightbox-overlay"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="lightbox-content lightbox-content-large">
              <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>&times;</button>
              <picture>
                <source srcSet={realisations[lightboxIndex].imageUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                <img src={realisations[lightboxIndex].imageUrl} alt={realisations[lightboxIndex].titre || 'Réalisation Placo Design 64'} className="lightbox-img" width="800" height="600" />
              </picture>
              <div className="lightbox-caption">
                <h3>{realisations[lightboxIndex].titre}</h3>
                {realisations[lightboxIndex].description && <p>{realisations[lightboxIndex].description}</p>}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // Version desktop : grille 3x2, max 6 réalisations, lightbox au clic
  return (
    <section className="realisations-home-section container">
      <div className="realisations-home-wrapper">
        <h2 className="realisations-home-title">Nos réalisations</h2>
        <div className="realisations-grid">
          {realisations.slice(0, 6).map((real, idx) => (
            <div key={real._id} className="grid-item">
              <div className="slide-img-wrapper" onClick={() => setLightboxIndex(idx)} style={{cursor:'pointer'}}>
                <picture>
                  <source srcSet={real.imageUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                  <img src={real.imageUrl} alt={real.titre || 'Réalisation Placo Design 64'} className="grid-img" width="400" height="400" />
                </picture>
              </div>
            </div>
          ))}
        </div>
        <div className="realisations-home-cta">
          <Link to="/realisations" className="realisations-see-more">
            Voir plus
          </Link>
        </div>
        {lightboxIndex !== null && (
          <div className="lightbox-overlay">
            <button
              className="lightbox-arrow lightbox-arrow-left"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + realisations.length) % realisations.length)}
              aria-label="Précédent"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="lightbox-content lightbox-content-large">
              <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>&times;</button>
              <button
                className="lightbox-arrow lightbox-arrow-right"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % realisations.length)}
                aria-label="Suivant"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
              <picture>
                <source srcSet={realisations[lightboxIndex].imageUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                <img src={realisations[lightboxIndex].imageUrl} alt={realisations[lightboxIndex].titre || 'Réalisation Placo Design 64'} className="lightbox-img" width="800" height="600" />
              </picture>
              <div className="lightbox-caption">
                <h3>{realisations[lightboxIndex].titre}</h3>
                {realisations[lightboxIndex].description && <p>{realisations[lightboxIndex].description}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RealisationsHome; 