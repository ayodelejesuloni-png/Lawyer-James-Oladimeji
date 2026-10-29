import React, { useState } from 'react';
import { X, Terminal, Mail, CheckCircle2, Copy, Check, Code, HelpCircle } from 'lucide-react';

interface BeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BeginnerGuideModal: React.FC<BeginnerGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'run' | 'email' | 'validation' | 'structure'>('run');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const runCommands = `# Step 1: Open your terminal/command prompt in the project folder
cd /path/to/nigerian-law-firm

# Step 2: Install dependencies (only required the first time)
npm install

# Step 3: Start the local development server
npm run dev

# Step 4: Open your web browser and navigate to:
# http://localhost:3000 (or the port shown in your terminal)`;

  const expressEmailCode = `// In your backend server (e.g. server.ts or api/contact.ts)
import express from 'express';
import nodemailer from 'nodemailer'; // npm install nodemailer

const app = express();
app.use(express.json());

// Configure SMTP transport with your Gmail or firm's email server credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // or custom SMTP host e.g. mail.oladimejiogunlaw.ng
  auth: {
    user: process.env.FIRM_EMAIL || 'jamesgravite@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD, // Generated from Google Account > App Passwords
  },
});

app.post('/api/contact', async (req, res) => {
  const { fullName, email, phone, practiceArea, urgency, summary } = req.body;

  try {
    // 1. Send notification email directly to jamesgravite@gmail.com
    await transporter.sendMail({
      from: '"Oladimeji Ogun & Co. Website" <jamesgravite@gmail.com>',
      to: 'jamesgravite@gmail.com',
      subject: \`[New Legal Retainer Inquiry - \${urgency.toUpperCase()}] \${fullName} - \${practiceArea}\`,
      text: \`New consultation brief received:\\n\\nClient Name: \${fullName}\\nEmail: \${email}\\nTelephone: \${phone}\\nPractice Area: \${practiceArea}\\nChambers: 35 Beachland Road, Arepo\\nSummary: \${summary}\`,
    });

    // 2. Send automated acknowledgment receipt to the prospective client
    await transporter.sendMail({
      from: '"Oladimeji Ogun and Co" <jamesgravite@gmail.com>',
      to: email,
      subject: 'Confirmation of Retainer Consultation Request',
      text: \`Dear \${fullName},\\n\\nThank you for reaching out to Oladimeji Ogun and Co. We have received your consultation brief regarding \${practiceArea}.\\n\\nBarrister Oladimeji Ogun and our legal team will review your inquiry and follow up shortly via telephone or email.\\n\\nChambers: 35, Beachland Road, Arepo, Ogun State\\nTelephone: 08024273323, 07062825095\\n\\nKind regards,\\nOladimeji Ogun & Co.\`,
    });

    res.status(200).json({ success: true, message: 'Inquiry dispatched successfully' });
  } catch (error) {
    console.error('Mail delivery failure:', error);
    res.status(500).json({ error: 'Failed to dispatch email' });
  }
});`;

  const clientSideServiceCode = `// OPTION B: No-Backend Email Delivery (using EmailJS or Web3Forms)
// 1. Sign up for free at https://www.emailjs.com/
// 2. Install the package: npm install @emailjs/browser
// 3. Call this inside your handleSubmit function in ContactPage.tsx:

import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  try {
    setIsSubmitting(true);
    
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        client_name: formData.fullName,
        client_email: formData.email,
        client_phone: formData.phone,
        practice_area: formData.practiceArea,
        matter_summary: formData.summary,
      },
      'YOUR_PUBLIC_KEY'
    );

    setIsSuccess(true);
  } catch (err) {
    console.error('Failed to send:', err);
  } finally {
    setIsSubmitting(false);
  }
};`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#040813]/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#0a162e] border-2 border-blue-900/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-blue-900/50 flex items-center justify-between bg-[#070e1b]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-white">
                Beginner Developer Guide: Running &amp; Email Setup
              </h3>
              <p className="text-xs text-slate-400">
                Clear instructions on how to run this website locally and what is required to send real emails to Oladimeji Ogun &amp; Co.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0f2144] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-blue-900/50 bg-[#070e1b]/40 px-6 gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('run')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'run'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            1. How to Run Locally
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'email'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            2. Sending Real Emails
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'validation'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            3. Contact Form Validation
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'structure'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            4. Project Structure
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-300">
          
          {/* TAB 1: HOW TO RUN */}
          {activeTab === 'run' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
                <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  Prerequisites
                </h4>
                <p className="text-xs text-neutral-400">
                  Ensure you have <strong>Node.js</strong> (version 18 or higher) installed on your computer. You can download it for free from <span className="text-amber-400">nodejs.org</span>.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-200">Terminal Commands</span>
                  <button
                    onClick={() => handleCopy(runCommands, 'run')}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                  >
                    {copiedCode === 'run' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'run' ? 'Copied' : 'Copy commands'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  {runCommands}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-amber-400 font-semibold text-xs">Step 1: Install</div>
                  <p className="text-[11px] text-neutral-400">Downloads all required React, Tailwind, and Lucide packages.</p>
                </div>
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-amber-400 font-semibold text-xs">Step 2: Start Dev</div>
                  <p className="text-[11px] text-neutral-400">Runs Vite on port 3000 with lightning-fast updates.</p>
                </div>
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-amber-400 font-semibold text-xs">Step 3: Preview</div>
                  <p className="text-[11px] text-neutral-400">Open in your browser to view and test all 5 pages interactively.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SENDING REAL EMAILS */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 leading-relaxed">
                <strong>Why can't browsers send emails directly?</strong>
                <p className="mt-1 text-neutral-300">
                  In pure HTML/CSS/JavaScript (or client-side React), your code runs inside the user's web browser. Storing your firm's email passwords or private API keys directly in client-side code would expose them to the public. To send real emails, you need either a <strong>backend server endpoint</strong> or a <strong>secure email relay service</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Recommended Approach 1: Node.js Backend with Nodemailer</span>
                  <button
                    onClick={() => handleCopy(expressEmailCode, 'express')}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                  >
                    {copiedCode === 'express' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'express' ? 'Copied' : 'Copy code'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-300 overflow-x-auto max-h-56 leading-relaxed">
                  {expressEmailCode}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Recommended Approach 2: Serverless / No-Backend (EmailJS or Web3Forms)</span>
                  <button
                    onClick={() => handleCopy(clientSideServiceCode, 'client')}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                  >
                    {copiedCode === 'client' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'client' ? 'Copied' : 'Copy code'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-300 overflow-x-auto max-h-56 leading-relaxed">
                  {clientSideServiceCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: VALIDATION */}
          {activeTab === 'validation' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                The contact form in this website is fully wired with real-time validation rules tailored for a Nigerian legal practice:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-white font-semibold">1. Full Name Validation</div>
                  <p className="text-neutral-400 text-[11px]">Requires at least 3 characters and letters only; prevents empty or placeholder names.</p>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-white font-semibold">2. Email Format Check</div>
                  <p className="text-neutral-400 text-[11px]">Validates complete RFC email addresses (`name@company.com.ng`) using strict regex.</p>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-white font-semibold">3. Nigerian &amp; International Phone</div>
                  <p className="text-neutral-400 text-[11px]">Accepts Nigerian prefixes (+234, 080, 081, 070, 090) and standard international dial codes.</p>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-white font-semibold">4. Legal Area &amp; Urgency</div>
                  <p className="text-neutral-400 text-[11px]">Ensures a practice area (e.g., Corporate, Oil &amp; Gas, Litigation) and urgency level are chosen.</p>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-white font-semibold">5. Brief Character Count</div>
                  <p className="text-neutral-400 text-[11px]">Enforces a minimum of 20 characters so the legal team receives meaningful dispute/matter context.</p>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                  <div className="text-white font-semibold">6. Privilege Acknowledgment</div>
                  <p className="text-neutral-400 text-[11px]">Mandatory checkbox acknowledging that an attorney-client relationship requires a formal retainer.</p>
                </div>
              </div>

              <div className="p-4 bg-[#070e1b] rounded-xl border border-blue-900/60 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">
                  When submitted, the form simulates network latency, verifies all invariants, and issues an authentic reference code (`OOC-2026-XXXX`) with immediate client confirmation.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: STRUCTURE */}
          {activeTab === 'structure' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                The codebase follows a modular React + TypeScript architecture:
              </p>
              <div className="bg-[#070e1b] p-4 rounded-xl border border-blue-900/60 font-mono text-xs text-slate-300 space-y-1.5">
                <div>├── <strong className="text-amber-400">src/</strong></div>
                <div>│   ├── <strong className="text-white">pages/</strong></div>
                <div>│   │   ├── HomePage.tsx       <span className="text-slate-500"># Marquee hero, metrics, practice bento &amp; proof</span></div>
                <div>│   │   ├── AboutPage.tsx      <span className="text-slate-500"># 25+ year firm history, chambers leadership &amp; values</span></div>
                <div>│   │   ├── ServicesPage.tsx   <span className="text-slate-500"># 6 Nigerian practice areas &amp; statutory acts</span></div>
                <div>│   │   ├── AttorneysPage.tsx  <span className="text-slate-500"># Barrister Oladimeji Ogun &amp; counsel roster</span></div>
                <div>│   │   └── ContactPage.tsx    <span className="text-slate-500"># Validated retainer booking form &amp; Arepo/Abuja office info</span></div>
                <div>│   ├── <strong className="text-white">components/</strong></div>
                <div>│   │   ├── FirmLogo.tsx       <span className="text-slate-500"># Official gold, white &amp; royal navy law crest logo</span></div>
                <div>│   │   ├── Navbar.tsx         <span className="text-slate-500"># Top bar contract &amp; mobile drawer</span></div>
                <div>│   │   ├── Footer.tsx         <span className="text-slate-500"># Office addresses, NBA notice &amp; disclaimer</span></div>
                <div>│   │   ├── Testimonials.tsx   <span className="text-slate-500"># Carousel &amp; grid client feedback component</span></div>
                <div>│   │   ├── AttorneyModal.tsx  <span className="text-slate-500"># In-depth lawyer dossier &amp; landmark cases</span></div>
                <div>│   │   └── ConsultationModal.tsx <span className="text-slate-500"># Quick retainer booking modal</span></div>
                <div>│   ├── <strong className="text-white">data/legalData.ts</strong>  <span className="text-slate-500"># Content, CAMA/PIA statutes, partners</span></div>
                <div>│   ├── <strong className="text-white">types/legal.ts</strong>    <span className="text-slate-500"># TypeScript data definitions</span></div>
                <div>│   └── App.tsx                <span className="text-slate-500"># Core application state &amp; page router</span></div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blue-900/50 bg-[#070e1b]/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            Got It, Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
