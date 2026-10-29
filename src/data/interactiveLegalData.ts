import {
  PropertyLocationKey,
  TitleDocumentType,
  PropertyCalculationResult,
  DocketRecord,
} from '../types/legal';

export const PROPERTY_LOCATIONS: {
  key: PropertyLocationKey;
  label: string;
  state: string;
  bureau: string;
  baseConsentRate: number;
  stampDutyRate: number;
}[] = [
  {
    key: 'ogun_arepo',
    label: 'Ogun State (Arepo, Mowe, Sagamu & Abeokuta Axis)',
    state: 'Ogun State',
    bureau: 'Bureau of Lands and Survey, Abeokuta',
    baseConsentRate: 0.035, // 3.5%
    stampDutyRate: 0.0075, // 0.75%
  },
  {
    key: 'lagos_alausa',
    label: 'Lagos State (Ikeja, Lekki, Victoria Island, Epe & Alausa)',
    state: 'Lagos State',
    bureau: 'Lands Bureau, Alausa Secretariat, Ikeja',
    baseConsentRate: 0.05, // 5%
    stampDutyRate: 0.015, // 1.5%
  },
  {
    key: 'abuja_agis',
    label: 'Federal Capital Territory (Maitama, CBD, Gwarinpa - AGIS)',
    state: 'Abuja FCT',
    bureau: 'Abuja Geographic Information Systems (AGIS)',
    baseConsentRate: 0.04, // 4%
    stampDutyRate: 0.01, // 1.0%
  },
  {
    key: 'oyo_ibadan',
    label: 'Oyo State (Ibadan, Oluyole & Industrial Corridors)',
    state: 'Oyo State',
    bureau: 'Ministry of Lands, Housing & Urban Dev., Agodi, Ibadan',
    baseConsentRate: 0.03, // 3%
    stampDutyRate: 0.0075, // 0.75%
  },
];

export const TITLE_DOCUMENT_PROFILES: {
  key: TitleDocumentType;
  title: string;
  riskScore: number;
  riskRating: 'Safe & Verifiable' | 'Moderate Risk / Inquiries Required' | 'High Risk / Perfection Essential' | 'Critical / Unprotected Title';
  riskDescription: string;
  timelineWeeks: string;
  prerequisites: string[];
}[] = [
  {
    key: 'c_of_o',
    title: 'State Certificate of Occupancy (C of O)',
    riskScore: 15,
    riskRating: 'Safe & Verifiable',
    riskDescription: 'Primary root of title issued by State Governor. Low risk; requires only search verification and deed of assignment perfection upon transfer.',
    timelineWeeks: '6 - 10 weeks',
    prerequisites: ['Original C of O number verification', 'Certified True Copy (CTC) registry search', 'Recent Land Use Charge / Ground rent receipts'],
  },
  {
    key: 'governors_consent',
    title: 'Subsequent Governor’s Consent to Deed of Assignment',
    riskScore: 20,
    riskRating: 'Safe & Verifiable',
    riskDescription: 'Fully endorsed by State Attorney General / Commissioner. Highly secure legal estate backed by Section 22 of the Land Use Act 1978.',
    timelineWeeks: '8 - 12 weeks',
    prerequisites: ['Registered Deed with Governor’s endorsement stamp', 'Survey plan lodged in State Cadastral repository'],
  },
  {
    key: 'registered_conveyance',
    title: 'Registered Conveyance / Pre-1978 Crown Grant',
    riskScore: 35,
    riskRating: 'Moderate Risk / Inquiries Required',
    riskDescription: 'Historic pre-Land Use Act title. Requires recertification, root-of-title trace, and regularisation with modern State cadastral coordinates.',
    timelineWeeks: '10 - 16 weeks',
    prerequisites: ['Title chain tracing back minimum 30 years', 'Composite survey charting with modern beacon coordinates'],
  },
  {
    key: 'gazette_excision',
    title: 'Government Gazette / Approved Excision in Progress',
    riskScore: 55,
    riskRating: 'High Risk / Perfection Essential',
    riskDescription: 'Land excised from government acquisition, but Certificate of Occupancy is pending. High priority to process formal C of O before heavy capital expenditure.',
    timelineWeeks: '14 - 24 weeks',
    prerequisites: ['Official Gazette notice page copy', 'Approved perimeter survey plan', 'Community excision committee release agreement'],
  },
  {
    key: 'deed_survey_only',
    title: 'Deed of Assignment with Registered Survey Only (No Consent)',
    riskScore: 78,
    riskRating: 'High Risk / Perfection Essential',
    riskDescription: 'Equitable interest only; legal estate remains unperfected. Under Section 22 Land Use Act, transaction is inchoate and vulnerable to adverse third-party claims.',
    timelineWeeks: '12 - 20 weeks',
    prerequisites: ['Immediate Governor’s Consent application', 'Charting at Bureau of Lands to ensure no prior encumbrance/acquisition'],
  },
  {
    key: 'customary_family_receipt',
    title: 'Customary Family Receipt / Omo-onile Agreement Only',
    riskScore: 95,
    riskRating: 'Critical / Unprotected Title',
    riskDescription: 'Critical legal exposure. Customary receipts confer no statutory legal title in Nigerian jurisprudence. High probability of conflicting family sales or state acquisition.',
    timelineWeeks: '20 - 36 weeks (Full regularisation)',
    prerequisites: ['Immediate root-of-title family investigation', 'Urgent registered perimeter survey', 'Application for Ratification or C of O at Bureau of Lands'],
  },
];

