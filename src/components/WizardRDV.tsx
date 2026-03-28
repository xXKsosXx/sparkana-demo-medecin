// Demo Sparkana — Argument : "Arrêtez de dépendre de Doctolib
// qui capte votre visibilité et vos patients.
// Votre RDV, votre données, votre référencement."
"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Stethoscope,
  FileText,
  ClipboardCheck,
  AlertCircle,
  MoreHorizontal,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Lock,
  CheckCircle,
  Mail,
  Loader2,
} from "lucide-react";

/* ────────────────────────────────── types ────────────────────────────────── */

const motifs: {
  value: string;
  icon: typeof Stethoscope;
  label: string;
  sub: string;
  iconColor: string;
  wide?: boolean;
}[] = [
  {
    value: "Consultation",
    icon: Stethoscope,
    label: "Consultation",
    sub: "Suivi régulier ou nouveau patient",
    iconColor: "text-primary",
  },
  {
    value: "Renouvellement",
    icon: FileText,
    label: "Renouvellement",
    sub: "Ordonnances et soins continus",
    iconColor: "text-primary",
  },
  {
    value: "Certificat",
    icon: ClipboardCheck,
    label: "Certificat",
    sub: "Sport, travail ou administratif",
    iconColor: "text-primary",
  },
  {
    value: "Urgence",
    icon: AlertCircle,
    label: "Urgence",
    sub: "Besoin de soins immédiats",
    iconColor: "text-error",
  },
  {
    value: "Autre",
    icon: MoreHorizontal,
    label: "Autre",
    sub: "Précisez lors de la confirmation",
    iconColor: "text-primary",
    wide: true,
  },
];

const JOURS_SEMAINE = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS_NOMS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function creneauxPourJour(date: Date): { heure: string; pris: boolean }[] {
  const jour = date.getDay();
  if (jour === 0) return [];

  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

  let heures: string[];
  if (jour === 6) {
    heures = ["9h00", "9h30", "10h00", "10h30", "11h00", "11h30"];
  } else {
    heures = [
      "8h30", "9h15", "10h00", "10h45", "11h30",
      "14h00", "14h45", "15h30", "16h15", "17h00",
    ];
  }

  return heures.map((h, i) => {
    const hash = ((seed * 31 + i * 7) % 100);
    return { heure: h, pris: hash < 20 };
  });
}

function formatDateFr(date: Date): string {
  const jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const mois = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  return `${jours[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]} ${date.getFullYear()}`;
}

/* ─────────────────────────────── component ───────────────────────────────── */

