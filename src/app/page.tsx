import Navbar from '../components/common/Navbar';
import Hero from '../components/landing/Hero';
import PlatformShowcase from '../components/landing/PlatformShowcase';
import ValueStrip from '../components/landing/ValueStrip';
import CapabilitiesStory from '../components/landing/CapabilitiesStory';
import ModulesGrid from '../components/landing/ModulesGrid';
import DeveloperExperience from '../components/landing/DeveloperExperience';
import TrustCore from '../components/landing/TrustCore';
import IntegrationFlow from '../components/landing/IntegrationFlow';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-black text-white">
      <Navbar />
      <Hero />
      <PlatformShowcase />
      <ValueStrip />
      <CapabilitiesStory />
      <ModulesGrid />
      <DeveloperExperience />
      <TrustCore />
      <IntegrationFlow />
      <FinalCTA />
      <Footer />
    </main>
  );
}
