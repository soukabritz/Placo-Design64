import ForgotForm from "./ForgotForm";
import "../login/login.scss";

export const metadata = {
  title: "Mot de passe oublié — Placo Design 64",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotForm />;
}
