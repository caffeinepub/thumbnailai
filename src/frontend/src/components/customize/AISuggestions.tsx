import { Bot } from 'lucide-react';
import { toast } from 'sonner';
import { suggestions } from '@/lib/thumbnail/suggestions';
import type { ThumbnailEditorState } from '@/hooks/useThumbnailEditor';

interface AISuggestionsProps {
  editor: ThumbnailEditorState;
}

export default function AISuggestions({ editor }: AISuggestionsProps) {
  const handleApplySuggestion = (key: string) => {
    const suggestion = suggestions[key];
    if (!suggestion) return;

    editor.setBackground(suggestion.background);
    editor.setStyle(suggestion.style);
    editor.setTitle(suggestion.title);

    toast.success(`${suggestion.name} applied`, {
      description: `The AI has applied a ${key}-optimized design to your thumbnail.`,
    });
  };

  return (
    <div className="space-y-4 border-t border-border pt-6">
      <h3 className="flex items-center gap-2 font-semibold">
        <Bot className="h-5 w-5 text-red-600" />
        AI Suggestions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(suggestions).map(([key, suggestion]) => (
          <button
            key={key}
            onClick={() => handleApplySuggestion(key)}
            className="rounded-lg bg-muted p-4 text-left transition-all hover:bg-accent hover:-translate-y-1"
          >
            <div className="mb-1 font-semibold">{suggestion.name}</div>
            <div className="text-xs text-muted-foreground">{suggestion.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
