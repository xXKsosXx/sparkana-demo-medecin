"use client";

import { MapPin, Clock, Phone, ParkingCircle, Accessibility } from "lucide-react";

const horairesListe = [
  { jour: "Lundi - Vendredi", heures: "08:30 — 19:00", jours: [1, 2, 3, 4, 5] },
  { jour: "Samedi (Urgences)", heures: "09:00 — 12:00", jours: [6] },
  { jour: "Dimanche", heures: "Fermé", jours: [0] },
];

export default function InfosPratiques() {
  const aujourdhui = new Date().getDay();

  return (
    <section id="infos" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20">
        {/* Gauche */}
        <div>
          <p className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-primary/60 mb-4">
            ACC&Egrave;S & INFOS
          </p>
          <h2 className="font-serif text-4xl text-primary mb-12">
            Informations Pratiques
          </h2>

          <div className="space-y-10">
            {/* Adresse */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-surface-high rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-sans font-bold mb-2 text-on-surface">Adresse</p>
                <p className="font-sans text-on-surface-muted">
                  12 Avenue de la Gare, 30700 Uz&egrave;s
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="flex items-center gap-2 font-sans text-sm text-on-surface-muted">
                    <ParkingCircle size={14} /> Parking r&eacute;serv&eacute;
                    patient&egrave;le
                  </span>
                  <span className="flex items-center gap-2 font-sans text-sm text-on-surface-muted">
                    <Accessibility size={14} /> Acc&egrave;s PMR
                  </span>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-surface-high rounded-xl flex items-center justify-center shrink-0">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-sans font-bold mb-2 text-on-surface">
                  Horaires d&apos;ouverture
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-on-surface-muted font-sans">
                  {horairesListe.map((h) => {
                    const actif = h.jours.includes(aujourdhui);
                    return (
                      <div
                        key={h.jour}
                        className={`contents ${
                          actif ? "[&>*]:bg-primary-light/30 [&>*]:rounded [&>*]:px-1" : ""
                        }`}
                      >
                        <span className="font-medium">{h.jour}</span>
                        <span>{h.heures}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-surface-high rounded-xl flex items-center justify-center shrink-0">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-sans font-bold mb-2 text-on-surface">Contact</p>
                <p className="font-serif text-2xl font-bold text-primary">
                  04 66 00 00 00
                </p>
                <p className="font-sans text-xs uppercase tracking-widest text-on-surface-muted mt-1">
                  SECTEUR 1 &middot; CARTE VITALE ACCEPT&Eacute;E
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Droite — Carte */}
        <div className="min-h-[450px] bg-surface-container rounded-[3rem] overflow-hidden relative shadow-inner">
          <img
            src="/images/carte-uzes.png"
            alt="Carte Uzès centre-ville — localisation cabinet"
            className="w-full h-full object-cover grayscale opacity-60 absolute inset-0"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
              <div className="w-4 h-4 bg-primary rounded-full" />
              <span className="font-sans font-bold text-primary">
                Cabinet Dr. Mercier
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
