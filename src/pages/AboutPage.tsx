import React from 'react';
import { PageId } from '../types/legal';
import {
  FIRM_NAME,
  FIRM_ESTABLISHED,
  LAW_LIBRARY_IMAGE,
  HERO_IMAGE,
  OFFICE_LOCATIONS,
  FIRM_STATISTICS,
  FIRM_LOGO,
  BARRISTER_OLADIMEJI_PHOTO,
} from '../data/legalData';
import { FirmLogo } from '../components/FirmLogo';
import {
  Scale,
  Award,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Phone,
  Mail,
  GraduationCap,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <div className="space-y-20 pb-24">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-[#0a162e]/50 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>About The Chambers</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Founded {FIRM_ESTABLISHED}</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
            Distinguished Advocacy, Property Title Mastery &amp; Strategic Commercial Counsel
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {FIRM_NAME} is a premier Nigerian commercial practice combining robust courtroom advocacy with high-velocity transactional and property title perfection across Ogun State, Lagos, and Abuja.
          </p>
        </div>
      </section>

      {/* 2. Heritage & Genesis Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Chambers Heritage
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                Built on Integrity, Mastered in Nigeria's Superior Courts
              </h2>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Established under the leadership of Barrister Oladimeji Ogun, our practice is anchored on uncompromising ethical standards, forensic attention to legal details, and aggressive defense of our clients' commercial and property interests. Situated strategically along the vibrant Lagos-Ibadan industrial axis at Beachland Road, Arepo, we serve as trusted counsel to corporations, property developers, institutions, and high-net-worth individuals.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              From our head chambers in Arepo to our liaison practice in Abuja, our litigation and commercial team manages complex contractual disputes, land regularisation under the Land Use Act, Governor's Consent perfection, and Corporate Affairs Commission (CAC) compliance under CAMA 2020.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-900/40">
              <div>
                <div className="font-serif-heading text-2xl font-bold text-amber-400 tabular-nums">1998</div>
                <div className="text-xs text-slate-400">Chambers Foundation</div>
              </div>
              <div>
                <div className="font-serif-heading text-2xl font-bold text-amber-400 tabular-nums">NBA</div>
                <div className="text-xs text-slate-400">Nigerian Bar Association Standing</div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-blue-900/50 shadow-xl">
            <img
              src={LAW_LIBRARY_IMAGE}
              alt="Nigerian Law Library and Supreme Court Reports"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="p-4 bg-[#0a162e] border-t border-blue-900/50 text-xs text-slate-300 flex items-center justify-between">
              <span>Chambers Archives &amp; Nigerian Law Reports</span>
              <span className="text-amber-400 font-semibold">Arepo Chambers, Ogun State</span>
            </div>
          </div>

        </div>
      </section>

      {/* Chambers Principal & Founder Spotlight: Barrister Oladimeji Ogun, Esq. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1a36] via-[#09152b] to-[#050d1a] border-2 border-amber-400/60 p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {/* Subtle gold glow corner */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Barrister Oladimeji Ogun Official Photograph */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-[#070e1b]">
                  <img
                    src={BARRISTER_OLADIMEJI_PHOTO}
                    alt="Barrister Oladimeji Ogun, Esq. - Principal Partner"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="mt-4 text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Chambers Leadership
                </div>
                <p className="text-xs text-slate-300 font-serif-heading font-medium">
                  Principal Partner · Oladimeji Ogun &amp; Co.
                </p>
              </div>
            </div>

            {/* Counsel Bio & Jurisprudential Record */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  <span>Chambers Founder</span>
                  <span aria-hidden="true" className="text-slate-500">·</span>
                  <span>Supreme Court of Nigeria</span>
                </div>
                <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white leading-tight">
                  Barrister Oladimeji Ogun, Esq.
                </h2>
                <p className="text-amber-400 text-sm font-semibold">
                  Principal Partner · Barrister &amp; Solicitor of the Supreme Court of Nigeria
                </p>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                With over 26 years of robust courtroom advocacy and transactional dexterity, Barrister Oladimeji Ogun leads the firm&apos;s commercial dispute resolution, land title perfection, and corporate governance practice. He routinely advises corporate conglomerates, manufacturers, and real estate developers across Ogun State, Lagos, and Abuja.
              </p>

              {/* Distinctions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#060e1d]/90 border border-blue-900/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Commercial Litigation</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Formidable defense in high-stakes contract, banking, and appellate commercial disputes before Nigerian Superior Courts.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#060e1d]/90 border border-blue-900/60 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Building className="w-4 h-4 text-amber-400" />
                    <span>Land Title Perfection</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Forensic due diligence, Governor&apos;s Consent, survey charting, and C of O processing along the Lagos-Ibadan corridor.
                  </p>
                </div>
              </div>

              {/* Direct Reach */}
              <div className="pt-4 border-t border-blue-900/50 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Direct Chambers Line: <strong className="text-white">08024273323, 07062825095</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Chambers Mail: <strong className="text-white">jamesgravite@gmail.com</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/2348024273323?text=Hello%20Barrister%20Oladimeji%20Ogun%2C%20I%20am%20reaching%20out%20from%20your%20website%20regarding%20legal%20counsel."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0f2144] hover:bg-[#163060] text-amber-300 rounded-xl text-xs font-semibold border border-amber-400/50 transition-colors"
                  >
                    WhatsApp Barrister Ogun
                  </a>
                  <button
                    onClick={onOpenConsultation}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
                  >
                    Schedule Consultation
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Official Chambers Seal & Web Logo Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1a36] via-[#081226] to-[#050c18] border-2 border-amber-400/40 p-8 sm:p-12 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Logo Emblem Presentation */}
            <div className="md:col-span-5 flex flex-col items-center text-center justify-center space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 blur-sm opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl bg-[#070e1b] flex items-center justify-center">
                  <img
                    src={FIRM_LOGO}
                    alt="Oladimeji Ogun & Co. Official Chambers Crest"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Official Chambers Web Crest
                </div>
                <p className="text-[11px] text-slate-400">
                  Registered Insignia · Oladimeji Ogun &amp; Co.
                </p>
              </div>
            </div>

            {/* Emblem Heraldry & Symbolism */}
            <div className="md:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Corporate &amp; Web Identity
                </span>
                <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  The Official Insignia of Oladimeji Ogun &amp; Co.
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our emblem unites the prestigious 3D gold &ldquo;OG&rdquo; legal monogram with the core pillars of our Nigerian practice: <span className="text-amber-400 font-semibold italic">&ldquo;... Your Legal Solutions, Our Priority&rdquo;</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#060e1d]/80 border border-blue-900/50 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Advisory</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Preventative legal counsel, contract risk audits, and strategic regulatory compliance under Nigerian statutory codes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#060e1d]/80 border border-blue-900/50 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Litigation</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Formidable courtroom advocacy across State High Courts, the Federal High Court, Court of Appeal, and Supreme Court.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#060e1d]/80 border border-blue-900/50 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Building className="w-4 h-4 text-amber-400" />
                    <span>Corporate</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    CAMA 2020 governance, CAC enterprise incorporation, joint ventures, and international investment structuring.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#060e1d]/80 border border-blue-900/50 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Real Estate</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Forensic land title perfection, Governor&apos;s Consent, Certificate of Occupancy (C of O), and property acquisition.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The SAN Rank: Significance in Nigerian Law */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0a162e]/90 border border-blue-900/50 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-white">
                What Senior Advocate of Nigeria (SAN) Means for Your Case
              </h3>
              <p className="text-xs text-slate-400">
                The pinnacle of advocacy and distinction at the Nigerian Bar
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            The rank of <strong>Senior Advocate of Nigeria (SAN)</strong> is an exclusive legal honor conferred by the Legal Practitioners' Privileges Committee (LPPC) upon legal practitioners of at least 10 years standing who have achieved distinction as courtroom advocates. Comparable to the rank of King's Counsel (KC) in the United Kingdom, SANs enjoy right of inner bar audience and priority in all superior courts of record in Nigeria, from the Federal High Court to the Supreme Court.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#070e1b] rounded-xl border border-blue-900/60 space-y-1">
              <div className="text-white font-semibold text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Inner Bar Privilege
              </div>
              <p className="text-[11px] text-slate-400">
                Priority hearing before Supreme Court and Court of Appeal panels.
              </p>
            </div>

            <div className="p-4 bg-[#070e1b] rounded-xl border border-blue-900/60 space-y-1">
              <div className="text-white font-semibold text-xs flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                Peer-Certified Mastery
              </div>
              <p className="text-[11px] text-slate-400">
                Rigorously vetted track record in complex contested appeals.
              </p>
            </div>

            <div className="p-4 bg-[#070e1b] rounded-xl border border-blue-900/60 space-y-1">
              <div className="text-white font-semibold text-xs flex items-center gap-1.5">
                <Building className="w-4 h-4 text-amber-400" />
                Institutional Gravitas
              </div>
              <p className="text-[11px] text-slate-400">
                Commanding judicial respect and dispute de-escalation influence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic Presence: Lagos & Abuja */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Dual Chambers Structure
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
            Present in Nigeria's Financial Hub and Regulatory Capital
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Our offices are purpose-positioned to give clients seamless access to federal ministries, appellate court complexes, and commercial financial institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFICE_LOCATIONS.map((loc, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif-heading text-xl font-bold text-white">
                  {loc.city}
                </h3>
                {loc.isHeadquarters && (
                  <span className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                    Headquarters
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-200">
                <p className="font-semibold text-white">{loc.name}</p>
                <p className="text-slate-300">{loc.address}</p>
                <p className="text-amber-300/80 italic">Landmark: {loc.landmark}</p>
              </div>

              <div className="pt-3 border-t border-blue-900/40 space-y-1 text-xs text-slate-400">
                <div>Phone: <strong className="text-slate-200">{loc.phones.join(', ')}</strong></div>
                <div>Email: <strong className="text-slate-200">{loc.email}</strong></div>
                <div>Chambers Hours: <span className="text-slate-300">{loc.hours}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Our Ethical Philosophy
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
            The Four Pillars of Oladimeji Ogun &amp; Co.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#0a162e]/70 border border-blue-900/40 hover:border-amber-400/40 transition-colors space-y-2 shadow-lg">
            <div className="text-amber-400 font-serif-heading text-lg font-bold">01. Rigor</div>
            <h4 className="text-white text-sm font-semibold">Exhaustive Legal Research</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every pleading and opinion is grounded in binding Nigerian appellate authorities, statutory analysis, and international best practice.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a162e]/70 border border-blue-900/40 hover:border-amber-400/40 transition-colors space-y-2 shadow-lg">
            <div className="text-amber-400 font-serif-heading text-lg font-bold">02. Integrity</div>
            <h4 className="text-white text-sm font-semibold">Uncompromising Ethics</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We practice strictly within the Rules of Professional Conduct for Legal Practitioners, maintaining absolute attorney-client privilege.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a162e]/70 border border-blue-900/40 hover:border-amber-400/40 transition-colors space-y-2 shadow-lg">
            <div className="text-amber-400 font-serif-heading text-lg font-bold">03. Speed</div>
            <h4 className="text-white text-sm font-semibold">Commercial Velocity</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Business moves quickly. We prioritize accelerated turnarounds on contract drafts, regulatory filings, and emergency injunctions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a162e]/70 border border-blue-900/40 hover:border-amber-400/40 transition-colors space-y-2 shadow-lg">
            <div className="text-amber-400 font-serif-heading text-lg font-bold">04. Access</div>
            <h4 className="text-white text-sm font-semibold">Partner-Led Attention</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Retained clients deal directly with senior partners, ensuring hands-on strategic oversight throughout the mandate lifecycle.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0a162e] via-[#0e2147] to-[#071126] border-2 border-blue-800/60 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-heading text-xl font-bold text-white">
              Connect With Our Chambers Leadership
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Review our specialized practice groups or schedule an introductory retainer conference.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('services')}
              className="px-5 py-2.5 bg-[#0f2144] hover:bg-[#163060] text-white rounded-xl text-xs font-semibold border border-blue-700 transition-colors cursor-pointer"
            >
              View Services
            </button>
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
