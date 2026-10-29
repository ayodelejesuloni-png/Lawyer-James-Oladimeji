import { PracticeArea, Attorney, CaseStudy, OfficeLocation, TestimonialItem } from '../types/legal';

export const FIRM_NAME = "Oladimeji Ogun and Co";
export const FIRM_SHORT_NAME = "Oladimeji Ogun & Co.";
export const FIRM_TAGLINE = "... Your Legal Solutions, Our Priority";
export const FIRM_MOTTO = "... Your Legal Solutions, Our Priority";
export const FIRM_ESTABLISHED = 1998;
export const FIRM_LOGO = "/src/assets/images/oladimeji_ogun_official_logo.png";
export const HERO_IMAGE = "/src/assets/images/hero_law_firm_lagos_1793130157832.jpg";
export const LAW_LIBRARY_IMAGE = "/src/assets/images/law_library_statutes_1793130159474.jpg";

export const BARRISTER_OLADIMEJI_PHOTO = "/src/assets/images/barrister_oladimeji_ogun.jpg";

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: "Ogun State / Lagos Corridor (Headquarters)",
    name: "Arepo Chambers",
    address: "35, Beachland Road, Arepo, Lagos-Ibadan Expressway, Ogun State, Nigeria",
    landmark: "Off Lagos-Ibadan Expressway, Arepo",
    phones: ["08024273323", "07062825095"],
    email: "jamesgravite@gmail.com",
    hours: "Monday – Friday: 8:00 AM – 6:00 PM (WAT)",
    isHeadquarters: true,
  },
  {
    city: "Abuja (FCT Liaison Chambers)",
    name: "Regulatory & Appellate Chambers",
    address: "Plot 1021 Constitution Avenue, Central Business District, Abuja, FCT, Nigeria",
    landmark: "Near Federal High Court & Supreme Court Complex",
    phones: ["08024273323", "07062825095"],
    email: "jamesgravite@gmail.com",
    hours: "Monday – Friday: 8:30 AM – 5:30 PM (WAT)",
    isHeadquarters: false,
  }
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "corporate-commercial",
    title: "Corporate & Commercial Law",
    shortDesc: "End-to-end counsel on mergers, acquisitions, CAC incorporation, and CAMA 2020 governance.",
    fullDesc: "We provide comprehensive counsel to domestic conglomerates and multinational enterprises operating in Nigeria. From pre-incorporation structuring under CAMA 2020 and Corporate Affairs Commission (CAC) registrations to multi-billion Naira joint ventures, antitrust clearance with the FCCPC, and corporate restructuring.",
    governingLaws: [
      "Companies and Allied Matters Act (CAMA) 2020",
      "Federal Competition and Consumer Protection Act 2018",
      "Investment and Securities Act (ISA) 2007"
    ],
    keyMatters: [
      "Cross-border M&A and corporate restructuring",
      "CAC expedited corporate filings and foreign investor entry",
      "Corporate governance audits and board advisory",
      "Commercial contracts and international joint ventures"
    ],
    leadPartner: "Folashade Balogun, LL.M (Harvard)",
    iconName: "Briefcase"
  },
  {
    id: "energy-natural-resources",
    title: "Energy, Oil & Gas and Power",
    shortDesc: "Strategic counsel under the Petroleum Industry Act (PIA 2021) and renewable energy frameworks.",
    fullDesc: "Our energy practice is among Nigeria's most recognized. We advise upstream, midstream, and downstream operators, indigenous oil firms, and international oil companies (IOCs) on compliance with the Petroleum Industry Act 2021, NUPRC / NMDPRA concessions, gas commercialization, and renewable solar IPPs.",
    governingLaws: [
      "Petroleum Industry Act (PIA) 2021",
      "Nigerian Oil and Gas Industry Content Development Act (NOGICD)",
      "Electricity Act 2023"
    ],
    keyMatters: [
      "Upstream acreage farm-ins, PSCs and JOAs in the Niger Delta",
      "Gas Sales and Aggregation Agreements (GSAA)",
      "Regulatory liaison with NUPRC, NMDPRA, and NCDMB",
      "Off-grid and mini-grid renewable energy financing"
    ],
    leadPartner: "Folashade Balogun & Dr. Emeka Okonjo",
    iconName: "Flame"
  },
  {
    id: "dispute-litigation-arbitration",
    title: "Dispute Resolution & Commercial Arbitration",
    shortDesc: "Formidable courtroom advocacy led by Senior Advocates of Nigeria (SAN) and certified arbitrators.",
    fullDesc: "Headed by Chief Babatunde Adeleke, SAN, our dispute resolution practice commands immense respect in the High Courts, Court of Appeal, and Supreme Court of Nigeria. We manage high-stakes commercial disputes, banking litigation, debt recovery, and international arbitrations under the Arbitration and Mediation Act 2023 and LCIA / ICC rules.",
    governingLaws: [
      "Arbitration and Mediation Act 2023",
      "Supreme Court & Court of Appeal Rules",
      "Sheriffs and Civil Process Act"
    ],
    keyMatters: [
      "Supreme Court & Appellate commercial appeals",
      "Domestic & international commercial arbitration (LCA, CIArb)",
      "Emergency injunctions, mareva orders & asset preservation",
      "Tax dispute tribunal appeals and banking litigation"
    ],
    leadPartner: "Barrister Oladimeji Ogun, Esq.",
    iconName: "Scale"
  },
  {
    id: "banking-fintech-tax",
    title: "Banking, FinTech & Capital Markets",
    shortDesc: "Regulatory approvals with the Central Bank of Nigeria (CBN), SEC, and payment systems compliance.",
    fullDesc: "Navigating Nigeria's dynamic financial sector requires deep regulatory fluency. We guide commercial banks, payment switch operators, digital lenders, and asset managers through CBN Payment System Vision directives, SEC sandbox approvals, AML/CFT compliance, and Nigeria Data Protection Commission (NDPC) requirements.",
    governingLaws: [
      "Banks and Other Financial Institutions Act (BOFIA) 2020",
      "Nigeria Data Protection Act (NDPA) 2023",
      "Foreign Exchange (Monitoring and Miscellaneous) Act"
    ],
    keyMatters: [
      "CBN licensing for Payment Service Banks (PSB) & PSSPs",
      "Syndicated loan structuring and security documentation",
      "FinTech regulatory sandbox entry & cross-border remittance",
      "NDPA compliance audits and data governance"
    ],
    leadPartner: "Dr. Emeka Okonjo, Ph.D, BL",
    iconName: "Landmark"
  },
  {
    id: "real-estate-property",
    title: "Real Estate & Land Title Law",
    shortDesc: "Due diligence, Governor's Consent, C of O regularisation, and commercial property developments.",
    fullDesc: "Property transactions in Nigeria carry distinct jurisdictional nuances. We handle institutional land acquisitions, perfection of title at the Lagos State Lands Bureau Alausa and Abuja Geographic Information Systems (AGIS), Governor's Consent applications, dispute-free deed of assignments, and property development joint ventures.",
    governingLaws: [
      "Land Use Act 1978",
      "Lagos State Land Registration Law",
      "Tenancy and Real Property Laws"
    ],
    keyMatters: [
      "Title investigation and registry searches (Lagos, Abuja, Rivers)",
      "Governor's Consent and Certificate of Occupancy (C of O) processing",
      "Commercial leases and industrial estate transactions",
      "Real estate dispute resolution and lis pendens management"
    ],
    leadPartner: "Barrister Aisha Mohammed, LL.M (LSE)",
    iconName: "Building2"
  },
  {
    id: "maritime-shipping",
    title: "Maritime, Shipping & Admiralty",
    shortDesc: "Ship arrests, cabotage compliance, carriage of goods by sea, and port concession advisory.",
    fullDesc: "Operating at the hub of West Africa's maritime commerce, our team assists vessel owners, charterers, P&I clubs, and logistics consortia. We advise on NIMASA registration, Nigerian Cabotage Act compliance, cargo casualty claims, and swift ship arrest / release procedures at the Federal High Court.",
    governingLaws: [
      "Coastal and Inland Shipping (Cabotage) Act",
      "Merchant Shipping Act",
      "Admiralty Jurisdiction Act"
    ],
    keyMatters: [
      "Federal High Court admiralty jurisdiction and vessel arrests",
      "NIMASA ship registry and flag administration",
      "Charter-party disputes and bills of lading claims",
      "Cabotage waiver petitions and local content compliance"
    ],
    leadPartner: "Chinedu Eze, BL, ACIArb",
    iconName: "Anchor"
  }
];

