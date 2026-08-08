# UYAREE: AI-Powered Aircraft Digital Twin & Simulation Platform

**Tagline**: Predict. Simulate. Protect.

UYAREE is an aerospace engineering decision-support platform combining real-time aircraft telemetry, AI health intelligence, an interactive transparent 3D WebGL Digital Twin, scenario-based "What-If" simulations, Explainable AI diagnostics, and a MongoDB backend architecture.

---

## 🚀 Quick Start Guide (VS Code)

### 1. Extract & Open in VS Code
1. Extract `uyaree-aircraft-digital-twin.zip`.
2. Open **VS Code** (`File` -> `Open Folder...`) and select the extracted project folder.

### 2. Install Dependencies
Open a terminal in VS Code (`Ctrl + ~` or `Terminal` -> `New Terminal`) and run:
```bash
npm install
```

### 3. Launch Frontend Web App (Port 3000)
Run the Vite development server:
```bash
npm run dev
```
Open **[http://localhost:3000/](http://localhost:3000/)** in your browser!

### 4. (Optional) Launch MongoDB Express Backend (Port 5000)
In a separate terminal window, start the Express backend server:
```bash
node server/index.js
```
The REST API will run at **[http://localhost:5000/api](http://localhost:5000/api)**.

---

## 🛠️ Project Structure

```
uyaree-aircraft-digital-twin/
├── server/                   # Express.js + MongoDB Backend
│   ├── index.js              # Express app entrypoint (Port 5000)
│   ├── models/schemas.js     # Mongoose Schemas (Aircraft, Subsystem, Telemetry, etc.)
│   └── routes/api.js         # REST API Endpoints
├── src/
│   ├── components/
│   │   ├── DigitalTwin/     # Transparent 3D Blueprint Airplane Twin & Inspector
│   │   ├── Dashboard/       # Radial Gauge, Telemetry Sparklines, Header Bar
│   │   ├── Simulation/      # "What happens if...?" Sandbox & What-If Comparator
│   │   ├── Intelligence/    # Explainable AI (What, Why, Confident, What Next)
│   │   ├── Maintenance/     # Prioritized RUL Recommendation Cards
│   │   ├── Alerts/          # Real-time System Alert & Anomaly Center
│   │   ├── Reports/         # Printable Executive Health Report Generator
│   │   └── Demo/            # 10-Step Interactive Story Presentation Controller
│   ├── pages/
│   │   ├── LandingPage.tsx  # Hero preview, workflow, tech stack
│   │   ├── AuthModal.tsx    # Login dialog & Demo Mode trigger
│   │   └── MainApp.tsx      # Central Mission Control coordinator
│   ├── services/
│   │   ├── telemetryEngine.ts # Real-time sensor feed generator
│   │   ├── simulationEngine.ts# Stress forecast & trajectory engine
│   │   ├── mongoService.ts   # Frontend MongoDB REST API client
│   │   └── mockData.ts       # Subsystems, presets, and narrative steps
│   ├── types/
│   │   └── uyaree.ts         # TypeScript interface definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css             # Tailwind CSS & Glassmorphism design system
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```
