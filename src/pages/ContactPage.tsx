import React, { useState } from 'react';
import { PageId, ContactFormData, FormErrors } from '../types/legal';
import { OFFICE_LOCATIONS, PRACTICE_AREAS, FIRM_NAME } from '../data/legalData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Code2,
  Sparkles,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBeginnerGuide: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenBeginnerGuide,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    practiceArea: PRACTICE_AREAS[0].id,
    urgency: 'routine',
    preferredOffice: 'lagos',
    summary: '',
    privilegeAgreed: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceCode: string;
    submittedAt: string;
    data: ContactFormData;
  } | null>(null);

  const validateField = (field: keyof ContactFormData, value: any): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value || typeof value !== 'string' || value.trim().length < 3) {
          return 'Full legal or corporate name must be at least 3 characters.';
        }
        if (/[0-9]/.test(value)) {
          // Allow entity names with numbers, but warn if too bizarre
        }
        return undefined;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || typeof value !== 'string' || !emailRegex.test(value.trim())) {
          return 'Please provide a valid corporate or personal email address.';
        }
        return undefined;

      case 'phone':
        if (!value || typeof value !== 'string') {
          return 'Telephone number is required.';
        }
        const cleaned = value.replace(/[\s\-\(\)]/g, '');
        // Validate Nigerian prefixes (+234, 080, 081, 090, 070, 091) or international phone
        if (cleaned.length < 8 || cleaned.length > 16) {
          return 'Enter a valid telephone number (e.g. +234 803 400 9100 or 0803 000 1234).';
        }
        return undefined;

      case 'summary':
        if (!value || typeof value !== 'string' || value.trim().length < 20) {
          return 'Please describe your dispute or commercial matter (minimum 20 characters).';
        }
        return undefined;

      case 'privilegeAgreed':
        if (!value) {
          return 'You must acknowledge the preliminary privilege and conflict disclaimer.';
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: keyof ContactFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof ContactFormData)[]).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      practiceArea: true,
      summary: true,
      privilegeAgreed: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate sending brief to backend mailer and store in localStorage
    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const code = `OOC-${new Date().getFullYear()}-${randomId}`;
      const receipt = {
        referenceCode: code,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        data: { ...formData },
      };

      try {
        const newRecord = {
          referenceCode: code,
          clientName: formData.fullName,
          matterTitle: formData.summary.slice(0, 75) + (formData.summary.length > 75 ? '...' : ''),
          practiceArea: formData.practiceArea.replace(/-/g, ' ').toUpperCase(),
          leadCounsel: 'Barrister Oladimeji Ogun, Esq.',
          venue: formData.preferredOffice === 'lagos' ? 'Arepo Chambers, Ogun State' : formData.preferredOffice === 'abuja' ? 'Abuja Regulatory Chambers' : 'Virtual Client Chambers',
          currentStage: 1,
          stageName: 'Intake Received & Conflict Check Pending',
          statusBadge: 'Under Review',
          lastUpdated: 'Just now',
          nextMilestoneDate: 'Conflict Clearance (Within 4 Business Hours)',
          notes: `Inquiry submitted via website contact form by ${formData.fullName}. Urgency: ${formData.urgency.toUpperCase()}.`,
        };
        const existing = JSON.parse(localStorage.getItem('chambers_dockets') || '[]');
        localStorage.setItem('chambers_dockets', JSON.stringify([newRecord, ...existing]));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }

      setSubmissionReceipt(receipt);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 850);
  };

  const handleFillSampleData = () => {
    setFormData({
      fullName: 'Chief Adebayo Adelekan (Arepo Industrial Parks)',
      email: 'a.adelekan@arepoparks.ng',
      phone: '08024273323',
      practiceArea: 'real-estate-property',
      urgency: 'sensitive',
      preferredOffice: 'lagos',
      summary: 'We require urgent legal representation for title perfection and Governor\'s Consent processing for a 12-acre commercial logistics depot located along Beachland Road, Arepo, Ogun State.',
      privilegeAgreed: true,
    });
    setErrors({});
  };

  const handleResetForm = () => {
    setSubmissionReceipt(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      practiceArea: PRACTICE_AREAS[0].id,
      urgency: 'routine',
      preferredOffice: 'lagos',
      summary: '',
      privilegeAgreed: false,
    });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="space-y-16 pb-24">
      
      {/* 1. Page Header */}
      <section className="relative py-20 bg-[#0a162e]/50 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Chambers Registry &amp; Client Intake</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Strict Confidentiality Assured</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
            Initiate a Legal Retainer or Confidential Inquiry
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Submit your matter summary for swift conflict clearance, or contact our Arepo (Ogun State) and Abuja chambers directly for urgent legal representation.
          </p>
        </div>
      </section>

      {/* 2. Main Content Split: Offices Details & Interactive Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Office Details + Production Email Explanation */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Arepo Chambers Card */}
            <div className="p-6 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-heading text-lg font-bold text-white">
                  {OFFICE_LOCATIONS[0].city}
                </h3>
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                  Head Chambers
                </span>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{OFFICE_LOCATIONS[0].name}</p>
                    <p className="text-slate-300">{OFFICE_LOCATIONS[0].address}</p>
                    <p className="text-amber-300/80 text-[11px] mt-0.5">{OFFICE_LOCATIONS[0].landmark}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-200 font-mono">{OFFICE_LOCATIONS[0].phones.join(' · ')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-200">{OFFICE_LOCATIONS[0].email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-[11px] pt-1 border-t border-blue-900/40">
                  <Clock className="w-3.5 h-3.5 text-amber-400/70" />
                  <span>{OFFICE_LOCATIONS[0].hours}</span>
                </div>
              </div>
            </div>

            {/* Abuja Chambers Card */}
            <div className="p-6 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-heading text-lg font-bold text-white">
                  Abuja Chambers (FCT)
                </h3>
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                  Federal Regulatory
                </span>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{OFFICE_LOCATIONS[1].name}</p>
                    <p className="text-slate-300">{OFFICE_LOCATIONS[1].address}</p>
                    <p className="text-amber-300/80 text-[11px] mt-0.5">{OFFICE_LOCATIONS[1].landmark}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-200 font-mono">{OFFICE_LOCATIONS[1].phones.join(' · ')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-200">{OFFICE_LOCATIONS[1].email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-[11px] pt-1 border-t border-blue-900/40">
                  <Clock className="w-3.5 h-3.5 text-amber-400/70" />
                  <span>{OFFICE_LOCATIONS[1].hours}</span>
                </div>
              </div>
            </div>

            {/* Educational Explainer Card: What is Needed to Send Messages */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0a1b38] to-[#071224] border border-amber-400/40 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                <HelpCircle className="w-4 h-4" />
                <span>Beginner Developer Note</span>
              </div>
              <h4 className="font-serif-heading text-base font-bold text-white">
                What is needed to send live emails?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                This website validates all inputs client-side and generates an official legal reference receipt. To deliver real emails to your firm's inbox in production (<code className="text-amber-300 font-mono">jamesgravite@gmail.com</code>), you connect one of two standard solutions:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
                <li>• <strong>Option A (Node Server):</strong> Express endpoint using <code className="text-amber-300 font-mono">nodemailer</code> or SendGrid with SMTP credentials in <code className="text-amber-300 font-mono">.env</code>.</li>
                <li>• <strong>Option B (Client Service):</strong> Direct relay via <strong>EmailJS</strong> or <strong>Web3Forms</strong> with a public API key.</li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={onOpenBeginnerGuide}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Complete Running &amp; Email Guide</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 space-y-6 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-900/50">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    Confidential Retainer Request Form
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fields marked with an asterisk (<span className="text-amber-400">*</span>) are mandatory.
                  </p>
                </div>
                
                {/* Test Helper for User/Beginner */}
                <button
                  type="button"
                  onClick={handleFillSampleData}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer font-medium"
                  title="Fills realistic test data to test submission instantly"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Fill Test Data</span>
                </button>
              </div>

              {/* SUCCESS CONFIRMATION RECEIPT */}
              {submissionReceipt ? (
                <div className="p-6 sm:p-8 rounded-xl bg-[#070e1b] border-2 border-emerald-500/50 space-y-6 text-center shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif-heading text-2xl font-bold text-white">
                      Inquiry Successfully Received
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your legal brief has been logged in our chambers intake registry. An attorney will verify conflict clearance and contact you within 4 business hours.
                    </p>
                  </div>

                  {/* Receipt Details Card */}
                  <div className="p-4 rounded-xl bg-[#0a162e] border border-blue-900/60 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                    <div className="flex items-center justify-between border-b border-blue-900/50 pb-2">
                      <span className="text-slate-400">Intake Reference:</span>
                      <span className="font-mono font-bold text-amber-400">{submissionReceipt.referenceCode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Client / Entity:</span>
                      <span className="text-white font-medium">{submissionReceipt.data.fullName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Email Address:</span>
                      <span className="text-white font-mono">{submissionReceipt.data.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Contact Telephone:</span>
                      <span className="text-white font-mono">{submissionReceipt.data.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Practice Area:</span>
                      <span className="text-white capitalize">{submissionReceipt.data.practiceArea.replace(/-/g, ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Urgency Level:</span>
                      <span className="text-amber-300 font-semibold uppercase text-[11px]">{submissionReceipt.data.urgency}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-blue-900/50 pt-2 text-[11px]">
                      <span className="text-slate-500">Timestamp:</span>
                      <span className="text-slate-400">{submissionReceipt.submittedAt} (WAT)</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => onNavigate('tools')}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-lg text-xs transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Track In Case Registry</span>
                      <span className="font-mono text-[11px]">({submissionReceipt.referenceCode})</span>
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-2.5 bg-[#0f2144] hover:bg-[#163060] text-slate-200 rounded-lg text-xs font-semibold border border-blue-800 transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                    <button
                      onClick={onOpenBeginnerGuide}
                      className="px-4 py-2.5 bg-[#0a162e] hover:bg-[#0f2144] text-slate-300 rounded-lg text-xs border border-blue-900/60 transition-colors cursor-pointer"
                    >
                      Production Email Guide
                    </button>
                  </div>
                </div>
              ) : (
                /* INTERACTIVE FORM */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 block">
                        Full Name / Corporate Entity <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        placeholder="e.g. Chief Babajide Doherty"
                        className={`w-full px-3.5 py-2.5 bg-[#070e1b] border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          touched.fullName && errors.fullName
                            ? 'border-rose-500 focus:border-rose-500 bg-rose-500/10'
                            : 'border-blue-900/70 focus:border-amber-400'
                        }`}
                      />
                      {touched.fullName && errors.fullName && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 block">
                        Corporate / Personal Email <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="counsel@corporation.ng"
                        className={`w-full px-3.5 py-2.5 bg-[#070e1b] border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          touched.email && errors.email
                            ? 'border-rose-500 focus:border-rose-500 bg-rose-500/10'
                            : 'border-blue-900/70 focus:border-amber-400'
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Row 2: Phone and Practice Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 block">
                        Telephone (Nigerian or Intl) <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+234 802 427 3323"
                        className={`w-full px-3.5 py-2.5 bg-[#070e1b] border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          touched.phone && errors.phone
                            ? 'border-rose-500 focus:border-rose-500 bg-rose-500/10'
                            : 'border-blue-900/70 focus:border-amber-400'
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Practice Area Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 block">
                        Practice Area Sector <span className="text-amber-400">*</span>
                      </label>
                      <select
                        value={formData.practiceArea}
                        onChange={(e) => handleChange('practiceArea', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        {PRACTICE_AREAS.map((pa) => (
                          <option key={pa.id} value={pa.id} className="bg-[#0a162e] text-white">
                            {pa.title}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Row 3: Urgency & Preferred Office */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 block">
                        Urgency of Matter
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => handleChange('urgency', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="routine" className="bg-[#0a162e]">Routine Review / Scheduled Transaction</option>
                        <option value="sensitive" className="bg-[#0a162e]">Time-Sensitive (Within 48 Hours)</option>
                        <option value="urgent_court" className="bg-[#0a162e]">Urgent Court Injunction / Hearing Pending</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 block">
                        Preferred Consultation Venue
                      </label>
                      <select
                        value={formData.preferredOffice}
                        onChange={(e) => handleChange('preferredOffice', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="lagos" className="bg-[#0a162e]">Arepo Chambers, Ogun State (Head Chambers)</option>
                        <option value="abuja" className="bg-[#0a162e]">Maitama / CBD Chambers, Abuja</option>
                        <option value="virtual" className="bg-[#0a162e]">Secure Virtual Conference</option>
                      </select>
                    </div>

                  </div>

                  {/* Row 4: Confidential Summary */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-200 block">
                        Confidential Brief Summary <span className="text-amber-400">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {formData.summary.length} / 20 min chars
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={formData.summary}
                      onChange={(e) => handleChange('summary', e.target.value)}
                      onBlur={() => handleBlur('summary')}
                      placeholder="Outline key facts, contractual obligations, counterparties, or statutory timelines involved in your matter..."
                      className={`w-full px-3.5 py-2.5 bg-[#070e1b] border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        touched.summary && errors.summary
                          ? 'border-rose-500 focus:border-rose-500 bg-rose-500/10'
                          : 'border-blue-900/70 focus:border-amber-400'
                      }`}
                    />
                    {touched.summary && errors.summary && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.summary}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 5: Solicitor-Client Privilege Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={formData.privilegeAgreed}
                        onChange={(e) => handleChange('privilegeAgreed', e.target.checked)}
                        onBlur={() => handleBlur('privilegeAgreed')}
                        className="mt-0.5 rounded border-blue-800 bg-[#070e1b] text-amber-400 focus:ring-0 cursor-pointer"
                      />
                      <span>
                        I confirm that the information submitted is truthful. I understand this communication is held in strict professional confidence, and that a formal solicitor-client retainer is established only upon conflict clearance and signing of a legal engagement letter.
                      </span>
                    </label>
                    {touched.privilegeAgreed && errors.privilegeAgreed && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.privilegeAgreed}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Average partner response time: &lt; 4 business hours</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-neutral-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 cursor-pointer whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Inquiry to Registry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Retainer Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
