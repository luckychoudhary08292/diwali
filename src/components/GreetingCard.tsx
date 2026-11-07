import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Check, 
  Share2, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles,
  Heart
} from 'lucide-react';
import { CardThemeColor, GeneratedWish } from '../types';
import { copyToClipboard, buildShareUrl, speakMessage, stopSpeaking, triggerNativeShare } from '../utils/share';
import { soundEngine } from '../utils/audioChime';

interface GreetingCardProps {
  wish: GeneratedWish;
  onRegenerate: () => void;
  onSave: (wish: GeneratedWish) => void;
  isSaved: boolean;
  onColorChange: (color: CardThemeColor) => void;
}

const THEME_STYLES: Record<CardThemeColor, {
  border: string;
  cardBg: string;
  accentBg: string;
  accentText: string;
  quoteBorder: string;
  glow: string;
  buttonActive: string;
}> = {
  amber: {
    border: 'border-amber-200 dark:border-amber-900/60',
    cardBg: 'bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-amber-950/20',
    accentBg: 'bg-amber-500/10 dark:bg-amber-400/10',
    accentText: 'text-amber-700 dark:text-amber-400',
    quoteBorder: 'border-amber-300 dark:border-amber-700/60',
    glow: 'rgba(245, 158, 11, 0.15)',
    buttonActive: 'bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950'
  },
  rose: {
    border: 'border-rose-200 dark:border-rose-900/60',
    cardBg: 'bg-gradient-to-b from-rose-50/40 via-white to-rose-50/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-rose-950/20',
    accentBg: 'bg-rose-500/10 dark:bg-rose-400/10',
    accentText: 'text-rose-700 dark:text-rose-400',
    quoteBorder: 'border-rose-300 dark:border-rose-700/60',
    glow: 'rgba(244, 63, 94, 0.15)',
    buttonActive: 'bg-rose-500 text-white dark:bg-rose-400 dark:text-slate-950'
  },
  sage: {
    border: 'border-emerald-200 dark:border-emerald-900/60',
    cardBg: 'bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-emerald-950/20',
    accentBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
    accentText: 'text-emerald-700 dark:text-emerald-400',
    quoteBorder: 'border-emerald-300 dark:border-emerald-700/60',
    glow: 'rgba(16, 185, 129, 0.15)',
    buttonActive: 'bg-emerald-600 text-white dark:bg-emerald-400 dark:text-slate-950'
  },
  indigo: {
    border: 'border-indigo-200 dark:border-indigo-900/60',
    cardBg: 'bg-gradient-to-b from-indigo-50/40 via-white to-indigo-50/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-indigo-950/20',
    accentBg: 'bg-indigo-500/10 dark:bg-indigo-400/10',
    accentText: 'text-indigo-700 dark:text-indigo-400',
    quoteBorder: 'border-indigo-300 dark:border-indigo-700/60',
    glow: 'rgba(99, 102, 241, 0.15)',
    buttonActive: 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-slate-950'
  },
  violet: {
    border: 'border-violet-200 dark:border-violet-900/60',
    cardBg: 'bg-gradient-to-b from-violet-50/40 via-white to-violet-50/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-violet-950/20',
    accentBg: 'bg-violet-500/10 dark:bg-violet-400/10',
    accentText: 'text-violet-700 dark:text-violet-400',
    quoteBorder: 'border-violet-300 dark:border-violet-700/60',
    glow: 'rgba(139, 92, 246, 0.15)',
    buttonActive: 'bg-violet-600 text-white dark:bg-violet-400 dark:text-slate-950'
  },
  emerald: {
    border: 'border-teal-200 dark:border-teal-900/60',
    cardBg: 'bg-gradient-to-b from-teal-50/40 via-white to-teal-50/20 dark:from-slate-900 dark:via-slate-900/95 dark:to-teal-950/20',
    accentBg: 'bg-teal-500/10 dark:bg-teal-400/10',
    accentText: 'text-teal-700 dark:text-teal-400',
    quoteBorder: 'border-teal-300 dark:border-teal-700/60',
    glow: 'rgba(20, 184, 166, 0.15)',
    buttonActive: 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950'
  }
};

