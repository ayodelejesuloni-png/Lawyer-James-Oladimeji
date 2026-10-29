import React, { useState } from 'react';
import { PageId } from '../types/legal';
import { FIRM_NAME, FIRM_SHORT_NAME } from '../data/legalData';
import { Menu, X, Phone, BookOpen } from 'lucide-react';
import { FirmLogo } from './FirmLogo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
  onOpenBeginnerGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenConsultation,
  onOpenBeginnerGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'attorneys', label: 'Attorneys' },
    { id: 'tools', label: 'Interactive Tools', badge: 'Interactive' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Bar Contract: Zone 1 (Brand), Zone 2 (4-5 Nav Links), Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-[#070e1b]/95 backdrop-blur-md border-b border-blue-900/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element brand wordmark with Official Crest */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-opacity hover:opacity-95 shrink-0 cursor-pointer"
            aria-label={`${FIRM_NAME} homepage`}
          >
            <FirmLogo size="md" showText={true} />
          </button>

          {/* Zone 2: Navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Help for beginner */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Beginner Quick Guide button */}
            <button
              onClick={onOpenBeginnerGuide}
              title="Beginner Guide: How to run & connect email"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-200 hover:text-amber-300 bg-[#0a162e] border border-blue-900/60 rounded-lg hover:border-amber-400/40 transition-colors whitespace-nowrap cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Beginner Guide</span>
            </button>

            {/* Schedule Consultation primary CTA */}
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] whitespace-nowrap cursor-pointer"
            >
              Schedule Consultation
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-200 hover:text-white rounded-lg hover:bg-[#0f2144] border border-blue-900/60 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation in Navy, White & Gold */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#070e1b]/85 backdrop-blur-sm flex flex-col justify-end">
          <div className="w-full bg-[#0a152c] border-t-2 border-amber-400/50 p-6 rounded-t-3xl space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-blue-900/50">
              <FirmLogo size="sm" showText={true} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#0f2144] cursor-pointer"
              >
                <X className="w-5 h-5 text-amber-400" />
              </button>
            </div>

            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between px-4 py-3 text-left rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 font-semibold'
                        : 'text-slate-200 hover:bg-[#0f2144]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-amber-400">→</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-blue-900/50 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-center text-sm shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
              >
                Schedule Consultation
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBeginnerGuide();
                }}
                className="w-full py-2.5 px-4 bg-[#0d1d3d] hover:bg-[#122854] text-slate-200 font-medium rounded-xl text-center text-xs flex items-center justify-center gap-2 border border-blue-800/60 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                Beginner Guide: How to Run &amp; Connect Email
              </button>

              <div className="p-3.5 rounded-xl bg-[#070e1b] border border-blue-900/60 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Immediate Legal Retainer:</span>
                </div>
                <p className="font-mono text-white font-medium">08024273323 · 07062825095</p>
                <p className="text-[11px] text-slate-400">35, Beachland Rd, Arepo, Ogun State</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
