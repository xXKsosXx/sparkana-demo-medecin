const temoignages = [
  {
    texte:
      "Un médecin rare, qui prend le temps d'écouter et d'expliquer. On se sent vraiment pris en charge dans sa globalité.",
    initiale: "M",
    nom: "Marc L.",
    role: "Patient depuis 3 ans",
  },
  {
    texte:
      "Prise de rendez-vous facile et cabinet très agréable. Le Dr. Mercier a su m'accompagner avec douceur lors de mon suivi chronique.",
    initiale: "S",
    nom: "Sophie D.",
    role: "Consultation annuelle",
  },
  {
    texte:
      "Très réactive pour les urgences. Un vrai soulagement d'avoir un cabinet aussi sérieux et humain dans notre ville.",
    initiale: "J",
    nom: "Jean-Luc B.",
    role: "Patient régulier",
  },
];

export default function Temoignages() {
  return (
    <section className="py-32 bg-surface-container">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl text-primary mb-4">
            Paroles de patients
          </h2>
          <p className="font-sans text-on-surface-muted">
            L&apos;expertise reconnue par la communaut&eacute; d&apos;Uz&egrave;s
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {temoignages.map((t) => (
            <div
              key={t.nom}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <p className="font-sans italic text-on-surface-muted leading-relaxed">
                &laquo;{t.texte}&raquo;
              </p>
              <div className="mt-6 flex items-center gap-4 not-italic">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold font-sans">
                  {t.initiale}
                </div>
                <div>
                  <p className="font-sans text-sm font-bold text-on-surface">
                    {t.nom}
                  </p>
                  <p className="font-sans text-xs text-on-surface-muted">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
