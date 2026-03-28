const horaires: Record<number, [number, number] | null> = {
  1: [510, 1140], // Lundi 08:30-19:00
  2: [510, 1140], // Mardi
  3: [510, 1140], // Mercredi
  4: [510, 1140], // Jeudi
  5: [510, 1140], // Vendredi
  6: [540, 720],  // Samedi urgences 09:00-12:00
  0: null,        // Dimanche fermé
};

function formatHeure(minutes: number): string {
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}`;
}

export function getStatutCabinet(): {
  ouvert: boolean;
  label: string;
  couleur: string;
} {
  const now = new Date();
  const jour = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const plage = horaires[jour];

  if (!plage) {
    return { ouvert: false, label: "Fermé aujourd'hui", couleur: "error" };
  }

  if (minutes >= plage[0] && minutes < plage[1]) {
    return {
      ouvert: true,
      label: `Ouvert · ferme à ${formatHeure(plage[1])}`,
      couleur: "secondary",
    };
  }

  // Trouver prochain jour ouvré
  const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  let nextJour = (jour + 1) % 7;
  let count = 0;
  while (!horaires[nextJour] && count < 7) {
    nextJour = (nextJour + 1) % 7;
    count++;
  }

  const nextPlage = horaires[nextJour];
  const hOuvre = nextPlage ? formatHeure(nextPlage[0]) : "?";

  return {
    ouvert: false,
    label: `Rouvre ${jours[nextJour]} à ${hOuvre}`,
    couleur: "error",
  };
}
