"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Impossible d'envoyer l'email.");
        return;
      }

      setSuccess(data.message);
    } catch (err) {
      console.error("Erreur mot de passe oublié:", err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Mot de passe oublié</h2>
        <p className="login-hint">
          Saisissez l&apos;adresse email du compte administrateur. Un lien
          pour choisir un nouveau mot de passe vous sera envoyé.
        </p>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi…" : "Envoyer le lien"}
        </button>
        <p className="login-links">
          <Link href="/login">Retour à la connexion</Link>
        </p>
      </form>
    </div>
  );
}
