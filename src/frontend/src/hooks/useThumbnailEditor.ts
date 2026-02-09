import { useState, useCallback } from 'react';
import type { ThumbnailStyle } from '@/lib/thumbnail/styles';
import { backgrounds, getRandomBackground } from '@/lib/thumbnail/backgrounds';
import { aiTitles, randomTitles } from '@/lib/thumbnail/titles';
import type { ThumbnailConfig } from '@/backend';
import { toast } from 'sonner';

export interface ThumbnailEditorState {
  title: string;
  channelName: string;
  style: ThumbnailStyle;
  background: string;
  isGenerating: boolean;
  setTitle: (title: string) => void;
  setChannelName: (name: string) => void;
  setStyle: (style: ThumbnailStyle) => void;
  setBackground: (background: string) => void;
  setState: (state: Partial<ThumbnailEditorState>) => void;
  randomize: () => void;
  generateWithAI: () => void;
  serializeToBackend: () => ThumbnailConfig;
  deserializeFromBackend: (config: ThumbnailConfig) => Partial<ThumbnailEditorState>;
}

const styles: ThumbnailStyle[] = ['modern', 'minimal', 'bold', 'bright', 'dark', 'gradient'];

export function useThumbnailEditor(): ThumbnailEditorState {
  const [title, setTitle] = useState('10 Amazing AI Tools You Need to Try in 2023');
  const [channelName, setChannelName] = useState('Tech Innovators');
  const [style, setStyle] = useState<ThumbnailStyle>('modern');
  const [background, setBackground] = useState(getRandomBackground());
  const [isGenerating, setIsGenerating] = useState(false);

  const setState = useCallback((state: Partial<ThumbnailEditorState>) => {
    if (state.title !== undefined) setTitle(state.title);
    if (state.channelName !== undefined) setChannelName(state.channelName);
    if (state.style !== undefined) setStyle(state.style);
    if (state.background !== undefined) setBackground(state.background);
  }, []);

  const randomize = useCallback(() => {
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomTitle = randomTitles[Math.floor(Math.random() * randomTitles.length)];
    const randomBg = getRandomBackground();

    setStyle(randomStyle);
    setTitle(randomTitle);
    setBackground(randomBg);
  }, []);

  const generateWithAI = useCallback(() => {
    setIsGenerating(true);

    setTimeout(() => {
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      const randomTitle = aiTitles[Math.floor(Math.random() * aiTitles.length)];
      const randomBg = getRandomBackground();

      setStyle(randomStyle);
      setTitle(randomTitle);
      setBackground(randomBg);
      setIsGenerating(false);

      toast.success('AI has generated a new thumbnail design for you!');
    }, 1500);
  }, []);

  const serializeToBackend = useCallback((): ThumbnailConfig => {
    // Encode our state into the backend's ThumbnailConfig structure
    const metadata = JSON.stringify({
      title,
      channelName,
      style,
      background,
    });

    return {
      width: BigInt(1280),
      height: BigInt(720),
      bgColor: background,
      borderSize: BigInt(0),
      borderColor: '#000000',
      shapes: [],
      text: metadata,
      createdAt: BigInt(Date.now() * 1000000),
      updatedAt: undefined,
    };
  }, [title, channelName, style, background]);

  const deserializeFromBackend = useCallback((config: ThumbnailConfig): Partial<ThumbnailEditorState> => {
    try {
      if (config.text) {
        const metadata = JSON.parse(config.text);
        return {
          title: metadata.title || title,
          channelName: metadata.channelName || channelName,
          style: metadata.style || style,
          background: metadata.background || config.bgColor,
        };
      }
    } catch (error) {
      console.error('Failed to deserialize template:', error);
    }

    return {
      background: config.bgColor,
    };
  }, [title, channelName, style]);

  return {
    title,
    channelName,
    style,
    background,
    isGenerating,
    setTitle,
    setChannelName,
    setStyle,
    setBackground,
    setState,
    randomize,
    generateWithAI,
    serializeToBackend,
    deserializeFromBackend,
  };
}
