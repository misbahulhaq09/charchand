import React, { useState } from 'react';
import { motion } from 'motion/react';
import SideRays, { SideRaysOrigin } from './SideRays';
import { Sparkles } from 'lucide-react';

interface RayTheme {
  id: string;
  name: string;
  color1: string;
  color2: string;
}

const RAY_THEMES: RayTheme[] = [
  { id: 'reactbits', name: 'Gold & Sky', color1: '#EAB308', color2: '#96c8ff' },
  { id: 'crimson', name: 'Crimson Atelier', color1: '#e50914', color2: '#ffaa6e' },
  { id: 'emerald', name: 'Emerald Luxury', color1: '#10b981', color2: '#6ee7b7' }
];

export const Hero: React.FC = () => {
  const [currentThemeIdx, setCurrentThemeIdx] = useState(0);
  const [currentOrigin, setCurrentOrigin] = useState<SideRaysOrigin>('top-right');
  const [isEnabled, setIsEnabled] = useState(true);

  const currentTheme = RAY_THEMES[currentThemeIdx];

  const cycleTheme = () => {
    setCurrentThemeIdx((prev) => (prev + 1) % RAY_THEMES.length);
  };

  const cycleOrigin = () => {
    const origins: SideRaysOrigin[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
    const nextIdx = (origins.indexOf(currentOrigin) + 1) % origins.length;
    setCurrentOrigin(origins[nextIdx]);
  };

  return (
    <section className="relative min-h-[75vh] sm:min-h-[82vh] flex flex-col items-center justify-center text-center px-6 sm:px-8 border-b border-[#1a1a1a] overflow-hidden">
      {/* React Bits SideRays Background Light Effect */}
      {isEnabled && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <SideRays
            speed={2.5}
            rayColor1={currentTheme.color1}
            rayColor2={currentTheme.color2}
            intensity={2}
            spread={2}
            origin={currentOrigin}
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1.0}
          />
        </div>
      )}

      {/* Background subtle geometry line */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-[1]">
        <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#222222] to-transparent opacity-50" />
      </div>

      {/* Interactive Ray Preset Bar (Top Right) */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-20 flex items-center gap-2">
        <button
          onClick={cycleTheme}
          title="Switch SideRays Palette"
          className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 hover:bg-black/90 border border-[#2a2a2a] hover:border-[#444] rounded-full text-[10px] font-mono tracking-wider text-[#cccccc] transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-[#EAB308]" />
          <span>RAYS: {currentTheme.name}</span>
        </button>

        <button
          onClick={cycleOrigin}
          title="Switch Ray Source Corner"
          className="hidden sm:inline-block px-2.5 py-1 bg-black/70 hover:bg-black/90 border border-[#2a2a2a] hover:border-[#444] rounded-full text-[10px] font-mono tracking-wider text-[#888888] hover:text-[#cccccc] transition-all cursor-pointer"
        >
          {currentOrigin.toUpperCase()}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto space-y-6 z-10"
      >
        {/* Main Display Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight sm:tracking-[-0.04em] text-white uppercase select-none leading-none">
          ANIMATION WEBSITE <span className="text-[#e50914]">PORTFOLIO</span>
        </h1>

        {/* Very small/simple line of text */}
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#aaaaaa] font-medium max-w-md mx-auto">
          Selected Website Design & Motion Works
        </p>
      </motion.div>

      {/* Minimal scroll indicator mark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] tracking-[0.25em] text-[#666666] uppercase">Scroll</span>
        <div className="w-px h-6 bg-[#333333]" />
      </div>
    </section>
  );
};
