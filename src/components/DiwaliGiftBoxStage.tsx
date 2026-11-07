import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Gift, Edit2 } from 'lucide-react';
import { soundEngine } from '../utils/audioChime';

interface DiwaliGiftBoxStageProps {
  recipientName: string;
  senderName?: string;
  onOpenGift: () => void;
  onEditName: () => void;
}

export const DiwaliGiftBoxStage: React.FC<DiwaliGiftBoxStageProps> = ({
  recipientName,
  senderName,
  onOpenGift,
  onEditName
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleBoxClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundEngine.playBoxOpen();
    setTimeout(() => {
      onOpenGift();
    }, 1100);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 text-center z-10">
      {/* Name Tag Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-lg"
      >
        <Sparkles className="h-4 w-4 text-amber-400" />
        <span>A Sacred Gift For: <strong className="text-white font-bold">{recipientName}</strong></span>
        {senderName && (
          <span className="text-amber-300/80">from {senderName}</span>
        )}
        <button
          onClick={onEditName}
          className="ml-1 text-slate-400 hover:text-amber-300 transition-colors p-1"
          title="Change name"
          aria-label="Edit name"
        >
          <Edit2 className="h-3.5 w-3.5" />
        </button>
      </motion.div>

      {/* Decorative Sky Fireworks burst behind box */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] pointer-events-none opacity-30 mix-blend-screen select-none -z-5">
        <img
          src="/assets/aistudio/Diwali_Sky_Crackers_Png_PNG_Transparent_With_Clear_Background_ID_111375___TopPNG-removebg-preview_2dd30f25.png"
          alt="Sky Fireworks"
          className="w-full h-auto drop-shadow-[0_0_40px_rgba(251,191,36,0.6)]"
        />
      </div>

      {/* Flanking Ornate Hanging Lanterns */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 w-28 pointer-events-none opacity-80 drop-shadow-[0_4px_16px_rgba(244,63,94,0.4)]">
        <img
          src="/assets/aistudio/805c6d532950e43d37ba579870a7a0c2_3e77a72a.png"
          alt="Ornate Hanging Lanterns"
          className="w-full h-auto"
        />
      </div>

      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-28 pointer-events-none opacity-80 scale-x-[-1] drop-shadow-[0_4px_16px_rgba(244,63,94,0.4)]">
        <img
          src="/assets/aistudio/805c6d532950e43d37ba579870a7a0c2_3e77a72a.png"
          alt="Ornate Hanging Lanterns"
          className="w-full h-auto"
        />
      </div>

      {/* Central Interactive Gift Box */}
      <motion.div
        animate={
          isOpening
            ? {
                scale: [1, 1.15, 1.4],
                rotate: [0, -3, 3, -2, 2, 0],
                opacity: [1, 1, 0]
              }
            : {
                scale: [1, 1.025, 1],
                y: [0, -6, 0]
              }
        }
        transition={
          isOpening
            ? { duration: 1.1, ease: 'easeInOut' }
            : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
        }
        onClick={handleBoxClick}
        className="relative group cursor-pointer w-72 h-72 sm:w-88 sm:h-88 my-4 select-none"
      >
        {/* Pulsing Golden Aura behind box */}
        <div
          className={`absolute inset-0 rounded-3xl bg-radial from-amber-400/40 via-yellow-500/20 to-transparent blur-3xl transition-opacity duration-500 ${
            isOpening ? 'opacity-100 scale-150' : 'opacity-70 group-hover:opacity-100'
          }`}
        />

        {/* Outer Ornate Frame */}
        <div className="relative w-full h-full rounded-3xl p-1.5 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-[0_20px_60px_rgba(245,158,11,0.35)] transition-all duration-300 group-hover:scale-105 group-active:scale-95">
          <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-slate-950">
            {/* The Generated Luxury Indian Festive Gift Box */}
            <img
              src="/src/assets/images/diwali_golden_gift_box_1794077359581.jpg"
              alt="Royal Indian Diwali Gift Box"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Glowing Golden Shimmer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-amber-400/10 pointer-events-none" />

            {/* Tap Affordance Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 animate-bounce">
              <Gift className="h-3.5 w-3.5" />
              <span>Tap to Open Your Wish</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Guiding Text */}
      <p className="mt-6 text-sm text-amber-200/90 font-light max-w-sm mx-auto">
        Touch or click the royal gift box to unwrap divine blessings, prosperity, and light.
      </p>

      {/* Decorative Bottom Marigold motif */}
      <div className="mt-8 flex items-center justify-center gap-2 text-amber-400/70 text-xs">
        <span>✨ Click anywhere to sparkle fireworks ✨</span>
      </div>
    </div>
  );
};
