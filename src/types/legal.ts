export type PageId = 'home' | 'about' | 'services' | 'attorneys' | 'tools' | 'contact';

export interface PracticeArea {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  governingLaws: string[]; // e.g. CAMA 2020, PIA 2021, Arbitration and Mediation Act 2023
  keyMatters: string[];
  leadPartner: string;
  iconName: string;
}

export interface Attorney {
  id: string;
  name: string;
  rank: string; // e.g. "Senior Advocate of Nigeria (SAN)", "Managing Partner", "Senior Partner"
  specialization: string;
  experienceYears: number;
  admissions: string[]; // e.g. "Supreme Court of Nigeria (1993)", "Solicitor of the Senior Courts of England & Wales"
  education: string[];
  memberships: string[]; // NBA, IBA, CIArb UK
  bio: string;
  landmarkCases: string[];
  imageUrl: string;
  email: string;
  phone: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientSector: string;
  outcomeMetric: string;
  summary: string;
  jurisdiction: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  category: 'Property & Land Title' | 'Commercial & Corporate' | 'Litigation & Debt Recovery' | 'Energy & Industrial';
  outcomeHighlight: string;
  location: string;
  verifiedMandateYear: number;
}

export interface OfficeLocation {
  city: string;
  name: string;
  address: string;
  landmark: string;
  phones: string[];
  email: string;
  hours: string;
  isHeadquarters?: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  practiceArea: string;
  urgency: 'routine' | 'sensitive' | 'urgent_court';
  preferredOffice: 'lagos' | 'abuja' | 'virtual';
  summary: string;
  privilegeAgreed: boolean;
}

export type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export interface ConsultationSubmission {
  id: string;
  referenceCode: string;
  submittedAt: string;
  data: ContactFormData;
  status: 'received' | 'under_review';
}

export type PropertyLocationKey = 'ogun_arepo' | 'lagos_alausa' | 'abuja_agis' | 'oyo_ibadan';

export type TitleDocumentType = 
  | 'c_of_o' 
  | 'governors_consent' 
  | 'registered_conveyance' 
  | 'gazette_excision' 
  | 'deed_survey_only' 
  | 'customary_family_receipt';

export interface PropertyCalculationResult {
  riskScore: number; // 0 (safest) to 100 (highest risk)
  riskRating: 'Safe & Verifiable' | 'Moderate Risk / Inquiries Required' | 'High Risk / Perfection Essential' | 'Critical / Unprotected Title';
  riskDescription: string;
  estimatedTimelineWeeks: string;
  breakdown: {
    stampDuty: number;
    consentAndRegistrationFee: number;
    cadastralChartingFee: number;
    legalDocumentationAndSearchFee: number;
    estimatedTotal: number;
  };
  recommendedNextSteps: string[];
}

export interface DocketRecord {
  referenceCode: string;
  clientName: string;
  matterTitle: string;
  practiceArea: string;
  leadCounsel: string;
  venue: string;
  currentStage: number; // 1 to 5
  stageName: string;
  statusBadge: 'Under Review' | 'Active Proceeding' | 'In Progress' | 'Hearing Scheduled' | 'Concluded';
  lastUpdated: string;
  nextMilestoneDate: string;
  notes: string;
}
