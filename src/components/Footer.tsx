import React from 'react';
import { PageId } from '../types/legal';
import { FIRM_NAME, FIRM_TAGLINE, OFFICE_LOCATIONS, FIRM_ESTABLISHED } from '../data/legalData';
import { Mail, Phone, MapPin, ShieldCheck, BookOpen } from 'lucide-react';
import { FirmLogo } from './FirmLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
  onOpenBeginnerGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenBeginnerGuide,
}) => {
  return (
    <footer className="bg-[#050c18] border-t-2 border-blue-900/40 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Firm Overview with Official Crest */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FirmLogo size="md" />
              <div className="flex flex-col">
                <span className="font-serif-heading text-lg font-bold text-white">
                  {FIRM_NAME}
                </span>
                <span className="text-[11px] text-amber-400/90 tracking-wider uppercase font-semibold">
                  Barristers &amp; Solicitors
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {FIRM_TAGLINE}. Established in {FIRM_ESTABLISHED}, advising domestic corporations, property developers, manufacturers, and institutions across Nigeria and West Africa.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-[#0a172e] border border-blue-900/60 px-3 py-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Regulated by the Nigerian Bar Association (NBA)</span>
            </div>
          </div>

          {/* Col 2: Navigation & Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Chambers Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Chambers Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Firm History &amp; Judicial Values
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Practice Areas &amp; Statutory Counsel
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('attorneys'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Partners &amp; Senior Advocates
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Interactive Legal Tools &amp; Calculators</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded border border-amber-400/40">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Schedule Retainer &amp; Contact
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenBeginnerGuide}
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Beginner Guide: How to Run It</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Arepo Headquarters */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Arepo Office (Headquarters)
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-neutral-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{OFFICE_LOCATIONS[0].address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-400">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{OFFICE_LOCATIONS[0].phones.join(' · ')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-400">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{OFFICE_LOCATIONS[0].email}</span>
            </div>
            <p className="text-[11px] text-neutral-500 pt-1">
              {OFFICE_LOCATIONS[0].hours}
            </p>
          </div>

          {/* Col 4: Abuja Office */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Abuja Chambers (FCT)
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-neutral-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{OFFICE_LOCATIONS[1].address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-400">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{OFFICE_LOCATIONS[1].phones.join(' · ')}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-400">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{OFFICE_LOCATIONS[1].email}</span>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full px-3 py-2 bg-[#0c1a36] hover:bg-[#122854] text-amber-300 hover:text-amber-200 border border-amber-400/40 rounded-lg text-xs font-semibold transition-all shadow-[0_0_10px_rgba(245,158,11,0.15)] cursor-pointer"
              >
                Book Retainer Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Bar Notice */}
        <div className="mt-12 pt-8 border-t border-blue-900/40 text-xs text-slate-300 leading-relaxed space-y-3">
          <p>
            <strong className="text-white">Disclaimer of Legal Counsel:</strong> The content on this website is provided for general informational purposes only and does not constitute formal legal advice under Nigerian law. Accessing or submitting inquiries via this site does not create an attorney-client relationship. Such a relationship is established strictly upon formal conflict clearance and execution of an engagement retainer letter with {FIRM_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[11px] text-slate-400 border-t border-blue-950">
            <div className="flex items-center gap-2">
              <span>© {FIRM_ESTABLISHED}–2026 {FIRM_NAME}. All rights reserved.</span>
              <span>·</span>
              <span className="text-amber-400/90 font-medium">35, Beachland Road, Arepo, Ogun State &amp; Abuja</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy &amp; NDPA Policy</span>
              <span>·</span>
              <span>Anti-Money Laundering (AML) Compliance</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
