import { Suspense } from "react";
import ResetForm from "./ResetForm";
import "../login/login.scss";

export const metadata = {
  title: "Nouveau mot de passe — Placo Design 64",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="login-container">
          <form className="login-form">
            <h2>Nouveau mot de passe</h2>
            <p className="login-hint">Chargement…</p>
          </form>
        </div>
      }
    >
      <ResetForm />
    </Suspense>
  );
}
