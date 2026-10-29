import React, { useState, useEffect } from 'react';
import { PageId, PropertyLocationKey, TitleDocumentType, DocketRecord } from '../types/legal';
import {
  PROPERTY_LOCATIONS,
  TITLE_DOCUMENT_PROFILES,
  calculatePropertyStatutoryFees,
  DEFAULT_DEMO_DOCKETS,
} from '../data/interactiveLegalData';
import {
  Calculator,
  Building,
  Search,
  Scale,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  ArrowRight,
  ShieldAlert,
  FileCheck,
  Send,
  Phone,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  TrendingUp,
  MapPin,
  RefreshCw,
} from 'lucide-react';

interface ToolsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (attorneyName?: string, initialSummary?: string) => void;
}

type ToolTab = 'property_calc' | 'cama_health' | 'case_tracker' | 'dispute_matrix' | 'js_playground';

export const ToolsPage: React.FC<ToolsPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<ToolTab>('property_calc');

  // ==========================================
  // TAB 1: PROPERTY CALCULATOR STATE
  // ==========================================
  const [propLocation, setPropLocation] = useState<PropertyLocationKey>('ogun_arepo');
  const [propTitle, setPropTitle] = useState<TitleDocumentType>('deed_survey_only');
  const [propValue, setPropValue] = useState<number>(45000000); // ₦45,000,000
  const [propPlots, setPropPlots] = useState<number>(2);
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({
    survey: true,
    deed: true,
    tax: false,
    id: true,
    site: false,
  });

  const propertyCalcResult = calculatePropertyStatutoryFees(
    propLocation,
    propTitle,
    propValue,
    propPlots
  );

  const docChecklistItems = [
    { key: 'survey', label: 'Registered Perimeter Survey Plan (with Beacon Coordinates)' },
    { key: 'deed', label: 'Duly Executed Deed of Assignment from Vendor / Assignor' },
    { key: 'tax', label: 'Valid 3-Year Tax Clearance Certificate (TCC) of Parties' },
    { key: 'id', label: 'Valid Means of Identification (NIN / International Passport / CAC)' },
    { key: 'site', label: 'Site Inspection Report & Cadastral Coordinates Charting' },
  ];

  const docsReadyCount = Object.values(checkedDocs).filter(Boolean).length;
  const docsReadinessPercent = Math.round((docsReadyCount / docChecklistItems.length) * 100);

  const handlePrintPropertyBrief = () => {
    window.print();
  };

  const handleForwardPropertyToCounsel = () => {
    const loc = PROPERTY_LOCATIONS.find((l) => l.key === propLocation)?.label;
    const title = TITLE_DOCUMENT_PROFILES.find((p) => p.key === propTitle)?.title;
    const summary = `Property Due Diligence Inquiry for ${loc}. Title held: ${title}. Consideration: ₦${propValue.toLocaleString('en-NG')}, Plots: ${propPlots}. Estimated Statutory & Legal Perfection: ₦${propertyCalcResult.breakdown.estimatedTotal.toLocaleString('en-NG')}. Readiness: ${docsReadinessPercent}%.`;
    onOpenConsultation('Barrister Oladimeji Ogun, Esq.', summary);
  };

  // ==========================================
  // TAB 2: CAMA 2020 CORPORATE HEALTH STATE
  // ==========================================
  const [camaType, setCamaType] = useState<'ltd' | 'bn' | 'it' | 'plc'>('ltd');
  const [camaYearInc, setCamaYearInc] = useState<number>(2019);
  const [camaLastAnnualReturn, setCamaLastAnnualReturn] = useState<number>(2021);
  const [camaPscUpdated, setCamaPscUpdated] = useState<boolean>(false);
  const [camaShareCapital, setCamaShareCapital] = useState<number>(1000000); // ₦1M
  const [camaHasMinDirectors, setCamaHasMinDirectors] = useState<boolean>(true);

  // Compute CAMA health
  const currentYear = 2026;
  const yearsDefault = Math.max(0, currentYear - 1 - camaLastAnnualReturn);
  const penaltyPerYear = camaType === 'ltd' ? 15000 : camaType === 'plc' ? 50000 : 7500;
  const totalCacPenalties = yearsDefault * penaltyPerYear;

  let camaHealthScore = 100;
  if (yearsDefault > 0) camaHealthScore -= Math.min(50, yearsDefault * 15);
  if (!camaPscUpdated) camaHealthScore -= 25;
  if (camaType === 'ltd' && camaShareCapital < 2000000) camaHealthScore -= 15;
  if (!camaHasMinDirectors) camaHealthScore -= 15;
  camaHealthScore = Math.max(10, camaHealthScore);

  // ==========================================
  // TAB 3: CASE DOCKET TRACKER STATE
  // ==========================================
  const [docketQuery, setDocketQuery] = useState<string>('OOC-2026-7821');
  const [activeDocket, setActiveDocket] = useState<DocketRecord | null>(DEFAULT_DEMO_DOCKETS[0]);
  const [docketSearchError, setDocketSearchError] = useState<string | null>(null);
  const [allDockets, setAllDockets] = useState<DocketRecord[]>(DEFAULT_DEMO_DOCKETS);

  // Load any user-submitted dockets from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('chambers_dockets');
      if (stored) {
        const parsed: DocketRecord[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllDockets([...parsed, ...DEFAULT_DEMO_DOCKETS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSearchDocket = (codeToSearch?: string) => {
    const q = (codeToSearch || docketQuery).trim().toUpperCase();
    if (!q) {
      setDocketSearchError('Please enter a docket or inquiry reference code.');
      return;
    }

    const found = allDockets.find(
      (d) => d.referenceCode.toUpperCase() === q || d.clientName.toLowerCase().includes(q.toLowerCase())
    );

    if (found) {
      setActiveDocket(found);
      setDocketSearchError(null);
    } else {
      setActiveDocket(null);
      setDocketSearchError(`No chambers docket found for "${q}". Please check the code or contact chambers registry.`);
    }
  };

  // ==========================================
  // TAB 4: DISPUTE STRATEGY MATRIX STATE
  // ==========================================
  const [disputeUrgency, setDisputeUrgency] = useState<'emergency' | 'breach' | 'debt'>('emergency');
  const [disputeClaimSize, setDisputeClaimSize] = useState<'low' | 'medium' | 'high'>('high');
  const [disputeArbitrationClause, setDisputeArbitrationClause] = useState<'yes' | 'no' | 'unsure'>('no');
  const [disputeRelationship, setDisputeRelationship] = useState<'preserve' | 'adversarial'>('adversarial');

  // ==========================================
  // TAB 5: JAVASCRIPT PLAYGROUND STATE
  // ==========================================
  const [testPhoneInput, setTestPhoneInput] = useState<string>('08024273323');
  const [testCurrencyInput, setTestCurrencyInput] = useState<number>(75000000);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Phone validator logic
  const cleanedPhone = testPhoneInput.replace(/[\s\-\(\)]/g, '');
  const isNigerianPhone = /^(\+?234|0)[789][01]\d{8}$/.test(cleanedPhone);

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-16 pb-24">
      
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-[#0a162e]/50 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Legal Engineering Suite</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Powered by Client-Side JavaScript</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
            Interactive Calculators, Compliance Diagnostics &amp; Case Registry
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Directly test statutory title perfection fees under Nigerian land regulations, evaluate CAMA 2020 corporate standing, and track live chamber dockets.
          </p>
        </div>
      </section>

      {/* 2. Interactive Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-2 bg-[#081224] border border-blue-900/60 rounded-2xl">
          
          <button
            onClick={() => setActiveTab('property_calc')}
            className={`p-3.5 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'property_calc'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-[#0f2144]'
            }`}
          >
            <Calculator className={`w-5 h-5 shrink-0 ${activeTab === 'property_calc' ? 'text-slate-950' : 'text-amber-400'}`} />
            <div>
              <span className="text-xs block font-semibold leading-tight">Property Title &amp; Cost</span>
              <span className={`text-[10px] block ${activeTab === 'property_calc' ? 'text-slate-800' : 'text-slate-400'}`}>Gov. Consent &amp; Risk</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('cama_health')}
            className={`p-3.5 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'cama_health'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-[#0f2144]'
            }`}
          >
            <Building className={`w-5 h-5 shrink-0 ${activeTab === 'cama_health' ? 'text-slate-950' : 'text-amber-400'}`} />
            <div>
              <span className="text-xs block font-semibold leading-tight">CAMA 2020 Health</span>
              <span className={`text-[10px] block ${activeTab === 'cama_health' ? 'text-slate-800' : 'text-slate-400'}`}>CAC &amp; PSC Diagnostic</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('case_tracker')}
            className={`p-3.5 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'case_tracker'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-[#0f2144]'
            }`}
          >
            <Search className={`w-5 h-5 shrink-0 ${activeTab === 'case_tracker' ? 'text-slate-950' : 'text-amber-400'}`} />
            <div>
              <span className="text-xs block font-semibold leading-tight">Docket Tracker</span>
              <span className={`text-[10px] block ${activeTab === 'case_tracker' ? 'text-slate-800' : 'text-slate-400'}`}>Track Retainer Status</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('dispute_matrix')}
            className={`p-3.5 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'dispute_matrix'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-[#0f2144]'
            }`}
          >
            <Scale className={`w-5 h-5 shrink-0 ${activeTab === 'dispute_matrix' ? 'text-slate-950' : 'text-amber-400'}`} />
            <div>
              <span className="text-xs block font-semibold leading-tight">Dispute Matrix</span>
              <span className={`text-[10px] block ${activeTab === 'dispute_matrix' ? 'text-slate-800' : 'text-slate-400'}`}>Litigation vs. ADR</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('js_playground')}
            className={`p-3.5 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'js_playground'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-[#0f2144]'
            }`}
          >
            <Code2 className={`w-5 h-5 shrink-0 ${activeTab === 'js_playground' ? 'text-slate-950' : 'text-amber-400'}`} />
            <div>
              <span className="text-xs block font-semibold leading-tight">JS Code Inspector</span>
              <span className={`text-[10px] block ${activeTab === 'js_playground' ? 'text-slate-800' : 'text-slate-400'}`}>Beginner Tech Playground</span>
            </div>
          </button>

        </div>
      </section>

      {/* 3. Tab Contents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* TAB 1: PROPERTY TITLE & STATUTORY COST CALCULATOR        */}
        {/* ========================================================= */}
        {activeTab === 'property_calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controls: Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-6">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    Property Title Due Diligence Parameters
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Select jurisdiction, existing root of title, and transaction value.
                  </p>
                </div>

                {/* Location Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200 block">
                    Property Jurisdiction / Land Bureau
                  </label>
                  <select
                    value={propLocation}
                    onChange={(e) => setPropLocation(e.target.value as PropertyLocationKey)}
                    className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {PROPERTY_LOCATIONS.map((loc) => (
                      <option key={loc.key} value={loc.key} className="bg-[#0a162e]">
                        {loc.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-amber-300/80">
                    Authority: {PROPERTY_LOCATIONS.find((l) => l.key === propLocation)?.bureau}
                  </p>
                </div>

                {/* Title Document Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200 block">
                    Current Document / Root of Title Held
                  </label>
                  <select
                    value={propTitle}
                    onChange={(e) => setPropTitle(e.target.value as TitleDocumentType)}
                    className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {TITLE_DOCUMENT_PROFILES.map((prof) => (
                      <option key={prof.key} value={prof.key} className="bg-[#0a162e]">
                        {prof.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Consideration Value Slider & Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-200">
                      Transaction Consideration / Land Value (NGN)
                    </label>
                    <span className="font-mono font-bold text-amber-400">
                      ₦{propValue.toLocaleString('en-NG')}
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min={5000000}
                    max={500000000}
                    step={2500000}
                    value={propValue}
                    onChange={(e) => setPropValue(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-[#070e1b] rounded-lg"
                  />

                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[15000000, 35000000, 75000000, 150000000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setPropValue(val)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] border font-mono transition-colors cursor-pointer ${
                          propValue === val
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                            : 'bg-[#070e1b] border-blue-900/60 text-slate-300 hover:text-white'
                        }`}
                      >
                        ₦{(val / 1000000).toFixed(0)}M
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Plots */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-200">
                      Land Parcel Size (Plots / Standard 648 sqm)
                    </label>
                    <span className="font-mono text-amber-300 font-bold">{propPlots} Plots</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    step={1}
                    value={propPlots}
                    onChange={(e) => setPropPlots(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-[#070e1b] rounded-lg"
                  />
                </div>

                {/* Interactive Document Checklist */}
                <div className="pt-2 border-t border-blue-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Documentation Readiness Checklist</span>
                    <span className="text-xs font-mono font-bold text-amber-400">{docsReadinessPercent}% Ready</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#070e1b] rounded-full h-2 overflow-hidden border border-blue-900/60">
                    <div
                      className={`h-full transition-all duration-300 ${
                        docsReadinessPercent >= 80
                          ? 'bg-emerald-400'
                          : docsReadinessPercent >= 50
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${docsReadinessPercent}%` }}
                    />
                  </div>

                  <div className="space-y-2 pt-1 text-xs text-slate-300">
                    {docChecklistItems.map((item) => (
                      <label key={item.key} className="flex items-start gap-2.5 cursor-pointer hover:text-white">
                        <input
                          type="checkbox"
                          checked={!!checkedDocs[item.key]}
                          onChange={(e) => setCheckedDocs((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                          className="mt-0.5 rounded border-blue-800 bg-[#070e1b] text-amber-400 focus:ring-0 cursor-pointer"
                        />
                        <span className="leading-snug">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Display: Risk Meter & Cost Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Risk Assessment Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-5">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-900/50">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      Title Security &amp; Legal Exposure Meter
                    </span>
                    <h4 className="font-serif-heading text-xl font-bold text-white mt-0.5">
                      {propertyCalcResult.riskRating}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
                      {propertyCalcResult.riskScore}/100
                    </span>
                    <span className="text-[11px] text-slate-400">Risk Score</span>
                  </div>
                </div>

                {/* Animated Risk Gauge */}
                <div className="space-y-2">
                  <div className="w-full bg-[#070e1b] rounded-full h-3.5 overflow-hidden border border-blue-900/60 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        propertyCalcResult.riskScore <= 25
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                          : propertyCalcResult.riskScore <= 50
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                          : propertyCalcResult.riskScore <= 75
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                          : 'bg-gradient-to-r from-rose-600 to-red-500'
                      }`}
                      style={{ width: `${propertyCalcResult.riskScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>0 (Certificate of Occupancy)</span>
                    <span>50 (Gazette / Excision)</span>
                    <span>100 (Unregistered Customary Receipt)</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#070e1b] p-4 rounded-xl border border-blue-900/60">
                  {propertyCalcResult.riskDescription}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Estimated Statutory Perfection Timeline: </span>
                  <strong className="text-amber-300 font-mono font-bold">{propertyCalcResult.estimatedTimelineWeeks}</strong>
                </div>

              </div>

              {/* Statutory Fee Breakdown Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-blue-900/50">
                  <div>
                    <h4 className="font-serif-heading text-lg font-bold text-white">
                      Statutory Fees &amp; Perfection Cost Breakdown
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Calculated pursuant to State Land Bureau scales &amp; NBA Remuneration Order
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  
                  <div className="p-3 bg-[#070e1b] rounded-xl border border-blue-900/50 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Stamp Duty (State / Federal IRS)</p>
                      <p className="text-[11px] text-slate-400">Assessed on Deed of Assignment consideration</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-200">
                      ₦{propertyCalcResult.breakdown.stampDuty.toLocaleString('en-NG')}
                    </span>
                  </div>

                  <div className="p-3 bg-[#070e1b] rounded-xl border border-blue-900/50 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Governor's Consent &amp; Registration Fee</p>
                      <p className="text-[11px] text-slate-400">Official State Lands Bureau statutory levy</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-200">
                      ₦{propertyCalcResult.breakdown.consentAndRegistrationFee.toLocaleString('en-NG')}
                    </span>
                  </div>

                  <div className="p-3 bg-[#070e1b] rounded-xl border border-blue-900/50 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Cadastral Charting &amp; Survey Clearance</p>
                      <p className="text-[11px] text-slate-400">Electronic beacon charting against master acquisition sheets</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-200">
                      ₦{propertyCalcResult.breakdown.cadastralChartingFee.toLocaleString('en-NG')}
                    </span>
                  </div>

                  <div className="p-3 bg-[#070e1b] rounded-xl border border-blue-900/50 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Solicitor Drafting &amp; Search Fees</p>
                      <p className="text-[11px] text-slate-400">Title investigation, root tracing &amp; deed preparation</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-200">
                      ₦{propertyCalcResult.breakdown.legalDocumentationAndSearchFee.toLocaleString('en-NG')}
                    </span>
                  </div>

                  {/* Total Bar */}
                  <div className="p-4 bg-gradient-to-r from-[#0d1d3d] via-[#10244c] to-[#0d1d3d] rounded-xl border border-amber-400/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                        Estimated Total Legal &amp; Statutory Investment
                      </span>
                      <p className="text-[11px] text-slate-300">Excludes contentious land dispute litigation</p>
                    </div>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-amber-400">
                      ₦{propertyCalcResult.breakdown.estimatedTotal.toLocaleString('en-NG')}
                    </span>
                  </div>

                </div>

                {/* Actions: Print and Handover to Barrister Oladimeji Ogun */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleForwardPropertyToCounsel}
                    className="w-full sm:w-auto flex-1 px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Instruct Barrister Oladimeji Ogun with this Calculation</span>
                  </button>

                  <button
                    onClick={handlePrintPropertyBrief}
                    className="w-full sm:w-auto px-4 py-3 bg-[#0f2144] hover:bg-[#163060] text-slate-200 rounded-xl text-xs font-semibold border border-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Print Due Diligence Brief</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CAMA 2020 CORPORATE HEALTH DIAGNOSTIC             */}
        {/* ========================================================= */}
        {activeTab === 'cama_health' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Input Form */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-5">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    Corporate Entity Diagnostic Form
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Evaluates statutory compliance under the Companies and Allied Matters Act (CAMA 2020).
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Entity Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 block">Company Structure</label>
                    <select
                      value={camaType}
                      onChange={(e) => setCamaType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="ltd">Private Company Limited by Shares (LTD)</option>
                      <option value="bn">Business Name / Sole Enterprise (BN)</option>
                      <option value="it">Incorporated Trustees / NGO / Foundation (IT)</option>
                      <option value="plc">Public Limited Company (PLC)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Year of Incorporation */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 block">Year of Incorporation</label>
                      <select
                        value={camaYearInc}
                        onChange={(e) => setCamaYearInc(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        {[2024, 2023, 2022, 2021, 2020, 2018, 2015, 2010, 2005, 2000].map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    {/* Last Annual Return */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 block">Last CAC Annual Return Filed</label>
                      <select
                        value={camaLastAnnualReturn}
                        onChange={(e) => setCamaLastAnnualReturn(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2015, 2010].map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* PSC Updated */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={camaPscUpdated}
                        onChange={(e) => setCamaPscUpdated(e.target.checked)}
                        className="mt-0.5 rounded border-blue-800 bg-[#070e1b] text-amber-400 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-white font-medium">Beneficial Ownership (PSC Register) Lodged with CAC?</span>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Mandated under Section 119 CAMA 2020 for any shareholder holding 5%+ equity or voting control.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Share Capital */}
                  {camaType === 'ltd' && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-semibold text-slate-200">Issued Share Capital (NGN)</label>
                        <span className="font-mono text-amber-400 font-bold">₦{camaShareCapital.toLocaleString('en-NG')}</span>
                      </div>
                      <select
                        value={camaShareCapital}
                        onChange={(e) => setCamaShareCapital(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value={500000}>₦500,000 (Below CAMA 2020 Recommended Threshold)</option>
                        <option value={1000000}>₦1,000,000 (Legacy Minimum)</option>
                        <option value={2000000}>₦2,000,000 (CAMA 2020 Modern Standard for LTD)</option>
                        <option value={10000000}>₦10,000,000 (Commercial Banking &amp; Foreign Equity)</option>
                        <option value={50000000}>₦50,000,000+ (FinTech / Upstream Energy)</option>
                      </select>
                    </div>
                  )}

                  {/* Directors */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={camaHasMinDirectors}
                        onChange={(e) => setCamaHasMinDirectors(e.target.checked)}
                        className="mt-0.5 rounded border-blue-800 bg-[#070e1b] text-amber-400 focus:ring-0 cursor-pointer"
                      />
                      <span>Board of Directors is active and properly documented with valid NIN / Residence details.</span>
                    </label>
                  </div>

                </div>
              </div>
            </div>

            {/* Diagnostic Results */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-blue-900/50">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      CAMA 2020 Compliance Index
                    </span>
                    <h4 className="font-serif-heading text-xl font-bold text-white mt-0.5">
                      {camaHealthScore >= 80 ? 'Good Standing' : camaHealthScore >= 50 ? 'Caution / Arrears Pending' : 'High Risk / Strike-Off Alert'}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono font-bold text-amber-400">{camaHealthScore}%</span>
                    <span className="block text-[10px] text-slate-400">Status Score</span>
                  </div>
                </div>

                {/* Score bar */}
                <div className="w-full bg-[#070e1b] rounded-full h-3 overflow-hidden border border-blue-900/60">
                  <div
                    className={`h-full transition-all duration-500 ${
                      camaHealthScore >= 80 ? 'bg-emerald-400' : camaHealthScore >= 50 ? 'bg-amber-400' : 'bg-rose-500'
                    }`}
                    style={{ width: `${camaHealthScore}%` }}
                  />
                </div>

                {/* Penalty Estimator */}
                <div className="p-4 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-blue-900/50 pb-2">
                    <span className="text-slate-300">Annual Returns Default Period:</span>
                    <span className="font-mono font-bold text-amber-400">{yearsDefault} Years in Arrears</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-blue-900/50 pb-2">
                    <span className="text-slate-300">Estimated CAC Late Penalties:</span>
                    <span className="font-mono font-bold text-rose-400">₦{totalCacPenalties.toLocaleString('en-NG')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">PSC Register (Persons with Significant Control):</span>
                    <span className={`font-semibold ${camaPscUpdated ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {camaPscUpdated ? 'Compliant' : 'Unregistered (Default)'}
                    </span>
                  </div>
                </div>

                {/* Actionable Legal Advisory */}
                <div className="space-y-2 text-xs text-slate-300">
                  <h5 className="font-semibold text-white flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Statutory Risks &amp; Required Actions:</span>
                  </h5>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
                    {yearsDefault > 2 && (
                      <li className="text-rose-300">
                        High exposure to Section 692 strike-off publication in official CAC gazette.
                      </li>
                    )}
                    {!camaPscUpdated && (
                      <li>
                        File Form CAC-PSC01 electronically to prevent daily statutory default fines against directors.
                      </li>
                    )}
                    {camaType === 'ltd' && camaShareCapital < 2000000 && (
                      <li>
                        Increase issued share capital to minimum ₦2,000,000 for full bank &amp; regulatory alignment.
                      </li>
                    )}
                    <li>
                      Chambers CAC accredited agents can regularize filing arrears within 5 business days.
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => onOpenConsultation('Folashade Balogun, LL.M (Harvard)', `CAMA 2020 Regularisation inquiry: Entity ${camaType.toUpperCase()}, ${yearsDefault} years annual returns in arrears, estimated penalties ₦${totalCacPenalties.toLocaleString('en-NG')}.`)}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Instruct Corporate Counsel to Regularize with CAC</span>
                </button>

              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CHAMBERS CASE & RETAINER DOCKET TRACKER           */}
        {/* ========================================================= */}
        {activeTab === 'case_tracker' && (
          <div className="space-y-8">
            
            {/* Search Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    Chambers Electronic Case &amp; Retainer Registry
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Enter your confidential chambers reference code (e.g. <code className="text-amber-400 font-mono">OOC-2026-7821</code>) or click a demo matter to inspect real-time progress.
                  </p>
                </div>

                {/* Preloaded Demo Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400">Demo Matters:</span>
                  {allDockets.slice(0, 3).map((d) => (
                    <button
                      key={d.referenceCode}
                      onClick={() => {
                        setDocketQuery(d.referenceCode);
                        handleSearchDocket(d.referenceCode);
                      }}
                      className="px-2.5 py-1 text-[11px] font-mono bg-[#070e1b] hover:bg-[#0f2144] text-amber-300 border border-blue-900/60 rounded-lg transition-colors cursor-pointer"
                    >
                      {d.referenceCode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input & Search Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={docketQuery}
                    onChange={(e) => setDocketQuery(e.target.value)}
                    placeholder="Enter Reference (e.g. OOC-2026-7821 or Client Name)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchDocket()}
                  />
                </div>
                <button
                  onClick={() => handleSearchDocket()}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Lookup Docket</span>
                </button>
              </div>

              {docketSearchError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{docketSearchError}</span>
                </div>
              )}
            </div>

            {/* Docket Details Card */}
            {activeDocket && (
              <div className="p-6 sm:p-10 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-2xl space-y-8">
                
                {/* Header Information */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-blue-900/50">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                        {activeDocket.referenceCode}
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-900/40 text-blue-200 border border-blue-700/50">
                        {activeDocket.statusBadge}
                      </span>
                      <span className="text-xs text-slate-400">· {activeDocket.practiceArea}</span>
                    </div>
                    <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-white">
                      {activeDocket.matterTitle}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      Client / Instruction: <strong className="text-white">{activeDocket.clientName}</strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-1.5 text-xs text-slate-300 shrink-0">
                    <div>
                      <span className="text-slate-400">Lead Counsel: </span>
                      <strong className="text-amber-300">{activeDocket.leadCounsel}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Registry Venue: </span>
                      <span className="text-white">{activeDocket.venue}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Last Registry Update: </span>
                      <span className="text-slate-200 font-mono">{activeDocket.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* 5-Step Visual Stepper */}
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                    Procedural Progress Tracker (Step {activeDocket.currentStage} of 5)
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {[
                      { step: 1, title: 'Intake & Conflict Check', desc: 'Brief verified; no adverse conflict' },
                      { step: 2, title: 'Retainer & Counsel', desc: 'Engagement letter executed' },
                      { step: 3, title: 'Drafting & Search', desc: 'Due diligence & filings drafted' },
                      { step: 4, title: 'Registry Lodgement', desc: 'Court / Ministry process served' },
                      { step: 5, title: 'Enrolment / Completion', desc: 'Final seal or enrolled order' },
                    ].map((st) => {
                      const isComplete = st.step < activeDocket.currentStage;
                      const isCurrent = st.step === activeDocket.currentStage;
                      return (
                        <div
                          key={st.step}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-amber-400/15 border-amber-400 text-white shadow-md'
                              : isComplete
                              ? 'bg-[#0f2144]/70 border-blue-800 text-slate-300'
                              : 'bg-[#070e1b]/60 border-blue-900/40 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-2">
                            <span className={`text-[11px] font-mono font-bold ${isCurrent ? 'text-amber-300' : isComplete ? 'text-emerald-400' : 'text-slate-600'}`}>
                              STAGE 0{st.step}
                            </span>
                            {isComplete ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : isCurrent ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                            ) : null}
                          </div>
                          <h5 className={`text-xs font-semibold leading-tight ${isCurrent ? 'text-white' : ''}`}>
                            {st.title}
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                            {st.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chambers Notes & Next Milestone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="p-5 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <FileCheck className="w-4 h-4 text-amber-400" />
                      <span>Counsel Docket Notes</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeDocket.notes}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#070e1b] border border-blue-900/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Next Scheduled Milestone / Hearing</span>
                    </div>
                    <p className="text-xs font-semibold text-amber-300 font-mono">
                      {activeDocket.nextMilestoneDate}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Counsel in attendance at {activeDocket.venue}.
                    </p>
                  </div>

                </div>

                {/* Direct Action Contacts */}
                <div className="pt-2 border-t border-blue-900/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span>Need priority update on this brief?</span>
                    <a
                      href="tel:08024273323"
                      className="text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>08024273323</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`https://wa.me/2348024273323?text=${encodeURIComponent(`Hello Barrister Oladimeji Ogun, I am following up on chambers docket reference ${activeDocket.referenceCode}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onOpenConsultation(activeDocket.leadCounsel, `Priority review request for Docket: ${activeDocket.referenceCode}`)}
                      className="px-4 py-2 bg-[#0f2144] hover:bg-[#163060] text-slate-200 rounded-lg text-xs font-semibold border border-blue-800 transition-colors cursor-pointer"
                    >
                      Request Partner Conference
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: DISPUTE STRATEGY & COURT RESOLUTION MATRIX        */}
        {/* ========================================================= */}
        {activeTab === 'dispute_matrix' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-5">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-white">
                    Dispute Assessment Triage
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Select factual dispute characteristics to determine optimal legal route in Nigeria.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Urgency */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 block">Factual Urgency</label>
                    <select
                      value={disputeUrgency}
                      onChange={(e) => setDisputeUrgency(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs text-white"
                    >
                      <option value="emergency">Emergency: Imminent asset dissipation / Demolition threat</option>
                      <option value="breach">Ongoing Commercial Breach: Goods withheld or non-delivery</option>
                      <option value="debt">Liquidated Commercial Debt / Unpaid Invoices</option>
                    </select>
                  </div>

                  {/* Claim Size */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 block">Monetary Stake / Claim Size</label>
                    <select
                      value={disputeClaimSize}
                      onChange={(e) => setDisputeClaimSize(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs text-white"
                    >
                      <option value="low">Under ₦10,000,000</option>
                      <option value="medium">₦10,000,000 to ₦100,000,000</option>
                      <option value="high">Above ₦100,000,000 (Major Commercial Mandate)</option>
                    </select>
                  </div>

                  {/* Arbitration Clause */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 block">Existing Contract Dispute Clause?</label>
                    <select
                      value={disputeArbitrationClause}
                      onChange={(e) => setDisputeArbitrationClause(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs text-white"
                    >
                      <option value="yes">Yes: Explicit Arbitration / Multi-Door Clause</option>
                      <option value="no">No: Standard Jurisdiction or Silent Contract</option>
                      <option value="unsure">Unsure: Oral Agreement or Informal Correspondence</option>
                    </select>
                  </div>

                  {/* Relationship */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200 block">Commercial Relationship Goal</label>
                    <select
                      value={disputeRelationship}
                      onChange={(e) => setDisputeRelationship(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-xs text-white"
                    >
                      <option value="preserve">Preserve Business Partnership (Confidential Resolution)</option>
                      <option value="adversarial">Adversarial Recovery: Complete Asset Seizure &amp; Enforcement</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>

            {/* Recommendation Output */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-6">
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      Recommended Jurisdictional Pathway
                    </span>
                    <h4 className="font-serif-heading text-xl font-bold text-white">
                      {disputeUrgency === 'emergency'
                        ? 'High Court Urgent Injunction (Mareva / Interlocutory)'
                        : disputeArbitrationClause === 'yes'
                        ? 'Arbitration Under Arbitration & Mediation Act 2023'
                        : disputeRelationship === 'preserve'
                        ? 'Multi-Door Courthouse Mediation (LMDC / OMDC)'
                        : 'High Court Commercial Division Action / Summary Judgment'}
                    </h4>
                  </div>
                </div>

                <div className="p-4 bg-[#070e1b] rounded-xl border border-blue-900/60 text-xs text-slate-300 space-y-3">
                  <h5 className="font-semibold text-white">Strategic Chambers Analysis:</h5>
                  {disputeUrgency === 'emergency' && (
                    <p className="leading-relaxed">
                      Given the imminent threat of asset dissipation, our Senior Advocates recommend immediately drafting an <strong>Ex-Parte Motion</strong> before the High Court of Ogun State (Abeokuta Judicial Division) or Lagos High Court. We apply for an immediate preservative order restraining the adverse party from transferring funds or altering land boundaries prior to substantive hearing.
                    </p>
                  )}
                  {disputeUrgency !== 'emergency' && disputeArbitrationClause === 'yes' && (
                    <p className="leading-relaxed">
                      Under the newly enacted <strong>Arbitration and Mediation Act 2023</strong>, an arbitration clause ousts regular court litigation until tribunal proceedings conclude. We draft a formal Notice of Arbitration, assist in appointing an independent sole arbitrator, and proceed to an enforceable award.
                    </p>
                  )}
                  {disputeUrgency !== 'emergency' && disputeArbitrationClause !== 'yes' && disputeRelationship === 'preserve' && (
                    <p className="leading-relaxed">
                      To preserve key trade relationships and avoid protracted court appeals, we file through the <strong>Lagos / Ogun Multi-Door Courthouse (LMDC / OMDC)</strong>. Mediation agreements become registered consent judgments of the High Court, enforceable with immediate legal finality.
                    </p>
                  )}
                  {disputeUrgency !== 'emergency' && disputeArbitrationClause !== 'yes' && disputeRelationship === 'adversarial' && (
                    <p className="leading-relaxed">
                      We initiate writ of summons with an application for summary judgment under Order 11 of the High Court Rules, seeking immediate final judgment where the debtor has no bona fide defense to the claim.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#070e1b] border border-blue-900/40">
                    <span className="text-slate-400 block text-[10px]">Estimated Resolution:</span>
                    <strong className="text-amber-300 font-mono">
                      {disputeUrgency === 'emergency' ? '48 - 72 Hours (Interim)' : disputeRelationship === 'preserve' ? '6 - 12 Weeks' : '6 - 18 Months'}
                    </strong>
                  </div>
                  <div className="p-3 rounded-lg bg-[#070e1b] border border-blue-900/40">
                    <span className="text-slate-400 block text-[10px]">Enforceability:</span>
                    <strong className="text-white">High Court Sheriff Seizure</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-[#070e1b] border border-blue-900/40">
                    <span className="text-slate-400 block text-[10px]">Confidentiality:</span>
                    <strong className="text-white">{disputeRelationship === 'preserve' ? 'Strictly Confidential' : 'Public Court Record'}</strong>
                  </div>
                </div>

                <button
                  onClick={() => onOpenConsultation('Barrister Oladimeji Ogun, Esq.', `Dispute Strategy Triage: Route recommended is ${disputeUrgency === 'emergency' ? 'Urgent Injunction' : 'Commercial Dispute Resolution'}, claim scale ${disputeClaimSize}.`)}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Brief Barrister Oladimeji Ogun on this Strategy</span>
                </button>

              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: BEGINNER JAVASCRIPT PLAYGROUND                    */}
        {/* ========================================================= */}
        {activeTab === 'js_playground' && (
          <div className="space-y-8">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0a162e] border-2 border-blue-900/50 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Beginner Developer Explainer</span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-white">
                How JavaScript Drives Interactivity in this Website
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                As a beginner learning web development, this interactive playground lets you see the exact JavaScript logic that powers form validation, mathematical fee calculators, and client-side browser storage (<code className="text-amber-300 font-mono">localStorage</code>).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Exercise 1: Regex Phone Validation */}
              <div className="p-6 rounded-2xl bg-[#0a162e] border border-blue-900/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white text-base font-bold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs">1</span>
                    <span>Nigerian Phone Number Regex Validation</span>
                  </h4>
                  <button
                    onClick={() => handleCopyCode(`const isNigerian = /^(\\+?234|0)[789][01]\\d{8}$/.test(cleaned);`, 'regex')}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'regex' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'regex' ? 'Copied' : 'Copy JS'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300">
                  Tests Nigerian prefixes (+234, 080, 081, 090, 070, 091) dynamically as you type:
                </p>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={testPhoneInput}
                    onChange={(e) => setTestPhoneInput(e.target.value)}
                    placeholder="Type a number e.g. 08024273323..."
                    className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                  <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    isNigerianPhone
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                  }`}>
                    <span>Validation Status:</span>
                    <strong>{isNigerianPhone ? 'VALID NIGERIAN NUMBER ✓' : 'INVALID PHONE FORMAT ✗'}</strong>
                  </div>
                </div>

                <pre className="p-3 bg-[#070e1b] rounded-xl border border-blue-900/50 text-[11px] font-mono text-amber-300 overflow-x-auto">
{`// Live JavaScript Evaluation:
const cleaned = "${cleanedPhone}";
const regex = /^(\\+?234|0)[789][01]\\d{8}$/;
const isValid = regex.test(cleaned); // => ${isNigerianPhone}`}
                </pre>
              </div>

              {/* Exercise 2: Naira Currency Formatter */}
              <div className="p-6 rounded-2xl bg-[#0a162e] border border-blue-900/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white text-base font-bold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs">2</span>
                    <span>Naira Currency Formatting (`Intl.NumberFormat`)</span>
                  </h4>
                  <button
                    onClick={() => handleCopyCode(`new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value);`, 'currency')}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'currency' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'currency' ? 'Copied' : 'Copy JS'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300">
                  Standard browser JavaScript API for formatting numbers into Nigerian Naira:
                </p>

                <div className="space-y-2">
                  <input
                    type="number"
                    value={testCurrencyInput}
                    onChange={(e) => setTestCurrencyInput(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#070e1b] border border-blue-900/70 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs flex items-center justify-between">
                    <span className="text-slate-300">Formatted Output:</span>
                    <strong className="text-amber-400 font-mono text-sm">
                      {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(testCurrencyInput)}
                    </strong>
                  </div>
                </div>

                <pre className="p-3 bg-[#070e1b] rounded-xl border border-blue-900/50 text-[11px] font-mono text-amber-300 overflow-x-auto">
{`// Native JavaScript API:
new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0
}).format(${testCurrencyInput});`}
                </pre>
              </div>

            </div>

          </div>
        )}

      </section>

    </div>
  );
};
