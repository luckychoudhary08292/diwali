import React from 'react';
import { Smile, Gift, Heart, Zap, MessageCircleHeart, Award } from 'lucide-react';
import { OccasionType } from '../types';
import { soundEngine } from '../utils/audioChime';

interface OccasionsGuideProps {
  onSelectOccasion: (occ: OccasionType) => void;
}

const GUIDE_ITEMS: {
  id: OccasionType;
  title: string;
  icon: React.FC<{ className?: string }>;
  headline: string;
  description: string;
  sampleName: string;
}[] = [
  {
    id: 'everyday',
    title: 'Everyday Sunshine',
    icon: Smile,
    headline: 'Brighten Any Regular Day',
    description: 'Thoughtful notes to remind family, friends, or coworkers that they are appreciated and valued.',
    sampleName: 'Hannah'
  },
  {
    id: 'birthday',
    title: 'Birthday Celebrations',
    icon: Gift,
    headline: 'Honor Another Year of Life',
    description: 'Joyful celebrations ranging from lighthearted fun and cake jokes to deeply affectionate tributes.',
    sampleName: 'Lucas'
  },
  {
    id: 'gratitude',
    title: 'Heartfelt Gratitude',
    icon: Heart,
    headline: 'Say Thank You Sincerely',
    description: 'Express sincere thanks for help received, mentorship, steadfast hospitality, or unconditional love.',
    sampleName: 'Elena'
  },
  {
    id: 'encouragement',
    title: 'Courage & Strength',
    icon: Zap,
    headline: 'Uplift Through Challenges',
    description: 'Support through job interviews, university exams, major life pivots, or demanding seasons.',
    sampleName: 'Marcus'
  },
  {
    id: 'healing',
    title: 'Rest & Healing',
    icon: MessageCircleHeart,
    headline: 'Gentle Comfort & Care',
    description: 'Quiet, soothing get-well messages, peaceful recovery wishes, and warm thoughts for times of illness.',
    sampleName: 'Clara'
  },
  {
    id: 'milestone',
    title: 'Milestones & Triumphs',
    icon: Award,
    headline: 'Cheer Significant Successes',
    description: 'Commemorate graduations, new homes, promotions, business milestones, and artistic breakthroughs.',
    sampleName: 'Julian'
  }
];

export const OccasionsGuide: React.FC<OccasionsGuideProps> = ({ onSelectOccasion }) => {
  return (
    <section id="occasions-guide" className="w-full max-w-6xl mt-16 scroll-mt-20">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-serif-display">
          Wishes for Every Human Chapter
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Pick any occasion below to quickly launch a tailor-made wishing experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {GUIDE_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 dark:border-slate-800/80 dark:bg-slate-900 transition-all hover:border-amber-400/80 dark:hover:border-amber-500/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      {item.headline}
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  e.g. For {item.sampleName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSoftClick();
                    onSelectOccasion(item.id);
                  }}
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
                >
                  Create this wish →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
