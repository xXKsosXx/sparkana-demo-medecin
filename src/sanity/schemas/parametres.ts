export default {
  name: "parametresmedecin",
  title: "Paramètres Cabinet",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "accepteNouveauxPatients",
      type: "boolean",
      title: "Accepte nouveaux patients ?",
      initialValue: true,
    },
    {
      name: "messageUrgence",
      type: "string",
      title: "Message urgence personnalisé",
    },
    {
      name: "telephone",
      type: "string",
      title: "Téléphone",
      initialValue: "04 66 00 00 00",
    },
  ],
};
