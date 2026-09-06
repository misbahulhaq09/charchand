import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, AlertCircle, Clock } from 'lucide-react';
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
  const isComingSoon = Boolean(project.isComingSoon || !hasValidUrl);

  const previewImageSrc =
    project.previewImage && project.previewImage.trim() !== ''
      ? project.previewImage.trim()
      : null;

  const previewVideoSrc =
    project.previewVideo && project.previewVideo.trim() !== ''
      ? project.previewVideo.trim()
      : null;

  const handleCardClick = () => {
    if (hasValidUrl && !project.isComingSoon) {
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
            {isComingSoon && (
              <span className="border border-[#e50914] bg-[#e50914]/20 text-[#ff4444] text-[10px] font-mono px-2 py-0.5 tracking-wider font-bold uppercase">
                COMING SOON
              </span>
            )}
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
            <div className="bg-[#111111] px-3 py-0.5 border border-[#222222] text-[10px] font-mono text-[#777777] max-w-[200px] truncate flex items-center gap-1.5">
              {isComingSoon && <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse shrink-0" />}
              <span>{hasValidUrl && !project.isComingSoon ? project.websiteUrl.replace(/^https?:\/\//i, '') : 'coming-soon.design'}</span>
            </div>
            <div className="w-4" />
          </div>

          {/* Website Video, Screenshot, or Minimal Studio Placeholder */}
          {previewVideoSrc ? (
            <div className="relative w-full h-full pt-7 bg-black overflow-hidden">
              <video
                src={previewVideoSrc}
                poster={previewImageSrc || undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover/image:scale-[1.01]"
              />
              {/* Subtle top-right video indicator */}
              <div className="absolute top-9 right-3 z-10 bg-black/80 backdrop-blur-sm border border-[#333333] px-2.5 py-0.5 flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse" />
                <span className="font-mono text-[9px] text-[#e0e0e0] font-bold tracking-widest uppercase">
                  CINEMATIC FILM
                </span>
              </div>
            </div>
          ) : previewImageSrc ? (
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
                <div className="border border-[#e50914] bg-black/80 px-4 py-2 mb-3 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
                  <span className="font-mono text-[#e50914] text-xs font-bold tracking-[0.3em] uppercase">
                    {isComingSoon ? 'COMING SOON' : `[ WEBSITE ${project.number} ]`}
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-widest uppercase font-mono">
                  {project.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase mt-2">
                  {isComingSoon ? 'PROJECT IN DEVELOPMENT' : 'Preview in preparation'}
                </span>
              </div>
            </div>
          )}

          {/* Sleek Coming Soon Center Badge Overlay if coming soon AND an image exists */}
          {isComingSoon && previewImageSrc && (
            <div className="absolute inset-0 pt-7 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center pointer-events-none z-10 select-none">
              <div className="border border-[#e50914] bg-black/90 px-6 py-3 shadow-2xl flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-pulse" />
                <span className="font-mono text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
                  COMING SOON
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#cccccc] uppercase mt-2.5 drop-shadow">
                PROJECT IN DEVELOPMENT
              </span>
            </div>
          )}

          {/* Minimal dark overlay on hover */}
          <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition-colors duration-300 pointer-events-none" />

          {/* "Coming Soon" Toast Overlay if clicked */}
          {showComingSoon && (
            <div className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <div className="p-3 border border-[#e50914] bg-black mb-3">
                <Clock className="w-6 h-6 text-[#e50914]" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-widest uppercase mb-1">
                Coming Soon
              </h4>
              <p className="text-xs text-[#aaaaaa] max-w-sm font-mono tracking-wide">
                The live website for this project is currently in development and will be released soon.
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

          {/* Action Button: VIEW WEBSITE or COMING SOON */}
          {hasValidUrl && !project.isComingSoon ? (
            <button
              onClick={handleCardClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#e50914] text-white text-xs font-bold tracking-[0.2em] uppercase border border-[#e50914] hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer select-none"
            >
              <span>VIEW WEBSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleCardClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#e50914] text-white text-xs font-bold tracking-[0.2em] uppercase border border-[#e50914] hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer select-none"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>COMING SOON</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
