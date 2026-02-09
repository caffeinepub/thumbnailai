import { useThumbnailEditor } from '@/hooks/useThumbnailEditor';
import PreviewFrame from '../preview/PreviewFrame';
import CustomizePanel from '../customize/CustomizePanel';

export default function GeneratorSection() {
  const editor = useThumbnailEditor();

  return (
    <section id="generator" className="mb-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <PreviewFrame editor={editor} />
        <CustomizePanel editor={editor} />
      </div>
    </section>
  );
}
