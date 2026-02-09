import { Sliders } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StyleSelector from './StyleSelector';
import AISuggestions from './AISuggestions';
import GenerateControls from './GenerateControls';
import SaveTemplateDialog from './SaveTemplateDialog';
import type { ThumbnailEditorState } from '@/hooks/useThumbnailEditor';

interface CustomizePanelProps {
  editor: ThumbnailEditorState;
}

export default function CustomizePanel({ editor }: CustomizePanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sliders className="h-5 w-5" />
          Customize Your Thumbnail
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="videoTitle">Video Title</Label>
          <Input
            id="videoTitle"
            placeholder="Enter your video title here"
            value={editor.title}
            onChange={(e) => editor.setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="channelName">Channel Name</Label>
          <Input
            id="channelName"
            placeholder="Your channel name"
            value={editor.channelName}
            onChange={(e) => editor.setChannelName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Thumbnail Style</Label>
          <StyleSelector selectedStyle={editor.style} onStyleChange={editor.setStyle} />
        </div>

        <AISuggestions editor={editor} />

        <GenerateControls editor={editor} />

        <SaveTemplateDialog editor={editor} />
      </CardContent>
    </Card>
  );
}
