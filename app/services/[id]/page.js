import ServicePage from "@/components/services/ServicePage";
import { notFound } from "next/navigation";

const servicesData = {
  platrerie: {
    title: "Plâtrerie générale au Pays Basque",
    sub: "Placo Design 64 est spécialisé dans la plâtrerie générale et l'aménagement intérieur.",
    mainTitle: "Nos services en matière de plâtrerie",
    mainText:
      "Nous prenons en main <b>tous les travaux liés à la plâtrerie</b> : pose de cloisons, faux plafonds, isolation, finitions, rénovation et aménagement intérieur.",
    points: [
      "Chaque réalisation est conforme aux normes de sécurité et de qualité.",
      "Conseils personnalisés pour optimiser votre confort et la durabilité de vos espaces.",
    ],
    footerText:
      "Nous intervenons aussi pour la rénovation de vos pièces et l'amélioration de votre habitat.",
    img: "/platrerie.webp",
    argTitle: "Des plâtriers qualifiés à votre service",
    argText:
      "Forts de notre expérience, nous vous garantissons des prestations irréprochables, un suivi de chantier rigoureux et des conseils adaptés à vos besoins. <br/><br/> Notre mode d'intervention nous permet de <b>mener à bien le chantier dans les délais les plus courts</b>. Faites confiance à Placo Design 64 pour tous vos projets de plâtrerie.",
  },
  peinture: {
    title: "Peinture intérieure et extérieure au Pays Basque",
    sub: "Placo Design 64 réalise tous vos travaux de peinture, décoration et rénovation, pour un rendu impeccable et durable.",
    mainTitle: "Nos services de peinture",
    mainText:
      "Nous intervenons pour tous vos <b>travaux de peinture intérieure et extérieure</b> : murs, plafonds, boiseries, ferronneries, façades, rénovation et décoration.",
    points: [
      "Préparation soignée des supports et finitions haut de gamme.",
      "Conseils personnalisés sur le choix des couleurs et des matériaux.",
    ],
    footerText:
      "Nous utilisons des peintures professionnelles respectueuses de l'environnement et adaptées à chaque support.",
    img: "/peinture.webp",
    argTitle: "Des peintres qualifiés à votre service",
    argText:
      "Notre équipe vous garantit un travail soigné, des finitions irréprochables et le respect des délais. Nous vous accompagnons dans tous vos projets de peinture, du conseil à la réalisation. <br/><br/> Nous nous adaptons à vos envies et à votre budget pour sublimer votre intérieur ou votre façade.",
  },
  carrelage: {
    title: "Pose de carrelage au Pays Basque",
    sub: "Placo Design 64 réalise la pose de carrelage, faïence et mosaïque pour tous vos projets de rénovation ou de construction.",
    mainTitle: "Nos services de carrelage",
    mainText:
      "Nous posons tous types de <b>carrelages, faïences et mosaïques</b> : sols, murs, salles de bains, cuisines, terrasses.",
    points: [
      "Préparation des supports et pose dans les règles de l'art.",
      "Conseils sur le choix des matériaux et des motifs.",
    ],
    footerText:
      "Nous assurons un rendu esthétique, durable et facile d'entretien.",
    img: "/carrelage.webp",
    argTitle: "Des carreleurs expérimentés à votre service",
    argText:
      "Nous vous garantissons une pose précise, des finitions soignées et le respect des délais. Nous intervenons sur tous types de chantiers, neufs ou rénovations. <br/><br/> Faites confiance à Placo Design 64 pour sublimer vos sols et murs avec un carrelage de qualité.",
  },
  menuiserie: {
    title: "Menuiserie intérieure et extérieure au Pays Basque",
    sub: "Placo Design 64 réalise tous vos travaux de menuiserie sur mesure, en neuf ou en rénovation.",
    mainTitle: "Nos services de menuiserie",
    mainText:
      "Nous réalisons tous vos <b>travaux de menuiserie intérieure et extérieure</b> : portes, fenêtres, placards, escaliers, parquets, terrasses bois, agencements sur mesure.",
    points: [
      "Fabrication et pose sur mesure, finitions soignées.",
      "Conseils personnalisés pour optimiser vos espaces.",
    ],
    footerText:
      "Nous travaillons avec des matériaux de qualité pour garantir la durabilité de vos aménagements.",
    img: "/menuiserie.webp",
    argTitle: "Des menuisiers expérimentés à votre service",
    argText:
      "Nous vous garantissons des réalisations sur mesure, robustes et esthétiques, adaptées à vos besoins et à votre budget. <br/><br/> Faites confiance à Placo Design 64 pour tous vos projets de menuiserie, en neuf ou en rénovation.",
  },
  cuisine: {
    title: "Installation et aménagement de cuisines au Pays Basque",
    sub: "Placo Design 64 conçoit et installe des cuisines sur mesure, fonctionnelles et esthétiques, adaptées à vos envies.",
    mainTitle: "Nos services de cuisine",
    mainText:
      "Nous réalisons l'installation et l'aménagement de cuisines sur mesure : conception, pose, électroménager, plans de travail, rangements, finitions.",
    points: [
      "Conseils personnalisés pour optimiser l'espace et la fonctionnalité.",
      "Matériaux de qualité et finitions soignées.",
    ],
    footerText:
      "Nous vous accompagnons de la conception à la réalisation pour une cuisine qui vous ressemble.",
    img: "/cuisine.webp",
    argTitle: "Des cuisinistes à votre écoute",
    argText:
      "Nous vous proposons des solutions sur mesure, adaptées à vos besoins et à votre budget, pour une cuisine pratique et esthétique. <br/><br/> Faites confiance à Placo Design 64 pour la réalisation de votre cuisine, de la conception à la pose.",
  },
  revetement: {
    title: "Pose de revêtements au Pays Basque",
    sub: "Placo Design 64 pose tous types de revêtements de sol et muraux pour sublimer votre intérieur.",
    mainTitle: "Nos services de revêtements",
    mainText:
      "Nous posons tous types de <b>revêtements de sol et muraux</b> : parquet, stratifié, vinyle, moquette, papier peint, lambris, etc.",
    points: [
      "Préparation des supports et pose soignée.",
      "Conseils sur le choix des matériaux et des finitions.",
    ],
    footerText:
      "Nous vous garantissons un résultat esthétique, durable et facile d'entretien.",
    img: "/revetement.webp",
    argTitle: "Des spécialistes des revêtements à votre service",
    argText:
      "Nous vous accompagnons dans le choix et la pose de vos revêtements pour un intérieur à votre image. <br/><br/> Faites confiance à Placo Design 64 pour un résultat soigné et durable.",
  },
  terrasse: {
    title: "Construction et rénovation de terrasses au Pays Basque",
    sub: "Placo Design 64 réalise la création et la rénovation de terrasses en bois, composite ou carrelage, pour profiter pleinement de votre extérieur.",
    mainTitle: "Nos services de terrasses",
    mainText:
      "Nous réalisons la <b>construction et la rénovation de terrasses</b> en bois, composite ou carrelage : conception, pose, finitions, entretien.",
    points: [
      "Conseils personnalisés pour un extérieur durable et esthétique.",
      "Matériaux de qualité et finitions soignées.",
    ],
    footerText:
      "Profitez d'un espace extérieur convivial et adapté à vos envies.",
    img: "/terrasse.webp",
    argTitle: "Des spécialistes des terrasses à votre service",
    argText:
      "Nous vous accompagnons dans la création d'un espace extérieur sur mesure, adapté à vos besoins et à votre budget. <br/><br/> Faites confiance à Placo Design 64 pour une terrasse durable, esthétique et facile à entretenir.",
  },
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = servicesData[id];

  if (!service) {
    return {
      title: "Service non trouvé - Placo Design 64",
    };
  }

  return {
    title: `${service.title} - Placo Design 64`,
    description: service.sub,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const service = servicesData[id];

  if (!service) {
    notFound();
  }

  return <ServicePage data={service} />;
}
