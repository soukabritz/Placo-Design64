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
        <h1>
          Entreprise de rénovation et aménagement intérieur au Pays Basque
        </h1>
        <p className="home-subtitle">
          Placo Design 64 met son expertise à votre service pour transformer et
          moderniser votre intérieur. Profitez d'un accompagnement sur-mesure
          pour des travaux de qualité, réalisés dans le respect de vos attentes.
        </p>
      </section>
      <Presentation />
      <RealisationsHome />
    </div>
  );
}
