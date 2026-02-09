import { renderThumbnail, type RenderOptions } from './renderThumbnail';

export async function exportThumbnailPng(options: RenderOptions): Promise<void> {
  // Create offscreen canvas at full resolution
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Render thumbnail
  renderThumbnail(ctx, canvas.width, canvas.height, options);

  // Convert to blob and download
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create blob'));
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `thumbnail-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      resolve();
    }, 'image/png');
  });
}
