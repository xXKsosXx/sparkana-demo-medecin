import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WizardRDV from "@/components/WizardRDV";
import Medecin from "@/components/Medecin";
import Temoignages from "@/components/Temoignages";
import InfosPratiques from "@/components/InfosPratiques";
import Footer from "@/components/Footer";
import FloatingBadge from "@/components/FloatingBadge";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <WizardRDV />
        <Medecin />
        <Temoignages />
        <InfosPratiques />
      </main>
      <Footer />
      <FloatingBadge />
    </>
  );
}