export default function WizardRDV() {
  const [step, setStep] = useState(1);
  const [motif, setMotif] = useState("Consultation");
  const [date, setDate] = useState<Date | null>(null);
  const [creneau, setCreneau] = useState("");
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [moisActif, setMoisActif] = useState(new Date());

  /* ── calendrier ── */
  const grilleMois = useMemo(() => {
    const annee = moisActif.getFullYear();
    const mois = moisActif.getMonth();
    const premierJour = new Date(annee, mois, 1);
    const dernierJour = new Date(annee, mois + 1, 0);
    let startDay = premierJour.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1; // lundi = 0

    const jours: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) jours.push(null);
    for (let d = 1; d <= dernierJour.getDate(); d++) {
      jours.push(new Date(annee, mois, d));
    }
    return jours;
  }, [moisActif]);

  const aujourdhui = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const creneaux = useMemo(() => {
    if (!date) return [];
    return creneauxPourJour(date);
  }, [date]);

  /* ── submit ── */
  const handleSubmit = useCallback(async () => {
    if (!nom || !tel || !email || !date || !creneau) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          tel,
          email,
          motif,
          date: formatDateFr(date),
          creneau,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Erreur lors de l'envoi");
      }

      setStep(4);
    } catch (err) {
      if (err instanceof Error && err.message.includes("Erreur")) {
        console.warn("API indisponible, passage en mode démo");
      }
      setStep(4);
    } finally {
      setLoading(false);
    }
  }, [nom, tel, email, date, creneau, motif]);

  /* ── sidebar étapes ── */
  const etapes = [
    { n: 1, label: "Motif" },
    { n: 2, label: "Date & heure" },
    { n: 3, label: "Informations" },
  ];

  return (
    <section id="wizard-rdv" className="pt-32 pb-24 px-4 sm:px-8 bg-surface">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-primary/60 mb-4">
            ESPACE PATIENT
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-on-surface mb-4">
            Prendre rendez-vous en ligne
          </h2>
          <p className="font-sans text-on-surface-muted max-w-xl mx-auto">
            Choisissez votre motif de consultation et trouvez le cr&eacute;neau
            qui vous convient le mieux.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-8">
              {etapes.map((e) => (
                <div key={e.n} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      step >= e.n
                        ? "bg-primary text-white shadow-lg"
                        : "bg-surface-container text-on-surface opacity-40"
                    }`}
                  >
                    {step > e.n ? <Check size={18} /> : e.n}
                  </div>
                  <span
                    className={`font-sans text-xs uppercase tracking-widest font-bold ${
                      step >= e.n ? "text-primary" : "text-on-surface opacity-40"
                    }`}
                  >
                    {e.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-9 space-y-12">
            {/* ═══ ÉTAPE 1 ═══ */}
            {step >= 1 && (
              <div className="bg-surface-low rounded-xl p-8 shadow-sm">
                <h3 className="font-serif text-2xl text-primary mb-8">
                  1. Quel est le motif de votre visite ?
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {motifs.map((m) => (
                    <label
                      key={m.value}
                      className={`relative cursor-pointer group ${
                        m.wide ? "md:col-span-2" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="motif"
                        value={m.value}
                        checked={motif === m.value}
                        onChange={() => setMotif(m.value)}
                        className="sr-only peer"
                      />
                      <div className="p-6 rounded-lg bg-white border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-light/20 hover:bg-white hover:shadow-md transition-all flex items-center gap-4">
                        <m.icon size={28} className={`${m.iconColor} shrink-0`} />
                        <div className="flex-1">
                          <p className="font-sans font-semibold text-on-surface">
                            {m.label}
                          </p>
                          <p className="font-sans text-sm text-on-surface-muted">
                            {m.sub}
                          </p>
                        </div>
                        <Check
                          size={20}
                          className="text-primary opacity-0 peer-checked:opacity-100 ml-auto shrink-0"
                        />
                      </div>
                    </label>
                  ))}
                </div>

                {motif === "Urgence" && (
                  <div className="mt-4 p-4 bg-error/5 border border-error/20 rounded-lg">
                    <p className="font-sans text-sm text-error font-medium">
                      Pour une urgence vitale, appelez le 15. Pour une
                      consultation d&apos;urgence le jour m&ecirc;me, appelez le 04 66
                      00 00 00.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3 rounded-xl mt-8 hover:opacity-90 transition font-medium"
                >
                  Suivant &rarr;
                </button>
              </div>
            )}

            {/* ═══ ÉTAPE 2 ═══ */}
            {step >= 2 && (
              <div className="bg-surface-low rounded-xl p-8 shadow-sm">
                <h3 className="font-serif text-2xl text-primary mb-8">
                  2. S&eacute;lectionnez une date et une heure
                </h3>

                <div className="flex flex-col md:flex-row gap-12">
                  {/* Calendrier */}
                  <div className="flex-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <button
                          onClick={() =>
                            setMoisActif(
                              new Date(
                                moisActif.getFullYear(),
                                moisActif.getMonth() - 1,
                                1
                              )
                            )
                          }
                          className="p-2 hover:bg-surface-container rounded-full transition"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="font-sans font-semibold">
                          {MOIS_NOMS[moisActif.getMonth()]}{" "}
                          {moisActif.getFullYear()}
                        </span>
                        <button
                          onClick={() =>
                            setMoisActif(
                              new Date(
                                moisActif.getFullYear(),
                                moisActif.getMonth() + 1,
                                1
                              )
                            )
                          }
                          className="p-2 hover:bg-surface-container rounded-full transition"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {JOURS_SEMAINE.map((j) => (
                          <div
                            key={j}
                            className="text-center font-sans text-xs uppercase tracking-tighter text-on-surface-muted py-1"
                          >
                            {j}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {grilleMois.map((d, i) => {
                          if (!d) {
                            return <div key={`empty-${i}`} />;
                          }
                          const passe = d < aujourdhui;
                          const dimanche = d.getDay() === 0;
                          const selected =
                            date &&
                            d.getDate() === date.getDate() &&
                            d.getMonth() === date.getMonth() &&
                            d.getFullYear() === date.getFullYear();

                          return (
                            <button
                              key={d.toISOString()}
                              disabled={passe || dimanche}
                              onClick={() => {
                                setDate(d);
                                setCreneau("");
                              }}
                              className={`h-10 w-full rounded-lg text-sm font-medium transition ${
                                selected
                                  ? "bg-primary text-white font-bold"
                                  : passe || dimanche
                                    ? "opacity-20 cursor-not-allowed"
                                    : "hover:bg-primary-light/30"
                              }`}
                            >
                              {d.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Créneaux */}
                  <div className="flex-1">
                    {date ? (
                      <>
                        <h4 className="font-sans text-xs uppercase tracking-widest text-on-surface-muted mb-6">
                          Cr&eacute;neaux disponibles pour le{" "}
                          {formatDateFr(date)}
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {creneaux.map((c) => (
                            <button
                              key={c.heure}
                              disabled={c.pris}
                              onClick={() => setCreneau(c.heure)}
                              className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                                creneau === c.heure
                                  ? "bg-primary text-white shadow-sm"
                                  : c.pris
                                    ? "bg-surface-container opacity-40 cursor-not-allowed line-through text-xs"
                                    : "bg-white border border-outline-light hover:border-primary hover:text-primary"
                              }`}
                            >
                              {c.heure}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="font-sans text-sm text-on-surface-muted mt-4">
                        S&eacute;lectionnez une date pour voir les cr&eacute;neaux
                        disponibles.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (date && creneau) setStep(3);
                  }}
                  disabled={!date || !creneau}
                  className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3 rounded-xl mt-8 hover:opacity-90 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Suivant &rarr;
                </button>
              </div>
            )}

            {/* ═══ ÉTAPE 3 ═══ */}
            {step >= 3 && step < 4 && (
              <div className="bg-surface-low rounded-xl p-8 shadow-sm">
                <h3 className="font-serif text-2xl text-primary mb-8">
                  3. Vos informations personnelles
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-muted mb-1 ml-1">
                      NOM COMPLET
                    </label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-white border-0 focus:ring-2 focus:ring-primary/20 transition text-on-surface font-sans"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-muted mb-1 ml-1">
                      NUM&Eacute;RO DE T&Eacute;L&Eacute;PHONE
                    </label>
                    <input
                      type="tel"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-3 rounded-lg bg-white border-0 focus:ring-2 focus:ring-primary/20 transition text-on-surface font-sans"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-muted mb-1 ml-1">
                      ADRESSE E-MAIL
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean.dupont@email.fr"
                      className="w-full px-4 py-3 rounded-lg bg-white border-0 focus:ring-2 focus:ring-primary/20 transition text-on-surface font-sans"
                    />
                  </div>
                </div>

                {/* Récapitulatif */}
                <div className="bg-primary-light/20 rounded-xl p-4 mt-6">
                  <p className="font-sans text-sm text-primary">
                    R&eacute;capitulatif : {motif} &middot;{" "}
                    {date ? formatDateFr(date) : ""} &agrave; {creneau}
                  </p>
                </div>

                {error && (
                  <p className="text-error text-sm mt-4 font-sans">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-4 rounded-xl font-bold shadow-lg flex items-center gap-2 mt-8 hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                  {loading
                    ? "Envoi en cours..."
                    : "Confirmer le rendez-vous"}
                </button>

                <div className="flex items-center gap-2 text-secondary mt-4">
                  <Lock size={14} />
                  <span className="font-sans text-sm font-medium">
                    Vos donn&eacute;es sont s&eacute;curis&eacute;es
                  </span>
                </div>
              </div>
            )}

            {/* ═══ ÉTAPE 4 : CONFIRMATION ═══ */}
            {step === 4 && (
              <div className="bg-secondary-container/20 rounded-xl p-12 border-2 border-dashed border-secondary/30 text-center">
                <div className="w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <CheckCircle size={40} />
                </div>

                <h3 className="font-serif text-3xl text-secondary mb-4">
                  C&apos;est confirm&eacute; !
                </h3>
                <p className="font-sans text-on-surface-muted max-w-md mx-auto mb-8">
                  Votre rendez-vous avec le Dr. Mercier est programm&eacute;
                  pour le {date ? formatDateFr(date) : ""} &agrave; {creneau}.
                  Un email de confirmation vous a &eacute;t&eacute;
                  envoy&eacute;.
                </p>

                <span className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-primary font-bold">
                  <Mail size={16} />
                  Confirmation envoy&eacute;e par email
                </span>

                <div className="mt-12 pt-8 border-t border-secondary/10 flex justify-center gap-4 flex-wrap">
                  <button className="bg-white text-primary border border-outline-light rounded-lg px-6 py-2 text-sm font-semibold hover:bg-surface-low transition">
                    Ajouter &agrave; l&apos;agenda
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setDate(null);
                      setCreneau("");
                      setNom("");
                      setTel("");
                      setEmail("");
                    }}
                    className="bg-white text-primary border border-outline-light rounded-lg px-6 py-2 text-sm font-semibold hover:bg-surface-low transition"
                  >
                    Modifier le RDV
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
