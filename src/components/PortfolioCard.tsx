import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { PortfolioProject } from '../types';

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
  onUpdateUrl?: (id: string, newUrl: string) => void;
}

const DEFAULT_PREVIEW_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const hasValidUrl = Boolean(project.websiteUrl && project.websiteUrl.trim() !== '' && project.websiteUrl !== '#');

  const previewImageSrc =
    project.previewImage && project.previewImage.trim() !== ''
      ? project.previewImage.trim()
      : null;

  const handleCardClick = () => {
    if (hasValidUrl) {
      let targetUrl = project.websiteUrl.trim();
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
      }
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowComingSoon(true);
      setTimeout(() => {
        setShowComingSoon(false);
      }, 3500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div
        id={`project-${project.id}`}
        className="group relative bg-[#050505] border border-[#222222] hover:border-[#e50914] transition-colors duration-300 overflow-hidden flex flex-col"
      >
        {/* Top Minimal Header Bar / Meta */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a] bg-black text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#e50914] font-bold text-sm tracking-wider">
              [ WEBSITE {project.number} ]
            </span>
            {project.category && project.category.trim().length > 0 && (
              <>
                <span className="hidden sm:inline-block w-1 h-1 bg-[#444444]" />
                <span className="text-[#888888] uppercase tracking-widest text-[11px]">
                  {project.category}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {project.year && (
              <span className="text-[#666666] font-mono text-[11px]">
                {project.year}
              </span>
            )}
          </div>
        </div>

        {/* Website Preview Container (Large Rectangular Viewport) */}
        <div
          onClick={handleCardClick}
          className="relative aspect-[16/9] sm:aspect-[21/10] md:aspect-[21/9] w-full bg-[#0a0a0a] overflow-hidden cursor-pointer group/image"
        >
          {/* Subtle Browser Chrome UI Mockup Top Header */}
          <div className="absolute top-0 left-0 right-0 z-20 h-7 bg-black/80 border-b border-[#222222] px-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#333333]" />
              <div className="w-2 h-2 rounded-full bg-[#333333]" />
              <div className="w-2 h-2 rounded-full bg-[#333333]" />
            </div>
            <div className="bg-[#111111] px-3 py-0.5 border border-[#222222] text-[10px] font-mono text-[#777777] max-w-[200px] truncate">
              {hasValidUrl ? project.websiteUrl.replace(/^https?:\/\//i, '') : 'preview.design'}
            </div>
            <div className="w-4" />
          </div>

          {/* Website Screenshot or Minimal Studio Placeholder */}
          {previewImageSrc ? (
            <img
              src={previewImageSrc}
              alt={`${project.name} Preview`}
              className="w-full h-full object-cover pt-7 transition-all duration-500 ease-out group-hover/image:scale-[1.01]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center pt-7 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#050505] relative select-none">
              {/* Subtle architectural grid pattern */}
              <div className="absolute inset-0 pt-7 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:36px_36px] opacity-35" />
              
              <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="border border-[#222222] bg-black/60 px-4 py-2 mb-3">
                  <span className="font-mono text-[#e50914] text-xs font-bold tracking-[0.3em] uppercase">
                    [ WEBSITE {project.number} ]
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-widest uppercase font-mono">
                  {project.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase mt-2">
                  Preview in preparation
                </span>
              </div>
            </div>
          )}

          {/* Minimal dark overlay on hover */}
          <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition-colors duration-300 pointer-events-none" />

          {/* "Coming Soon" Toast Overlay if URL is empty */}
          {showComingSoon && (
            <div className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <div className="p-3 border border-[#e50914] bg-black mb-3">
                <AlertCircle className="w-6 h-6 text-[#e50914]" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-widest uppercase mb-1">
                Coming Soon
              </h4>
              <p className="text-xs text-[#888888] max-w-sm">
                The live URL for this project will be added soon.
              </p>
            </div>
          )}
        </div>

        {/* Card Footer / Info and Action Button */}
        <div className="p-6 sm:p-8 bg-black flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#1a1a1a]">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
              {project.name}
            </h3>
            {project.category && project.category.trim().length > 0 && (
              <p className="text-xs tracking-widest text-[#888888] uppercase">
                {project.category}
              </p>
            )}
          </div>

          {/* Action Button: Normal Pure Red */}
          <button
            onClick={handleCardClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#e50914] text-white text-xs font-bold tracking-[0.2em] uppercase border border-[#e50914] hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer select-none"
          >
            <span>VIEW WEBSITE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
