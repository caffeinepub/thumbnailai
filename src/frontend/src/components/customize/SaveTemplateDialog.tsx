import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useTemplates } from '@/hooks/useTemplates';
import { toast } from 'sonner';
import type { ThumbnailEditorState } from '@/hooks/useThumbnailEditor';

interface SaveTemplateDialogProps {
  editor: ThumbnailEditorState;
}

export default function SaveTemplateDialog({ editor }: SaveTemplateDialogProps) {
  const { identity, login } = useInternetIdentity();
  const { createTemplate } = useTemplates();
  const [open, setOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const isAuthenticated = !!identity;

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    try {
      const config = editor.serializeToBackend();
      await createTemplate.mutateAsync({ name: templateName, config });
      toast.success(`Template "${templateName}" saved successfully!`);
      setTemplateName('');
      setOpen(false);
    } catch (error) {
      toast.error('Failed to save template');
    }
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={login} variant="outline" className="w-full">
        <Save className="mr-2 h-4 w-4" />
        Sign In to Save Template
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save as Template
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Template</DialogTitle>
          <DialogDescription>Give your thumbnail design a name to save it for later use.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              placeholder="e.g., Tech Video Style"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={createTemplate.isPending} className="bg-red-600 hover:bg-red-700">
            {createTemplate.isPending ? 'Saving...' : 'Save Template'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
