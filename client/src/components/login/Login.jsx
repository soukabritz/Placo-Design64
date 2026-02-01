import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import { API_URL } from '../../config/api';
import './login.scss';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const recaptchaRequired = Boolean(RECAPTCHA_SITE_KEY);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (recaptchaRequired && !recaptchaValue) {
      setError('Veuillez valider le reCAPTCHA');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          password,
          recaptchaToken: recaptchaValue || undefined
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        await checkAuth();
        navigate('/');
      } else {
        setError(data.message || 'Erreur de connexion');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion Admin</h2>
        {error && (
          <div className="error-message">{error}</div>
        )}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {recaptchaRequired && (
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
            />
          </div>
        )}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;