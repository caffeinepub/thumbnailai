import { Eye, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThumbnailCanvas from './ThumbnailCanvas';
import type { ThumbnailEditorState } from '@/hooks/useThumbnailEditor';

interface PreviewFrameProps {
  editor: ThumbnailEditorState;
}

export default function PreviewFrame({ editor }: PreviewFrameProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Thumbnail Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
          {editor.isGenerating && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/80 backdrop-blur-sm">
              <Loader2 className="h-12 w-12 animate-spin text-red-600" />
              <p className="text-sm text-white">AI is generating your thumbnail...</p>
            </div>
          )}
          <ThumbnailCanvas
            title={editor.title}
            channelName={editor.channelName}
            style={editor.style}
            background={editor.background}
          />
        </div>
      </CardContent>
    </Card>
  );
}
