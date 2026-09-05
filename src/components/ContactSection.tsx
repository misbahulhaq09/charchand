import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Phone, Copy, Check, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { ContactProfile } from '../types';

interface ContactSectionProps {
  myContact: ContactProfile;
  dimpleContact: ContactProfile;
  onOpenSettings?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  myContact,
  dimpleContact,
  onOpenSettings
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleWhatsAppClick = (contact: ContactProfile) => {
    const rawNumber = contact.whatsappNumber.replace(/[^0-9]/g, '');
    if (rawNumber && rawNumber.length > 5 && !rawNumber.includes('X')) {
      window.open(`https://wa.me/${rawNumber}`, '_blank', 'noopener,noreferrer');
    } else {
      if (onOpenSettings) {
        onOpenSettings();
      } else {
        alert('Please configure your WhatsApp number in settings.');
      }
    }
  };

  const handleCopyNumber = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section id="contact-section" className="py-24 sm:py-32 px-6 sm:px-8 border-b border-[#1a1a1a] bg-black/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#e50914] uppercase block mb-2 font-bold">
              Direct Contact Channels
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              GET IN TOUCH
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-[#aaaaaa] uppercase">
              AVAILABLE FOR COMMISSIONS
            </span>
          </div>
        </motion.div>

        {/* Two Redesigned Contact Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 01: MY CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative p-8 sm:p-10 bg-[#050505] border border-[#222222] hover:border-[#e50914] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#e50914] transition-colors" />

            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#e50914] uppercase font-bold px-2 py-1 bg-[#111111] border border-[#222222]">
                  [ OPTION 01 ]
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#888888]">
                  DESIGN LEAD
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase mb-1.5">
                  {myContact.title}
                </h3>
                <p className="text-xs tracking-widest text-[#888888] uppercase">
                  Website Design & Interactive Creative Direction
                </p>
              </div>

              {/* Enhanced Phone & Copy Interactive Box */}
              <div className="p-4 bg-black border border-[#222222] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#111111] border border-[#333333] flex items-center justify-center text-[#e50914]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-[#666666] block">
                      Direct Phone
                    </span>
                    <span className="font-mono text-base sm:text-lg text-white font-bold tracking-wider">
                      {myContact.phoneNumber}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyNumber('myContact', myContact.phoneNumber)}
                  title="Copy Phone Number"
                  className="px-3 py-1.5 border border-[#333333] hover:border-[#e50914] text-white hover:text-[#e50914] transition-colors text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer bg-black"
                >
                  {copiedId === 'myContact' ? (
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

            {/* Redesigned Elevated WhatsApp Action Button */}
            <div className="pt-8 space-y-3">
              <button
                onClick={() => handleWhatsAppClick(myContact)}
                className="w-full relative group/btn overflow-hidden flex items-center justify-between px-6 py-4 bg-[#e50914] text-white font-bold text-xs tracking-[0.2em] uppercase border border-[#e50914] hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-none bg-black/20 flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors" />
                  </div>
                  <span>WHATSAPP CHAT</span>
                </div>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#666666] px-1">
                <span>INSTANT INQUIRY</span>
                <span>DIRECT WA.ME LINK</span>
              </div>
            </div>
          </motion.div>

          {/* Card 02: DIMPLE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative p-8 sm:p-10 bg-[#050505] border border-[#222222] hover:border-[#e50914] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#e50914] transition-colors" />

            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#e50914] uppercase font-bold px-2 py-1 bg-[#111111] border border-[#222222]">
                  [ OPTION 02 ]
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#888888]">
                  COORDINATION
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase mb-1.5">
                  {dimpleContact.title}
                </h3>
                <p className="text-xs tracking-widest text-[#888888] uppercase">
                  Client Coordination, Scheduling & Management
                </p>
              </div>

              {/* Enhanced Phone & Copy Interactive Box */}
              <div className="p-4 bg-black border border-[#222222] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#111111] border border-[#333333] flex items-center justify-center text-[#e50914]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-[#666666] block">
                      Direct Phone
                    </span>
                    <span className="font-mono text-base sm:text-lg text-white font-bold tracking-wider">
                      {dimpleContact.phoneNumber}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyNumber('dimpleContact', dimpleContact.phoneNumber)}
                  title="Copy Phone Number"
                  className="px-3 py-1.5 border border-[#333333] hover:border-[#e50914] text-white hover:text-[#e50914] transition-colors text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer bg-black"
                >
                  {copiedId === 'dimpleContact' ? (
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

            {/* Redesigned Elevated WhatsApp Action Button */}
            <div className="pt-8 space-y-3">
              <button
                onClick={() => handleWhatsAppClick(dimpleContact)}
                className="w-full relative group/btn overflow-hidden flex items-center justify-between px-6 py-4 bg-[#e50914] text-white font-bold text-xs tracking-[0.2em] uppercase border border-[#e50914] hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-none bg-black/20 flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors" />
                  </div>
                  <span>WHATSAPP CHAT</span>
                </div>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#666666] px-1">
                <span>CLIENT SUPPORT</span>
                <span>DIRECT WA.ME LINK</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
