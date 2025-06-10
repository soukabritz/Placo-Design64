import React, { useState, useEffect } from 'react';
import './servicesCarousel.scss';
import platrerie from '../../assets/platrerie.jpg';
import peinture from '../../assets/peinture.jpg';
import carrelage from '../../assets/carrelage.jpg';
import menuiserie from '../../assets/menuiserie.jpg';
import cuisine from '../../assets/cuisine.jpg';
import revetement from '../../assets/revetement.webp';
import terrasse from '../../assets/terrasse.jpg';

const services = [
  {
    title: 'Plâtrerie',
    description: 'Installation et finition de cloisons, plafonds et murs',
    image: platrerie
  },
  {
    title: 'Peinture',
    description: 'Peinture intérieure et extérieure de qualité professionnelle',
    image: peinture
  },
  {
    title: 'Carrelage',
    description: 'Pose de carrelage pour sols et murs',
    image: carrelage
  },
  {
    title: 'Menuiserie',
    description: 'Installation et rénovation d\'éléments en bois',
    image: menuiserie
  },
  {
    title: 'Cuisine',
    description: 'Installation et aménagement de cuisines sur mesure',
    image: cuisine
  },
  {
    title: 'Revêtements',
    description: 'Pose de tous types de revêtements muraux et de sol',
    image: revetement
  },
  {
    title: 'Terrasses',
    description: 'Construction et rénovation de terrasses en bois et caibouti',
    image: terrasse
  }
];

const serviceLinks = [
  '/services/platrerie',
  '/services/peinture',
  '/services/carrelage',
  '/services/menuiserie',
  '/services/cuisine',
  '/services/revetement',
  '/services/terrasse',
];

const ServicesCarousel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isMobile]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % services.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (isMobile) {
    return (
      <div className="services-scroll">
        <div className="scroll-container">
          {services.map((service, index) => (
            <a
              key={index}
              className="service-card"
              href={serviceLinks[index]}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="services-carousel">
      <div className="carousel-container">
        {services.map((service, index) => (
          <a
            key={index}
            className={`service-card ${index === currentIndex ? 'active' : ''}`}
            href={serviceLinks[index]}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              transform: `translateX(${(index - currentIndex) * 100}%)`
            }}
          >
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="carousel-button prev" onClick={handlePrev}>
          &lt;
        </button>
        <div className="carousel-dots">
          {services.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ServicesCarousel; 