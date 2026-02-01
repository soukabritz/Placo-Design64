"use client";

import React from "react";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./servicePage.scss";

const ServicePage = ({ data }) => {
  if (!data) return null;

  return (
    <div className="service-root">
      <div className="container">
        <section className="section-header">
          <h1 className="section-header-title">{data.title}</h1>
          <p className="section-header-sub">{data.sub}</p>
          <div className="section-header-contact">
            <span className="section-header-label">Réponse rapide</span>
            <span className="section-header-phone">
              <FaPhoneAlt style={{ marginRight: "0.5rem" }} />
              06 65 05 29 99
            </span>
          </div>
        </section>

        <section className="service-main-block">
          <div className="service-main-text">
            <h2>{data.mainTitle}</h2>
            <p dangerouslySetInnerHTML={{ __html: data.mainText }} />
            <ul>
              {data.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <p>{data.footerText}</p>
            <Link href="/contact" className="contact-btn">
              <FaEnvelope style={{ marginRight: "0.6em" }} />
              Contactez-nous
            </Link>
          </div>
          <div className="service-main-img">
            <picture>
              <img src={data.img} alt={data.title} width="400" height="300" />
            </picture>
          </div>
        </section>

        <section className="service-cards-row">
          <div className="service-card-large dark">
            <h3>Nos prestations</h3>
            <ul>
              <li>
                <Link href="/services/platrerie">Plâtrerie</Link>
              </li>
              <li>
                <Link href="/services/peinture">Peinture</Link>
              </li>
              <li>
                <Link href="/services/carrelage">Carrelage</Link>
              </li>
              <li>
                <Link href="/services/menuiserie">Menuiserie</Link>
              </li>
              <li>
                <Link href="/services/cuisine">Cuisine</Link>
              </li>
              <li>
                <Link href="/services/revetement">Revêtements</Link>
              </li>
              <li>
                <Link href="/services/terrasse">Terrasses</Link>
              </li>
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

        <section className="service-argument-block">
          <div className="service-argument-text">
            <h2>{data.argTitle}</h2>
            <p dangerouslySetInnerHTML={{ __html: data.argText }} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicePage;
