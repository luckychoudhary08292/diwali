import React from 'react';

/**
 * Clean, atmospheric Diwali framing overlay:
 * 1. Warm ambient fairy lights garland draped across the top ceiling.
 * 2. Grounded glowing corner diyas with marigolds at bottom-left & bottom-right.
 * Styled with pointer-events-none so it never blocks or overlaps interactive cards.
 */
export const DiwaliDecorOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Top Ceiling Fairy Lights Garland */}
      <div className="absolute top-0 left-0 right-0 w-full opacity-45 select-none pointer-events-none z-10">
        <img
          src="/assets/aistudio/fda32b558bd029a43bd611df2a45750e_50f94e6c.png"
          alt="Ceiling Festive Lights"
          className="w-full h-auto object-cover max-h-16 sm:max-h-24 filter drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]"
        />
      </div>

      {/* Bottom Left Corner Tiered Diya Garland */}
      <div className="absolute bottom-0 left-0 w-28 sm:w-44 md:w-56 opacity-85 select-none pointer-events-none transition-all duration-700 filter drop-shadow-[0_4px_20px_rgba(245,158,11,0.5)]">
        <img
          src="/assets/aistudio/c91d44d09df518f5ecc7d0efd931ce6a_34691e80.png"
          alt="Corner Diya Arrangement Left"
          className="w-full h-auto flame-animation"
        />
      </div>

      {/* Bottom Right Corner Tiered Diya Garland (Mirrored) */}
      <div className="absolute bottom-0 right-0 w-28 sm:w-44 md:w-56 opacity-85 select-none pointer-events-none transition-all duration-700 filter drop-shadow-[0_4px_20px_rgba(245,158,11,0.5)]">
        <img
          src="/assets/aistudio/c91d44d09df518f5ecc7d0efd931ce6a_34691e80.png"
          alt="Corner Diya Arrangement Right"
          className="w-full h-auto -scale-x-100 flame-animation"
        />
      </div>
    </div>
  );
};
