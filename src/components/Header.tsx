import React from 'react';
import { Sparkles, Moon, Sun, Volume2, VolumeX, Bookmark } from 'lucide-react';
import { soundEngine } from '../utils/audioChime';

interface HeaderProps {
  isDark: boolean;
  toggleDark: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  toggleDark,
  isMuted,
  toggleMute,
  onOpenSaved,
  savedCount,
  onScrollToForm
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80 transition-colors duration-200">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left font-semibold tracking-tight text-slate-900 transition-colors hover:text-amber-600 dark:text-slate-100 dark:hover:text-amber-400 whitespace-nowrap shrink-0"
          >
            AuraWish
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={onScrollToForm}
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            Create Wish
          </button>
          <a
            href="#occasions-guide"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            Occasions
          </a>
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Saved Wishes</span>
            {savedCount > 0 && (
              <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
                ({savedCount})
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Functional Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sound toggle button */}
          <button
            onClick={() => {
              toggleMute();
              if (isMuted) {
                setTimeout(() => soundEngine.playCelebrationChime(), 50);
              }
            }}
            title={isMuted ? 'Unmute chimes' : 'Mute chimes'}
            className="flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              toggleDark();
            }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Saved wishes drawer trigger (mobile visible) */}
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onOpenSaved();
            }}
            className="flex md:hidden h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="View saved wishes"
          >
            <Bookmark className="h-4 w-4" />
            {savedCount > 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onScrollToForm();
            }}
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-slate-950 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            Start Wishing
          </button>
        </div>
      </div>
    </header>
  );
};
