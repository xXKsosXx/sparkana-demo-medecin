"use client";

import { useEffect, useState } from "react";
import { getStatutCabinet } from "@/lib/horaires";

export default function BadgeHoraires() {
  const [statut, setStatut] = useState(getStatutCabinet());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatut(getStatutCabinet());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-4 py-1.5 text-sm font-medium text-on-surface">
      <span
        className={`h-2 w-2 rounded-full animate-pulse ${
          statut.ouvert ? "bg-secondary" : "bg-error"
        }`}
      />
      {statut.ouvert ? statut.label : "Accepte de nouveaux patients"}
    </span>
  );
}

export function BadgeHorairesHero() {
  const [statut, setStatut] = useState(getStatutCabinet());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatut(getStatutCabinet());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-4 py-1.5 text-sm font-medium text-on-surface mb-8">
      <span
        className={`h-2 w-2 rounded-full animate-pulse ${
          statut.ouvert ? "bg-secondary" : "bg-error"
        }`}
      />
      {statut.ouvert
        ? statut.label
        : statut.label.startsWith("Rouvre")
          ? statut.label
          : "Accepte de nouveaux patients"}
    </span>
  );
}
