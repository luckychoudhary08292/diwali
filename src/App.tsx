import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { DiwaliFireworksCanvas } from './components/DiwaliFireworksCanvas';
import { DiwaliDecorOverlay } from './components/DiwaliDecorOverlay';
import { DiwaliNameGateway } from './components/DiwaliNameGateway';
import { DiwaliGiftBoxStage } from './components/DiwaliGiftBoxStage';
import { DiwaliGrandWish } from './components/DiwaliGrandWish';
import { soundEngine } from './utils/audioChime';

type AppStage = 'gateway' | 'giftbox' | 'main';

export default function App() {
  const [stage, setStage] = useState<AppStage>('gateway');
  const [recipientName, setRecipientName] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [burstTrigger, setBurstTrigger] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(() => soundEngine.getMuted());

  // Check URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      const fromParam = params.get('from');

      if (toParam) {
        setRecipientName(toParam);
        if (fromParam) setSenderName(fromParam);
        // Direct recipient directly to the gift box so they can tap and unwrap their surprise!
        setStage('giftbox');
      }
    }
  }, []);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
    if (!next) {
      soundEngine.playCelebrationChime();
    }
  };

  const handleGatewayProceed = (recipient: string, sender?: string) => {
    setRecipientName(recipient);
    if (sender) setSenderName(sender);
    setStage('giftbox');
  };

  const handleGiftBoxOpened = () => {
    setStage('main');
    setBurstTrigger((prev) => prev + 1);
  };

  const handleResetToGateway = () => {
    soundEngine.playSoftClick();
    setStage('gateway');
  };

  return (
    <div className="relative min-h-screen bg-[#070b16] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* Background Diwali Sky image with scrim overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src="/src/assets/images/diwali_night_skyline_1794077361163.jpg"
          alt="Diwali Night Panorama"
          className="w-full h-full object-cover opacity-20 filter blur-[2px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060913]/90 via-[#070b16]/95 to-[#050711]" />
      </div>

      {/* Interactive Fireworks & Floating Marigold Petal Physics Canvas */}
      <DiwaliFireworksCanvas burstTrigger={burstTrigger} />

      {/* Decorative Hanging Marigold Lanterns and Sky Fireworks Overlay */}
      <DiwaliDecorOverlay />

      {/* Floating Discreet Audio Mute Button */}
      <button
        onClick={handleToggleMute}
        title={isMuted ? 'Turn festive sound on' : 'Mute sound'}
        className="fixed top-3 right-3 z-50 flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-amber-500/30 bg-slate-950/80 backdrop-blur-md text-amber-300 hover:bg-slate-900 transition-colors shadow-lg"
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {/* Floating Discreet New Wish / Back Button */}
      {stage !== 'gateway' && (
        <button
          onClick={handleResetToGateway}
          title="Create another wish"
          className="fixed top-3 left-3 z-50 flex h-9 px-3 min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-slate-950/80 backdrop-blur-md text-amber-300 hover:bg-slate-900 transition-colors shadow-lg text-xs font-semibold cursor-pointer"
          aria-label="Create another wish"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New Wish</span>
        </button>
      )}

      {/* Main Interactive Stage Container */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-4 py-6 sm:py-10 max-w-6xl mx-auto w-full">
        {stage === 'gateway' && (
          <DiwaliNameGateway
            onProceed={handleGatewayProceed}
            initialRecipient={recipientName}
            initialSender={senderName}
          />
        )}

        {stage === 'giftbox' && (
          <DiwaliGiftBoxStage
            recipientName={recipientName || 'Beloved Friend'}
            senderName={senderName}
            onOpenGift={handleGiftBoxOpened}
            onEditName={() => setStage('gateway')}
          />
        )}

        {stage === 'main' && (
          <DiwaliGrandWish
            recipientName={recipientName || 'Beloved Friend'}
            senderName={senderName}
            onReset={handleResetToGateway}
            onTriggerBurst={() => setBurstTrigger((p) => p + 1)}
          />
        )}
      </main>
    </div>
  );
}
