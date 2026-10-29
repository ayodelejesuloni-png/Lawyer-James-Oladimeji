import React, { useState } from 'react';
import { PageId } from '../types/legal';
import { PRACTICE_AREAS } from '../data/legalData';
import {
  Briefcase,
  Flame,
  Scale,
  Landmark,
  Building2,
  Anchor,
  CheckCircle2,
  ArrowRight,
  Shield,
  FileText,
  DollarSign,
  HelpCircle,
  Search,
  Calculator,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const [selectedPracticeId, setSelectedPracticeId] = useState<string>(PRACTICE_AREAS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPractices = PRACTICE_AREAS.filter((pa) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      pa.title.toLowerCase().includes(q) ||
      pa.shortDesc.toLowerCase().includes(q) ||
      pa.governingLaws.some((l) => l.toLowerCase().includes(q)) ||
      pa.keyMatters.some((m) => m.toLowerCase().includes(q))
    );
  });

  const selectedPractice =
    filteredPractices.find((p) => p.id === selectedPracticeId) ||
    filteredPractices[0] ||
    PRACTICE_AREAS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-amber-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-amber-400" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-amber-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5 text-amber-400" />;
      default:
        return <Shield className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-20 pb-24">
      
      {/* 1. Page Header */}
      <section className="relative py-20 bg-[#0a162e]/50 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Specialized Legal Practice</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Nigerian Jurisprudence &amp; Statutory Counsel</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
            Comprehensive Corporate, Regulatory &amp; Dispute Resolution Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            From structuring energy divestments under the Petroleum Industry Act 2021 to arguing constitutional appeals before the Supreme Court of Nigeria, explore our six core practice areas.
          </p>
        </div>
      </section>

      {/* 2. Interactive Practice Area Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Bar & Legal Tools Quick Jump */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a162e] border border-blue-900/60 shadow-lg">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by statute or matter (e.g. CAMA 2020, Title, Arbitration)..."
              className="w-full pl-10 pr-4 py-2 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            onClick={() => onNavigate('tools')}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Legal Fee &amp; Title Calculators</span>
          </button>
        </div>

        {/* Practice Area Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredPractices.map((pa) => {
            const isSelected = pa.id === selectedPractice.id;
            return (
              <button
                key={pa.id}
                onClick={() => setSelectedPracticeId(pa.id)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400 text-white shadow-lg'
                    : 'bg-[#0a162e]/80 border-blue-900/50 text-slate-300 hover:text-white hover:border-blue-700'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-amber-400/20 text-amber-300' : 'bg-[#0f2144] text-amber-400'}`}>
                  {getIcon(pa.iconName)}
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold block leading-snug line-clamp-2">
                    {pa.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Practice Area Deep Dive */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 space-y-8 shadow-xl">
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-blue-900/50">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  {getIcon(selectedPractice.iconName)}
                </div>
                <div>
                  <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                    {selectedPractice.title}
                  </h2>
                  <p className="text-xs text-amber-400 font-semibold">
                    Practice Lead: {selectedPractice.leadPartner}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {selectedPractice.fullDesc}
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all self-start whitespace-nowrap shadow-md cursor-pointer"
            >
              Retain Counsel for {selectedPractice.title.split(' ')[0]}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Typical Mandates Handled */}
            <div className="p-6 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Representative Matters Handled</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                {selectedPractice.keyMatters.map((matter, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{matter}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applicable Nigerian Statutes & Regulations */}
            <div className="p-6 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Governing Nigerian Statutes &amp; Acts</span>
              </div>
              <p className="text-xs text-slate-400">
                Our advice and filings are rooted in the current amendments of the following legal instruments:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {selectedPractice.governingLaws.map((law, idx) => (
                  <li key={idx} className="p-2.5 bg-[#0a162e] rounded-lg border border-blue-900/40 font-medium flex items-center justify-between">
                    <span>{law}</span>
                    <span className="text-[11px] text-amber-400 font-mono font-semibold">Federal Law</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* 3. Retainer & Fee Transparency Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Fee Arrangements &amp; Retainers
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
            Transparent Engagement Structures Under NBA Guidelines
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            In compliance with the Legal Practitioners Act and the Nigerian Bar Association Remuneration Order, we provide clear, structured billing tailored to corporate and private clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 hover:border-amber-400/40 transition-colors space-y-3 shadow-lg">
            <div className="w-9 h-9 rounded-lg bg-[#0f2144] border border-blue-800 flex items-center justify-center text-amber-400">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="text-white text-base font-semibold">Corporate Annual Retainers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ongoing general corporate counsel, CAC secretarial filings, contract vetting, and priority advisory for financial institutions and growing businesses.
            </p>
            <div className="text-[11px] text-amber-300/80 pt-2 border-t border-blue-900/40">
              Structured monthly or quarterly billing
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 hover:border-amber-400/40 transition-colors space-y-3 shadow-lg">
            <div className="w-9 h-9 rounded-lg bg-[#0f2144] border border-blue-800 flex items-center justify-center text-amber-400">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-white text-base font-semibold">Appellate &amp; Dispute Retainers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bespoke briefs for high-stakes litigation before the High Court, Court of Appeal, Supreme Court of Nigeria, or domestic/international arbitration tribunals.
            </p>
            <div className="text-[11px] text-amber-300/80 pt-2 border-t border-blue-900/40">
              Brief fee + appearance allowances
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 hover:border-amber-400/40 transition-colors space-y-3 shadow-lg">
            <div className="w-9 h-9 rounded-lg bg-[#0f2144] border border-blue-800 flex items-center justify-center text-amber-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-white text-base font-semibold">Transactional Milestones</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fixed or capped fees tied to deliverables for M&amp;A closings, energy acreage acquisitions, title regularisations at Alausa/AGIS, and FinTech license issuances.
            </p>
            <div className="text-[11px] text-amber-300/80 pt-2 border-t border-blue-900/40">
              Tied to milestone completion
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0a162e] via-[#0e2147] to-[#071126] border-2 border-blue-800/60 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-heading text-xl font-bold text-white">
              Need Preliminary Regulatory Assessment?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Contact our partners for a confidential evaluation of your dispute, commercial contract, or regulatory filing.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('attorneys')}
              className="px-5 py-2.5 bg-[#0f2144] hover:bg-[#163060] text-white rounded-xl text-xs font-semibold border border-blue-700 transition-colors cursor-pointer"
            >
              Meet Practice Leaders
            </button>
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              Request Retainer Assessment
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
