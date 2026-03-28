import PlaceholderImage from "./PlaceholderImage";

export default function Medecin() {
  return (
    <section id="medecin" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-20 items-center">
        {/* Gauche — Photo */}
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
            <PlaceholderImage
              label="portrait-medecin — Dr Mercier femme médecin 45 ans, lunettes, stéthoscope"
              className="w-full h-full"
            />
          </div>

          {/* Card flottante */}
          <div className="absolute -bottom-10 -right-10 hidden lg:block bg-white p-8 rounded-3xl shadow-xl max-w-xs">
            <p className="font-serif italic text-lg text-primary mb-4">
              &laquo;Ma mission est d&apos;offrir une m&eacute;decine
              d&apos;&eacute;coute, o&ugrave; chaque patient est acteur de sa
              sant&eacute;.&raquo;
            </p>
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-muted">
              &mdash; Dr. Sophie Mercier
            </p>
          </div>
        </div>

        {/* Droite — Texte */}
        <div className="w-full md:w-1/2">
          <p className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-primary/60 mb-4">
            VOTRE PRATICIEN
          </p>
          <h2 className="font-serif text-4xl text-primary mb-8">
            Dr. Sophie Mercier
          </h2>

          <div className="space-y-6">
            <p className="font-sans text-lg text-on-surface-muted leading-relaxed">
              Forte de 15 ann&eacute;es d&apos;exp&eacute;rience en
              m&eacute;decine g&eacute;n&eacute;rale de proximit&eacute;,
              j&apos;ai &agrave; c&oelig;ur de proposer une approche
              personnalis&eacute;e et bienveillante de la sant&eacute;.
            </p>
            <p className="font-sans text-lg text-on-surface-muted leading-relaxed">
              Ancienne interne des H&ocirc;pitaux de Montpellier, j&apos;ai
              choisi Uz&egrave;s pour la qualit&eacute; de vie et le lien
              privil&eacute;gi&eacute; que permet l&apos;exercice
              lib&eacute;ral en milieu urbain &agrave; taille humaine.
            </p>
            <p className="font-sans text-lg text-on-surface-muted leading-relaxed">
              Ma pratique int&egrave;gre les derni&egrave;res recommandations
              m&eacute;dicales tout en restant ancr&eacute;e dans une relation
              patient-m&eacute;decin de confiance, indispensable &agrave; un
              suivi de qualit&eacute; sur le long terme.
            </p>
          </div>

          <div className="grid grid-cols-2 pt-6 gap-8 mt-4">
            <div>
              <p className="font-serif text-2xl font-bold text-primary">15+</p>
              <p className="font-sans text-sm font-medium text-on-surface-muted">
                Ann&eacute;es d&apos;exp&eacute;rience
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-primary">12k+</p>
              <p className="font-sans text-sm font-medium text-on-surface-muted">
                Patients suivis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
