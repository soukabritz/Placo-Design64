import React from 'react';
import './legal.scss';

const PolitiqueConfidentialite = () => {
  return (
    <div className="legal-container">
      <h1>Politique de Confidentialité (RGPD)</h1>
      <p>Dernière mise à jour : [Date]</p>

      <h2>1. Collecte de l'information</h2>
      <p>
        Nous recueillons des informations lorsque vous nous contactez via le formulaire de contact. Les informations
        recueillies incluent votre nom, votre adresse e-mail et votre numéro de téléphone.
      </p>

      <h2>2. Utilisation des informations</h2>
      <p>
        Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
        <ul>
          <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
          <li>Améliorer notre site Web</li>
          <li>Vous contacter par e-mail ou téléphone</li>
        </ul>
      </p>

      <h2>3. Confidentialité</h2>
      <p>
        Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles
        ne seront pas vendues, échangées, transférées, ou données à une autre société sans votre consentement.
      </p>

      <h2>4. Divulgation à des tiers</h2>
      <p>
        Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers.
      </p>

      <h2>5. Protection des informations</h2>
      <p>
        Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles.
        Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Nos cookies améliorent l'accès à notre site et identifient les visiteurs réguliers. Cependant, cette utilisation
        des cookies n'est en aucune façon liée à des informations personnelles identifiables sur notre site.
      </p>
      
      <h2>7. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos
        données. Vous pouvez exercer ces droits à tout moment en nous contactant à [Votre Adresse E-mail].
      </p>

      <h2>8. Consentement</h2>
      <p>
        En utilisant notre site, vous consentez à notre politique de confidentialité.
      </p>
    </div>
  );
};

export default PolitiqueConfidentialite; 