export type ThumbnailStyle = 'modern' | 'minimal' | 'bold' | 'bright' | 'dark' | 'gradient';

export interface StyleConfig {
  fontSize: number;
  fontWeight: string;
  textColor: string;
  textShadow: string;
  channelOpacity: number;
  useGradient?: boolean;
  gradientColors?: string[];
}

export const styleConfigs: Record<ThumbnailStyle, StyleConfig> = {
  modern: {
    fontSize: 64,
    fontWeight: '800',
    textColor: '#ffffff',
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
    channelOpacity: 1,
  },
  minimal: {
    fontSize: 56,
    fontWeight: '600',
    textColor: '#ffffff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    channelOpacity: 0.8,
  },
  bold: {
    fontSize: 72,
    fontWeight: '900',
    textColor: '#ffffff',
    textShadow: '6px 6px 12px rgba(0, 0, 0, 0.9)',
    channelOpacity: 1,
  },
  bright: {
    fontSize: 64,
    fontWeight: '800',
    textColor: '#ffeb3b',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
    channelOpacity: 1,
  },
  dark: {
    fontSize: 64,
    fontWeight: '800',
    textColor: '#333333',
    textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)',
    channelOpacity: 1,
  },
  gradient: {
    fontSize: 72,
    fontWeight: '900',
    textColor: '#ffffff',
    textShadow: 'none',
    channelOpacity: 1,
    useGradient: true,
    gradientColors: ['#ff0000', '#ff9900'],
  },
};
