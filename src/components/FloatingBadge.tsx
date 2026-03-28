"use client";

import { useEffect, useState } from "react";
import { getStatutCabinet } from "@/lib/horaires";
import PlaceholderImage from "./PlaceholderImage";

export default function FloatingBadge() {
  const [statut, setStatut] = useState(getStatutCabinet());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatut(getStatutCabinet());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-40 bg-white shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-outline-light/10">
      {/* Avatar */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
          <PlaceholderImage label="Dr" className="w-full h-full" />
        </div>
        <div
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white animate-pulse ${
            statut.ouvert ? "bg-secondary" : "bg-outline"
          }`}
        />
      </div>

      {/* Info */}
      <div>
        <p className="font-sans text-sm font-bold text-on-surface">
          Dr. Sophie Mercier
        </p>
        <p
          className={`font-sans text-[10px] uppercase tracking-widest font-bold ${
            statut.ouvert ? "text-secondary" : "text-outline"
          }`}
        >
          {statut.label}
        </p>
      </div>
    </div>
  );
}
