import React, { useEffect, useRef } from 'react';
import { CardThemeColor } from '../types';

interface AmbientCanvasProps {
  themeColor: CardThemeColor;
  isDark: boolean;
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ themeColor, isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color definitions per theme
    const colorMap: Record<CardThemeColor, { light: string; dark: string }> = {
      amber: { light: 'rgba(245, 158, 11, ', dark: 'rgba(251, 191, 36, ' },
      rose: { light: 'rgba(244, 63, 94, ', dark: 'rgba(251, 113, 133, ' },
      sage: { light: 'rgba(16, 185, 129, ', dark: 'rgba(52, 211, 153, ' },
      indigo: { light: 'rgba(99, 102, 241, ', dark: 'rgba(129, 140, 248, ' },
      violet: { light: 'rgba(139, 92, 246, ', dark: 'rgba(167, 139, 250, ' },
      emerald: { light: 'rgba(5, 150, 105, ', dark: 'rgba(52, 211, 153, ' }
    };

    const baseColor = isDark ? colorMap[themeColor].dark : colorMap[themeColor].light;

    // Lightweight drifting particles
    const particleCount = window.innerWidth < 768 ? 16 : 32;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      pulsingSpeed: Math.random() * 0.02 + 0.01,
      pulse: Math.random() * Math.PI
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulsingSpeed;

        // Wrap around borders
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = Math.max(0.05, p.opacity + Math.sin(p.pulse) * 0.15);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${baseColor}${currentOpacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
