import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Building2 } from 'lucide-react';
import { LocationConfig } from '../types';

interface LocationSectionProps {
  location: LocationConfig;
  onOpenSettings?: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ location }) => {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${location.address || 'Office No. 1080, Currency Tower'}, ${location.landmark ? `${location.landmark}, ` : ''}${location.city || 'Raipur, Chhattisgarh'}, ${location.country || 'India'}`;

  const directionsUrl =
    location.directionsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      'Currency Tower VIP Road Raipur Office 1080'
    )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenDirections = () => {
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
  };

  const hasValidEmbed = Boolean(location.embedUrl && location.embedUrl.trim().length > 0);
  const hasValidCustomImage = Boolean(location.customImageUrl && location.customImageUrl.trim().length > 0);

  return (
    <section id="location-section" className="py-24 sm:py-32 px-6 sm:px-8 border-b border-[#1a1a1a] bg-black/60">
      <div className="max-w-6xl mx-auto">
        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#e50914] uppercase block mb-2 font-bold">
              Studio Presence & Headquarters
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              {location.title || 'STUDIO LOCATION'}
            </h2>
          </div>
        </motion.div>

        {/* Location Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Rich Structured Address & Direction Actions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 bg-[#050505] border border-[#222222] p-8 sm:p-10 flex flex-col justify-between relative group hover:border-[#e50914] transition-all duration-300"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#e50914] transition-colors" />

            <div className="space-y-6">
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#e50914] uppercase font-bold px-2 py-1 bg-[#111111] border border-[#222222]">
                  [ PRIMARY BASE ]
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#888888]">
                  RAIPUR, CG
                </span>
              </div>

              {/* Office & Building Name */}
              <div>
                <div className="flex items-center gap-2 text-[#e50914] mb-2">
                  <Building2 className="w-5 h-5" />
                  <span className="text-[11px] font-mono tracking-widest uppercase font-bold">
                    CURRENCY TOWER
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-tight">
                  {location.address || 'Office No. 1080, Currency Tower'}
                </h3>
                <p className="text-sm font-semibold tracking-wider text-[#cccccc] uppercase mt-1">
                  {location.landmark || 'VIP Road'}, {location.city || 'Raipur, Chhattisgarh'}
                </p>
                <p className="text-xs font-mono tracking-widest text-[#777777] uppercase mt-0.5">
                  {location.country || 'INDIA'}
                </p>
              </div>

              {/* Coordinates Box */}
              <div className="p-4 bg-black border border-[#222222] flex items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#666666] block">
                    Global Coordinates
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-white font-bold tracking-wider">
                    {location.coordinates || '21.2334° N, 81.6702° E'}
                  </span>
                </div>
                <button
                  onClick={handleCopyAddress}
                  title="Copy Full Address"
                  className="px-3 py-1.5 border border-[#333333] hover:border-[#e50914] text-white hover:text-[#e50914] transition-colors text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer bg-black"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#e50914]" />
                      <span className="text-[#e50914]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direction Action Buttons */}
            <div className="pt-8 space-y-3">
              <button
                onClick={handleOpenDirections}
                className="w-full relative group/btn overflow-hidden flex items-center justify-between px-6 py-4 bg-[#e50914] text-white font-bold text-xs tracking-[0.2em] uppercase border border-[#e50914] hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-none bg-black/20 flex items-center justify-center">
                    <Navigation className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors" />
                  </div>
                  <span>OPEN IN GOOGLE MAPS</span>
                </div>
                <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#666666] px-1">
                <span>VIP ROAD, RAIPUR</span>
                <span>DIRECT ROUTE & NAVIGATION</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Embedded Interactive Map / Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#050505] border border-[#222222] overflow-hidden flex flex-col justify-between min-h-[380px] group hover:border-[#e50914] transition-all duration-300"
          >
            {/* Top Bar for Map */}
            <div className="px-5 py-3 bg-black border-b border-[#222222] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-none bg-[#e50914]" />
                <span className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">
                  LIVE SATELLITE / NAVIGATION FEED
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#888888] tracking-widest">
                RAIPUR 492001
              </span>
            </div>

            {/* Map Frame */}
            <div className="relative flex-1 w-full min-h-[320px] bg-black overflow-hidden">
              {hasValidEmbed ? (
                <iframe
                  title="Studio Location - Currency Tower Raipur"
                  src={location.embedUrl.trim()}
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[320px]"
                  style={{
                    border: 0,
                    filter: 'invert(90%) hue-rotate(180deg) contrast(110%)'
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : hasValidCustomImage ? (
                <img
                  src={location.customImageUrl!.trim()}
                  alt="Currency Tower Location Map"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#050505] text-center">
                  <div className="w-12 h-12 bg-[#e50914] text-white flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold tracking-[0.2em] text-white uppercase mb-1">
                    CURRENCY TOWER, VIP ROAD
                  </h4>
                  <p className="text-[11px] font-mono text-[#888888] tracking-widest uppercase">
                    Office No. 1080 • Raipur, Chhattisgarh
                  </p>
                </div>
              )}
            </div>

            {/* Map Bottom Meta Bar */}
            <div className="px-5 py-3 bg-black border-t border-[#222222] flex items-center justify-between text-[11px] font-mono text-[#777777]">
              <span>LANDMARK: VIP ROAD, OPP. BABYLON / NEAR AIRPORT RD</span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e50914] hover:text-white uppercase font-bold tracking-wider flex items-center gap-1"
              >
                Get Directions →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
