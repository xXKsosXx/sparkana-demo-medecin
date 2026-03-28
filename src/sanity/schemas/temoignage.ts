export default {
  name: "temoignage",
  title: "Témoignage",
  type: "document",
  fields: [
    { name: "nom", type: "string", title: "Nom" },
    { name: "role", type: "string", title: "Rôle (ex: Patient depuis 3 ans)" },
    { name: "texte", type: "text", title: "Témoignage" },
    {
      name: "visible",
      type: "boolean",
      title: "Visible ?",
      initialValue: true,
    },
  ],
};
