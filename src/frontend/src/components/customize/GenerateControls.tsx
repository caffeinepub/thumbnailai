import { Sparkles, Shuffle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportThumbnailPng } from '@/lib/thumbnail/exportPng';
import { toast } from 'sonner';
import type { ThumbnailEditorState } from '@/hooks/useThumbnailEditor';
import { useState } from 'react';

interface GenerateControlsProps {
  editor: ThumbnailEditorState;
}

export default function GenerateControls({ editor }: GenerateControlsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await exportThumbnailPng({
        title: editor.title,
        channelName: editor.channelName,
        style: editor.style,
        background: editor.background,
      });
      toast.success('Thumbnail downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download thumbnail');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={editor.generateWithAI}
        disabled={editor.isGenerating}
        className="w-full bg-red-600 hover:bg-red-700"
        size="lg"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        {editor.isGenerating ? 'Generating...' : 'Generate with AI'}
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={editor.randomize} variant="outline" disabled={editor.isGenerating}>
          <Shuffle className="mr-2 h-4 w-4" />
          Randomize
        </Button>
        <Button onClick={handleDownload} variant="outline" disabled={isExporting || editor.isGenerating}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Downloading...' : 'Download'}
        </Button>
      </div>
    </div>
  );
}
