import React, { useState } from 'react';
import { PageId } from '../types/legal';
import { Phone, MessageSquare, Calculator, Search, Calendar, ChevronUp, ChevronDown } from 'lucide-react';

interface FloatingActionBarProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Legal services quick action menu" className="fixed bottom-6 left-6 z-30">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 p-3 bg-[#0a162e]/95 backdrop-blur-md border border-amber-400/40 rounded-2xl shadow-2xl space-y-2 w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider px-2 pt-1 border-b border-blue-900/50 pb-1.5 flex items-center justify-between">
            <span>Chambers Quick Access</span>
            <span className="text-slate-400 font-mono text-[10px]">Oladimeji Ogun</span>
          </div>

          <a
            href="tel:08024273323"
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-white hover:text-amber-300 hover:bg-[#0f2144] rounded-xl transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block leading-tight">Call Chambers Direct</span>
              <span className="text-[10px] text-slate-400 font-mono">08024273323</span>
            </div>
          </a>

          <a
            href="https://wa.me/2348024273323?text=Hello%20Barrister%20Oladimeji%20Ogun%2C%20I%20am%20inquiring%20from%20your%20website%20regarding%20legal%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-white hover:text-emerald-300 hover:bg-[#0f2144] rounded-xl transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block leading-tight">Instant WhatsApp</span>
              <span className="text-[10px] text-slate-400">Direct Partner Line</span>
            </div>
          </a>

          <button
            onClick={() => {
              onNavigate('tools');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white hover:text-amber-300 hover:bg-[#0f2144] rounded-xl transition-colors cursor-pointer text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-900/40 text-amber-400 flex items-center justify-center">
              <Calculator className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block leading-tight">Title &amp; Fee Calculator</span>
              <span className="text-[10px] text-slate-400">Ogun &amp; Lagos Governor Consent</span>
            </div>
          </button>

          <button
            onClick={() => {
              onNavigate('tools');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white hover:text-amber-300 hover:bg-[#0f2144] rounded-xl transition-colors cursor-pointer text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-900/40 text-amber-400 flex items-center justify-center">
              <Search className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold block leading-tight">Track Case Docket</span>
              <span className="text-[10px] text-slate-400">Look up matter status</span>
            </div>
          </button>

          <button
            onClick={() => {
              onOpenConsultation();
              setIsOpen(false);
            }}
            className="w-full mt-1 py-2 px-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md hover:from-amber-300 hover:to-amber-400 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Retainer Consultation</span>
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-[#0a162e]/95 hover:bg-[#10244c] text-white border border-amber-400/50 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2.5 text-xs font-semibold cursor-pointer group"
        aria-expanded={isOpen}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-amber-400 font-bold">Chambers Hotline</span>
        <span className="text-slate-300 hidden sm:inline">· 08024273323</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-amber-400" />
        ) : (
          <ChevronUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
        )}
      </button>
    </aside>
  );
};
