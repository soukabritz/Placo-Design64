/**
 * URL de base de l'API backend.
 * En dev : http://localhost:3001 (ou VITE_API_URL si défini).
 * En prod : VITE_API_URL au build, ou '' (same origin) si le front est servi par le même serveur.
 */
export const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:3001' : '');
