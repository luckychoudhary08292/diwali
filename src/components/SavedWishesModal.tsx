import React from 'react';
import { X, Trash2, ArrowUpRight, Copy, Check, Bookmark } from 'lucide-react';
import { GeneratedWish } from '../types';
import { copyToClipboard } from '../utils/share';
import { soundEngine } from '../utils/audioChime';

interface SavedWishesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedWishes: GeneratedWish[];
  onSelectWish: (wish: GeneratedWish) => void;
  onDeleteWish: (id: string) => void;
  onClearAll: () => void;
}

export const SavedWishesModal: React.FC<SavedWishesModalProps> = ({
  isOpen,
  onClose,
  savedWishes,
  onSelectWish,
  onDeleteWish,
  onClearAll
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = async (wish: GeneratedWish) => {
    soundEngine.playSoftClick();
    const text = `${wish.headline}\n\n${wish.greetingMessage}\n\n"${wish.closingAffirmation}"\n\n— ${wish.signOff}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(wish.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-5 sm:p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-amber-500" />
            <h3 id="saved-modal-title" className="text-sm font-bold text-slate-900 dark:text-white">
              Saved Wishes ({savedWishes.length})
            </h3>
          </div>
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onClose();
            }}
            className="h-8 w-8 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
          {savedWishes.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You haven’t saved any wishes yet.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Click the bookmark icon on any wish card to save it here for later.
              </p>
            </div>
          ) : (
            savedWishes.map((wish) => (
              <div
                key={wish.id}
                className="group p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-800/40 transition-all flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      To {wish.recipientName}
                      {wish.senderName ? ` (from ${wish.senderName})` : ''}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                      {wish.occasion} · {wish.tone}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(wish)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                      title="Copy message"
                      aria-label="Copy message"
                    >
                      {copiedId === wish.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        soundEngine.playSoftClick();
                        onDeleteWish(wish.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                      title="Delete wish"
                      aria-label="Delete wish"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                  "{wish.headline}"
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    {new Date(wish.timestamp).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playCelebrationChime();
                      onSelectWish(wish);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                  >
                    <span>View Card</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedWishes.length > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all saved wishes?')) {
                  onClearAll();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
