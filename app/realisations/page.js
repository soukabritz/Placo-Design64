"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import RealisationForm from "@/components/home/RealisationForm";
import "./realisationsPage.scss";

export default function RealisationsPage() {
  const [realisations, setRealisations] = useState([]);
  const { isAuth } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editReal, setEditReal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const fetchRealisations = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/realisations");
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des réalisations");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setRealisations(data);
      } else {
        console.error("Format de données invalide:", data);
        setRealisations([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setRealisations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRealisations();
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchStartX.current - touchEndX.current;
      if (Math.abs(delta) > 50) {
        if (delta > 0) {
          setLightboxIndex((lightboxIndex + 1) % realisations.length);
        } else {
          setLightboxIndex(
            (lightboxIndex - 1 + realisations.length) % realisations.length,
          );
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleAdd = async (formData) => {
    setIsActionLoading(true);
    setError("");
    const data = new FormData();
    data.append("titre", formData.titre);
    data.append("description", formData.description);
    data.append("showOnHome", formData.showOnHome);
    if (formData.image) {
      data.append("image", formData.image);
    }
    try {
      const res = await fetch("/api/realisations", {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Erreur lors de l'ajout");
      } else {
        setShowAddModal(false);
        fetchRealisations();
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleEditSubmit = async (formData) => {
    setIsActionLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("titre", formData.titre);
      data.append("description", formData.description);
      data.append("showOnHome", formData.showOnHome);
      if (formData.image) {
        data.append("image", formData.image);
      } else if (editReal.imageUrl) {
        data.append("imageUrl", editReal.imageUrl);
      }

      const res = await fetch(`/api/realisations/${editReal._id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Erreur lors de la modification");
      } else {
        setShowEditModal(false);
        setEditReal(null);
        fetchRealisations();
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur");
    } finally {
      setIsActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    setIsActionLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/realisations/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Erreur lors de la suppression");
      } else {
        setShowDeleteConfirm(false);
        setDeleteId(null);
        fetchRealisations();
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setIsActionLoading(false);
    }
  };

  const homeCount = Array.isArray(realisations)
    ? realisations.filter((r) => r.showOnHome).length
    : 0;

  return (
    <div className="realisations-page-container">
      <div className="container">
        <div className="realisations-header">
          <h2 className="realisations-title">Nos réalisations</h2>
          {isAuth && (
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              Ajouter une réalisation
            </button>
          )}
        </div>
      </div>
      {showAddModal && (
        <RealisationForm
          onSubmit={handleAdd}
          onClose={() => setShowAddModal(false)}
          isLoading={isActionLoading}
          homeCount={homeCount}
        />
      )}
      {showEditModal && editReal && (
        <RealisationForm
          onSubmit={handleEditSubmit}
          onClose={() => {
            setShowEditModal(false);
            setEditReal(null);
          }}
          initialValues={editReal}
          isLoading={isActionLoading}
          homeCount={homeCount}
        />
      )}
      {showDeleteConfirm && (
        <div className="realisation-form-modal">
          <div className="realisation-form" style={{ textAlign: "center" }}>
            <p>Confirmer la suppression de cette réalisation ?</p>
            <div className="form-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annuler
              </button>
              <button
                className="delete-btn"
                onClick={confirmDelete}
                disabled={isActionLoading}
              >
                {isActionLoading ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div
          className="form-error"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}
      <div className="container">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement des réalisations...</p>
          </div>
        ) : (
          <div className="realisations-grid-wrapper">
            <div className="realisations-list realisations-grid-4">
              {realisations.map((real, idx) => (
                <div
                  key={real._id}
                  className="realisation-card realisation-grid-item"
                >
                  <div
                    className="realisation-img-wrapper"
                    onClick={() => setLightboxIndex(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={real.imageUrl}
                      alt={real.titre}
                      className="realisation-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          {...(isMobile
            ? {
                onTouchStart: handleTouchStart,
                onTouchMove: handleTouchMove,
                onTouchEnd: handleTouchEnd,
              }
            : {})}
        >
          <button
            className="lightbox-arrow lightbox-arrow-left"
            onClick={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + realisations.length) % realisations.length,
              )
            }
            aria-label="Précédent"
          >
            &lt;
          </button>
          <div className="lightbox-content lightbox-content-large">
            <button
              className="lightbox-close"
              onClick={() => setLightboxIndex(null)}
            >
              &times;
            </button>
            <button
              className="lightbox-arrow lightbox-arrow-right"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % realisations.length)
              }
              aria-label="Suivant"
            >
              &gt;
            </button>
            <img
              src={realisations[lightboxIndex].imageUrl}
              alt={realisations[lightboxIndex].titre}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <h3>{realisations[lightboxIndex].titre}</h3>
              {realisations[lightboxIndex].description && (
                <p>{realisations[lightboxIndex].description}</p>
              )}
              {isAuth && (
                <div
                  className="admin-actions"
                  style={{
                    marginTop: "1.2rem",
                    display: "flex",
                    gap: "0.7rem",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditReal(realisations[lightboxIndex]);
                      setShowEditModal(true);
                      setLightboxIndex(null);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setDeleteId(realisations[lightboxIndex]._id);
                      setShowDeleteConfirm(true);
                      setLightboxIndex(null);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
