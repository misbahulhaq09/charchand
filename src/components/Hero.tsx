import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[75vh] sm:min-h-[82vh] flex flex-col items-center justify-center text-center px-6 sm:px-8 border-b border-[#1a1a1a]">
      {/* Background subtle geometry line */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#222222] to-transparent opacity-50" />
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.25em] text-[#666666] uppercase">Scroll</span>
        <div className="w-px h-6 bg-[#333333]" />
      </div>
    </section>
  );
};