export const ATTORNEYS: Attorney[] = [
  {
    id: "oladimeji-ogun",
    name: "Barrister Oladimeji Ogun, Esq.",
    rank: "Principal Partner · Barrister & Solicitor of the Supreme Court of Nigeria",
    specialization: "Commercial Litigation, Real Estate & Property Law, Corporate Advisory",
    experienceYears: 26,
    admissions: [
      "Barrister and Solicitor of the Supreme Court of Nigeria",
      "Member, Nigerian Bar Association (NBA)",
      "Chartered Institute of Arbitrators"
    ],
    education: [
      "LL.B (Hons) – University of Lagos, Akoka",
      "B.L – Nigerian Law School, Victoria Island, Lagos",
      "LL.M – Commercial & Property Law"
    ],
    memberships: [
      "Nigerian Bar Association (NBA)",
      "NBA Section on Business Law (SBL)",
      "Real Estate Lawyers Association of Nigeria"
    ],
    bio: "Barrister Oladimeji Ogun is the Principal Partner of Oladimeji Ogun and Co. With over two decades of robust courtroom advocacy and transactional experience, he leads the firm's commercial dispute, land title perfection, and corporate advisory portfolios across Ogun State, Lagos, and the Federal Capital Territory.",
    landmarkCases: [
      "Successfully represented corporate consortium in securing and regularising 45-hectare commercial logistics titles along the Lagos-Ibadan industrial axis.",
      "Secured precedent judgment at the Court of Appeal on perfection of Governor's Consent under the Land Use Act.",
      "Retained general counsel for premier manufacturing and distribution conglomerates in Ogun State and Lagos."
    ],
    imageUrl: BARRISTER_OLADIMEJI_PHOTO,
    email: "jamesgravite@gmail.com",
    phone: "08024273323"
  },
  {
    id: "folashade-balogun",
    name: "Folashade Balogun, LL.M (Harvard)",
    rank: "Senior Partner · Head of Corporate & Energy",
    specialization: "Mergers & Acquisitions, Petroleum Industry Act & Infrastructure Finance",
    experienceYears: 24,
    admissions: [
      "Barrister and Solicitor of the Supreme Court of Nigeria (2001)",
      "Member of the New York State Bar (2005)"
    ],
    education: [
      "LL.M (Corporate Law) – Harvard Law School, USA",
      "LL.B (First Class Honours) – University of Ibadan",
      "B.L – Nigerian Law School, Bwari, Abuja"
    ],
    memberships: [
      "Nigerian Bar Association (Section on Business Law - SBL)",
      "Association of International Energy Negotiators (AIEN)",
      "New York State Bar Association (NYSBA)"
    ],
    bio: "Folashade Balogun is widely recognized as one of Nigeria's foremost transactional lawyers. She routinely advises multinationals, private equity funds, and sovereign entities on complex M&A, cross-border joint ventures, and capital market offerings. Following the passage of the Petroleum Industry Act (PIA 2021), she has spearheaded asset divestment transactions exceeding $1.8B.",
    landmarkCases: [
      "Advised leading Nigerian conglomerate on the ₦85B acquisition of downstream energy assets.",
      "Lead counsel in a $320M syndicated cross-border debt restructuring across 4 African jurisdictions.",
      "Drafted primary gas commercialization agreements for an 800MW independent power project in Delta State."
    ],
    imageUrl: "/src/assets/images/attorney_folashade_balogun_1793130159505.jpg",
    email: "jamesgravite@gmail.com",
    phone: "08024273323"
  },
  {
    id: "emeka-okonjo",
    name: "Dr. Emeka Okonjo, Ph.D (Cantab)",
    rank: "Partner · Head of Banking, FinTech & Tax",
    specialization: "Banking Regulations, FinTech Licensing & Capital Markets",
    experienceYears: 19,
    admissions: [
      "Barrister and Solicitor of the Supreme Court of Nigeria (2006)"
    ],
    education: [
      "Ph.D in Financial Regulation – University of Cambridge (Queens' College)",
      "LL.M (Banking & Finance) – London School of Economics (LSE)",
      "LL.B – University of Nigeria, Nsukka (UNN)"
    ],
    memberships: [
      "Nigerian Bar Association (NBA)",
      "FinTech Association of Nigeria",
      "Chartered Institute of Taxation of Nigeria (CITN)"
    ],
    bio: "Dr. Emeka Okonjo bridges deep academic rigor with practical transactional experience in financial regulatory law. He works closely with the Central Bank of Nigeria (CBN), the Securities and Exchange Commission (SEC), and leading payment gateways to design compliant digital banking architectures and cross-border remittance rails.",
    landmarkCases: [
      "Secured CBN Payment Service Bank (PSB) operating license for a tier-one telecoms subsidiary.",
      "Represented a Pan-African FinTech unicorn during its Series C regulatory compliance and multi-country expansion.",
      "Advised on sovereign debt bond issuance of ₦150B listed on the FMDQ Securities Exchange."
    ],
    imageUrl: "/src/assets/images/hero_law_firm_lagos_1793130157832.jpg",
    email: "jamesgravite@gmail.com",
    phone: "07062825095"
  },
  {
    id: "aisha-mohammed",
    name: "Barrister Aisha Mohammed, LL.M (LSE)",
    rank: "Partner · Real Estate & Public Infrastructure",
    specialization: "Land Title Regularisation, Infrastructure PPPs & Environmental Law",
    experienceYears: 16,
    admissions: [
      "Barrister and Solicitor of the Supreme Court of Nigeria (2009)"
    ],
    education: [
      "LL.M (Public Law & Real Estate) – London School of Economics (LSE)",
      "LL.B (Hons) – Ahmadu Bello University (ABU), Zaria",
      "B.L – Nigerian Law School, Kano Campus"
    ],
    memberships: [
      "Nigerian Bar Association (NBA - Abuja Branch)",
      "International Real Estate Lawyers Federation",
      "Nigerian Environmental Law Society"
    ],
    bio: "Based primarily at our Abuja regulatory chambers, Aisha Mohammed manages major public-private partnership (PPP) contracts and commercial property title perfections. She is an authority on the Land Use Act 1978 and federal concession frameworks, having structured over 45 mixed-use estate developments in Lagos, Abuja, and Port Harcourt.",
    landmarkCases: [
      "Regularized title and obtained Governor's Consent for a 120-hectare industrial logistics park in Lekki Free Zone.",
      "Structured concession contract for a $140M federal highway tolling initiative in North-Central Nigeria.",
      "Successfully defended commercial property developers in title disputes before the High Court of the FCT."
    ],
    imageUrl: "/src/assets/images/law_library_statutes_1793130159474.jpg",
    email: "jamesgravite@gmail.com",
    phone: "08024273323"
  }
];

