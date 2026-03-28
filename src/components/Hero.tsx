import PlaceholderImage from "./PlaceholderImage";
import { BadgeHorairesHero } from "./BadgeHoraires";

export default function Hero() {
  return (
    <section className="min-h-[870px] flex items-center pt-24 bg-surface">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-8 w-full">
        {/* Gauche */}
        <div className="z-10">
          <BadgeHorairesHero />

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary leading-tight mb-8">
            Votre m&eacute;decin{"\n"}de famille{"\n"}&agrave; Uz&egrave;s
          </h1>

          <p className="font-sans text-lg text-on-surface-muted leading-relaxed mb-10 max-w-lg">
            Consultations sur rendez-vous et en urgence. M&eacute;decine
            g&eacute;n&eacute;rale, suivi chronique, certificats pour une prise
            en charge globale et humaine.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#wizard-rdv"
              className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-primary/30 transition"
            >
              Prendre rendez-vous
            </a>
            <a
              href="#infos"
              className="bg-surface-container text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-surface-high transition"
            >
              Voir les horaires
            </a>
          </div>
        </div>

        {/* Droite */}
        <div className="relative h-[700px] w-full hidden md:block">
          <div className="absolute inset-0 bg-primary-container/5 rounded-3xl -rotate-2 transform scale-105" />
          <PlaceholderImage
            label="portrait-medecin — femme m&eacute;decin souriante, cabinet lumineux"
            className="relative h-full w-full object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