const COLOR_OPTIONS: { id: CardThemeColor; name: string; bg: string }[] = [
  { id: 'amber', name: 'Golden Amber', bg: 'bg-amber-400' },
  { id: 'rose', name: 'Blush Rose', bg: 'bg-rose-400' },
  { id: 'sage', name: 'Morning Sage', bg: 'bg-emerald-400' },
  { id: 'indigo', name: 'Celestial Indigo', bg: 'bg-indigo-400' },
  { id: 'violet', name: 'Twilight Violet', bg: 'bg-violet-400' },
  { id: 'emerald', name: 'Fresh Emerald', bg: 'bg-teal-400' }
];

export const GreetingCard: React.FC<GreetingCardProps> = ({
  wish,
  onRegenerate,
  onSave,
  isSaved,
  onColorChange
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const style = THEME_STYLES[wish.themeColor] || THEME_STYLES.amber;

  const fullTextToCopy = `${wish.headline}\n\n${wish.greetingMessage}\n\n"${wish.closingAffirmation}"\n\n— ${wish.signOff}`;

  const handleCopyText = async () => {
    soundEngine.playSoftClick();
    const success = await copyToClipboard(fullTextToCopy);
    if (success) {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    }
  };

  const handleShareLink = async () => {
    soundEngine.playSoftClick();
    const shareUrl = buildShareUrl({
      recipientName: wish.recipientName,
      senderName: wish.senderName,
      occasion: wish.occasion,
      tone: wish.tone
    });

    const didShare = await triggerNativeShare(
      `A Warm Wish for ${wish.recipientName}`,
      wish.headline,
      shareUrl
    );

    if (!didShare) {
      const copied = await copyToClipboard(shareUrl);
      if (copied) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      }
    }
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${wish.greetingMessage}. ${wish.closingAffirmation}. ${wish.signOff}`;
      const started = speakMessage(textToRead, () => {
        setIsSpeaking(false);
      });
      if (!started) setIsSpeaking(false);
    }
  };

  const handleDownloadSnapshot = () => {
    soundEngine.playSoftClick();
    setIsDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // High-DPI canvas for crisp export
      const width = 1200;
      const height = 1500;
      canvas.width = width;
      canvas.height = height;

      // Card background
      const isCardDark = document.documentElement.classList.contains('dark');
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      if (isCardDark) {
        bgGradient.addColorStop(0, '#090d16');
        bgGradient.addColorStop(0.5, '#0f172a');
        bgGradient.addColorStop(1, '#0b1120');
      } else {
        bgGradient.addColorStop(0, '#fefbf6');
        bgGradient.addColorStop(0.5, '#ffffff');
        bgGradient.addColorStop(1, '#fef6ee');
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Elegant inner border frame
      ctx.strokeStyle = isCardDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 50, width - 100, height - 100);

      // Kicker
      ctx.fillStyle = isCardDark ? '#94a3b8' : '#64748b';
      ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`A WARM WISH FOR ${wish.recipientName.toUpperCase()}`, width / 2, 160);

      // Headline
      ctx.fillStyle = isCardDark ? '#f8fafc' : '#0f172a';
      ctx.font = 'bold 52px "Playfair Display", Georgia, serif';
      wrapText(ctx, wish.headline, width / 2, 260, width - 240, 68);

      // Decorative divider
      ctx.strokeStyle = isCardDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 80, 400);
      ctx.lineTo(width / 2 + 80, 400);
      ctx.stroke();

      // Body text
      ctx.fillStyle = isCardDark ? '#cbd5e1' : '#334155';
      ctx.font = '400 32px "Plus Jakarta Sans", sans-serif';
      wrapText(ctx, wish.greetingMessage, width / 2, 480, width - 240, 50);

      // Affirmation Box
      ctx.fillStyle = isCardDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
      roundRect(ctx, 120, 940, width - 240, 160, 20);
      ctx.fill();

      ctx.fillStyle = isCardDark ? '#f1f5f9' : '#1e293b';
      ctx.font = 'italic 500 30px "Playfair Display", Georgia, serif';
      wrapText(ctx, `"${wish.closingAffirmation}"`, width / 2, 1020, width - 300, 44);

      // Signoff
      ctx.fillStyle = isCardDark ? '#f59e0b' : '#d97706';
      ctx.font = '600 34px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`— ${wish.signOff}`, width / 2, 1220);

      // Watermark footer
      ctx.fillStyle = isCardDark ? '#64748b' : '#94a3b8';
      ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Created with AuraWish · aurawish.app', width / 2, 1390);

      // Download link trigger
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `Wish-for-${wish.recipientName.replace(/\s+/g, '-')}.png`;
      downloadLink.click();
    } catch {
      // Fallback: silent fail
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center"
    >
      {/* Main Card Surface */}
      <div
        ref={cardRef}
        style={{
          boxShadow: `0 20px 40px -15px ${style.glow}`
        }}
        className={`w-full max-w-2xl rounded-2xl sm:rounded-3xl border p-6 sm:p-10 relative overflow-hidden transition-all duration-300 ${style.border} ${style.cardBg}`}
      >
        {/* Subtle decorative background watermarks / motifs */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-10 dark:opacity-5 text-amber-500">
          <Sparkles className="w-24 h-24" />
        </div>

        {/* Card Header Metadata (Unboxed text with separators complying with anti-slop rules) */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              For {wish.recipientName}
            </span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{wish.occasion}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{wish.tone}</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onSave(wish);
            }}
            className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-1"
            title={isSaved ? 'Saved to collection' : 'Save to collection'}
            aria-label={isSaved ? 'Saved to collection' : 'Save to collection'}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-amber-500" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            <span className="text-[11px] hidden sm:inline">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button>
        </div>

        {/* Card Headline */}
        <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-6" style={{ textWrap: 'balance' }}>
          {wish.headline}
        </h2>

        {/* Card Message Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
          {wish.greetingMessage.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200 font-normal"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Inspiring Affirmation Callout */}
        <div className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border ${style.quoteBorder} ${style.accentBg} mb-8 transition-colors`}>
          <div className="flex items-start gap-3">
            <Heart className={`h-4 w-4 mt-0.5 shrink-0 ${style.accentText}`} />
            <p className={`font-serif-display italic text-sm sm:text-base leading-snug ${style.accentText}`}>
              "{wish.closingAffirmation}"
            </p>
          </div>
        </div>

        {/* Card Footer Sign-off */}
        <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60 pt-5 mt-2">
          <div className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-200">
            {wish.signOff}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            {new Date(wish.timestamp).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Action Toolbar Below Card */}
      <div className="mt-5 w-full max-w-2xl flex flex-wrap items-center justify-between gap-3 px-1">
        {/* Left actions: Copy & Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 shadow-xs transition-all active:scale-95 min-h-[44px]"
            aria-label="Copy greeting text"
          >
            {copiedText ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handleShareLink}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 shadow-xs transition-all active:scale-95 min-h-[44px]"
            aria-label="Share wish link"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-slate-500" />
                <span>Share Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleToggleSpeak}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all active:scale-95 min-h-[44px] ${
              isSpeaking
                ? 'border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-200 animate-pulse'
                : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 shadow-xs'
            }`}
            title={isSpeaking ? 'Stop voice readout' : 'Read aloud with voice'}
            aria-label={isSpeaking ? 'Stop voice' : 'Read aloud'}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-slate-500" />
                <span>Listen</span>
              </>
            )}
          </button>
        </div>

        {/* Right actions: Color Swatches, Download & Regenerate */}
        <div className="flex items-center gap-2">
          {/* Color Palettes Picker */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  soundEngine.playSoftClick();
                  onColorChange(c.id);
                }}
                className={`h-5 w-5 rounded-full ${c.bg} transition-transform ${
                  wish.themeColor === c.id
                    ? 'ring-2 ring-slate-900 dark:ring-white scale-110'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title={c.name}
                aria-label={`Theme color ${c.name}`}
              />
            ))}
          </div>

          <button
            onClick={handleDownloadSnapshot}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 shadow-xs transition-all active:scale-95 min-h-[44px]"
            title="Download high-resolution image card"
            aria-label="Download image"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playCelebrationChime();
              onRegenerate();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 dark:bg-amber-400 dark:hover:bg-amber-300 shadow-xs transition-all active:scale-95 min-h-[44px]"
            title="Generate a fresh variation with same details"
            aria-label="New variation"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>Variation</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Canvas helper functions for clean image export
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