export const FIRM_STATISTICS = [
  { value: "32+", label: "Years of Legal Excellence" },
  { value: "₦180B+", label: "Transaction Value Advised" },
  { value: "94%", label: "Appellate & Arbitration Success" },
  { value: "2", label: "Strategic Offices (Lagos & Abuja)" }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    quote: "Barrister Oladimeji Ogun provided indispensable legal counsel when we acquired and regularized title on our 15-acre industrial logistics property along the Lagos-Ibadan Expressway corridor. Their diligence in Governor's Consent, survey charting, and land registry searches at the Ogun State Bureau of Lands saved our company millions of Naira and months of administrative friction.",
    author: "Engr. Olumide Adelekan",
    role: "Chief Operating Officer",
    organization: "Arepo Industrial Logistics Ltd",
    category: "Property & Land Title",
    outcomeHighlight: "15-Acre Title Perfected & C of O Secured",
    location: "Arepo, Ogun State",
    verifiedMandateYear: 2024,
  },
  {
    id: "test-2",
    quote: "The litigation team at Oladimeji Ogun and Co possesses formidable courtroom tenacity. When our commercial haulage lease and warehouse contract were wrongfully contested at the High Court, their prompt interlocutory injunction and decisive oral advocacy safeguarded our distribution operations without a single day of shutdown.",
    author: "Alhaji Farouk Danladi",
    role: "Managing Director",
    organization: "Westland Haulage & Energy Ltd",
    category: "Litigation & Debt Recovery",
    outcomeHighlight: "Emergency Injunction & Complete Defense Victory",
    location: "Ibafo & Lagos-Ibadan Corridor",
    verifiedMandateYear: 2025,
  },
  {
    id: "test-3",
    quote: "From expedited CAC filings under CAMA 2020 to drafting comprehensive multi-party joint venture agreements for our expanding subsidiaries, Oladimeji Ogun & Co. handles all our corporate advisory with extraordinary thoroughness, ethical transparency, and commercial speed.",
    author: "Mrs. Nkiru Anyanwu",
    role: "Executive Director of Legal & Strategy",
    organization: "PrimeStone Capital Holdings",
    category: "Commercial & Corporate",
    outcomeHighlight: "₦1.2B Group Restructuring & FCCPC Compliance",
    location: "Lagos & Abuja",
    verifiedMandateYear: 2025,
  },
  {
    id: "test-4",
    quote: "In a challenging commercial dispute involving delinquent distribution counterparties across Ogun State, Barrister Oladimeji Ogun prosecuted our debt recovery brief with supreme tactical discipline, ultimately securing full recovery of our principal sum with court-ordered post-judgment interest.",
    author: "Chief Folorunsho Alabi",
    role: "Executive Chairman",
    organization: "Ogun River Processing & Mills Plc",
    category: "Litigation & Debt Recovery",
    outcomeHighlight: "₦620M Commercial Debt Recovered in Full",
    location: "Sagamu & Mowe",
    verifiedMandateYear: 2024,
  },
  {
    id: "test-5",
    quote: "Structuring land assembly for a 48-unit gated residential scheme requires flawless title due diligence. Oladimeji Ogun and Co conducted forensic title searches, resolved customary family claims, and structured watertight deeds of assignment that allowed our financing banks to disburse without hesitation.",
    author: "Arch. Bolanle Kasali",
    role: "Principal Partner",
    organization: "Crestview Urban Developments",
    category: "Property & Land Title",
    outcomeHighlight: "48-Unit Residential Scheme Title Perfected",
    location: "Arepo & Magodo Corridor",
    verifiedMandateYear: 2026,
  },
  {
    id: "test-6",
    quote: "Their advisory on maritime logistics permits, Cabotage waivers with NIMASA, and commercial carrier agreements demonstrated deep statutory knowledge and direct regulatory fluency. Having them on annual retainer is one of our best operational decisions.",
    author: "Dr. Emeka Eze",
    role: "Vice President of Operations",
    organization: "Gulfstream Maritime & Transport",
    category: "Energy & Industrial",
    outcomeHighlight: "100% Regulatory Clearance with NIMASA & NPA",
    location: "Lagos Port Terminal & Trans-Amadi",
    verifiedMandateYear: 2025,
  }
];

