import { NextResponse } from "next/server";

let resendInstance: InstanceType<typeof import("resend").Resend> | null = null;

function getResend() {
  if (!resendInstance) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Resend } = require("resend") as typeof import("resend");
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export async function POST(req: Request) {
  const { nom, tel, email, motif, date, creneau } = await req.json();

  if (!nom || !tel || !email || !motif || !date || !creneau) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY non configurée — mode démo, RDV simulé");
    return NextResponse.json({ success: true });
  }

  try {
    const resend = getResend();

    // Email au cabinet (notification)
    await resend.emails.send({
      from: "bonjour@sparkana.fr",
      to: process.env.EMAIL_TO || "kamal@sparkana.fr",
      subject: `Nouveau RDV — ${nom} — ${date} à ${creneau}`,
      html: `
        <h2>Nouveau rendez-vous</h2>
        <p><strong>Patient :</strong> ${nom}</p>
        <p><strong>Téléphone :</strong> ${tel}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Motif :</strong> ${motif}</p>
        <p><strong>Date :</strong> ${date} à ${creneau}</p>
      `,
    });

    // Email de confirmation au patient
    await resend.emails.send({
      from: "bonjour@sparkana.fr",
      to: email,
      subject: `Confirmation RDV — Cabinet Dr. Mercier — ${date} à ${creneau}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h1 style="color:#094771">Votre rendez-vous est confirmé</h1>
          <p>Bonjour ${nom},</p>
          <p>Votre rendez-vous au Cabinet Dr. Mercier est bien enregistré :</p>
          <div style="background:#f0f3ff;padding:16px;border-radius:8px;margin:16px 0">
            <p style="margin:4px 0"><strong>Motif :</strong> ${motif}</p>
            <p style="margin:4px 0"><strong>Date :</strong> ${date}</p>
            <p style="margin:4px 0"><strong>Heure :</strong> ${creneau}</p>
          </div>
          <p><strong>Adresse :</strong> 12 Avenue de la Gare, 30700 Uzès</p>
          <p style="color:#666;font-size:12px;margin-top:32px">
            Cabinet Dr. Mercier · 04 66 00 00 00 · Secteur 1
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erreur envoi email" },
      { status: 500 }
    );
  }
}
