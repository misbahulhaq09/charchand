import React from 'react';

interface HeaderProps {
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-[#222222]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo / Name */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="group flex items-center gap-2.5 text-white font-bold tracking-widest text-sm uppercase transition-colors"
          >
            <span className="w-2 h-2 rounded-none bg-[#e50914]" />
            <span className="tracking-[0.2em]">PORTFOLIO</span>
          </a>
        </div>

        {/* Minimal Navigation */}
        <nav className="flex items-center gap-6 sm:gap-10">
          <button
            onClick={() => scrollToSection('portfolio-section')}
            className="text-xs uppercase tracking-[0.2em] text-[#cccccc] hover:text-white transition-colors cursor-pointer"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            className="text-xs uppercase tracking-[0.2em] text-[#cccccc] hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection('location-section')}
            className="text-xs uppercase tracking-[0.2em] text-[#cccccc] hover:text-white transition-colors cursor-pointer"
          >
            Location
          </button>
        </nav>
      </div>
    </header>
  );
};
