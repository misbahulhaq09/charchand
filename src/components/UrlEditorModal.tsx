import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Globe, Phone, MapPin, Check } from 'lucide-react';
import { PortfolioProject, ContactProfile, LocationConfig } from '../types';

interface UrlEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: PortfolioProject[];
  onSaveProjects: (projects: PortfolioProject[]) => void;
  myContact: ContactProfile;
  dimpleContact: ContactProfile;
  onSaveContacts: (myContact: ContactProfile, dimpleContact: ContactProfile) => void;
  location: LocationConfig;
  onSaveLocation: (location: LocationConfig) => void;
  onResetDefaults: () => void;
}

export const UrlEditorModal: React.FC<UrlEditorModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSaveProjects,
  myContact,
  dimpleContact,
  onSaveContacts,
  location,
  onSaveLocation,
  onResetDefaults
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'contacts' | 'location'>('projects');
  
  // Local edit states
  const [editingProjects, setEditingProjects] = useState<PortfolioProject[]>(projects);
  const [editingMyContact, setEditingMyContact] = useState<ContactProfile>(myContact);
  const [editingDimpleContact, setEditingDimpleContact] = useState<ContactProfile>(dimpleContact);
  const [editingLocation, setEditingLocation] = useState<LocationConfig>(location);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEditingProjects(projects);
      setEditingMyContact(myContact);
      setEditingDimpleContact(dimpleContact);
      setEditingLocation(location);
    }
  }, [isOpen, projects, myContact, dimpleContact, location]);

  if (!isOpen) return null;

  const handleProjectChange = (id: string, field: keyof PortfolioProject, value: string) => {
    setEditingProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleAddNewProject = () => {
    const nextNum = (editingProjects.length + 1).toString().padStart(2, '0');
    const newProj: PortfolioProject = {
      id: `project-${Date.now()}`,
      number: nextNum,
      name: `WEBSITE ${nextNum} PROJECT`,
      category: 'Web Design & Development',
      previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
      websiteUrl: '',
      year: '2026',
      aspect: 'wide'
    };
    setEditingProjects([...editingProjects, newProj]);
  };

  const handleDeleteProject = (id: string) => {
    if (editingProjects.length <= 1) return;
    setEditingProjects(editingProjects.filter(p => p.id !== id));
  };

  const handleSaveAll = () => {
    const sanitizedProjects = editingProjects.map((p) => ({
      ...p,
      previewImage:
        p.previewImage && p.previewImage.trim() !== ''
          ? p.previewImage.trim()
          : ''
    }));
    onSaveProjects(sanitizedProjects);
    onSaveContacts(editingMyContact, editingDimpleContact);
    onSaveLocation(editingLocation);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-[#0a0a0a] border border-[#333333] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#222222] flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e50914]" />
            <h3 className="text-sm font-bold tracking-[0.2em] text-white uppercase">
              PORTFOLIO DATA & URL MANAGER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#777777] hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#222222] bg-[#050505]">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-3 px-4 text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'border-[#e50914] text-white bg-black'
                : 'border-transparent text-[#777777] hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website URLs ({editingProjects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-3 px-4 text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'contacts'
                ? 'border-[#e50914] text-white bg-black'
                : 'border-transparent text-[#777777] hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contacts & WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`flex-1 py-3 px-4 text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'location'
                ? 'border-[#e50914] text-white bg-black'
                : 'border-transparent text-[#777777] hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Location Map</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#080808]">
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#222222]">
                <p className="text-xs text-[#888888]">
                  Set your live website URLs. If empty, the card will display <strong className="text-white">Coming Soon</strong>.
                </p>
                <button
                  onClick={handleAddNewProject}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#e50914] text-white text-[11px] font-bold tracking-wider uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  Add Project
                </button>
              </div>

              <div className="space-y-4">
                {editingProjects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-4 bg-black border border-[#222222] hover:border-[#444444] transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#e50914]">
                        [ WEBSITE {proj.number || (idx + 1).toString().padStart(2, '0')} ]
                      </span>
                      {editingProjects.length > 1 && (
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="text-[#666666] hover:text-[#e50914] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                          Project Name
                        </label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleProjectChange(proj.id, 'name', e.target.value)}
                          className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white focus:border-[#e50914] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => handleProjectChange(proj.id, 'category', e.target.value)}
                          className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white focus:border-[#e50914] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#e50914] font-bold block mb-1">
                        Live Website URL (Opens upon clicking card or View Website)
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com (Leave blank for Coming Soon)"
                        value={proj.websiteUrl}
                        onChange={(e) => handleProjectChange(proj.id, 'websiteUrl', e.target.value)}
                        className="w-full bg-[#111111] border border-[#e50914]/60 px-3 py-2 text-xs font-mono text-white focus:border-[#e50914] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                          Preview Image URL (Poster)
                        </label>
                        <input
                          type="text"
                          placeholder="Image URL..."
                          value={proj.previewImage}
                          onChange={(e) => handleProjectChange(proj.id, 'previewImage', e.target.value)}
                          className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-[11px] font-mono text-[#aaaaaa] focus:border-[#e50914] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                          Preview Video URL (Optional .mp4)
                        </label>
                        <input
                          type="text"
                          placeholder="/char-chand-hero.mp4 or video URL..."
                          value={proj.previewVideo || ''}
                          onChange={(e) => handleProjectChange(proj.id, 'previewVideo', e.target.value)}
                          className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-[11px] font-mono text-[#aaaaaa] focus:border-[#e50914] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <p className="text-xs text-[#888888]">
                Update your contact titles, displayed phone numbers, and WhatsApp numbers.
              </p>

              {/* Option 1 Contact */}
              <div className="p-4 bg-black border border-[#222222] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#e50914]" />
                  <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                    OPTION 1: PRIMARY CONTACT
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                      Contact Title / Name
                    </label>
                    <input
                      type="text"
                      value={editingMyContact.title}
                      onChange={(e) => setEditingMyContact({ ...editingMyContact, title: e.target.value })}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                      Displayed Phone Text
                    </label>
                    <input
                      type="text"
                      value={editingMyContact.phoneNumber}
                      onChange={(e) => setEditingMyContact({ ...editingMyContact, phoneNumber: e.target.value })}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#e50914] font-bold block mb-1">
                    WhatsApp Number (for wa.me link)
                  </label>
                  <input
                    type="text"
                    placeholder="+919202988135"
                    value={editingMyContact.whatsappNumber}
                    onChange={(e) => setEditingMyContact({ ...editingMyContact, whatsappNumber: e.target.value })}
                    className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                  />
                </div>
              </div>

              {/* Option 2 Contact */}
              <div className="p-4 bg-black border border-[#222222] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#e50914]" />
                  <h4 className="text-xs font-bold tracking-widest text-white uppercase">
                    OPTION 2: COORDINATION CONTACT
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                      Contact Title / Name
                    </label>
                    <input
                      type="text"
                      value={editingDimpleContact.title}
                      onChange={(e) => setEditingDimpleContact({ ...editingDimpleContact, title: e.target.value })}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                      Displayed Phone Text
                    </label>
                    <input
                      type="text"
                      value={editingDimpleContact.phoneNumber}
                      onChange={(e) => setEditingDimpleContact({ ...editingDimpleContact, phoneNumber: e.target.value })}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#e50914] font-bold block mb-1">
                    WhatsApp Number (for wa.me link)
                  </label>
                  <input
                    type="text"
                    placeholder="+917067523418"
                    value={editingDimpleContact.whatsappNumber}
                    onChange={(e) => setEditingDimpleContact({ ...editingDimpleContact, whatsappNumber: e.target.value })}
                    className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-6">
              <p className="text-xs text-[#888888]">
                Configure your studio address, landmark, coordinates, and Google Maps embed.
              </p>

              <div className="p-4 bg-black border border-[#222222] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                      Office / Building Address
                    </label>
                    <input
                      type="text"
                      value={editingLocation.address}
                      onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                      Landmark / Road
                    </label>
                    <input
                      type="text"
                      value={editingLocation.landmark || ''}
                      onChange={(e) => setEditingLocation({ ...editingLocation, landmark: e.target.value })}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                      City & State
                    </label>
                    <input
                      type="text"
                      value={editingLocation.city}
                      onChange={(e) => setEditingLocation({ ...editingLocation, city: e.target.value })}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                      Location Coordinates
                    </label>
                    <input
                      type="text"
                      value={editingLocation.coordinates}
                      onChange={(e) => setEditingLocation({ ...editingLocation, coordinates: e.target.value })}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-[#e50914] font-bold block mb-1">
                    Google Maps Embed URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://maps.google.com/maps?q=..."
                    value={editingLocation.embedUrl}
                    onChange={(e) => setEditingLocation({ ...editingLocation, embedUrl: e.target.value })}
                    className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-[#777777] block mb-1">
                    Directions Link (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.google.com/maps/search/..."
                    value={editingLocation.directionsUrl || ''}
                    onChange={(e) => setEditingLocation({ ...editingLocation, directionsUrl: e.target.value })}
                    className="w-full bg-[#111111] border border-[#333333] px-3 py-1.5 text-xs text-white font-mono focus:border-[#e50914] outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-[#222222] bg-black flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#888888] hover:text-[#e50914] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Defaults
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 border border-[#333333] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#111111] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-[#e50914] text-white text-xs font-bold tracking-widest uppercase border border-[#e50914] hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
            >
              {showSavedToast ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{showSavedToast ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
