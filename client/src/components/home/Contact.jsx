import React, { useState } from 'react';
import { API_URL } from '../../config/api';
import './contact.scss';

const Contact = () => {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    objet: '',
    precision: '',
    consent: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.consent) {
      setError('Vous devez accepter la politique de confidentialité.');
      return;
    }
    // validation des champs
    if (!form.nom || !form.prenom || !form.telephone || !form.email || !form.objet || !form.precision) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: form.nom,
          prenom: form.prenom,
          telephone: form.telephone,
          email: form.email,
          objet: form.objet,
          precision: form.precision
        })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Votre message a bien été envoyé !');
        setForm({ nom: '', prenom: '', telephone: '', email: '', objet: '', precision: '', consent: false });
      } else {
        setError(data.message || 'Erreur lors de l\'envoi du message.');
      }
    } catch {
      setError('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-flex">
      <div className="contact-intro-side">
        <div className="contact-intro-icon">
          <i className="fas fa-comments"></i>
        </div>
        <h3 className="contact-intro-title">Nous mettons toute notre expertise à votre service&nbsp;!</h3>
        <p className="contact-intro-text">
          Pour un devis, un prix ou un renseignement, nous vous invitons à nous contacter par le formulaire ci-dessous.<br />
          Nous vous répondrons dans les plus brefs délais.<br /><br />
          <strong>Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets de rénovation. N'hésitez pas à nous donner un maximum de détails pour un retour personnalisé&nbsp;!</strong>
        </p>
      </div>
      <div className="contact-container">
        <h2 className="contact-title">Contact</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label>Nom</label>
              <input type="text" name="nom" value={form.nom} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input type="text" name="telephone" value={form.telephone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <hr />
          <div className="form-group">
            <label>Objet</label>
            <input type="text" name="objet" value={form.objet} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Précision</label>
            <textarea name="precision" value={form.precision} onChange={handleChange} required rows={5} />
          </div>
          <div className="form-group checkbox-group">
            <span className="checkbox-wrapper">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} id="consent" />
            </span>
            <span className="checkbox-text">
              En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre strict de ma demande.*
              <br />
              <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">En savoir plus</a>
            </span>
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" disabled={loading}>{loading ? 'Envoi...' : 'Envoyer'}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact; 