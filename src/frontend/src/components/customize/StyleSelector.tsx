import { Rocket, Minimize2, Bold, Sun, Moon, Palette } from 'lucide-react';
import type { ThumbnailStyle } from '@/lib/thumbnail/styles';

const styles: { value: ThumbnailStyle; icon: typeof Rocket; label: string }[] = [
  { value: 'modern', icon: Rocket, label: 'Modern' },
  { value: 'minimal', icon: Minimize2, label: 'Minimal' },
  { value: 'bold', icon: Bold, label: 'Bold' },
  { value: 'bright', icon: Sun, label: 'Bright' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'gradient', icon: Palette, label: 'Gradient' },
];

interface StyleSelectorProps {
  selectedStyle: ThumbnailStyle;
  onStyleChange: (style: ThumbnailStyle) => void;
}

export default function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {styles.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => onStyleChange(value)}
          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:bg-accent ${
            selectedStyle === value ? 'border-red-600 bg-accent' : 'border-transparent bg-muted'
          }`}
        >
          <Icon className="h-6 w-6 text-red-600" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
