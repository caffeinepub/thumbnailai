import { Toaster } from '@/components/ui/sonner';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GeneratorSection from './components/sections/GeneratorSection';
import FeaturesSection from './components/sections/FeaturesSection';
import TemplatesSection from './components/sections/TemplatesSection';

export default function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <GeneratorSection />
        <TemplatesSection />
        <FeaturesSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
