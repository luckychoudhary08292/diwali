import React from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { soundEngine } from '../utils/audioChime';

interface ReceivedWishBannerProps {
  recipientName: string;
  senderName?: string;
  onSendWishBack: () => void;
  onDismiss: () => void;
}

export const ReceivedWishBanner: React.FC<ReceivedWishBannerProps> = ({
  recipientName,
  senderName,
  onSendWishBack,
  onDismiss
}) => {
  return (
    <div className="w-full max-w-2xl mb-6 rounded-2xl border border-amber-300 bg-amber-50/80 p-4 shadow-sm dark:border-amber-800/80 dark:bg-amber-950/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Special Delivery for {recipientName}
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
              {senderName
                ? `${senderName} created this personalized greeting especially for you!`
                : 'Someone sent you this personalized greeting!'}
            </p>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md"
          title="Dismiss"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-amber-200/60 dark:border-amber-900/60 flex items-center justify-end">
        <button
          onClick={() => {
            soundEngine.playCelebrationChime();
            onSendWishBack();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 hover:underline"
        >
          <span>Send a warm wish back</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
