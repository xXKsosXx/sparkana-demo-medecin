import { Stethoscope, HeartPulse, ClipboardList, Video } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    iconColor: "text-primary",
    bgColor: "bg-primary/5",
    title: "Médecine générale",
    text: "Prise en charge des pathologies aiguës et chroniques pour adultes et enfants.",
  },
  {
    icon: HeartPulse,
    iconColor: "text-secondary",
    bgColor: "bg-secondary/5",
    title: "Suivi maladies chroniques",
    text: "Gestion coordonnée du diabète, de l'hypertension et des pathologies respiratoires.",
  },
  {
    icon: ClipboardList,
    iconColor: "text-amber-700",
    bgColor: "bg-amber-50",
    title: "Certificats & administratif",
    text: "Bilans sportifs, aptitude professionnelle et rédaction de dossiers MDPH.",
  },
  {
    icon: Video,
    iconColor: "text-primary-container",
    bgColor: "bg-primary-light/30",
    title: "Téléconsultation",
    text: "Consultations à distance sécurisées pour renouvellements et conseils légers.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-surface-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <p className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-primary/60 mb-4">
            SOINS & EXPERTISE
          </p>
          <h2 className="font-serif text-4xl text-primary">
            Un accompagnement complet
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-white rounded-3xl p-10 min-h-[300px] flex flex-col justify-between hover:shadow-lg transition-all duration-500"
            >
              <div>
                <div
                  className={`w-14 h-14 ${s.bgColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
                >
                  <s.icon size={28} strokeWidth={1.5} className={s.iconColor} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-4">
                  {s.title}
                </h3>
              </div>
              <p className="font-sans text-sm text-on-surface-muted leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
