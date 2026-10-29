import React, { useState } from 'react';
import { PageId, PropertyLocationKey } from '../types/legal';
import {
  FIRM_NAME,
  FIRM_SHORT_NAME,
  HERO_IMAGE,
  LAW_LIBRARY_IMAGE,
  FIRM_STATISTICS,
  PRACTICE_AREAS,
  ATTORNEYS,
  RECENT_CASE_STUDIES,
} from '../data/legalData';
import {
  PROPERTY_LOCATIONS,
  LEGAL_FAQS,
  calculatePropertyStatutoryFees,
} from '../data/interactiveLegalData';
import { Testimonials } from '../components/Testimonials';
import { FirmLogo } from '../components/FirmLogo';
import {
  Scale,
  Shield,
  ArrowRight,
  Briefcase,
  Flame,
  Landmark,
  Building2,
  Anchor,
  CheckCircle,
  PhoneCall,
  MapPin,
  Award,
  Calculator,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Home,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
  onSelectAttorney: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onSelectAttorney,
}) => {
  const [homeLocation, setHomeLocation] = useState<PropertyLocationKey>('ogun_arepo');
  const [homeValue, setHomeValue] = useState<number>(35000000);
  const [homePlots, setHomePlots] = useState<number>(2);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(0);

  const homeCalc = calculatePropertyStatutoryFees(homeLocation, 'deed_survey_only', homeValue, homePlots);

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

  const faqCategories = ['All', 'Property & Land Title', 'CAMA 2020 & Corporate', 'Courtroom Litigation & Dispute', 'Chambers Fees & Retainer'];
  const filteredFaqs = selectedFaqCategory === 'All'
    ? LEGAL_FAQS
    : LEGAL_FAQS.filter((f) => f.category === selectedFaqCategory);

  return (
    <div className="space-y-24 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden border-b border-blue-900/40">
        {/* Background Image with Measured Contrast Scrim in Royal Navy Blue */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Oladimeji Ogun and Co Law Library & Chambers"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/80 to-[#070e1b]/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070e1b] via-[#070e1b]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Logo Crest Emblem & Unboxed Kicker */}
            <div className="flex items-center gap-4">
              <FirmLogo size="lg" />
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wider uppercase">
                  <span>Legal Practitioners</span>
                  <span aria-hidden="true" className="text-blue-500">·</span>
                  <span>Barristers &amp; Solicitors</span>
                  <span aria-hidden="true" className="text-blue-500">·</span>
                  <span className="text-amber-300 italic font-semibold">Your Legal Solutions, Our Priority</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  35, Beachland Road, Arepo, Ogun State &amp; Abuja · 08024273323
                </p>
              </div>
            </div>

            {/* Unmistakable Headline with Gold Gradient Accent */}
            <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Formidable Courtroom Advocacy. <br className="hidden sm:inline" />
              <span className="text-gold-gradient">Commercial &amp; Property Legal Mastery.</span>
            </h1>

            {/* Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
              Under the leadership of Barrister Oladimeji Ogun, we counsel corporate conglomerates, real estate developers, and commercial institutions through forensic land title perfection along the Lagos-Ibadan industrial axis, contested litigation, and regulatory compliance under CAMA 2020.
            </p>

            {/* CTA Group: Primary outcome CTA + Interactive Tools + practice areas */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] text-slate-950 font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Schedule Retainer Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('tools')}
                className="px-5 py-3.5 bg-[#0f2144] hover:bg-[#152e5e] text-amber-300 border border-amber-400/50 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Interactive Legal Tools</span>
              </button>
              
              <button
                onClick={() => onNavigate('services')}
                className="px-5 py-3.5 bg-[#0a172f]/90 hover:bg-[#112448] text-slate-200 hover:text-white border border-blue-800/70 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Practice Areas</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-6 border-t border-blue-900/50 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>Supreme Court of Nigeria Bar Standing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>Nigerian Bar Association (NBA) Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>CAC Accredited Corporate Counsel</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chambers 4 Core Pillars (From Official Logo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-gradient-to-r from-[#070e1b] via-[#0b1a37] to-[#070e1b] border-2 border-amber-400/50 rounded-2xl p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              ... Your Legal Solutions, Our Priority
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-blue-900/60">
            <button
              onClick={() => onNavigate('services')}
              className="flex items-center justify-center gap-3 pt-3 md:pt-0 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-wider uppercase group-hover:text-amber-400 transition-colors">
                  ADVISORY
                </div>
                <div className="text-[10px] text-slate-400">Statutory &amp; Risk Counsel</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('services')}
              className="flex items-center justify-center gap-3 pt-3 md:pt-0 md:pl-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-wider uppercase group-hover:text-amber-400 transition-colors">
                  LITIGATION
                </div>
                <div className="text-[10px] text-slate-400">Superior Courts of Record</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('services')}
              className="flex items-center justify-center gap-3 pt-3 md:pt-0 md:pl-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-wider uppercase group-hover:text-amber-400 transition-colors">
                  CORPORATE
                </div>
                <div className="text-[10px] text-slate-400">CAMA 2020 &amp; CAC Structuring</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('services')}
              className="flex items-center justify-center gap-3 pt-3 md:pt-0 md:pl-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Home className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-wider uppercase group-hover:text-amber-400 transition-colors">
                  REAL ESTATE
                </div>
                <div className="text-[10px] text-slate-400">Land Title &amp; Perfection</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATISTICAL PROOF RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl backdrop-blur-sm">
          {FIRM_STATISTICS.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-center sm:text-left border-blue-900/40 sm:border-r last:border-r-0 sm:pr-4">
              <div className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-400 tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-slate-300 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 INTERACTIVE LEGAL CALCULATOR SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0a162e] via-[#0d1d3d] to-[#081225] border-2 border-amber-400/40 shadow-2xl space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-blue-900/50">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Interactive Legal Engineering</span>
                <span className="text-slate-500">·</span>
                <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono border border-amber-400/40">Real-Time JS Calculation</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                Instant Nigerian Property Statutory Fee &amp; Governor's Consent Estimator
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Test statutory perfection rates at Ogun State Bureau of Lands (Arepo / Mowe), Lagos Alausa, and Abuja AGIS directly in your browser.
              </p>
            </div>

            <button
              onClick={() => onNavigate('tools')}
              className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 whitespace-nowrap self-start lg:self-auto cursor-pointer"
            >
              <span>Launch Full Interactive Suite &amp; Docket Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Calculator Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200 block">
                  Select Land Bureau Jurisdiction
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PROPERTY_LOCATIONS.map((loc) => (
                    <button
                      key={loc.key}
                      type="button"
                      onClick={() => setHomeLocation(loc.key)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        homeLocation === loc.key
                          ? 'bg-amber-400/20 border-amber-400 text-white font-bold'
                          : 'bg-[#070e1b] border-blue-900/60 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span className="block font-semibold truncate">{loc.state}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{loc.label.split('(')[1]?.replace(')', '') || loc.bureau}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Value */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-200">
                    Property Transaction Consideration (NGN)
                  </label>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    ₦{homeValue.toLocaleString('en-NG')}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000000}
                  max={250000000}
                  step={5000000}
                  value={homeValue}
                  onChange={(e) => setHomeValue(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-[#070e1b] rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>₦10,000,000</span>
                  <span>₦125,000,000</span>
                  <span>₦250,000,000+</span>
                </div>
              </div>
            </div>

            {/* Live Reactive Output Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-[#070e1b] border border-blue-900/60 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-900/50 pb-2.5">
                  <span className="text-xs text-slate-400">Assessed Title Instrument:</span>
                  <span className="text-xs font-semibold text-white">Deed of Assignment with Survey</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#0a162e] border border-blue-900/50">
                    <span className="text-[11px] text-slate-400 block">Stamp Duty (Estimated):</span>
                    <strong className="text-slate-200 font-mono text-sm">₦{homeCalc.breakdown.stampDuty.toLocaleString('en-NG')}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0a162e] border border-blue-900/50">
                    <span className="text-[11px] text-slate-400 block">Gov. Consent &amp; Registry:</span>
                    <strong className="text-slate-200 font-mono text-sm">₦{homeCalc.breakdown.consentAndRegistrationFee.toLocaleString('en-NG')}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0d1d3d] to-[#0a162e] border border-amber-400/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-amber-300 uppercase tracking-wider font-semibold block">
                      Total Estimated Perfection Investment
                    </span>
                    <span className="text-[10px] text-slate-400">Includes Survey Charting &amp; Legal Search</span>
                  </div>
                  <span className="text-lg sm:text-xl font-mono font-bold text-amber-400">
                    ₦{homeCalc.breakdown.estimatedTotal.toLocaleString('en-NG')}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-400">Estimated Timeline: <strong className="text-white font-mono">{homeCalc.estimatedTimelineWeeks}</strong></span>
                  <button
                    onClick={() => onNavigate('tools')}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Full Cost Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CORE PRACTICE AREAS (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Our Legal Capabilities
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white">
              Grounded in Nigerian Jurisprudence &amp; Commercial Precision
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We align deep statutory knowledge with real-world corporate strategy to resolve friction, enforce contractual covenants, and protect assets.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <span>View All Practice Sectors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRACTICE_AREAS.slice(0, 6).map((pa, idx) => (
            <div
              key={pa.id}
              className={`p-6 sm:p-7 rounded-2xl bg-[#0a162e]/70 border border-blue-900/40 hover:border-amber-400/50 transition-all flex flex-col justify-between group shadow-lg ${
                idx === 0 || idx === 1 ? 'md:col-span-1' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#0f2144] border border-blue-800/60 flex items-center justify-center group-hover:border-amber-400/50 transition-colors">
                  {getIcon(pa.iconName)}
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif-heading text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {pa.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pa.shortDesc}
                  </p>
                </div>

                {/* Key governing laws */}
                <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                  <span className="font-semibold text-amber-300/80">Statutory Frameworks:</span>
                  <div className="text-slate-300 flex flex-wrap gap-x-2 gap-y-1">
                    {pa.governingLaws.map((law, lIdx) => (
                      <span key={lIdx}>
                        {law}
                        {lIdx < pa.governingLaws.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-blue-900/40 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium truncate max-w-[170px]">
                  Lead: {pa.leadPartner.split(',')[0]}
                </span>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SENIOR ADVOCATE & PARTNER SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              Chambers Leadership
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white">
              Distinguished Partners &amp; Senior Advocates
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our partners bring decades of appellate courtroom mastery, Harvard Law credentials, and seasoned regulatory acumen to every mandate.
            </p>
          </div>
          <button
            onClick={() => onNavigate('attorneys')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>Full Attorney Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ATTORNEYS.slice(0, 2).map((attorney) => (
            <div
              key={attorney.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 flex flex-col sm:flex-row gap-6 items-start hover:border-amber-400/40 transition-colors shadow-lg"
            >
              <img
                src={attorney.imageUrl}
                alt={attorney.name}
                referrerPolicy="no-referrer"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover object-top border-2 border-blue-800/60 shadow-md shrink-0 bg-[#070e1b]"
              />
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    {attorney.name}
                  </h3>
                  <p className="text-amber-400 text-xs font-semibold pt-0.5">
                    {attorney.rank}
                  </p>
                </div>
                
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {attorney.bio}
                </p>

                <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                  <div>
                    <strong className="text-white">Admission:</strong>{' '}
                    {attorney.admissions[0]}
                  </div>
                  <div>
                    <strong className="text-white">Bar Experience:</strong>{' '}
                    <span className="tabular-nums font-mono text-amber-300">{attorney.experienceYears} Years</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => onSelectAttorney(attorney.id)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Counsel Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROOF OF IMPACT: CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
            Track Record
          </div>
          <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white">
            Landmark Commercial &amp; Appellate Precedents
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Quantifiable legal outcomes achieved for financial institutions, energy concessionaires, and multinational entities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="p-6 rounded-2xl bg-[#0a162e]/70 border border-blue-900/50 hover:border-amber-400/40 transition-all space-y-4 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                <div className="text-[11px] font-semibold text-amber-300/90 uppercase tracking-wider">
                  {cs.clientSector}
                </div>
                <div className="font-serif-heading text-lg font-bold text-amber-400 tabular-nums">
                  {cs.outcomeMetric}
                </div>
                <h3 className="text-sm font-semibold text-white leading-snug">
                  {cs.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cs.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-blue-900/40 text-[11px] text-slate-400">
                <span>Jurisdiction: </span>
                <span className="text-slate-200 font-medium">{cs.jurisdiction}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS & SUCCESS STORIES */}
      <Testimonials onOpenConsultation={onOpenConsultation} />

      {/* 6.5 INTERACTIVE LEGAL FAQ & ADVISORY ACCORDION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Nigerian Legal Jurisprudence &amp; Statutory FAQ</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white">
              Frequently Asked Legal Questions
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore essential guidance on Governor's Consent, Land Use Act compliance in Arepo and Lagos, CAMA 2020 corporate penalties, and High Court injunctions.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>Have a Specific Legal Inquiry? Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedFaqCategory(cat);
                setExpandedFaqIdx(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedFaqCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-[#0a162e] text-slate-300 hover:text-white border border-blue-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaqIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 hover:border-amber-400/40 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaqIdx(isExpanded ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h4 className="font-serif-heading text-base font-bold text-white">
                      {faq.question}
                    </h4>
                  </div>
                  <div className={`p-1.5 rounded-lg bg-[#070e1b] border border-blue-900/60 text-amber-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-blue-900/40 pt-4 bg-[#070e1b]/40">
                    <p>{faq.answer}</p>
                    <div className="pt-3 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Advice certified under Nigerian Bar Association standards.</span>
                      <button
                        onClick={onOpenConsultation}
                        className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Consult Partner on this Topic</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0a162e] via-[#0e2147] to-[#071126] border-2 border-blue-800/60 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white">
              Require Senior Legal Representation in Nigeria?
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Our partners at 35, Beachland Road, Arepo (Lagos-Ibadan Expressway corridor) and Abuja are available for structured retainers, property regularisation, corporate advisory, and high-stakes dispute resolution.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                Call: 08024273323
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                07062825095
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Arepo, Ogun State
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-500/20 whitespace-nowrap cursor-pointer"
            >
              Schedule Retainer Conference
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#0f2144] hover:bg-[#152e5e] text-white rounded-xl text-sm font-semibold transition-colors border border-blue-700/60 whitespace-nowrap cursor-pointer"
            >
              Contact Chambers
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
