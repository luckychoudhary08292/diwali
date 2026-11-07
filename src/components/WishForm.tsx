import React, { useState } from 'react';
import { Sparkles, Heart, Gift, MessageCircleHeart, ShieldAlert, Zap, Award, Smile, Feather, Compass, CompassIcon } from 'lucide-react';
import { OccasionType, ToneType, WishRequest } from '../types';
import { soundEngine } from '../utils/audioChime';

interface WishFormProps {
  onSubmit: (req: WishRequest) => void;
  isLoading: boolean;
  initialValues?: Partial<WishRequest>;
}

const OCCASIONS: { id: OccasionType; label: string; icon: React.FC<{ className?: string }>; description: string }[] = [
  {
    id: 'everyday',
    label: 'Everyday Sunshine',
    icon: Smile,
    description: 'Brighten their morning or day'
  },
  {
    id: 'birthday',
    label: 'Birthday Joy',
    icon: Gift,
    description: 'Celebrate another blessed year'
  },
  {
    id: 'gratitude',
    label: 'Heartfelt Thanks',
    icon: Heart,
    description: 'Express sincere appreciation'
  },
  {
    id: 'encouragement',
    label: 'Courage & Hope',
    icon: Zap,
    description: 'Uplift during trials or big tests'
  },
  {
    id: 'healing',
    label: 'Rest & Healing',
    icon: MessageCircleHeart,
    description: 'Comfort, get-well & calm wishes'
  },
  {
    id: 'milestone',
    label: 'Milestone & Pride',
    icon: Award,
    description: 'Graduations, promotions, triumphs'
  }
];

const TONES: { id: ToneType; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
  { id: 'warm', label: 'Warm & Tender', icon: Heart, desc: 'Deeply caring & affectionate' },
  { id: 'playful', label: 'Playful & Bright', icon: Smile, desc: 'High energy, smiles & cheer' },
  { id: 'poetic', label: 'Poetic & Lyrical', icon: Feather, desc: 'Quiet, reflective & timeless' },
  { id: 'inspiring', label: 'Inspiring & Bold', icon: Compass, desc: 'Motivating & empowering' }
];

const PRESETS = [
  { label: 'Morning Smile', name: 'Sophie', occasion: 'everyday' as OccasionType, tone: 'warm' as ToneType, note: 'warm matcha & fresh air' },
  { label: 'Bestie Birthday', name: 'Jordan', occasion: 'birthday' as OccasionType, tone: 'playful' as ToneType, note: 'triple chocolate cake' },
  { label: 'Big Exam / Job Interview', name: 'Alex', occasion: 'encouragement' as OccasionType, tone: 'inspiring' as ToneType, note: 'dream career move' },
  { label: 'Tender Thank You', name: 'Dr. Evelyn', occasion: 'gratitude' as OccasionType, tone: 'warm' as ToneType, note: 'unwavering patience' },
  { label: 'Speedy Recovery', name: 'Grandma Rose', occasion: 'healing' as OccasionType, tone: 'warm' as ToneType, note: 'warm chamomile tea' }
];

export const WishForm: React.FC<WishFormProps> = ({ onSubmit, isLoading, initialValues }) => {
  const [recipientName, setRecipientName] = useState(initialValues?.recipientName || '');
  const [senderName, setSenderName] = useState(initialValues?.senderName || '');
  const [occasion, setOccasion] = useState<OccasionType>(initialValues?.occasion || 'everyday');
  const [tone, setTone] = useState<ToneType>(initialValues?.tone || 'warm');
  const [customNote, setCustomNote] = useState(initialValues?.customNote || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setError('Please enter the name of the person you want to wish.');
      return;
    }
    setError('');
    soundEngine.playCelebrationChime();
    onSubmit({
      recipientName: recipientName.trim(),
      senderName: senderName.trim() || undefined,
      occasion,
      tone,
      customNote: customNote.trim() || undefined
    });
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    soundEngine.playSoftClick();
    setRecipientName(preset.name);
    setOccasion(preset.occasion);
    setTone(preset.tone);
    setCustomNote(preset.note);
    setError('');
  };

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 transition-colors">
      {/* Quick Inspirations bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Quick 1-Tap Inspirations:
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">
            Click any idea to auto-fill
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p)}
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-all active:scale-95"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Names Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="recipient-input"
              className="block text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2"
            >
              Who is this wish for? <span className="text-amber-500">*</span>
            </label>
            <input
              id="recipient-input"
              type="text"
              value={recipientName}
              onChange={(e) => {
                setRecipientName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Maya, David, Mom, Liam"
              maxLength={40}
              className={`w-full h-12 px-4 rounded-xl border text-sm font-medium transition-all bg-slate-50/50 dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                error
                  ? 'border-rose-400 dark:border-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:border-amber-500 dark:focus:border-amber-400'
              }`}
            />
            {error && (
              <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                {error}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sender-input"
              className="block text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2"
            >
              From who? <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="sender-input"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. You, Alex, An Old Friend"
              maxLength={40}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/60 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 dark:focus:border-amber-400 transition-all"
            />
          </div>
        </div>

        {/* Occasion Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2.5">
            Select the Occasion
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {OCCASIONS.map((occ) => {
              const isSelected = occasion === occ.id;
              const IconComp = occ.icon;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playSoftClick();
                    setOccasion(occ.id);
                  }}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all min-h-[48px] ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 text-slate-900 dark:border-amber-400 dark:bg-amber-950/30 dark:text-white ring-1 ring-amber-500 dark:ring-amber-400'
                      : 'border-slate-200 bg-slate-50/40 text-slate-700 hover:bg-slate-100/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div
                    className={`mt-0.5 p-1 rounded-md shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950'
                        : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    <IconComp className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate">{occ.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {occ.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2.5">
            Choose the Tone of the Wish
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TONES.map((t) => {
              const isSelected = tone === t.id;
              const IconComp = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playSoftClick();
                    setTone(t.id);
                  }}
                  className={`flex flex-col p-3 rounded-xl border text-left transition-all min-h-[48px] ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 dark:border-amber-400 dark:bg-amber-950/30 ring-1 ring-amber-500 dark:ring-amber-400'
                      : 'border-slate-200 bg-slate-50/40 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <IconComp
                      className={`h-3.5 w-3.5 ${
                        isSelected
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {t.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {t.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Custom Keyword or Detail */}
        <div>
          <label
            htmlFor="custom-note"
            className="block text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2"
          >
            Personal Touch / Detail <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="custom-note"
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="e.g. coffee lover, new puppy, photography, marathon training"
            maxLength={60}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/60 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 dark:focus:border-amber-400 transition-all"
          />
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            Mention a hobby, inside joke, or milestone to subtly weave into the wish.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 min-h-[48px] rounded-xl bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate Personalized Wish</span>
          </button>
        </div>
      </form>
    </div>
  );
};
