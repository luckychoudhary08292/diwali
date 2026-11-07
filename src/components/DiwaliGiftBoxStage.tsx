import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Edit2 } from 'lucide-react';
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleBoxClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundEngine.playBoxOpen();
    setTimeout(() => {
      onOpenGift();
    }, 1150);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpening) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-4 text-center z-10 w-full max-w-4xl mx-auto select-none">
      {/* 1. Left Hanging Brass Marigold Lantern */}
      <div className="hidden sm:block absolute left-2 lg:left-6 top-0 w-24 sm:w-32 lg:w-40 lantern-sway-left pointer-events-none select-none z-10">
        <img
          src="/assets/aistudio/download__15_-removebg-preview_670e789f.png"
          alt="Festive Brass Marigold Lantern"
          className="w-full h-auto drop-shadow-[0_15px_30px_rgba(245,158,11,0.5)]"
        />
      </div>

      {/* 2. Right Hanging Royal Red-Gold Lantern */}
      <div className="hidden sm:block absolute right-2 lg:right-6 top-0 w-24 sm:w-32 lg:w-40 lantern-sway-right pointer-events-none select-none z-10">
        <img
          src="/assets/aistudio/5c5897b361e0127b26854b44e7207d03-Photoroom_c9540979.png"
          alt="Royal Red Festive Lantern"
          className="w-full h-auto drop-shadow-[0_15px_30px_rgba(239,68,68,0.4)]"
        />
      </div>

      {/* 3. Ceiling Hanging Antique Brass Temple Chandeliers with Star Glints */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-72 lg:w-96 pointer-events-none select-none opacity-45 -z-10">
        <img
          src="/assets/aistudio/805c6d532950e43d37ba579870a7a0c2_3e77a72a.png"
          alt="Antique Hanging Temple Lamps"
          className="w-full h-auto"
        />
      </div>

      {/* Recipient Ribbon Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/50 text-amber-200 text-xs sm:text-sm font-semibold mb-3 backdrop-blur-md shadow-xl"
      >
        <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin duration-3000" />
        <span>Diwali Gift For: <strong className="text-white font-bold ml-1">{recipientName}</strong></span>
        {senderName && (
          <span className="text-amber-300/80 ml-1">· from {senderName}</span>
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

      {/* Heading */}
      <h2 className="font-diwali text-2xl sm:text-3xl lg:text-4xl font-bold gold-gradient-text tracking-wide mb-1">
        Your Royal Diwali Gift Box
      </h2>
      <p className="text-xs sm:text-sm text-amber-100/80 max-w-sm mb-5 font-light">
        Tap the box to lift the lid and reveal your full-screen Diwali blessing.
      </p>

      {/* Interactive 3D Gift Box Stage with Realistic Velvet & Gold Details */}
      <div
        onClick={handleBoxClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer select-none group w-72 h-72 sm:w-88 sm:h-88 flex flex-col items-center justify-center my-1"
        style={{ perspective: '1200px' }}
      >
        {/* Soft Golden Ambient Light Halo */}
        <div
          className={`absolute inset-0 rounded-full bg-radial from-amber-400/35 via-yellow-500/15 to-transparent blur-3xl pointer-events-none transition-all duration-700 ${
            isOpening ? 'scale-175 opacity-100' : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'
          }`}
        />

        {/* 3D Box Assembly with Realistic Lighting & Tilting */}
        <motion.div
          animate={
            isOpening
              ? { scale: [1, 1.06, 1.15], opacity: [1, 1, 0] }
              : {
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  y: [0, -6, 0]
                }
          }
          transition={
            isOpening
              ? { duration: 1.0, ease: 'easeInOut' }
              : { y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' } }
          }
          className="relative w-56 h-56 sm:w-68 sm:h-68 flex flex-col items-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Internal Divine Sunbeam (Emerges dynamically when unboxing) */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 2 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-400 blur-3xl z-40 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* 1. Realistic Velvet Box Lid with 3D Bevel & Gold Rim */}
          <motion.div
            animate={
              isOpening
                ? {
                    y: -140,
                    rotateX: -55,
                    rotateZ: 10,
                    opacity: 0.95
                  }
                : { y: 0, rotateX: 0 }
            }
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 w-60 sm:w-72 h-20 sm:h-24 rounded-2xl bg-gradient-to-b from-[#8a1427] via-[#6e0c1e] to-[#4e0714] border-2 border-amber-400/90 shadow-[0_16px_35px_rgba(0,0,0,0.7)] flex items-center justify-center -mb-4 overflow-visible"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(251, 191, 36, 0.25) 0%, transparent 60%)'
            }}
          >
            {/* Lid Silk Ribbon - Horizontal Golden Band */}
            <div className="absolute inset-y-0 w-9 sm:w-11 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] flex items-center justify-center">
              <div className="w-0.5 h-full bg-amber-600/40" />
            </div>

            {/* Dimensional Metallic Gold Ribbon Bow on Lid */}
            <div className="absolute -top-8 sm:-top-10 flex items-center justify-center z-40">
              {/* Left Bow Loop */}
              <div className="w-11 h-9 sm:w-14 sm:h-11 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-100 to-amber-300 border border-amber-500 shadow-[0_4px_12px_rgba(0,0,0,0.4)] -rotate-25 transform origin-right -mr-1" />
              
              {/* Center Bow Knot with Sacred ॐ */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-yellow-100 via-amber-300 to-amber-600 border border-amber-700 shadow-md z-50 flex items-center justify-center">
                <span className="text-[10px] sm:text-xs text-amber-950 font-black">ॐ</span>
              </div>
              
              {/* Right Bow Loop */}
              <div className="w-11 h-9 sm:w-14 sm:h-11 rounded-full bg-gradient-to-tl from-amber-400 via-yellow-100 to-amber-300 border border-amber-500 shadow-[0_4px_12px_rgba(0,0,0,0.4)] rotate-25 transform origin-left -ml-1" />

              {/* Flowing Ribbon Tails */}
              <div className="absolute top-5 -left-2 w-3.5 sm:w-4.5 h-10 sm:h-14 bg-gradient-to-b from-amber-300 to-amber-500 -rotate-20 rounded-b shadow-sm" />
              <div className="absolute top-5 -right-2 w-3.5 sm:w-4.5 h-10 sm:h-14 bg-gradient-to-b from-amber-300 to-amber-500 rotate-20 rounded-b shadow-sm" />
            </div>

            {/* Embossed Gold Filigree Perimeter */}
            <div className="absolute inset-1.5 rounded-xl border border-amber-400/40 pointer-events-none" />
          </motion.div>

          {/* 2. Realistic Velvet Box Base */}
          <div
            className="relative z-20 w-56 sm:w-68 h-38 sm:h-46 rounded-b-2xl bg-gradient-to-b from-[#6b0d1e] via-[#500815] to-[#36050e] border-2 border-t-0 border-amber-500/90 shadow-[0_24px_50px_rgba(0,0,0,0.85)] overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
            }}
          >
            {/* Vertical Golden Silk Ribbon Band */}
            <div className="absolute inset-y-0 w-9 sm:w-11 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
              <div className="w-0.5 h-full bg-amber-600/40 mx-auto" />
            </div>

            {/* Horizontal Golden Silk Ribbon Band */}
            <div className="absolute inset-x-0 h-9 sm:h-11 bg-gradient-to-b from-amber-300 via-yellow-100 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
              <div className="h-0.5 w-full bg-amber-600/40 my-auto" />
            </div>

            {/* Royal Gold Seal in Center */}
            <div className="relative z-30 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-300 via-yellow-50 to-amber-500 border-2 border-amber-600 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <span className="font-serif font-black text-xs sm:text-sm text-amber-950">
                दीवाली
              </span>
            </div>

            {/* Traditional Golden Corner Cornerpieces */}
            <div className="absolute bottom-2 left-2 text-amber-300/70 text-sm">✤</div>
            <div className="absolute bottom-2 right-2 text-amber-300/70 text-sm">✤</div>
          </div>

          {/* 3. Realistic Floor Contact Shadow */}
          <div className="w-52 sm:w-64 h-7 bg-black/70 rounded-full blur-md -mt-2 z-10 scale-y-50" />
        </motion.div>

        {/* Tap to Open CTA Button */}
        <div className="mt-5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(245,158,11,0.5)] flex items-center gap-2 group-hover:scale-105 transition-transform animate-bounce">
          <Sparkles className="h-4 w-4 text-slate-950" />
          <span>Tap Box to Unwrap Surprise</span>
        </div>
      </div>
    </div>
  );
};
