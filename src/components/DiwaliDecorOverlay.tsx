import React from 'react';
import { soundEngine } from '../utils/audioChime';

export const DiwaliDecorOverlay: React.FC = () => {
  const handleLanternClick = () => {
    soundEngine.playDiyaLight();
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* 1. Fairy Lights Strings across the top ceiling */}
      <div className="absolute top-0 left-0 right-0 w-full opacity-60 dark:opacity-75 select-none pointer-events-none">
        <img
          src="/assets/aistudio/fda32b558bd029a43bd611df2a45750e_50f94e6c.png"
          alt="Hanging Fairy Lights Strings"
          className="w-full h-auto object-cover max-h-24 sm:max-h-36 filter drop-shadow-[0_4px_12px_rgba(251,191,36,0.5)]"
        />
      </div>

      {/* 2. Multiple Hanging Golden Lanterns in Background Center-Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 md:w-[480px] opacity-35 dark:opacity-40 mix-blend-screen pointer-events-none select-none">
        <img
          src="/assets/aistudio/5c5897b361e0127b26854b44e7207d03-Photoroom_c9540979.png"
          alt="Golden Hanging Lanterns on Chains"
          className="w-full h-auto drop-shadow-[0_10px_25px_rgba(245,158,11,0.4)]"
        />
      </div>

      {/* 3. Top Left Hanging Brass & Marigold Lantern */}
      <div
        onClick={handleLanternClick}
        className="pointer-events-auto cursor-pointer absolute -top-2 left-1 sm:left-4 md:left-8 w-20 sm:w-32 md:w-44 lg:w-48 lantern-sway-left transition-transform hover:scale-105 select-none"
        title="Tap to ring temple bell"
      >
        <img
          src="/assets/aistudio/download__15_-removebg-preview_670e789f.png"
          alt="Traditional Diwali Hanging Lantern with Marigolds and Bells"
          className="w-full h-auto drop-shadow-[0_15px_30px_rgba(245,158,11,0.5)]"
        />
      </div>

      {/* 4. Top Right Hanging Brass & Marigold Lantern (Mirrored) */}
      <div
        onClick={handleLanternClick}
        className="pointer-events-auto cursor-pointer absolute -top-2 right-1 sm:right-4 md:right-8 w-20 sm:w-32 md:w-44 lg:w-48 lantern-sway-right transition-transform hover:scale-105 select-none"
        title="Tap to ring temple bell"
      >
        <img
          src="/assets/aistudio/download__15_-removebg-preview_670e789f.png"
          alt="Traditional Diwali Hanging Lantern with Marigolds and Bells"
          className="w-full h-auto drop-shadow-[0_15px_30px_rgba(245,158,11,0.5)]"
        />
      </div>

      {/* 5. Bottom-Left Corner Tiered Diyas with Floral Arrangement */}
      <div
        onClick={handleLanternClick}
        className="pointer-events-auto cursor-pointer absolute -bottom-3 -left-3 sm:bottom-0 sm:left-0 w-28 sm:w-44 md:w-56 select-none opacity-85 hover:opacity-100 transition-transform hover:scale-105"
        title="Sacred tiered diyas"
      >
        <img
          src="/assets/aistudio/c91d44d09df518f5ecc7d0efd931ce6a_34691e80.png"
          alt="Tiered Diya Flower Arrangement"
          className="w-full h-auto drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
        />
      </div>

      {/* 6. Subtle Ambient Firework Bursts in Left & Right Skies */}
      <div className="absolute top-1/4 -left-12 sm:left-6 w-44 sm:w-64 opacity-25 dark:opacity-35 mix-blend-screen pointer-events-none select-none">
        <img
          src="/assets/aistudio/82c3485fbe6920add88b50f97eb8c82a-Photoroom_e2ccc1c2.png"
          alt="Pastel Fireworks"
          className="w-full h-auto animate-pulse duration-[8000ms]"
        />
      </div>

      <div className="absolute top-1/3 -right-12 sm:right-6 w-44 sm:w-64 opacity-25 dark:opacity-35 mix-blend-screen pointer-events-none select-none">
        <img
          src="/assets/aistudio/acac7452624f9a7017f2591b04a97bab_8b6ac20a.png"
          alt="Golden Fireworks"
          className="w-full h-auto animate-pulse duration-[7000ms]"
        />
      </div>
    </div>
  );
};

