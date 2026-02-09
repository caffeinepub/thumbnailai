import { useEffect, useRef } from 'react';
import { renderThumbnail } from '@/lib/thumbnail/renderThumbnail';
import type { ThumbnailStyle } from '@/lib/thumbnail/styles';

interface ThumbnailCanvasProps {
  title: string;
  channelName: string;
  style: ThumbnailStyle;
  background: string;
}

export default function ThumbnailCanvas({ title, channelName, style, background }: ThumbnailCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderThumbnail(ctx, canvas.width, canvas.height, {
      title,
      channelName,
      style,
      background,
    });
  }, [title, channelName, style, background]);

  return <canvas ref={canvasRef} width={1280} height={720} className="h-full w-full" />;
}
