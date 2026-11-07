import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Flame, 
  Gift, 
  Heart,
  ChevronRight,
  Palette,
  RotateCcw
} from 'lucide-react';
import { soundEngine } from '../utils/audioChime';
import { copyToClipboard, buildShareUrl, speakMessage, stopSpeaking, triggerNativeShare } from '../utils/share';

interface DiwaliGrandWishProps {
  recipientName: string;
  senderName?: string;
  onExplorePavilion: (tabId: string) => void;
  onReset: () => void;
  onTriggerBurst: () => void;
}

export const DiwaliGrandWish: React.FC<DiwaliGrandWishProps> = ({
  recipientName,
  senderName,
  onExplorePavilion,
  onReset,
  onTriggerBurst
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const diwaliMessage = `May the divine radiance of a thousand golden diyas illuminate your journey with boundless health, supreme peace, and overflowing prosperity. May Goddess Lakshmi bless your home with eternal abundance, and may every moment of this festival fill your heart with pure, glowing joy.`;

  const diwaliAffirmation = `शुभं करोति कल्याणमारोग्यं धनसंपदा | शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ||`;

  const handleCopyWish = async () => {
    soundEngine.playSoftClick();
    const fullText = `🪔 HAPPY DIWALI 🪔\n\nDearest ${recipientName},\n\n${diwaliMessage}\n\n"${diwaliAffirmation}"\n\nWith boundless warmth and love,\n${senderName || 'Your Well-Wisher'}`;
    const success = await copyToClipboard(fullText);
    if (success) {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    }
  };

  const handleShare = async () => {
    soundEngine.playCelebrationChime();
    const shareUrl = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(recipientName)}${senderName ? `&from=${encodeURIComponent(senderName)}` : ''}`;

    const shared = await triggerNativeShare(
      `A Sacred Diwali Gift for ${recipientName}`,
      `Happy Diwali ${recipientName}! Unlock your personalized Diwali gift box.`,
      shareUrl
    );

    if (!shared) {
      const copied = await copyToClipboard(shareUrl);
      if (copied) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      }
    }
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `Happy Diwali, dearest ${recipientName}! ${diwaliMessage} Wishing you joy and prosperity, from ${senderName || 'Your Well-Wisher'}.`;
      const started = speakMessage(textToRead, () => setIsSpeaking(false));
      if (!started) setIsSpeaking(false);
    }
  };

  const handleDownloadCard = () => {
    soundEngine.playCelebrationChime();
    setIsDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      const width = 1200;
      const height = 1600;
      canvas.width = width;
      canvas.height = height;

      // Dark Royal Festive Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#050814');
      bgGrad.addColorStop(0.3, '#0b1329');
      bgGrad.addColorStop(0.7, '#18122B');
      bgGrad.addColorStop(1, '#080512');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Gold Ornate Border Frame
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(55, 55, width - 110, height - 110);

      // Header Kicker
      ctx.fillStyle = '#fbbf24';
      ctx.font = '700 24px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ शुभ दीपावली · FESTIVAL OF LIGHTS ✨', width / 2, 160);

      // Main Title: HAPPY DIWALI
      ctx.fillStyle = '#fef08a';
      ctx.font = '900 78px "Cinzel Decorative", Georgia, serif';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 25;
      ctx.fillText('HAPPY DIWALI', width / 2, 280);
      ctx.shadowBlur = 0;

      // Personalized Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 700 48px "Playfair Display", Georgia, serif';
      ctx.fillText(`Dearest ${recipientName}`, width / 2, 380);

      // Decorative divider
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 120, 440);
      ctx.lineTo(width / 2 + 120, 440);
      ctx.stroke();

      // Main Message
      ctx.fillStyle = '#fde68a';
      ctx.font = '400 32px "Plus Jakarta Sans", sans-serif';
      wrapCanvasText(ctx, diwaliMessage, width / 2, 540, width - 260, 52);

      // Sacred Sanskrit Shlok Box
      ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
      roundCanvasRect(ctx, 120, 960, width - 240, 180, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.font = '500 28px "Playfair Display", Georgia, serif';
      wrapCanvasText(ctx, diwaliAffirmation, width / 2, 1030, width - 300, 44);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'italic 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('May the sacred lamp bring auspiciousness, prosperity, and light.', width / 2, 1105);

      // Sign-off
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 36px "Cinzel", serif';
      ctx.fillText(`With love & blessings,`, width / 2, 1280);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '700 42px "Cinzel Decorative", serif';
      ctx.fillText(senderName || 'Your Well-Wisher', width / 2, 1345);

      // Footer
      ctx.fillStyle = '#94a3b8';
      ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Created with AuraWish Diwali Celebration', width / 2, 1500);

      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Happy-Diwali-${recipientName.replace(/\s+/g, '-')}.png`;
      a.click();
    } catch {
      // safe fallback
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 text-center z-10 w-full max-w-4xl mx-auto"
    >
      {/* Background celebration backdrop image preview */}
      <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden opacity-25 blur-[1px]">
        <img
          src="/src/assets/images/diwali_night_skyline_1794077361163.jpg"
          alt="Diwali Night Skyline"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
      </div>

      {/* Decorative Sky Fireworks PNG behind Title */}
      <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] md:w-[680px] pointer-events-none opacity-40 mix-blend-screen select-none -z-5">
        <img
          src="/assets/aistudio/Diwali_Sky_Crackers_Png_PNG_Transparent_With_Clear_Background_ID_111375___TopPNG-removebg-preview_2dd30f25.png"
          alt="Festive Sky Fireworks"
          className="w-full h-auto drop-shadow-[0_0_35px_rgba(251,191,36,0.6)]"
        />
      </div>

      {/* Sacred Diya / Festival Kicker */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.25)]">
        <Sparkles className="h-4 w-4 text-amber-400" />
        <span className="tracking-widest uppercase">✨ शुभ दीपावली · Auspicious Festival of Lights ✨</span>
      </div>

      {/* Calligraphic Happy Diwali with Diyas Art */}
      <div className="w-48 sm:w-64 md:w-80 mb-2 pointer-events-none select-none drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]">
        <img
          src="/assets/aistudio/95b88c8587499db5b908403a9d4e671f_729e29b5.png"
          alt="Happy Diwali Calligraphy with Diyas"
          className="w-full h-auto filter brightness-110"
        />
      </div>

      {/* Grand Title: Best Font Happy Diwali */}
      <h1 className="font-diwali text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider gold-gradient-text drop-shadow-[0_4px_30px_rgba(251,191,36,0.6)] leading-tight mb-4 select-none">
        HAPPY DIWALI
      </h1>

      {/* Recipient Personalized Name */}
      <div className="font-serif-display text-2xl sm:text-4xl text-white font-bold tracking-wide mb-6">
        ✨ Dearest <span className="text-amber-300 underline decoration-amber-500/50 underline-offset-8">{recipientName}</span> ✨
      </div>

      {/* The Lovely Diwali Blessing Card */}
      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center relative overflow-hidden mb-6">
        {/* Floating Sparkle motis */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

        <p className="text-base sm:text-xl text-amber-100 font-normal leading-relaxed mb-6 font-serif-display">
          "{diwaliMessage}"
        </p>

        {/* Sacred Sanskrit Shlok with Translation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 mb-6">
          <div className="font-serif-display text-sm sm:text-base font-semibold tracking-wide text-amber-300 mb-1">
            {diwaliAffirmation}
          </div>
          <div className="text-xs text-amber-200/80 font-light italic">
            Salutations to the holy flame that brings health, wealth, and dispels all dark thoughts.
          </div>
        </div>

        {/* Sender Sign-off */}
        <div className="pt-4 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-amber-200/90 font-medium">
          <div>
            With heartfelt blessings & love,
            <span className="text-white font-bold ml-1.5 font-diwali text-base">
              {senderName || 'Your Well-Wisher'}
            </span>
          </div>
          <span className="text-amber-400/60 font-mono text-xs">
            दिवाली २०२६
          </span>
        </div>
      </div>

      {/* Majestic Peacock Mandala Diya Centerpiece */}
      <div className="w-36 sm:w-48 md:w-56 -mt-3 mb-6 pointer-events-none select-none drop-shadow-[0_0_35px_rgba(251,191,36,0.6)]">
        <img
          src="/assets/aistudio/386006e1b5632e7acbbaa255c5ab7f91_9af01803.png"
          alt="Majestic Peacock Mandala Diya"
          className="w-full h-auto flame-animation"
        />
      </div>

      {/* Interactive Action Toolbar */}
      <div className="w-full max-w-2xl flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
        <button
          onClick={handleCopyWish}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-200 border border-amber-500/40 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-md min-h-[44px]"
        >
          {copiedText ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300">Message Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-amber-400" />
              <span>Copy Message</span>
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm transition-all hover:brightness-105 active:scale-95 shadow-lg shadow-amber-500/20 min-h-[44px]"
        >
          {copiedLink ? (
            <>
              <Check className="h-4 w-4 text-slate-950" />
              <span>Gift Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4 text-slate-950" />
              <span>Share Gift Box</span>
            </>
          )}
        </button>

        <button
          onClick={handleToggleVoice}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all active:scale-95 min-h-[44px] ${
            isSpeaking
              ? 'bg-rose-500/30 text-rose-200 border-rose-400 animate-pulse'
              : 'bg-slate-900/90 text-amber-200 border-amber-500/40 hover:bg-slate-800'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="h-4 w-4 text-rose-300" />
              <span>Stop Voice</span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 text-amber-400" />
              <span>Listen</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownloadCard}
          disabled={isDownloading}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-200 border border-amber-500/40 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-md min-h-[44px]"
        >
          <Download className="h-4 w-4 text-amber-400" />
          <span>Save Card</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playFireworkBurst();
            onTriggerBurst();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-md min-h-[44px]"
        >
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>Burst Fireworks 🎆</span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-300 border border-slate-700 text-xs sm:text-sm font-medium transition-all active:scale-95 min-h-[44px]"
          title="Create another wish"
        >
          <RotateCcw className="h-4 w-4 text-slate-400" />
          <span>New Name</span>
        </button>
      </div>

      {/* Multi-Page Interaction Exploration Gateway ("Not just 1 simple page") */}
      <div className="w-full max-w-3xl pt-8 border-t border-amber-500/30">
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold font-diwali gold-gradient-text tracking-wide">
            Explore the Diwali Mela & Interactive Pavilions
          </h3>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-1">
            Tap any pavilion below to explore more interactive celebrations!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <button
            onClick={() => {
              soundEngine.playDiyaLight();
              onExplorePavilion('diyas');
            }}
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-amber-500/30 hover:border-amber-400 text-left transition-all group active:scale-98 shadow-md"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="h-8 w-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame className="h-4 w-4 text-amber-400" />
              </div>
              <span className="text-sm font-bold text-white font-serif-display">
                Diya Sanctuary
              </span>
            </div>
            <p className="text-xs text-slate-400 group-hover:text-amber-200/80 transition-colors">
              Light 6 sacred clay lamps for health, wealth & wisdom.
            </p>
          </button>

          <button
            onClick={() => {
              soundEngine.playCelebrationChime();
              onExplorePavilion('rangoli');
            }}
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-amber-500/30 hover:border-amber-400 text-left transition-all group active:scale-98 shadow-md"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="h-8 w-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Palette className="h-4 w-4 text-rose-400" />
              </div>
              <span className="text-sm font-bold text-white font-serif-display">
                Rangoli Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 group-hover:text-amber-200/80 transition-colors">
              Create vibrant geometric mandala art with glowing colors.
            </p>
          </button>

          <button
            onClick={() => {
              soundEngine.playCelebrationChime();
              onExplorePavilion('sweets');
            }}
            className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-amber-500/30 hover:border-amber-400 text-left transition-all group active:scale-98 shadow-md"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-white font-serif-display">
                Mithai Thali
              </span>
            </div>
            <p className="text-xs text-slate-400 group-hover:text-amber-200/80 transition-colors">
              Assemble a traditional sweet box (Kaju Katli, Ladoo, Jalebi).
            </p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

function wrapCanvasText(
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

function roundCanvasRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
