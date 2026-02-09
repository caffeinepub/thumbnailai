import { styleConfigs, type ThumbnailStyle } from './styles';

export interface RenderOptions {
  title: string;
  channelName: string;
  style: ThumbnailStyle;
  background: string;
}

function parseGradient(gradient: string): CanvasGradient | string {
  // For canvas rendering, we'll use a solid color approximation
  // In a real implementation, you'd parse the gradient properly
  const match = gradient.match(/#[0-9a-fA-F]{6}/);
  return match ? match[0] : '#667eea';
}

export function renderThumbnail(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: RenderOptions
) {
  const { title, channelName, style, background } = options;
  const config = styleConfigs[style];

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw background
  if (background.startsWith('linear-gradient')) {
    // Parse gradient and create canvas gradient
    const colors = background.match(/#[0-9a-fA-F]{6}/g) || ['#667eea', '#764ba2'];
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[colors.length - 1]);
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = background;
  }
  ctx.fillRect(0, 0, width, height);

  // Configure text rendering
  ctx.textBaseline = 'top';
  ctx.font = `${config.fontWeight} ${config.fontSize}px Arial, sans-serif`;

  // Draw title
  const titleY = 50;
  const titleX = 50;
  const maxWidth = width - 100;

  if (config.useGradient && config.gradientColors) {
    // For gradient text, we'll use a workaround with fillText
    const gradient = ctx.createLinearGradient(titleX, titleY, titleX + maxWidth, titleY);
    gradient.addColorStop(0, config.gradientColors[0]);
    gradient.addColorStop(1, config.gradientColors[1]);
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = config.textColor;
  }

  // Add shadow
  if (config.textShadow !== 'none') {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
  }

  // Word wrap title
  const words = title.split(' ');
  let line = '';
  let y = titleY;
  const lineHeight = config.fontSize * 1.2;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, titleX, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, titleX, y);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Draw channel info at bottom
  const channelY = height - 120;
  const logoSize = 80;
  const logoX = 50;

  // Draw channel logo circle
  ctx.globalAlpha = config.channelOpacity;
  ctx.fillStyle = '#555555';
  ctx.beginPath();
  ctx.arc(logoX + logoSize / 2, channelY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Draw channel initial
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${logoSize / 2}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(channelName.charAt(0).toUpperCase(), logoX + logoSize / 2, channelY + logoSize / 2);

  // Draw channel name
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = `600 ${36}px Arial, sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText(channelName, logoX + logoSize + 20, channelY + logoSize / 2);

  // Reset
  ctx.globalAlpha = 1;
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}
