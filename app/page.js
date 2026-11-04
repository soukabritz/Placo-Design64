"use client";

import React from "react";
import "@/components/home/home.scss";
import HeroSection from "@/components/home/HeroSection";
import Presentation from "@/components/home/Presentation";
import RealisationsHome from "@/components/home/RealisationsHome";

export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <section className="home-title-block">
        <div className="home-title-panel">
          <div className="home-title-copy">
            <h1>
              Entreprise de rénovation et aménagement intérieur au Pays Basque
            </h1>
            <p className="home-subtitle">
              Placo Design 64 met son expertise à votre service pour transformer
              et moderniser votre intérieur. Profitez d'un accompagnement
              sur-mesure pour des travaux de qualité, réalisés dans le respect
              de vos attentes.
            </p>
          </div>
          <ul className="home-title-points">
            <li>
              <span className="home-title-index">01</span>
              <div>
                <strong>Pays Basque</strong>
                <span>Une intervention sur l'ensemble du secteur</span>
              </div>
            </li>
            <li>
              <span className="home-title-index">02</span>
              <div>
                <strong>Un seul interlocuteur</strong>
                <span>Du premier échange jusqu'à la finition</span>
              </div>
            </li>
            <li>
              <span className="home-title-index">03</span>
              <div>
                <strong>Tous les travaux</strong>
                <span>Plâtrerie, peinture, carrelage et menuiserie</span>
              </div>
            </li>
            <li>
              <span className="home-title-index">04</span>
              <div>
                <strong>Sur-mesure</strong>
                <span>Des finitions adaptées à votre intérieur</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <Presentation />
      <RealisationsHome />
    </div>
  );
}