export function calculatePropertyStatutoryFees(
  locationKey: PropertyLocationKey,
  titleType: TitleDocumentType,
  considerationValue: number,
  plotsCount: number
): PropertyCalculationResult {
  const loc = PROPERTY_LOCATIONS.find((l) => l.key === locationKey) || PROPERTY_LOCATIONS[0];
  const profile = TITLE_DOCUMENT_PROFILES.find((p) => p.key === titleType) || TITLE_DOCUMENT_PROFILES[0];

  // Stamp duty calculation
  const stampDuty = Math.round(considerationValue * loc.stampDutyRate);

  // Consent & Registration statutory fees
  const consentFee = Math.round(considerationValue * loc.baseConsentRate);

  // Cadastral charting & survey inspection fees
  const baseCharting = 75000;
  const perPlotFee = 15000;
  const cadastralChartingFee = baseCharting + Math.max(1, plotsCount) * perPlotFee;

  // Legal Practitioners Remuneration Order (scale based on transaction consideration)
  let legalScaleRate = 0.05;
  if (considerationValue > 100000000) {
    legalScaleRate = 0.02;
  } else if (considerationValue > 30000000) {
    legalScaleRate = 0.035;
  }
  const legalDocumentationAndSearchFee = Math.max(250000, Math.round(considerationValue * legalScaleRate));

  const estimatedTotal = stampDuty + consentFee + cadastralChartingFee + legalDocumentationAndSearchFee;

  const nextSteps: string[] = [
    `Initiate forensic Title Search at ${loc.bureau}.`,
    `Lodge perimeter survey coordinates for electronic charting to verify freedom from committed acquisition.`,
    `Draft comprehensive Deed of Assignment and prepare Form 1C application for Governor's Consent.`,
    `Obtain Current Tax Clearance Certificate (TCC) of assignor and assignee for Stamp Duty assessment.`,
  ];

  return {
    riskScore: profile.riskScore,
    riskRating: profile.riskRating,
    riskDescription: profile.riskDescription,
    estimatedTimelineWeeks: profile.timelineWeeks,
    breakdown: {
      stampDuty,
      consentAndRegistrationFee: consentFee,
      cadastralChartingFee,
      legalDocumentationAndSearchFee,
      estimatedTotal,
    },
    recommendedNextSteps: nextSteps,
  };
}

