import { OccasionType, ToneType, WishRequest } from '../types';

export function buildShareUrl(req: WishRequest): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('to', req.recipientName);
  if (req.senderName) url.searchParams.set('from', req.senderName);
  url.searchParams.set('occ', req.occasion);
  url.searchParams.set('tone', req.tone);
  if (req.customNote) url.searchParams.set('note', req.customNote);
  return url.toString();
}

export function parseUrlWish(): WishRequest | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to');
  if (!to) return null;

  const from = params.get('from') || undefined;
  const occ = (params.get('occ') as OccasionType) || 'everyday';
  const tone = (params.get('tone') as ToneType) || 'warm';
  const note = params.get('note') || undefined;

  const validOccasions: OccasionType[] = ['everyday', 'birthday', 'gratitude', 'encouragement', 'healing', 'milestone'];
  const validTones: ToneType[] = ['warm', 'playful', 'poetic', 'inspiring'];

  return {
    recipientName: to,
    senderName: from,
    occasion: validOccasions.includes(occ) ? occ : 'everyday',
    tone: validTones.includes(tone) ? tone : 'warm',
    customNote: note
  };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

export function canNativeShare(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share;
}

export async function triggerNativeShare(title: string, text: string, url: string): Promise<boolean> {
  if (canNativeShare()) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function speakMessage(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // silent
    }
  }
}
