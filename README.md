# Oladimeji Ogun and Co — Legal Practitioners & Commercial Solicitors

A modern, responsive website for **Oladimeji Ogun and Co**, featuring **Home**, **About**, **Services**, **Attorneys**, and **Contact** pages, with responsive mobile/desktop navigation, full form field validation, and retainer consultation booking.

- **Chambers Address**: 35, Beachland Road, Arepo, Lagos-Ibadan Expressway, Ogun State, Nigeria
- **Telephones**: 08024273323, 07062825095
- **Official Email**: jamesgravite@gmail.com
- **Principal Counsel**: Barrister Oladimeji Ogun, Esq. (Principal Partner)

---

## 🚀 How to Run the Website (Beginner Guide)

### Prerequisites
Make sure you have **Node.js** (version 18 or higher) installed on your system. If you do not have it yet, download and install it from [nodejs.org](https://nodejs.org/).

### Step 1: Open your Terminal
Open your terminal (Terminal on Mac/Linux or Command Prompt/PowerShell on Windows) and navigate to the project root folder.

### Step 2: Install Dependencies
Run the following command to install the required packages:
```bash
npm install
```

### Step 3: Start the Local Development Server
Start the local Vite development server:
```bash
npm run dev
```

### Step 4: Open in Your Browser
Once the dev server starts, look at your terminal output. Typically it will display:
```
  VITE v8.x.x  ready in 150 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```
Hold `Ctrl` (or `Cmd` on Mac) and click the link, or open your web browser (Chrome, Firefox, Safari, Edge) and enter `http://localhost:3000`.

---

## 📱 Navigation & Features

1. **Responsive Top Navigation Bar**:
   - **Computers/Desktops**: Clean horizontal header following the 3-zone standard (Brand Wordmark: *Oladimeji Ogun & Co.*, 5 navigation links with active indicators, and a "Schedule Consultation" action button).
   - **Phones & Tablets**: Mobile hamburger drawer with click-to-call phone links (`08024273323`, `07062825095`), Arepo chambers address, consultation booking, and quick access.

2. **Five Comprehensive Pages**:
   - **Home**: Marquee hero with high-resolution imagery, 4 core statistics (26+ years, ₦180B+ transactional value advised, 94% appellate success, 2 offices), practice bento grid, partner spotlights, and client testimonials.
   - **About**: Firm history, chambers ethical pillars, and dual presence in Arepo, Ogun State (Lagos-Ibadan Expressway corridor) and Abuja.
   - **Services**: Six specialized practice areas (Corporate & Commercial, Energy & Oil & Gas, Dispute Resolution & Arbitration, Banking & FinTech, Real Estate & Land Title, and Maritime) referencing actual Nigerian legislation (CAMA 2020, Petroleum Industry Act 2021, NDPA 2023, Land Use Act). Includes an interactive practice selector and transparent fee/retainer guidance under Nigerian Bar Association (NBA) standards.
   - **Attorneys**: Roster of Senior Advocates and Partners led by Barrister Oladimeji Ogun with judicial bios, bar admissions, education, and an interactive **Attorney Dossier Modal**.
   - **Contact**: Full chambers intake registry with address details for 35, Beachland Road, Arepo, Ogun State and Abuja, plus an interactive validated consultation form.

---

## ✉️ What is Needed to Send Real Messages / Emails?

### Why can't browsers send emails directly?
When a website runs purely on the user's browser (HTML/CSS/JavaScript), it cannot send emails directly without exposing your secret email password or mail server credentials in the browser's inspection tools.

### To deliver actual emails to `jamesgravite@gmail.com` in production:

#### Option 1: Backend Server with Nodemailer & Gmail
If you run a Node.js/Express server:
1. Install `nodemailer`:
   ```bash
   npm install nodemailer
   npm install -D @types/nodemailer
   ```
2. Set your environment variables in `.env`:
   ```env
   FIRM_EMAIL="jamesgravite@gmail.com"
   GMAIL_APP_PASSWORD="your-google-app-password"
   ```
3. Create an endpoint `POST /api/contact` in your backend server to dispatch emails directly to `jamesgravite@gmail.com` and send an automated acknowledgment receipt to the client.

#### Option 2: Serverless / No-Backend Service (Easiest for Beginners)
If you do not want to manage a backend server, you can use a trusted email relay service:
- **EmailJS** (`npm install @emailjs/browser`): Lets you trigger template emails directly from your React code using a public client ID to `jamesgravite@gmail.com`.
- **Web3Forms** or **Formspree**: Submit the form to an endpoint URL that forwards inquiries directly to `jamesgravite@gmail.com`.

---

## 🧪 How to Test the Website

1. Navigate to the **Contact** page.
2. Click the **"Auto-Fill Test Data"** button to automatically populate realistic test values (client name, Nigerian telephone number, matter summary, and privilege agreement).
3. Click **"Transmit Retainer Inquiry"** to observe real-time submission, simulated network transit, and the generation of an authentic case intake reference code (e.g. `OOC-2026-XXXX`).
4. Try clearing a required field (like the email or phone) and clicking submit to verify that instant error messages appear with helpful correction hints.
5. Resize your browser window or open developer tools (`F12` -> Toggle Device Toolbar) to test responsive rendering on iPhones, iPads, and desktop displays.
