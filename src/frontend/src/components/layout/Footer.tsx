import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              ThumbnailAI
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              About
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Blog
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </a>
          </nav>

          <p className="text-center text-sm text-muted-foreground">
            © 2026. Built with <Heart className="inline h-4 w-4 text-red-600" fill="currentColor" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
