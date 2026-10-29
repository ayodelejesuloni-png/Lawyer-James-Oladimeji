import React, { useState, useEffect } from 'react';
import { PageId, Attorney } from './types/legal';
import { ATTORNEYS } from './data/legalData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { AttorneysPage } from './pages/AttorneysPage';
import { ContactPage } from './pages/ContactPage';
import { ToolsPage } from './pages/ToolsPage';
import { FloatingActionBar } from './components/FloatingActionBar';
import { AttorneyModal } from './components/AttorneyModal';
import { ConsultationModal } from './components/ConsultationModal';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { BookOpen, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedAttorneyId, setSelectedAttorneyId] = useState<string | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationAttorney, setConsultationAttorney] = useState<string | undefined>(undefined);
  const [consultationSummary, setConsultationSummary] = useState<string | undefined>(undefined);
  const [beginnerGuideOpen, setBeginnerGuideOpen] = useState(false);

  // Sync with browser hash if present (e.g., #services, #contact)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'about', 'services', 'attorneys', 'tools', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (attorneyName?: string, initialSummary?: string) => {
    setConsultationAttorney(attorneyName);
    setConsultationSummary(initialSummary);
    setConsultationModalOpen(true);
  };

  const selectedAttorney = selectedAttorneyId
    ? ATTORNEYS.find((a) => a.id === selectedAttorneyId) || null
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#070e1b] text-slate-100 selection:bg-amber-400/25 selection:text-amber-300">
      
      {/* Informational Chambers Banner in Navy, White & Gold */}
      <aside aria-label="Chambers accreditation banner" className="bg-gradient-to-r from-[#081225] via-[#0d1d3d] to-[#081225] border-b border-blue-900/40 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="font-semibold text-amber-400">Nigerian Bar Association (NBA) Accredited Chambers</span>
            <span className="text-blue-800 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">35 Beachland Rd, Arepo, Ogun State &amp; Abuja</span>
          </div>

          <button
            onClick={() => setBeginnerGuideOpen(true)}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Developer Guide: How to Run &amp; Connect Email</span>
          </button>
        </div>
      </aside>

      {/* Main Responsive Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenBeginnerGuide={() => setBeginnerGuideOpen(true)}
      />

      {/* Page Routing Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenConsultation={() => handleOpenConsultation()}
            onSelectAttorney={(id) => setSelectedAttorneyId(id)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenConsultation={() => handleOpenConsultation()}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenConsultation={() => handleOpenConsultation()}
          />
        )}

        {currentPage === 'attorneys' && (
          <AttorneysPage
            onNavigate={handleNavigate}
            onOpenConsultation={(name) => handleOpenConsultation(name)}
            onSelectAttorney={(id) => setSelectedAttorneyId(id)}
          />
        )}

        {currentPage === 'tools' && (
          <ToolsPage
            onNavigate={handleNavigate}
            onOpenConsultation={(name, summary) => handleOpenConsultation(name, summary)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenBeginnerGuide={() => setBeginnerGuideOpen(true)}
          />
        )}
      </main>

      {/* Floating Speed Dial / Hotline Actions (Bottom Left) */}
      <FloatingActionBar
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenBeginnerGuide={() => setBeginnerGuideOpen(true)}
      />

      {/* Floating Beginner Help Trigger (Bottom Right) */}
      <button
        onClick={() => setBeginnerGuideOpen(true)}
        title="Open beginner guide for running and email setup"
        className="fixed bottom-6 right-6 z-30 p-3 bg-[#0b172d]/95 hover:bg-[#10203f] text-amber-400 border border-amber-400/40 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2 text-xs font-semibold cursor-pointer"
      >
        <BookOpen className="w-4 h-4 text-amber-400" />
        <span className="hidden sm:inline text-white">Developer Guide</span>
      </button>

      {/* Modals */}
      <AttorneyModal
        attorney={selectedAttorney}
        onClose={() => setSelectedAttorneyId(null)}
        onBookConsultation={(name) => handleOpenConsultation(name)}
      />

      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => {
          setConsultationModalOpen(false);
          setConsultationSummary(undefined);
        }}
        defaultAttorney={consultationAttorney}
        initialSummary={consultationSummary}
        onComplete={() => {}}
        onTrackDocket={(code) => {
          handleNavigate('tools');
        }}
      />

      <BeginnerGuideModal
        isOpen={beginnerGuideOpen}
        onClose={() => setBeginnerGuideOpen(false)}
      />

    </div>
  );
}
