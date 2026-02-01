"use client";

import { useState } from "react";

const RealisationForm = ({
  onSubmit,
  onClose,
  initialValues = {},
  isLoading,
  homeCount = 0,
}) => {
  const [titre, setTitre] = useState(initialValues.titre || "");
  const [description, setDescription] = useState(
    initialValues.description || "",
  );
  const [image, setImage] = useState(null);
  const [showOnHome, setShowOnHome] = useState(
    initialValues.showOnHome || false,
  );
  const [error, setError] = useState("");

  const isEditingHome = initialValues._id && initialValues.showOnHome;
  const homeLimitReached = homeCount >= 6 && !isEditingHome;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre) {
      setError("Le titre est obligatoire");
      return;
    }
    if (!initialValues._id && !image) {
      setError("L'image est obligatoire");
      return;
    }
    if (showOnHome && homeLimitReached) {
      setError(
        "Il y a déjà 6 réalisations en avant sur la page d'accueil. Veuillez en retirer une avant d'en ajouter une nouvelle.",
      );
      return;
    }
    setError("");
    onSubmit({ titre, description, image, showOnHome });
  };

  return (
    <div className="realisation-form-modal">
      <form className="realisation-form" onSubmit={handleSubmit}>
        <h3>{initialValues._id ? "Modifier" : "Ajouter"} une réalisation</h3>
        <label>Titre *</label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <label>
          Image {initialValues._id ? "(laisser vide pour ne pas changer)" : "*"}
        </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showOnHome}
            onChange={(e) => setShowOnHome(e.target.checked)}
          />
          Mettre en avant sur la page d'accueil
        </label>
        {error && <div className="form-error">{error}</div>}
        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Annuler
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading
              ? "Envoi..."
              : initialValues._id
                ? "Modifier"
                : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RealisationForm;