export const DEFAULT_DEMO_DOCKETS: DocketRecord[] = [
  {
    referenceCode: 'OOC-2026-7821',
    clientName: 'Chief Adebayo Adelekan (Arepo Industrial Parks)',
    matterTitle: 'Perfection of Governor\'s Consent for 12-Acre Depot Along Beachland Road',
    practiceArea: 'Real Estate & Property Law',
    leadCounsel: 'Barrister Oladimeji Ogun, Esq.',
    venue: 'Bureau of Lands and Survey, Ogun State',
    currentStage: 3,
    stageName: 'Cadastral Charting & Consent Assessment',
    statusBadge: 'In Progress',
    lastUpdated: 'Yesterday at 3:45 PM',
    nextMilestoneDate: 'Next Tuesday (Survey Directorate Endorsement)',
    notes: 'Perimeter survey cleared; Stamp Duty assessment notice issued by Ogun State Internal Revenue Service (OGIRS). Awaiting file transmission to the Honourable Commissioner.',
  },
  {
    referenceCode: 'OOC-2026-1044',
    clientName: 'West African Energy Logistics Ltd',
    matterTitle: 'CAMA 2020 Persons with Significant Control (PSC) & Share Capital Restructure',
    practiceArea: 'Corporate & Commercial Law',
    leadCounsel: 'Folashade Balogun, LL.M (Harvard)',
    venue: 'Corporate Affairs Commission (CAC) Headquarters, Abuja',
    currentStage: 2,
    stageName: 'Statutory Resolution Executed & CAC Portal Lodgement',
    statusBadge: 'Active Proceeding',
    lastUpdated: '2 days ago',
    nextMilestoneDate: 'This Friday (CAC Electronic Registry Certificate)',
    notes: 'Board resolutions for share capital increase to ₦50M and beneficial ownership PSC registers signed and uploaded to CAC CRP portal.',
  },
  {
    referenceCode: 'OOC-2026-9920',
    clientName: 'First Continental Distribution Bank Plc',
    matterTitle: 'Emergency Mareva Injunction & Commercial Debt Recovery (₦420,000,000)',
    practiceArea: 'Dispute Resolution & Commercial Arbitration',
    leadCounsel: 'Barrister Oladimeji Ogun, Esq.',
    venue: 'High Court of Ogun State, Abeokuta Judicial Division',
    currentStage: 4,
    stageName: 'Ex-Parte Order Granted, Inter-Partes Motion Fixed',
    statusBadge: 'Hearing Scheduled',
    lastUpdated: 'Today at 9:15 AM',
    nextMilestoneDate: 'Hearing on 14th November 2026',
    notes: 'Interim preserving orders granted restraining counterparty from dissipating mortgaged warehouse assets. Court bailiffs served enrolled order on 5 commercial banks.',
  },
  {
    referenceCode: 'OOC-2026-3112',
    clientName: 'Epe Maritime Logistics Consortium',
    matterTitle: 'Deed of Assignment & Ground Rent Regularisation',
    practiceArea: 'Real Estate & Property Law',
    leadCounsel: 'Barrister Aisha Mohammed, LL.M',
    venue: 'Lagos State Lands Bureau, Alausa, Ikeja',
    currentStage: 5,
    stageName: 'Title Perfected & Delivered to Client',
    statusBadge: 'Concluded',
    lastUpdated: '1 week ago',
    nextMilestoneDate: 'Matter Successfully Concluded',
    notes: 'Governor’s Consent registered under Volume 2408, Page 42 at Lands Registry, Alausa. Original perfected deed safely delivered to client vault.',
  },
];

export const LEGAL_FAQS = [
  {
    category: 'Property & Land Title',
    question: 'Why is a customary receipt or Omo-onile paper dangerous without Governor\'s Consent?',
    answer: 'Under Section 22 of the Land Use Act 1978, all land in a state is vested in the Governor in trust for the people. A customary receipt or unapproved deed only creates an inchoate (incomplete) equitable interest. Without Governor\'s Consent and registered survey charting, you cannot legally mortgage, lease, or defend the land against subsequent registered purchasers or government infrastructure acquisitions.',
  },
  {
    category: 'Property & Land Title',
    question: 'How long does Governor\'s Consent take in Ogun State vs. Lagos State?',
    answer: 'In Ogun State (Bureau of Lands Abeokuta), standard Governor\'s Consent processing generally takes 8 to 14 weeks once survey charting and OGIRS tax clearance are verified. In Lagos State (Alausa), the process typically requires 12 to 20 weeks. Our chambers at 35 Beachland Road, Arepo expedites filing through direct legal liaison.',
  },
  {
    category: 'CAMA 2020 & Corporate',
    question: 'What are the penalties under CAMA 2020 for failing to file Annual Returns with CAC?',
    answer: 'Under Section 377–380 of CAMA 2020, companies that fail to file Annual Returns incur cumulative daily and annual penalties. More critically, after consecutive years of default, the CAC publishes the company on the gazette for involuntary delisting (strike-off), which freezes company bank accounts and terminates corporate legal standing.',
  },
  {
    category: 'CAMA 2020 & Corporate',
    question: 'What is the minimum share capital requirement for a Nigerian private company today?',
    answer: 'Under Section 27(2) of CAMA 2020, the historic ₦10,000 threshold was abolished. A private company limited by shares (LTD) must have an issued share capital of at least ₦100,000, and for corporate banking / foreign participation, regulators standardly require ₦2,000,000 or higher depending on sector licensing.',
  },
  {
    category: 'Courtroom Litigation & Dispute',
    question: 'Can I obtain an urgent court order to freeze assets before a debtor flees or dissipates funds?',
    answer: 'Yes. Through an Ex-Parte Motion for a Mareva Injunction or Anton Piller Order, our Senior Advocates can apply to the High Court without prior notice to the adverse party, demonstrating urgency and real risk of dissipation. If granted, the court restrains all affiliated Nigerian banks from transferring debtor funds.',
  },
  {
    category: 'Chambers Fees & Retainer',
    question: 'How are legal fees determined under the NBA Legal Practitioners Remuneration Order?',
    answer: 'In 2023, the Nigerian Bar Association gazetted the Legal Practitioners Remuneration Order, which provides standardized scale fees based on transaction consideration, property location, and legal complexity. We provide fully itemized fee structures with zero hidden disbursements before any brief is commenced.',
  },
];
