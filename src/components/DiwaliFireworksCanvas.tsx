import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  sparkle?: boolean;
}

interface FloatingPetal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  alpha: number;
}

interface FireworkDecal {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  alpha: number;
  imgIndex: number;
  rotation: number;
}

interface DiwaliFireworksCanvasProps {
  burstTrigger?: number;
}

export const DiwaliFireworksCanvas: React.FC<DiwaliFireworksCanvasProps> = ({ burstTrigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const petalsRef = useRef<FloatingPetal[]>([]);
  const decalsRef = useRef<FireworkDecal[]>([]);
  const crackerImagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload user's cracker PNGs
    const img1 = new Image();
    img1.src = '/assets/aistudio/82c3485fbe6920add88b50f97eb8c82a-Photoroom_e2ccc1c2.png';
    const img2 = new Image();
    img2.src = '/assets/aistudio/acac7452624f9a7017f2591b04a97bab_8b6ac20a.png';
    crackerImagesRef.current = [img1, img2];
  }, []);

  const FIREWORK_COLORS = [
    '#facc15', // Gold
    '#f59e0b', // Amber
    '#fbbf24', // Warm Yellow
    '#f43f5e', // Rose / Sindoor
    '#10b981', // Emerald
    '#38bdf8', // Peacock Sky
    '#c084fc', // Lotus Violet
    '#ffffff'  // Starlight White
  ];

  const PETAL_COLORS = [
    'rgba(245, 158, 11, ', // Golden Marigold
    'rgba(234, 88, 12, ',  // Deep Orange
    'rgba(244, 63, 94, ',  // Red Rose
    'rgba(251, 191, 36, '  // Yellow Genda
  ];

  const addBurst = (centerX: number, centerY: number, count: number = 65) => {
    const baseColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    const secondaryColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

    // Add cracker decal image burst
    if (crackerImagesRef.current.length > 0) {
      decalsRef.current.push({
        x: centerX,
        y: centerY,
        size: 30,
        maxSize: Math.random() * 120 + 160,
        alpha: 0.9,
        imgIndex: Math.floor(Math.random() * crackerImagesRef.current.length),
        rotation: (Math.random() - 0.5) * 0.8
      });
    }

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 5 + 2;
      particlesRef.current.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.4 ? baseColor : secondaryColor,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.012,
        size: Math.random() * 3 + 1.5,
        sparkle: Math.random() > 0.5
      });
    }
  };

  useEffect(() => {
    if (burstTrigger && burstTrigger > 0) {
      if (typeof window !== 'undefined') {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Multi-burst celebration
        addBurst(w * 0.5, h * 0.35, 90);
        setTimeout(() => addBurst(w * 0.25, h * 0.25, 75), 180);
        setTimeout(() => addBurst(w * 0.75, h * 0.28, 75), 360);
      }
    }
  }, [burstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize gentle floating marigold petals
    const petalCount = width < 768 ? 16 : 28;
    petalsRef.current = Array.from({ length: petalCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * 0.7 + 0.3,
      size: Math.random() * 6 + 5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      alpha: Math.random() * 0.5 + 0.35
    }));

    const handleCanvasClick = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      addBurst(clientX, clientY, 55);
    };

    window.addEventListener('click', handleCanvasClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update floating petals
      petalsRef.current.forEach((petal) => {
        petal.y += petal.vy;
        petal.x += petal.vx + Math.sin(petal.y * 0.01) * 0.3;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);

        // Draw organic petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${petal.color}${petal.alpha})`;
        ctx.fill();
        ctx.restore();
      });

      // Render & update firework particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.98; // air drag
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.sparkle ? 12 : 6;
        ctx.fill();
        ctx.restore();
      }

      // Render & update firework image decals
      for (let i = decalsRef.current.length - 1; i >= 0; i--) {
        const d = decalsRef.current[i];
        d.size += (d.maxSize - d.size) * 0.12;
        d.alpha -= 0.022;

        if (d.alpha <= 0) {
          decalsRef.current.splice(i, 1);
          continue;
        }

        const img = crackerImagesRef.current[d.imgIndex];
        if (img && img.complete) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, d.alpha);
          ctx.translate(d.x, d.y);
          ctx.rotate(d.rotation);
          ctx.drawImage(img, -d.size / 2, -d.size / 2, d.size, d.size);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden="true"
    />
  );
};
