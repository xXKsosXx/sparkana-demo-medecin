export default {
  name: "rdv",
  title: "Rendez-vous",
  type: "document",
  fields: [
    { name: "nom", type: "string", title: "Nom patient" },
    { name: "tel", type: "string", title: "Téléphone" },
    { name: "email", type: "string", title: "Email" },
    {
      name: "motif",
      type: "string",
      title: "Motif",
      options: {
        list: [
          "Consultation",
          "Renouvellement",
          "Certificat",
          "Urgence",
          "Autre",
        ],
      },
    },
    { name: "date", type: "date", title: "Date" },
    { name: "creneau", type: "string", title: "Créneau" },
    {
      name: "statut",
      type: "string",
      title: "Statut",
      options: { list: ["confirme", "annule", "effectue"] },
      initialValue: "confirme",
    },
    { name: "createdAt", type: "datetime", title: "Créé le" },
  ],
};
