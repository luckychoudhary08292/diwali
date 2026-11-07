import React, { useState } from 'react';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audioChime';

interface DiwaliNameGatewayProps {
  onProceed: (recipientName: string, senderName?: string) => void;
  initialRecipient?: string;
  initialSender?: string;
}

export const DiwaliNameGateway: React.FC<DiwaliNameGatewayProps> = ({
  onProceed,
  initialRecipient = '',
  initialSender = ''
}) => {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [sender, setSender] = useState(initialSender);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      setError('Please enter your name or the name of the person you want to wish.');
      return;
    }
    setError('');
    soundEngine.playCelebrationChime();
    onProceed(recipient.trim(), sender.trim() || undefined);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 text-center z-10">
      {/* Sacred Kalash with Om & Marigolds */}
      <div className="w-24 sm:w-32 md:w-36 mb-2 mx-auto drop-shadow-[0_10px_25px_rgba(245,158,11,0.5)] transition-transform hover:scale-105 animate-pulse duration-[5000ms]">
        <img
          src="/assets/aistudio/image-Photoroom_2d9f8e4c.png"
          alt="Sacred Diwali Kalash with Om and Marigolds"
          className="w-full h-auto"
        />
      </div>

      {/* Sacred Shlok / Festival Kicker */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3 backdrop-blur-md">
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
        <span className="tracking-widest uppercase">शुभ दीपावली · Festival of Lights</span>
      </div>

      {/* Grand Title */}
      <h1 className="font-diwali text-3xl sm:text-5xl lg:text-6xl font-black tracking-wide gold-gradient-text drop-shadow-[0_4px_24px_rgba(245,158,11,0.4)] leading-tight mb-3">
        A Sacred Diwali Gift
      </h1>

      <p className="max-w-md mx-auto text-sm sm:text-base text-amber-100/90 leading-relaxed mb-6 font-light">
        May the warmth of countless diyas bless your home. Please enter your name to unseal your personalized royal Diwali gift box.
      </p>

      {/* Name Input Box Card */}
      <div className="w-full max-w-md bg-slate-900/85 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden text-left">
        {/* Subtle decorative glowing corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label
              htmlFor="recipient-name-gateway"
              className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2"
            >
              Type Your Name
            </label>
            <input
              id="recipient-name-gateway"
              type="text"
              autoFocus
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                if (error) setError('');
              }}
              placeholder="Type your name..."
              maxLength={40}
              className={`w-full h-13 px-4 rounded-xl bg-slate-950/80 border text-base font-medium text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                error
                  ? 'border-rose-500'
                  : 'border-amber-500/30 focus:border-amber-400'
              }`}
            />
            {error && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">
                {error}
              </p>
            )}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full h-13 min-h-[48px] rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(245,158,11,0.35)] active:scale-[0.98] transition-all cursor-pointer mt-2"
          >
            <Gift className="h-5 w-5 text-slate-950" />
            <span>Open Diwali Gift Box</span>
            <ArrowRight className="h-4 w-4 text-slate-950" />
          </button>
        </form>
      </div>
    </div>
  );
};
