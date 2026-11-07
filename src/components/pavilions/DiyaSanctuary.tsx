import React, { useState } from 'react';
import { Flame, Sparkles, Check, RotateCcw } from 'lucide-react';
import { soundEngine } from '../../utils/audioChime';

interface DiyaData {
  id: string;
  name: string;
  sanskrit: string;
  blessing: string;
  color: string;
}

const DIYAS: DiyaData[] = [
  {
    id: 'wealth',
    name: 'Lakshmi Diya',
    sanskrit: 'ॐ महालक्ष्म्यै नमः',
    blessing: 'May abundance of pure wealth, ethical prosperity, and generosity fill your treasury.',
    color: '#f59e0b'
  },
  {
    id: 'health',
    name: 'Arogya Diya',
    sanskrit: 'सर्वे सन्तु निरामयाः',
    blessing: 'May robust physical vitality, mental clarity, and youthful longevity protect you and your kin.',
    color: '#10b981'
  },
  {
    id: 'wisdom',
    name: 'Saraswati Diya',
    sanskrit: 'सरस्वति नमस्तुभ्यं',
    blessing: 'May illuminated insight, sharp creativity, and truthful speech guide all your endeavors.',
    color: '#38bdf8'
  },
  {
    id: 'peace',
    name: 'Shanti Diya',
    sanskrit: 'ॐ शान्तिः शान्तिः शान्तिः',
    blessing: 'May serenity descend upon your household, calming every worry into quiet composure.',
    color: '#c084fc'
  },
  {
    id: 'joy',
    name: 'Ananda Diya',
    sanskrit: 'आनन्दो ब्रह्मेति व्यजानात्',
    blessing: 'May unrestrained laughter, sweet reunions, and sincere cheer grace every day of your year.',
    color: '#f43f5e'
  },
  {
    id: 'victory',
    name: 'Vijaya Diya',
    sanskrit: 'सत्यमेव जयते',
    blessing: 'May you overcome every obstacle and emerge victorious in your noble life ambitions.',
    color: '#fbbf24'
  }
];

export const DiyaSanctuary: React.FC = () => {
  const [litDiyas, setLitDiyas] = useState<Record<string, boolean>>({
    wealth: true // start with 1 lit as warm invitation
  });

  const toggleDiya = (id: string) => {
    const isNowLit = !litDiyas[id];
    if (isNowLit) {
      soundEngine.playDiyaLight();
    } else {
      soundEngine.playSoftClick();
    }
    setLitDiyas((prev) => ({ ...prev, [id]: isNowLit }));
  };

  const lightAll = () => {
    soundEngine.playCelebrationChime();
    const allLit: Record<string, boolean> = {};
    DIYAS.forEach((d) => (allLit[d.id] = true));
    setLitDiyas(allLit);
  };

  const resetAll = () => {
    soundEngine.playSoftClick();
    setLitDiyas({});
  };

  const litCount = Object.values(litDiyas).filter(Boolean).length;
  const isAllLit = litCount === DIYAS.length;

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-2">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
          <Flame className="h-3.5 w-3.5 text-amber-400" />
          <span>The Diya Lighting Courtyard</span>
        </div>
        <h2 className="font-diwali text-2xl sm:text-4xl font-bold text-white tracking-wide">
          Light Sacred Ceremonial Diyas
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/80 mt-2 font-light">
          Tap each clay lamp to kindle its sacred flame and reveal its ancient blessing for the festival.
        </p>

        {/* Progress & Quick Action */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-xs font-medium text-amber-300">
            {litCount} of {DIYAS.length} Diyas Kindled
          </span>
          <span className="text-slate-600">·</span>
          <button
            onClick={isAllLit ? resetAll : lightAll}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4"
          >
            {isAllLit ? 'Extinguish All' : 'Kindle All Lamps ✨'}
          </button>
        </div>
      </div>

      {/* Featured Traditional Brass & Ornate Diya Visual */}
      <div className="mb-8 rounded-3xl overflow-hidden border border-amber-500/30 relative max-w-2xl mx-auto aspect-16/9 sm:aspect-21/9 shadow-2xl">
        <img
          src="/assets/aistudio/Ornate_Oil_Lamp_with_a_Lit_Flame__Diwali_Celebration_bad0c54d.jpg"
          alt="Ornate Oil Lamp with Lit Flame"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              The Flame of Devotion
            </span>
            <p className="text-xs sm:text-sm text-amber-100 font-light mt-0.5">
              "As one sacred flame dispels the deep darkness of the night, so does divine inner goodness banish ignorance."
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Diyas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIYAS.map((diya) => {
          const isLit = !!litDiyas[diya.id];
          return (
            <div
              key={diya.id}
              onClick={() => toggleDiya(diya.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden select-none flex flex-col justify-between ${
                isLit
                  ? 'bg-slate-900/90 border-amber-400/80 shadow-[0_10px_30px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-80'
              }`}
            >
              {/* Flame Visual Centerpiece */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all ${
                      isLit
                        ? 'bg-amber-500/20 text-amber-400 shadow-inner'
                        : 'bg-slate-800/80 text-slate-500'
                    }`}
                  >
                    <Flame
                      className={`h-7 w-7 transition-all ${
                        isLit
                          ? 'flame-animation text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-serif-display">
                      {diya.name}
                    </h3>
                    <div className="text-[11px] text-amber-300/80 font-serif">
                      {diya.sanskrit}
                    </div>
                  </div>
                </div>

                <div
                  className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                    isLit
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isLit ? 'Lit 🪔' : 'Tap to light'}
                </div>
              </div>

              {/* Blessing Content */}
              <p className="text-xs text-amber-100/90 leading-relaxed font-light mt-1">
                {diya.blessing}
              </p>

              {/* Status footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{isLit ? 'Flame Burning Warmly' : 'Awaiting Your Touch'}</span>
                <span className="text-amber-400 font-semibold text-xs">
                  {isLit ? '✨ Kindled' : 'Tap to Ignite'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
