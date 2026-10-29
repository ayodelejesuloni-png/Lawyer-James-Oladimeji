import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert, Scale, Clock, Send } from 'lucide-react';
import { PRACTICE_AREAS } from '../data/legalData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAttorney?: string;
  initialSummary?: string;
  onComplete: () => void;
  onTrackDocket?: (code: string) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultAttorney,
  initialSummary,
  onComplete,
  onTrackDocket,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [practiceArea, setPracticeArea] = useState(PRACTICE_AREAS[0].id);
  const [urgency, setUrgency] = useState<'routine' | 'sensitive' | 'urgent_court'>('routine');
  const [preferredOffice, setPreferredOffice] = useState<'lagos' | 'abuja' | 'virtual'>('lagos');
  const [summary, setSummary] = useState(initialSummary || '');
  const [privilegeAgreed, setPrivilegeAgreed] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  // Sync initial summary when opened
  React.useEffect(() => {
    if (isOpen && initialSummary) {
      setSummary(initialSummary);
    }
  }, [isOpen, initialSummary]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Full legal or corporate name is required (min 3 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Valid corporate or personal email address is required';
    }

    // Nigerian or international phone
    const cleanedPhone = phone.replace(/[\s-]/g, '');
    if (!cleanedPhone || cleanedPhone.length < 8) {
      newErrors.phone = 'Valid phone number is required (e.g., +234 803 123 4567)';
    }

    if (!summary.trim() || summary.trim().length < 15) {
      newErrors.summary = 'Please provide brief details of your matter (min 15 characters)';
    }

    if (!privilegeAgreed) {
      newErrors.privilegeAgreed = 'Please confirm the privilege disclaimer before booking';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch and persist to localStorage
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `OOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      try {
        const newRecord = {
          referenceCode: code,
          clientName: fullName,
          matterTitle: summary.slice(0, 75) + (summary.length > 75 ? '...' : ''),
          practiceArea: practiceArea.replace(/-/g, ' ').toUpperCase(),
          leadCounsel: defaultAttorney || 'Barrister Oladimeji Ogun, Esq.',
          venue: preferredOffice === 'lagos' ? 'Arepo Chambers, Ogun State' : preferredOffice === 'abuja' ? 'Abuja Regulatory Chambers' : 'Virtual Client Chambers',
          currentStage: 1,
          stageName: 'Brief Logged & Conflict Check Pending',
          statusBadge: 'Under Review',
          lastUpdated: 'Just now',
          nextMilestoneDate: 'Conflict Clearance (Within 4 Business Hours)',
          notes: `Confidential retainer intake logged online by ${fullName}. Urgency: ${urgency.toUpperCase()}.`,
        };
        const existing = JSON.parse(localStorage.getItem('chambers_dockets') || '[]');
        localStorage.setItem('chambers_dockets', JSON.stringify([newRecord, ...existing]));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }

      setSubmissionSuccess(code);
      onComplete();
    }, 700);
  };

  const handleResetAndClose = () => {
    setSubmissionSuccess(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setSummary('');
    setPrivilegeAgreed(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#040813]/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0a162e] border-2 border-blue-900/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-blue-900/50 flex items-center justify-between bg-[#070e1b]/80">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-white">
                Schedule a Retainer Consultation
              </h3>
              <p className="text-xs text-slate-400">
                {defaultAttorney ? `Direct inquiry for ${defaultAttorney}` : 'Oladimeji Ogun and Co. Chambers'}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#0f2144] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success Confirmation */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submissionSuccess ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif-heading text-xl font-bold text-white">
                  Consultation Request Dispatched
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your legal inquiry has been registered with our senior partners under case intake reference:
                </p>
                <div className="p-3 bg-[#070e1b] rounded-xl border border-blue-900/60 max-w-xs mx-auto">
                  <span className="font-mono text-base font-bold text-amber-400 tracking-wider">
                    {submissionSuccess}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#070e1b]/90 border border-blue-900/50 rounded-xl text-left text-xs text-slate-300 space-y-2 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Next Steps for Legal Clearance:</span>
                </div>
                <p>1. Conflict clearance will be performed within 4 business hours.</p>
                <p>2. A partner or managing associate will contact you via email ({email || 'provided address'}) or telephone (08024273323 / 07062825095).</p>
                <p>3. Virtual or in-person conference scheduled at our 35 Beachland Road, Arepo chambers.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {onTrackDocket && submissionSuccess && (
                  <button
                    onClick={() => {
                      const c = submissionSuccess;
                      handleResetAndClose();
                      onTrackDocket(c);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
                  >
                    Track This Docket in Case Registry
                  </button>
                )}
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#0f2144] hover:bg-[#163060] text-slate-200 rounded-xl text-xs font-semibold border border-blue-800 transition-colors cursor-pointer"
                >
                  Close &amp; Return to Chambers
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-200">
                    Full Name / Corporate Entity <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chief Olumide Adeyemi or First Petro Ltd"
                    className={`w-full px-3 py-2 bg-[#070e1b] border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/10' : 'border-blue-900/70 focus:border-amber-400'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-400">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-200">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="counsel@corporate.ng"
                    className={`w-full px-3 py-2 bg-[#070e1b] border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/10' : 'border-blue-900/70 focus:border-amber-400'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-200">
                    Telephone (Nigerian or Intl) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 802 427 3323"
                    className={`w-full px-3 py-2 bg-[#070e1b] border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/10' : 'border-blue-900/70 focus:border-amber-400'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400">{errors.phone}</p>}
                </div>

                {/* Practice Area */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-200">
                    Practice Area / Matter Type
                  </label>
                  <select
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    className="w-full px-3 py-2 bg-[#070e1b] border border-blue-900/70 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {PRACTICE_AREAS.map((pa) => (
                      <option key={pa.id} value={pa.id} className="bg-[#0a162e] text-white">
                        {pa.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Urgency and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-200">
                    Matter Urgency
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#070e1b] border border-blue-900/70 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="routine" className="bg-[#0a162e]">Routine Advisory / Contract Review</option>
                    <option value="sensitive" className="bg-[#0a162e]">Time-Sensitive Corporate Mandate</option>
                    <option value="urgent_court" className="bg-[#0a162e]">Urgent Court Hearing / Injunction Needed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-200">
                    Preferred Chambers Venue
                  </label>
                  <select
                    value={preferredOffice}
                    onChange={(e) => setPreferredOffice(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#070e1b] border border-blue-900/70 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="lagos" className="bg-[#0a162e]">35, Beachland Road, Arepo Chambers (Ogun/Lagos)</option>
                    <option value="abuja" className="bg-[#0a162e]">Maitama / CBD, Abuja Chambers</option>
                    <option value="virtual" className="bg-[#0a162e]">Secure Virtual Conference (Encrypted)</option>
                  </select>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-200">
                    Brief Matter Summary <span className="text-amber-400">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {summary.length} characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Outline key facts, contractual background, counterparties, or statutory timelines involved..."
                  className={`w-full px-3 py-2 bg-[#070e1b] border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.summary ? 'border-rose-500/80 focus:border-rose-500 bg-rose-500/10' : 'border-blue-900/70 focus:border-amber-400'
                  }`}
                />
                {errors.summary && <p className="text-[11px] text-rose-400">{errors.summary}</p>}
              </div>

              {/* Privilege Acknowledgement */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={privilegeAgreed}
                    onChange={(e) => setPrivilegeAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-blue-800 bg-[#070e1b] text-amber-400 focus:ring-0 cursor-pointer"
                  />
                  <span>
                    I understand this inquiry is confidential but does not form a binding solicitor-client retainer until formal conflict clearance is certified by Oladimeji Ogun and Co.
                  </span>
                </label>
                {errors.privilegeAgreed && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.privilegeAgreed}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-blue-900/50">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-neutral-950 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Retainer Inquiry</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
