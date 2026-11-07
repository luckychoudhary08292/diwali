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
      setError('Please type your name to unseal the gift.');
      return;
    }
    setError('');
    soundEngine.playCelebrationChime();
    onProceed(recipient.trim(), sender.trim() || undefined);
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-6 text-center z-10 max-w-xl mx-auto">
      {/* Auspicious Sacred Kalash with Om & Marigolds */}
      <div className="w-24 sm:w-28 md:w-32 mb-2 mx-auto drop-shadow-[0_12px_28px_rgba(245,158,11,0.55)] transition-transform hover:scale-105 duration-500">
        <img
          src="/assets/aistudio/image-Photoroom_2d9f8e4c.png"
          alt="Auspicious Diwali Kalash with Om"
          className="w-full h-auto select-none"
        />
      </div>

      {/* Elegant Calligraphic "HAPPY Diwali" Logo */}
      <div className="w-48 sm:w-56 md:w-64 mb-1 mx-auto select-none pointer-events-none">
        <img
          src="/assets/aistudio/8c163eb190f018d5a43d6b9d7c757ca5_ccc933dd.png"
          alt="Happy Diwali Cursive Calligraphy Logo"
          className="w-full h-auto filter brightness-0 invert sepia hue-rotate-[5deg] saturate-5 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]"
        />
      </div>

      {/* Subtitle Greeting */}
      <p className="text-xs sm:text-sm text-amber-100/90 max-w-md mx-auto mb-6 font-light leading-relaxed">
        Step into the festival of lights. Enter your name to receive your handcrafted 3D royal Diwali gift box and auspicious blessings.
      </p>

      {/* Input Card Container */}
      <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden text-left">
        {/* Soft background aura glows */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label
              htmlFor="recipient-name-input"
              className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5"
            >
              Type Your Name *
            </label>
            <input
              id="recipient-name-input"
              type="text"
              autoFocus
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Aarav, Priya, Sharma Family..."
              maxLength={40}
              className={`w-full h-12 px-4 rounded-xl bg-slate-950/80 border text-base font-medium text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all ${
                error
                  ? 'border-rose-500'
                  : 'border-amber-500/30 focus:border-amber-400'
              }`}
            />
            {error && (
              <p className="mt-1 text-xs text-rose-400 font-medium">
                {error}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sender-name-input"
              className="block text-xs font-semibold tracking-wider text-slate-300 mb-1.5 flex items-center justify-between"
            >
              <span>From (Optional)</span>
              <span className="text-[11px] text-slate-400 font-normal">Add sender name</span>
            </label>
            <input
              id="sender-name-input"
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="e.g., Your Bestie, Rohan..."
              maxLength={40}
              className="w-full h-11 px-4 rounded-xl bg-slate-950/60 border border-slate-700/60 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
            />
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full h-13 min-h-[48px] rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(245,158,11,0.35)] active:scale-[0.98] transition-all cursor-pointer pt-0.5 mt-2"
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
