import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SiYoutube } from 'react-icons/si';
import AuthButton from '../auth/AuthButton';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <SiYoutube className="h-8 w-8 text-red-600" />
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              ThumbnailAI
            </span>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav
            className={`${
              mobileMenuOpen ? 'flex' : 'hidden'
            } absolute left-0 right-0 top-16 flex-col gap-4 border-b border-border bg-card p-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
          >
            <button
              onClick={() => scrollToSection('generator')}
              className="text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:text-base"
            >
              AI Generator
            </button>
            <button
              onClick={() => scrollToSection('templates')}
              className="text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:text-base"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:text-base"
            >
              Features
            </button>
            <div className="md:ml-4">
              <AuthButton />
            </div>
          </nav>

          <div className="hidden md:block">
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}
