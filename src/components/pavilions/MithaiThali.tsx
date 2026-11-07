import React, { useState } from 'react';
import { Heart, Sparkles, Plus, Check, Share2, Copy } from 'lucide-react';
import { soundEngine } from '../../utils/audioChime';
import { copyToClipboard } from '../../utils/share';

interface Sweet {
  id: string;
  name: string;
  hindi: string;
  desc: string;
  emoji: string;
  badgeColor: string;
}

const SWEETS: Sweet[] = [
  {
    id: 'kaju-katli',
    name: 'Kaju Katli',
    hindi: 'काजू कतली',
    desc: 'Cashew diamond fudge coated in shimmering edible silver leaf.',
    emoji: '💎',
    badgeColor: 'bg-slate-200 text-slate-900'
  },
  {
    id: 'ladoo',
    name: 'Motichoor Ladoo',
    hindi: 'मोतीचूर लड्डू',
    desc: 'Golden saffron pearls molded into melt-in-mouth auspicious spheres.',
    emoji: '🟡',
    badgeColor: 'bg-amber-400 text-slate-950'
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    hindi: 'गुलाब जामुन',
    desc: 'Soft golden milk dumplings soaked in cardamom rose syrup.',
    emoji: '🟤',
    badgeColor: 'bg-amber-900 text-amber-100'
  },
  {
    id: 'jalebi',
    name: 'Crispy Jalebi',
    hindi: 'कुरकुरी जलेबी',
    desc: 'Deep golden spiral pretzels soaked in hot fragrant sugar elixir.',
    emoji: '🍥',
    badgeColor: 'bg-orange-500 text-white'
  },
  {
    id: 'pista-barfi',
    name: 'Pista Barfi',
    hindi: 'पिस्ता बर्फी',
    desc: 'Velvety milk fudge topped with roasted emerald pistachios.',
    emoji: '🟩',
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'rasgulla',
    name: 'Chenna Rasgulla',
    hindi: 'रसगुल्ला',
    desc: 'Light, spongy cottage cheese clouds in delicate clear syrup.',
    emoji: '⚪',
    badgeColor: 'bg-slate-100 text-slate-900'
  }
];

export const MithaiThali: React.FC<{ recipientName: string }> = ({ recipientName }) => {
  const [selectedSweets, setSelectedSweets] = useState<string[]>([
    'kaju-katli',
    'ladoo',
    'gulab-jamun'
  ]);
  const [copied, setCopied] = useState(false);

  const toggleSweet = (id: string) => {
    soundEngine.playSoftClick();
    setSelectedSweets((prev) => {
      if (prev.includes(id)) {
        return prev.filter((s) => s !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleShareThali = async () => {
    soundEngine.playCelebrationChime();
    const sweetNames = selectedSweets
      .map((id) => SWEETS.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `🥮 A Sweet Diwali Hamper for ${recipientName} 🥮\n\nI have assembled a virtual Diwali sweet thali for you with: ${sweetNames}!\n\nMay your year be as sweet and joyful as these festive delicacies! Happy Diwali! ✨`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-2">
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
          <Heart className="h-3.5 w-3.5 text-emerald-400" />
          <span>Traditional Mithai & Sweets Pavilion</span>
        </div>
        <h2 className="font-diwali text-2xl sm:text-4xl font-bold text-white tracking-wide">
          Assemble a Sweet Diwali Thali
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/80 mt-1 font-light">
          Choose festive Indian delicacies to pack in your virtual gift box for {recipientName}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Sweets Catalog */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SWEETS.map((sweet) => {
            const isSelected = selectedSweets.includes(sweet.id);
            return (
              <div
                key={sweet.id}
                onClick={() => toggleSweet(sweet.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-slate-900/90 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sweet.emoji}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white font-serif-display">
                        {sweet.name}
                      </h4>
                      <div className="text-[11px] text-amber-300 font-serif">
                        {sweet.hindi}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {sweet.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: The Assembled Royal Brass Thali Plate */}
        <div className="md:col-span-5 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
            Royal Brass Thali for {recipientName}
          </span>

          {/* Brass Plate Circle Representation */}
          <div className="w-56 h-56 rounded-full p-2 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 shadow-[0_10px_35px_rgba(245,158,11,0.3)] flex items-center justify-center my-3 relative">
            <div className="w-full h-full rounded-full bg-slate-950 border-4 border-amber-500/40 p-4 flex flex-wrap items-center justify-center gap-2.5 overflow-hidden">
              {selectedSweets.length === 0 ? (
                <span className="text-xs text-slate-500">Thali is empty. Tap sweets to add!</span>
              ) : (
                selectedSweets.map((id) => {
                  const s = SWEETS.find((item) => item.id === id);
                  return (
                    <div
                      key={id}
                      className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20"
                      title={s?.name}
                    >
                      <span className="text-2xl">{s?.emoji}</span>
                      <span className="text-[9px] font-bold text-amber-200 mt-0.5 max-w-[60px] truncate">
                        {s?.name.split(' ')[0]}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <p className="text-xs text-amber-200/80 mb-4">
            {selectedSweets.length} festive delicacies arranged with blessings.
          </p>

          <button
            onClick={handleShareThali}
            disabled={selectedSweets.length === 0}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Sweet Box Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Share Sweet Box Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
