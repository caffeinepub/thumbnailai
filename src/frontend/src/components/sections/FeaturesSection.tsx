import { Brain, Zap, Sliders, TrendingUp, Image, Save } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Designs',
    description: 'Our advanced AI analyzes trending thumbnails and creates custom designs optimized for clicks.',
  },
  {
    icon: Zap,
    title: 'Fast Generation',
    description: 'Create professional YouTube thumbnails in seconds, not hours. No design skills required.',
  },
  {
    icon: Sliders,
    title: 'Fully Customizable',
    description: 'Adjust colors, text, layout, and more to match your brand and video content.',
  },
  {
    icon: TrendingUp,
    title: 'Optimized for Clicks',
    description: 'Our thumbnails are designed based on data from millions of high-performing videos.',
  },
  {
    icon: Image,
    title: 'High-Resolution Export',
    description: 'Download thumbnails in 1280x720px perfect for YouTube, with no watermarks.',
  },
  {
    icon: Save,
    title: 'Save Templates',
    description: 'Save your favorite designs as templates for consistent branding across your channel.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">Why Choose ThumbnailAI?</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-lg bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-2 hover:shadow-md"
          >
            <feature.icon className="mx-auto mb-6 h-12 w-12 text-red-600" />
            <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
