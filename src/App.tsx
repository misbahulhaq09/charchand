import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PortfolioCard } from './components/PortfolioCard';
import { ContactSection } from './components/ContactSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { UrlEditorModal } from './components/UrlEditorModal';
import {
  INITIAL_PROJECTS,
  INITIAL_MY_CONTACT,
  INITIAL_DIMPLE_CONTACT,
  INITIAL_LOCATION
} from './data/portfolioData';
import { PortfolioProject, ContactProfile, LocationConfig } from './types';

export default function App() {
  // Persistence with localStorage
  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const updated = parsed.map((p, idx) => {
            if (p.id === 'project-01') {
              return {
                ...INITIAL_PROJECTS[0],
                previewImage: '/char-chand.png',
                previewVideo: '/char-chand-hero.mp4',
                websiteUrl: 'https://charchand.netlify.app/'
              };
            }
            if (p.id === 'project-02') {
              return {
                ...INITIAL_PROJECTS[1],
                previewImage: '/deeva-luxury-jewellery.png',
                previewVideo: '/deeva-luxury-jewellery.mp4',
                websiteUrl: 'https://deevaluxuryjewellery.netlify.app/'
              };
            }
            if (p.id === 'project-03') {
              return {
                ...INITIAL_PROJECTS[2],
                previewImage: '/bomdia-cafe.png',
                websiteUrl: 'https://bomdia-cafe.netlify.app/#menu'
              };
            }
            if (p.id === 'project-04') {
              return {
                ...INITIAL_PROJECTS[3],
                previewImage: '/simnani-group.png',
                websiteUrl: 'https://simnanigroup.co.in/'
              };
            }
            if (p.id === 'project-05') {
              return {
                ...INITIAL_PROJECTS[4],
                previewImage: '',
                isComingSoon: true,
                websiteUrl: ''
              };
            }
            return {
              ...p,
              previewImage:
                typeof p.previewImage === 'string'
                  ? p.previewImage.trim()
                  : (INITIAL_PROJECTS[idx]?.previewImage || '')
            };
          });
          localStorage.setItem('portfolio_projects_data', JSON.stringify(updated));
          return updated;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECTS;
  });

  const [myContact, setMyContact] = useState<ContactProfile>(() => {
    try {
      const saved = localStorage.getItem('portfolio_my_contact');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phoneNumber && !parsed.phoneNumber.includes('X') && parsed.title !== 'MY CONTACT') {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MY_CONTACT;
  });

  const [dimpleContact, setDimpleContact] = useState<ContactProfile>(() => {
    try {
      const saved = localStorage.getItem('portfolio_dimple_contact');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phoneNumber && !parsed.phoneNumber.includes('X')) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DIMPLE_CONTACT;
  });

  const [location, setLocation] = useState<LocationConfig>(() => {
    try {
      const saved = localStorage.getItem('portfolio_location_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.address && parsed.city !== 'STUDIO HEADQUARTERS') {
          return {
            ...INITIAL_LOCATION,
            ...parsed,
            embedUrl:
              parsed.embedUrl && typeof parsed.embedUrl === 'string' && parsed.embedUrl.trim() !== ''
                ? parsed.embedUrl.trim()
                : INITIAL_LOCATION.embedUrl,
            customImageUrl:
              parsed.customImageUrl && typeof parsed.customImageUrl === 'string' && parsed.customImageUrl.trim() !== ''
                ? parsed.customImageUrl.trim()
                : ''
          };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LOCATION;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync to localStorage
  const handleSaveProjects = (updatedProjects: PortfolioProject[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('portfolio_projects_data', JSON.stringify(updatedProjects));
  };

  const handleUpdateSingleUrl = (id: string, newUrl: string) => {
    const updated = projects.map(p => (p.id === id ? { ...p, websiteUrl: newUrl } : p));
    handleSaveProjects(updated);
  };

  const handleSaveContacts = (updatedMyContact: ContactProfile, updatedDimpleContact: ContactProfile) => {
    setMyContact(updatedMyContact);
    setDimpleContact(updatedDimpleContact);
    localStorage.setItem('portfolio_my_contact', JSON.stringify(updatedMyContact));
    localStorage.setItem('portfolio_dimple_contact', JSON.stringify(updatedDimpleContact));
  };

  const handleSaveLocation = (updatedLocation: LocationConfig) => {
    setLocation(updatedLocation);
    localStorage.setItem('portfolio_location_config', JSON.stringify(updatedLocation));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('portfolio_projects_data');
    localStorage.removeItem('portfolio_my_contact');
    localStorage.removeItem('portfolio_dimple_contact');
    localStorage.removeItem('portfolio_location_config');
    setProjects(INITIAL_PROJECTS);
    setMyContact(INITIAL_MY_CONTACT);
    setDimpleContact(INITIAL_DIMPLE_CONTACT);
    setLocation(INITIAL_LOCATION);
    setIsSettingsOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#e50914] selection:text-white flex flex-col font-sans overflow-x-hidden">
      {/* Fullscreen Looping Background Animation Video */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
        />
        {/* Atmospheric dark overlay for optimal legibility and contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]" />
      </div>

      {/* Foreground Website Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Minimal Header */}
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />

        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Portfolio Section (Main Showcase) */}
        <main id="portfolio-section" className="py-24 sm:py-32 px-6 sm:px-8 border-b border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto">
            {/* Section Indicator */}
            <div className="flex items-center justify-between mb-16 pb-4 border-b border-[#1f1f1f]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#e50914]" />
                <span className="text-xs uppercase tracking-[0.3em] text-white font-bold">
                  SELECTED WEBSITES
                </span>
              </div>
              <span className="font-mono text-xs text-[#666666] tracking-widest uppercase">
                INDEX [ 01 — {projects.length.toString().padStart(2, '0')} ]
              </span>
            </div>

            {/* Vertical Stack of Large Website Preview Cards */}
            <div className="flex flex-col gap-16 sm:gap-24">
              {projects.map((project, index) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  index={index}
                  onUpdateUrl={handleUpdateSingleUrl}
                />
              ))}
            </div>
          </div>
        </main>

        {/* 4. Contact Section */}
        <ContactSection
          myContact={myContact}
          dimpleContact={dimpleContact}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* 5. Location Section */}
        <LocationSection
          location={location}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* 6. Footer */}
        <Footer />

        {/* Quick Data / URL Manager Modal */}
        <UrlEditorModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          projects={projects}
          onSaveProjects={handleSaveProjects}
          myContact={myContact}
          dimpleContact={dimpleContact}
          onSaveContacts={handleSaveContacts}
          location={location}
          onSaveLocation={handleSaveLocation}
          onResetDefaults={handleResetDefaults}
        />
      </div>
    </div>
  );
}
