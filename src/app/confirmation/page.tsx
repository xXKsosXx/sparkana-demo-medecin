import { CheckCircle } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-8">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
          <CheckCircle size={40} />
        </div>
        <h1 className="font-serif text-3xl text-secondary mb-4">
          Rendez-vous confirm&eacute;
        </h1>
        <p className="font-sans text-on-surface-muted mb-8">
          Votre rendez-vous au Cabinet Dr. Mercier a bien &eacute;t&eacute;
          enregistr&eacute;. Vous recevrez un email de confirmation sous peu.
        </p>
        <a
          href="/"
          className="inline-block bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Retour &agrave; l&apos;accueil
        </a>
      </div>
    </div>
  );
}
