import Navbar from '../components/common/Navbar';
import Hero from '../components/landing/Hero';
import IntegrationFlow from '../components/landing/IntegrationFlow';
import ValueStrip from '../components/landing/ValueStrip';
import ModulesGrid from '../components/landing/ModulesGrid';
import CapabilitiesStory from '../components/landing/CapabilitiesStory';
import UseCases from '../components/landing/UseCases';
import DeveloperExperience from '../components/landing/DeveloperExperience';
import TrustCore from '../components/landing/TrustCore';
import Faq from '../components/landing/Faq';
import OwnerSection from '../components/landing/OwnerSection';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-background text-foreground page-ambient">
      <Navbar />
      <Hero />
      <IntegrationFlow />
      <ValueStrip />
      <ModulesGrid />
      <CapabilitiesStory />
      <UseCases />
      <DeveloperExperience fullscreen />
      <TrustCore fullscreen />
      <Faq />
      <OwnerSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}