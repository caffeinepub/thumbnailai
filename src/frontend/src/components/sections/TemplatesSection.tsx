import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useTemplates } from '@/hooks/useTemplates';
import { useThumbnailEditor } from '@/hooks/useThumbnailEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import type { Template } from '@/backend';

export default function TemplatesSection() {
  const { identity, login } = useInternetIdentity();
  const { templates, isLoading, deleteTemplate } = useTemplates();
  const editor = useThumbnailEditor();

  const isAuthenticated = !!identity;

  const handleApplyTemplate = (template: Template) => {
    const state = editor.deserializeFromBackend(template.config);
    editor.setState(state);
    toast.success(`Applied template: ${template.name}`);
  };

  const handleDeleteTemplate = async (id: string, name: string) => {
    try {
      await deleteTemplate.mutateAsync(id);
      toast.success(`Deleted template: ${name}`);
    } catch (error) {
      toast.error('Failed to delete template');
    }
  };

  if (!isAuthenticated) {
    return (
      <section id="templates" className="mb-16">
        <Card className="border-2 border-dashed">
          <CardHeader className="text-center">
            <CardTitle>Save Your Favorite Designs</CardTitle>
            <CardDescription>Sign in to save and reuse your thumbnail templates</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={login} size="lg" className="bg-red-600 hover:bg-red-700">
              <LogIn className="mr-2 h-5 w-5" />
              Sign In to Use Templates
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="templates" className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">My Templates</h2>
        <p className="text-muted-foreground">Saved thumbnail designs for quick reuse</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 w-3/4 rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-32 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : templates.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No templates saved yet. Create a thumbnail and save it as a template!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="group overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>
                  {new Date(Number(template.createdAt) / 1000000).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="mb-4 flex h-32 cursor-pointer items-center justify-center rounded bg-gradient-to-br from-red-600 to-red-800 p-4 text-center text-sm font-bold text-white transition-transform hover:scale-105"
                  onClick={() => handleApplyTemplate(template)}
                >
                  {template.config.text || 'Template Preview'}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApplyTemplate(template)}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    size="sm"
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={() => handleDeleteTemplate(template.id, template.name)}
                    variant="outline"
                    size="sm"
                    disabled={deleteTemplate.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
