export type OccasionType = 
  | 'everyday' 
  | 'birthday' 
  | 'gratitude' 
  | 'encouragement' 
  | 'healing' 
  | 'milestone';

export type ToneType = 
  | 'warm' 
  | 'playful' 
  | 'poetic' 
  | 'inspiring';

export type CardThemeColor = 
  | 'amber' 
  | 'rose' 
  | 'sage' 
  | 'indigo' 
  | 'violet' 
  | 'emerald';

export interface WishRequest {
  recipientName: string;
  senderName?: string;
  occasion: OccasionType;
  tone: ToneType;
  customNote?: string;
}

export interface GeneratedWish {
  id: string;
  recipientName: string;
  senderName?: string;
  occasion: OccasionType;
  tone: ToneType;
  headline: string;
  greetingMessage: string;
  closingAffirmation: string;
  signOff: string;
  themeColor: CardThemeColor;
  timestamp: number;
}
