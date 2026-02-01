"use client";

import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./servicesCarousel.scss";

const services = [
  {
    title: "Plâtrerie",
    description: "Installation et finition de cloisons, plafonds et murs",
    image: "/platrerie.webp",
  },
  {
    title: "Peinture",
    description: "Peinture intérieure et extérieure de qualité professionnelle",
    image: "/peinture.webp",
  },
  {
    title: "Carrelage",
    description: "Pose de carrelage pour sols et murs",
    image: "/carrelage.webp",
  },
  {
    title: "Menuiserie",
    description: "Installation et rénovation d'éléments en bois",
    image: "/menuiserie.webp",
  },
  {
    title: "Cuisine",
    description: "Installation et aménagement de cuisines sur mesure",
    image: "/cuisine.webp",
  },
  {
    title: "Revêtements",
    description: "Pose de tous types de revêtements muraux et de sol",
    image: "/revetement.webp",
  },
  {
    title: "Terrasses",
    description: "Construction et rénovation de terrasses en bois et caibouti",
    image: "/terrasse.webp",
  },
];

const serviceLinks = [
  "/services/platrerie",
  "/services/peinture",
  "/services/carrelage",
  "/services/menuiserie",
  "/services/cuisine",
  "/services/revetement",
  "/services/terrasse",
];

const ServicesCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      prevIndex === 0 ? services.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
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
              style={{ textDecoration: "none", color: "inherit" }}
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
            className={`service-card ${index === currentIndex ? "active" : ""}`}
            href={serviceLinks[index]}
            style={{
              textDecoration: "none",
              color: "inherit",
              transform: `translateX(${(index - currentIndex) * 100}%)`,
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
        <div className="carousel-controls-left">
          <button
            type="button"
            className="carousel-button prev"
            onClick={handlePrev}
            aria-label="Slide précédente"
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="carousel-dots">
          {services.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-controls-right">
          <button
            type="button"
            className="carousel-button next"
            onClick={handleNext}
            aria-label="Slide suivante"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;
