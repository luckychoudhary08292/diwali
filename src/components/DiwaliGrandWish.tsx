import React from 'react';
import { motion } from 'motion/react';

interface DiwaliGrandWishProps {
  recipientName: string;
  senderName?: string;
  onReset?: () => void;
  onTriggerBurst?: () => void;
}

export const DiwaliGrandWish: React.FC<DiwaliGrandWishProps> = ({
  recipientName,
  senderName
}) => {
  const diwaliMessage = `May the divine radiance of a thousand golden diyas illuminate your home with health, eternal peace, and overflowing prosperity. May Goddess Lakshmi bless your family with boundless joy and good fortune throughout the coming year.`;

  const diwaliAffirmation = `शुभं करोति कल्याणमारोग्यं धनसंपदा | शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ||`;

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-3 sm:px-6 py-4 md:py-8 text-center z-10 w-full max-w-5xl mx-auto">
      {/* Upper Sky Fireworks Atmosphere */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 sm:w-96 md:w-[32rem] pointer-events-none opacity-25 select-none -z-10 mix-blend-screen">
        <img
          src="/assets/aistudio/82c3485fbe6920add88b50f97eb8c82a-Photoroom_e2ccc1c2.png"
          alt="Golden Sky Fireworks Bouquet"
          className="w-full h-auto"
        />
      </div>

      {/* Responsive Grid Architecture: 
          Adapts spacing, proportions, and visual weight across mobile, tablet, and desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center"
      >
        {/* COLUMN 1: Visual & Festive Heritage Emblem (5 columns on desktop, stacked on mobile) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center order-1 md:order-1 space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Header Artwork: "Happy दिवाली" with 3 Lit Diyas on Ivory-Silk Plaque */}
          <div className="px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-100/90 via-yellow-50 to-amber-100/90 border-2 border-amber-400/80 shadow-[0_10px_30px_rgba(251,191,36,0.35)] select-none pointer-events-none transition-transform hover:scale-105 duration-300">
            <img
              src="/assets/aistudio/95b88c8587499db5b908403a9d4e671f_729e29b5.png"
              alt="Happy दिवाली Artistic Calligraphy with Lit Diyas"
              className="w-44 sm:w-56 md:w-64 lg:w-72 h-auto"
            />
          </div>

          {/* Majestic Peacock Mandala Diya Centerpiece with Ambient Flame Aura */}
          <div className="relative flex flex-col items-center justify-center select-none pointer-events-none my-1">
            {/* Soft Ambient Radial Light Halo */}
            <div className="absolute inset-0 rounded-full bg-radial from-amber-400/25 via-yellow-500/10 to-transparent blur-2xl -z-10" />

            <div className="w-28 sm:w-36 md:w-44 lg:w-52 drop-shadow-[0_0_28px_rgba(251,191,36,0.65)]">
              <img
                src="/assets/aistudio/386006e1b5632e7acbbaa255c5ab7f91_9af01803.png"
                alt="Peacock Mandala Diya"
                className="w-full h-auto flame-animation"
              />
            </div>
          </div>

          {/* Sacred Kicker Badge */}
          <div className="hidden md:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs font-semibold backdrop-blur-md">
            <span className="tracking-widest uppercase text-[11px]">शुभ दीपावली · Deepawali Wishes</span>
          </div>
        </div>

        {/* COLUMN 2: Royal Personalized Blessing Card (7 columns on desktop, stacked on mobile) */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-2 space-y-3 sm:space-y-4">
          {/* Recipient Personalized Name */}
          <div className="w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-100 font-bold tracking-wide text-center md:text-left">
            ✨ Dearest <span className="font-diwali gold-gradient-text font-black underline decoration-amber-400/70 underline-offset-8">{recipientName}</span> ✨
          </div>

          {/* The Royal Diwali Blessing Card Surface */}
          <div className="w-full bg-gradient-to-b from-[#160c22] via-[#0e0716] to-[#08040d] border border-amber-400/50 outline outline-1 outline-amber-500/25 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden">
            {/* Subtle Ambient Gold Flares */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Message Body with High Contrast & Perfect Alignment */}
            <p className="text-sm sm:text-base md:text-lg text-[#fffdf5] font-serif leading-relaxed mb-4 sm:mb-5 font-normal text-center md:text-left">
              "{diwaliMessage}"
            </p>

            {/* Sacred Sanskrit Shlok with Translation */}
            <div className="p-3 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-400/35 text-amber-200 mb-4 sm:mb-5 text-center md:text-left">
              <div className="font-serif-display text-xs sm:text-sm md:text-base font-semibold tracking-wide text-amber-300 mb-1">
                {diwaliAffirmation}
              </div>
              <div className="text-[11px] sm:text-xs text-amber-100/80 font-light italic">
                Salutations to the holy flame that brings health, wealth, and dispels all darkness.
              </div>
            </div>

            {/* Sender Sign-off */}
            <div className="pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs sm:text-sm text-amber-200/90 font-medium">
              <div>
                With heartfelt love & blessings,
                <span className="text-white font-bold ml-1.5 font-diwali text-xs sm:text-sm md:text-base">
                  {senderName || 'Your Well-Wisher'}
                </span>
              </div>
              <span className="text-amber-400/80 font-mono text-xs">
                दीवाली २०२६
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
