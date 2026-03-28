import type { Metadata } from "next";
import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cabinet Dr. Mercier · Médecin Généraliste à Uzès",
  description:
    "Consultations sur rendez-vous et en urgence. Médecine générale, suivi chronique, certificats pour une prise en charge globale et humaine à Uzès dans le Gard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${notoSerif.variable} ${inter.variable}`}>
      <body className="bg-surface font-sans text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