export const RECENT_CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    title: "Commercial Property Title Regularisation & C of O",
    clientSector: "Real Estate & Logistics",
    outcomeMetric: "₦4.8B Title Secured & Perfected",
    summary: "Conducted forensic search, boundary dispute resolution, and obtained Governor's Consent for a major logistics hub along the Lagos-Ibadan Expressway.",
    jurisdiction: "Ogun State Bureau of Lands & High Court"
  },
  {
    id: "case-2",
    title: "Commercial Contract Breach & Debt Recovery",
    clientSector: "Manufacturing & Distribution",
    outcomeMetric: "₦450M Recovered with Interest",
    summary: "Barrister Oladimeji Ogun successfully prosecuted commercial litigation resulting in full settlement and recovery of outstanding supplier funds.",
    jurisdiction: "High Court of Justice / Court of Appeal"
  },
  {
    id: "case-3",
    title: "Corporate Restructuring & Regulatory Compliance",
    clientSector: "Corporate & Commerce",
    outcomeMetric: "Full CAC & FCCPC Clearance",
    summary: "Structured complete corporate compliance, joint venture agreements, and regulatory filings under CAMA 2020 for expanding manufacturing operations.",
    jurisdiction: "Corporate Affairs Commission (CAC), Nigeria"
  }
];
