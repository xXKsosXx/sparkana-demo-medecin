"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="py-4 px-8 max-w-7xl mx-auto flex justify-between items-center">
        <span className="font-serif text-2xl font-bold text-primary">
          Cabinet Dr. Mercier
        </span>

        <div className="hidden md:flex gap-10 items-center">
          {[
            { label: "SERVICES", id: "services" },
            { label: "LE M\u00c9DECIN", id: "medecin" },
            { label: "INFOS PRATIQUES", id: "infos" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-sans text-xs font-semibold uppercase tracking-widest text-slate-600 hover:text-primary transition"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo("wizard-rdv")}
            className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-md hover:opacity-90 transition"
          >
            Prenez rendez-vous
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-on-surface"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-outline-light/20 px-8 pb-6 space-y-4">
          {[
            { label: "Services", id: "services" },
            { label: "Le M\u00e9decin", id: "medecin" },
            { label: "Infos Pratiques", id: "infos" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left font-sans text-sm font-semibold text-slate-600 hover:text-primary transition py-2"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
