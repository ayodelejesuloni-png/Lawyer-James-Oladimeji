import React, { useState } from 'react';
import { PageId } from '../types/legal';
import { ATTORNEYS } from '../data/legalData';
import {
  Award,
  GraduationCap,
  ArrowRight,
  Mail,
  Phone,
  Scale,
  Briefcase,
  Search,
} from 'lucide-react';

interface AttorneysPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (attorneyName?: string) => void;
  onSelectAttorney: (id: string) => void;
}

export const AttorneysPage: React.FC<AttorneysPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onSelectAttorney,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttorneys = ATTORNEYS.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      a.name.toLowerCase().includes(q) ||
      a.specialization.toLowerCase().includes(q) ||
      a.rank.toLowerCase().includes(q) ||
      a.admissions.some((adm) => adm.toLowerCase().includes(q))
    );
  });
  return (
    <div className="space-y-20 pb-24">
      
      {/* 1. Header */}
      <section className="relative py-20 bg-[#0a162e]/50 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Chambers Roster</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Senior Advocates &amp; Commercial Partners</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
            Distinguished Counsel with Formidable Jurisprudential Standing
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Our advocates and transactional partners combine Supreme Court appellate distinction, international arbitral appointments, and top global academic pedigrees.
          </p>
        </div>
      </section>

      {/* 2. Attorney Grid & Live Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a162e] border border-blue-900/60 shadow-lg">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search counsel by name or practice specialty..."
              className="w-full pl-10 pr-4 py-2 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="text-xs text-slate-400">
            Showing <strong className="text-amber-300 font-mono">{filteredAttorneys.length}</strong> of {ATTORNEYS.length} Chambers Counsel
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAttorneys.map((attorney) => (
            <div
              key={attorney.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 flex flex-col justify-between hover:border-amber-400/50 transition-all space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                
                {/* Photo and Header Block */}
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <img
                    src={attorney.imageUrl}
                    alt={attorney.name}
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover object-top border-2 border-blue-800/60 shadow-md shrink-0 bg-[#070e1b]"
                  />
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-serif-heading text-xl font-bold text-white leading-tight">
                      {attorney.name}
                    </h3>
                    <p className="text-amber-400 text-xs font-semibold">
                      {attorney.rank}
                    </p>
                    <p className="text-xs text-slate-200">
                      {attorney.specialization}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-1">
                      <span>Experience: </span>
                      <strong className="text-amber-300 tabular-nums font-mono">{attorney.experienceYears} Years at the Nigerian Bar</strong>
                    </div>
                  </div>
                </div>

                {/* Brief bio excerpt */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {attorney.bio}
                </p>

                {/* Admissions and Education preview */}
                <div className="space-y-2 pt-2 border-t border-blue-900/40 text-xs">
                  <div className="flex items-start gap-2 text-slate-200">
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{attorney.admissions[0]}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400">
                    <GraduationCap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{attorney.education[0]}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onSelectAttorney(attorney.id)}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read Full Dossier &amp; Cases</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenConsultation(attorney.name)}
                  className="px-4 py-2 bg-[#0f2144] hover:bg-[#163060] text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-blue-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Consult Directly
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredAttorneys.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-[#0a162e] border border-blue-900/50 space-y-3">
            <p className="text-slate-300 text-sm">
              No counsel found matching "<span className="text-amber-400 font-medium">{searchQuery}</span>".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-[#0f2144] hover:bg-[#163060] text-amber-300 rounded-lg text-xs font-semibold border border-blue-800 transition-colors cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}
      </section>

      {/* 3. Standards of Practice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
            <Scale className="w-4 h-4" />
            <span>Chambers Standards of Professional Conduct</span>
          </div>
          <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-white">
            Adherence to the Rules of Professional Conduct (RPC 2007)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Every legal practitioner at Oladimeji Ogun &amp; Co. is duly called to the Nigerian Bar and subject to the disciplinary jurisdiction of the Legal Practitioners Disciplinary Committee (LPDC). We maintain uncompromising standards regarding client confidentiality, prompt remittance of client funds, and robust conflict-of-interest clearance before any retainer is formalized.
          </p>
        </div>
      </section>

      {/* 4. Contact Chambers CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0a162e] via-[#0e2147] to-[#071126] border-2 border-blue-800/60 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-heading text-xl font-bold text-white">
              Retain Our Senior Advocates &amp; Partners
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Contact our chambers registry for partner availability, fee arrangements, or urgent court appearance requests.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#0f2144] hover:bg-[#163060] text-white rounded-xl text-xs font-semibold border border-blue-700 transition-colors cursor-pointer"
            >
              Chambers Registry Info
            </button>
            <button
              onClick={() => onOpenConsultation()}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              Book Partner Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
