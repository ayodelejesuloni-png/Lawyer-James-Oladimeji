import React from 'react';
import { Attorney } from '../types/legal';
import { X, Award, GraduationCap, Briefcase, Mail, Phone, Scale } from 'lucide-react';

interface AttorneyModalProps {
  attorney: Attorney | null;
  onClose: () => void;
  onBookConsultation: (attorneyName?: string) => void;
}

export const AttorneyModal: React.FC<AttorneyModalProps> = ({
  attorney,
  onClose,
  onBookConsultation,
}) => {
  if (!attorney) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#040813]/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0a162e] border-2 border-blue-900/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-blue-900/50 flex items-center justify-between bg-[#070e1b]/80">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
              Counsel Profile Dossier
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#0f2144] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Top bio card */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src={attorney.imageUrl}
              alt={attorney.name}
              referrerPolicy="no-referrer"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover object-top border-2 border-blue-800/60 shadow-md shrink-0 bg-[#070e1b]"
            />
            <div className="space-y-2">
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-white">
                {attorney.name}
              </h3>
              <p className="text-amber-400 text-xs sm:text-sm font-semibold">
                {attorney.rank}
              </p>
              <p className="text-slate-300 text-xs">
                Specialization: <span className="text-white font-medium">{attorney.specialization}</span> · <span className="tabular-nums font-mono text-amber-300">{attorney.experienceYears} Years</span> Bar Experience
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <a
                  href={`mailto:${attorney.email}`}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{attorney.email}</span>
                </a>
                <a
                  href={`tel:${attorney.phone}`}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{attorney.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Professional Biography
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {attorney.bio}
            </p>
          </div>

          {/* Admissions & Conferred Honors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Bar Admissions &amp; Conferred Honors</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {attorney.admissions.map((adm, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{adm}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Legal Education</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {attorney.education.map((edu, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Landmark Matters */}
          <div className="p-4 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-xs">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Landmark Transactions &amp; Jurisprudence</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              {attorney.landmarkCases.map((cs, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 font-bold">»</span>
                  <span className="leading-relaxed">{cs}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Action Bar */}
        <div className="p-4 border-t border-blue-900/50 bg-[#070e1b]/80 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Profile
          </button>
          <button
            onClick={() => {
              onClose();
              onBookConsultation(attorney.name);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            Retain or Consult with {attorney.name.split(' ')[0]} {attorney.name.split(' ')[1]}
          </button>
        </div>

      </div>
    </div>
  );
};
