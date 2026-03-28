import { Share2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-high pt-16 pb-8">
      <div className="grid md:grid-cols-3 gap-12 px-8 max-w-7xl mx-auto">
        {/* Col 1 */}
        <div>
          <p className="font-serif text-xl font-semibold text-primary">
            Cabinet Dr. Mercier
          </p>
          <p className="font-sans text-sm text-slate-500 leading-relaxed mt-4">
            M&eacute;decine g&eacute;n&eacute;rale & pr&eacute;ventive
            &agrave; Uz&egrave;s. Engag&eacute; pour une sant&eacute; durable
            et humaine au c&oelig;ur du Gard.
          </p>
        </div>

        {/* Col 2 — Informations */}
        <div>
          <p className="font-serif text-lg text-primary mb-6">Informations</p>
          <ul className="space-y-2 font-sans text-sm text-slate-500">
            <li>
              <span className="hover:text-primary transition cursor-pointer">
                Mentions L&eacute;gales
              </span>
            </li>
            <li>
              <span className="hover:text-primary transition cursor-pointer">
                Politique de Confidentialit&eacute;
              </span>
            </li>
            <li>RPPS: 10100000000</li>
            <li>CNOM: 30/0000</li>
          </ul>
        </div>

        {/* Col 3 — Urgences */}
        <div>
          <p className="font-serif text-lg text-primary mb-6">Urgences</p>
          <div className="bg-white/50 p-6 rounded-2xl">
            <p className="font-sans text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">
              EN CAS D&apos;URGENCE VITALE
            </p>
            <p className="font-serif text-3xl font-bold text-error">15</p>
            <p className="font-sans text-xs text-slate-500 mt-4">
              Ou rendez-vous aux Urgences du CH Uz&egrave;s.
            </p>
          </div>
        </div>
      </div>

      {/* Bas footer */}
      <div className="border-t border-primary/10 mt-16 pt-8 px-8 max-w-7xl mx-auto flex justify-between items-center">
        <p className="font-sans text-sm text-slate-500">
          &copy; 2025 Dr. Sophie Mercier - Uz&egrave;s. Tous droits
          r&eacute;serv&eacute;s.
        </p>
        <div className="flex items-center gap-4">
          <Share2 size={20} className="text-primary cursor-pointer hover:opacity-70 transition" />
          <Mail size={20} className="text-primary cursor-pointer hover:opacity-70 transition" />
        </div>
      </div>
    </footer>
  );
}
