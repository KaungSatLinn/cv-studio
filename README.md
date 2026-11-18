# CV Studio — Software Engineer Edition

A modern, Apple-inspired, ATS-optimized CV & Resume Studio built with **React 19**, **TypeScript**, **Vite 8**, **Tailwind CSS v4**, and **Lucide React**, deployed globally to **Cloudflare Workers with Static Assets**.

---

## 🌐 Live Cloudflare Deployment
- **Live URL**: [https://cv-studio-generator.smiling-gh0st.workers.dev](https://cv-studio-generator.smiling-gh0st.workers.dev)
- **Deployment Platform**: Cloudflare Workers with Static Assets (Edge CDN)

---

## ✨ Features

- 🍎 **macOS-Inspired Design**: Frosted glassmorphism header, smooth inputs with Apple blue focus states, soft typography (Inter + JetBrains Mono), and clean subtle borders.
- 🎯 **ATS-Pass Ready**: Built around a strict single-column semantic hierarchy, standard section headers, machine-readable plain text, and categorized skill keywords.
- 📊 **Real-Time ATS Compatibility Score**: Dynamic parser scoring (0–100%) with an expandable recommendations drawer.
- ⚡ **Local-First & Offline Ready**: Automatic `localStorage` synchronization with instant "Saved locally" feedback.
- 📸 **Smart Image Compressor**: Upload profile portraits that are automatically downscaled and compressed via an HTML5 Canvas to keep local storage and JSON backups lightweight.
- 💾 **JSON Data Portability**: 1-click **Save Data** (JSON backup download) and **Import** (JSON restore) to switch between multiple resume versions or share configurations.
- 🖨️ **Print & PDF Optimization**: Integrated `@media print` layout formatting for clean A4 printing or saving as high-resolution PDF with the browser print dialog (`Ctrl + P` / Download PDF button).
- 📱 **Responsive Split Layout**: Side-by-side editing and live preview on desktop; 1-click tab toggle ("Edit Data" vs "Preview CV") on mobile and tablet screens.

---

## 🏗️ Project Architecture

```
CV_Generator/
├── dist/                                     # Production build output
├── src/
│   ├── components/
│   │   ├── Editor/                           # Modular Form Editors
│   │   │   ├── PersonalDetailsEditor.tsx     # Contact info, photo upload & links
│   │   │   ├── SummaryEditor.tsx             # Professional summary
│   │   │   ├── SkillsEditor.tsx              # Categorized tech skills
│   │   │   ├── ExperienceEditor.tsx          # Dynamic role cards & impact bullets
│   │   │   ├── ProjectsEditor.tsx            # Engineering project cards & tech tags
│   │   │   └── EducationEditor.tsx           # Academic degrees & certifications
│   │   ├── Preview/
│   │   │   └── CVDocument.tsx                # Apple-clean ATS resume sheet preview
│   │   ├── ATSDrawer.tsx                     # Expandable ATS checklist drawer
│   │   ├── ConfirmModal.tsx                  # Reset confirmation dialog
│   │   ├── Header.tsx                        # Top toolbar & actions
│   │   ├── MobileTabSwitcher.tsx             # Mobile view switcher
│   │   └── Toast.tsx                         # Status notification banners
│   ├── constants/
│   │   └── templates.ts                      # Empty & prefilled Software Engineer templates
│   ├── types/
│   │   └── cv.ts                             # Strict TypeScript interfaces
│   ├── utils/
│   │   ├── ats.ts                            # Real-time ATS parser score calculator
│   │   ├── export.ts                         # PDF print & JSON download helpers
│   │   └── image.ts                          # Canvas image resizing & JPEG compression
│   ├── App.tsx                               # Master application container
│   ├── index.css                             # Tailwind CSS v4 directives & Apple tokens
│   └── main.tsx                              # React DOM root entrypoint
├── index.html                                # HTML entry with Google fonts
├── package.json                              # Scripts and dependencies
├── tsconfig.json                             # TypeScript bundler configuration
├── vite.config.ts                            # Vite + React + Tailwind v4 config
├── worker.js                                 # Cloudflare edge static asset worker
└── wrangler.json                             # Cloudflare Wrangler project configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v20+ recommended)
- npm (v10+ recommended)

### 1. Install Dependencies
```powershell
npm install
```

### 2. Run Local Dev Server
```powershell
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```powershell
npm run build
```

---

## ☁️ Deploy to Cloudflare

Deploy the latest build to Cloudflare:
```powershell
npm run deploy
```
Or directly with Wrangler:
```powershell
npx wrangler deploy
```
