export type EmotionKey = 'overwhelmed' | 'stuck' | 'burnout' | 'neutral';

export interface EmotionOption {
  key: EmotionKey;
  title: string;
  emoji: string;
  description: string;
  bgLight: string;
}

export interface CategoryOption {
  id: string;
  label: string;
  emoji: string;
}

export interface FeedbackData {
  emotion: EmotionKey | null;
  emotionLabel: string;
  categories: string[];
  story: string;
  hope: string;
  ticketId?: string;
  timestamp?: string;
}

export interface CommunityStory {
  id: string;
  ticketId: string;
  emotion: EmotionKey;
  categories: string[];
  story: string;
  hope?: string;
  date: string;
  status: 'Diterima' | 'Sedang Ditinjau' | 'Solusi Diterapkan';
  statusBadge: string;
  prodiNote?: string;
}
