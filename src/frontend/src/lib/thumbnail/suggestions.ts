import type { ThumbnailStyle } from './styles';

export interface Suggestion {
  name: string;
  description: string;
  background: string;
  style: ThumbnailStyle;
  title: string;
}

export const suggestions: Record<string, Suggestion> = {
  clickbait: {
    name: 'Clickbait Style',
    description: 'High engagement, attention-grabbing design',
    background: 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 100%)',
    style: 'bold',
    title: "You Won't Believe What Happened Next!",
  },
  educational: {
    name: 'Educational',
    description: 'Clean, informative, professional look',
    background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    style: 'minimal',
    title: 'The Complete Guide to Machine Learning',
  },
  gaming: {
    name: 'Gaming',
    description: 'Energetic, vibrant, action-oriented',
    background: 'linear-gradient(135deg, #9b59b6 0%, #e74c3c 100%)',
    style: 'bright',
    title: 'EPIC GAMING MOMENTS #237',
  },
  vlog: {
    name: 'Vlog Style',
    description: 'Personal, authentic, relatable design',
    background: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)',
    style: 'modern',
    title: 'A Day in My Life as a YouTuber',
  },
};
