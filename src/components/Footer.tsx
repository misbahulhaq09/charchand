import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 sm:px-8 bg-black border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Logo / Name */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#e50914]" />
          <span className="font-bold tracking-[0.25em] text-white uppercase text-sm">
            PORTFOLIO
          </span>
        </div>

        {/* © 2026 */}
        <div className="font-mono text-[#666666] tracking-widest text-[11px]">
          © 2026
        </div>
      </div>
    </footer>
  );
};
