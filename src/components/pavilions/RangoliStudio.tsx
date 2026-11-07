import React, { useRef, useState, useEffect } from 'react';
import { Palette, Trash2, Download, Sparkles, RefreshCw } from 'lucide-react';
import { soundEngine } from '../../utils/audioChime';

const RANGOLI_COLORS = [
  { name: 'Haldi Gold', hex: '#facc15' },
  { name: 'Sindoor Red', hex: '#ef4444' },
  { name: 'Peacock Teal', hex: '#06b6d4' },
  { name: 'Marigold Orange', hex: '#f97316' },
  { name: 'Lotus Pink', hex: '#ec4899' },
  { name: 'Rice White', hex: '#ffffff' },
  { name: 'Emerald Green', hex: '#10b981' }
];

export const RangoliStudio: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeColor, setActiveColor] = useState(RANGOLI_COLORS[0].hex);
  const [symmetry, setSymmetry] = useState(8);
  const [brushSize, setBrushSize] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set background to dark slate marble
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw subtle guide circles
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)';
    ctx.lineWidth = 1;

    [40, 90, 140, 190].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw default starter rangoli
    drawStarterPattern(ctx, cx, cy);
  }, []);

  const drawStarterPattern = (ctx: CanvasRenderingContext2D, cx: number, cy: number) => {
    // 8-fold golden petals
    const petals = 8;
    for (let i = 0; i < petals; i++) {
      const angle = (i * Math.PI * 2) / petals;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(0, 70, 18, 45, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, 120, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Central diya glow
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const baseAngle = Math.atan2(dy, dx);

    ctx.fillStyle = activeColor;
    ctx.shadowColor = activeColor;
    ctx.shadowBlur = 6;

    for (let i = 0; i < symmetry; i++) {
      const angle = baseAngle + (i * Math.PI * 2) / symmetry;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      ctx.beginPath();
      ctx.arc(px, py, brushSize, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleClear = () => {
    soundEngine.playSoftClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    drawStarterPattern(ctx, cx, cy);
  };

  const handleDownload = () => {
    soundEngine.playCelebrationChime();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'My-Diwali-Rangoli.png';
    a.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-2">
      <div className="text-center max-w-xl mx-auto mb-6 relative">
        {/* Floating Ornate Lanterns Accent */}
        <div className="hidden sm:block absolute -top-4 -right-12 w-20 md:w-24 opacity-80 select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(244,63,94,0.4)]">
          <img
            src="/assets/aistudio/805c6d532950e43d37ba579870a7a0c2_3e77a72a.png"
            alt="Ornate Red Gold Lanterns"
            className="w-full h-auto"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
          <Palette className="h-3.5 w-3.5 text-rose-400" />
          <span>Sacred Rangoli Mandala Studio</span>
        </div>
        <h2 className="font-diwali text-2xl sm:text-4xl font-bold text-white tracking-wide">
          Draw Glowing Rangoli Art
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/80 mt-1 font-light">
          Drag or tap on the board to paint with sacred 8-fold symmetry using authentic festival pigments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Controls and Colors */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-5">
          {/* Color Pigments */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2.5">
              Select Sacred Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {RANGOLI_COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    soundEngine.playSoftClick();
                    setActiveColor(c.hex);
                  }}
                  className={`h-11 rounded-xl flex items-center justify-center transition-all ${
                    activeColor === c.hex
                      ? 'ring-2 ring-white scale-105'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Symmetry selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Mandala Symmetry: {symmetry}-Fold
            </label>
            <div className="flex gap-2">
              {[4, 6, 8, 12].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    soundEngine.playSoftClick();
                    setSymmetry(s);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    symmetry === s
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Brush thickness */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
              Brush Thickness
            </label>
            <input
              type="range"
              min="2"
              max="16"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={handleClear}
              className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Save Art</span>
            </button>
          </div>
        </div>

        {/* Right: Interactive Canvas */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full max-w-[460px] aspect-square rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl relative bg-slate-950 touch-none">
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              onMouseDown={() => setIsDrawing(true)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              onMouseMove={handleDraw}
              onTouchStart={() => setIsDrawing(true)}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={handleDraw}
              className="w-full h-full cursor-crosshair"
            />
          </div>
          <p className="mt-3 text-xs text-amber-200/70 text-center">
            Touch and move your finger on the circle to create blooming floral patterns.
          </p>
        </div>
      </div>
    </div>
  );
};
