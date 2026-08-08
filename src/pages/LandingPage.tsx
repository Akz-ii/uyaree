import React from 'react';
import { Aircraft3D } from '../components/DigitalTwin/Aircraft3D';
import { INITIAL_SUBSYSTEMS } from '../services/mockData';
import { 
  Plane, 
  BrainCircuit, 
  Box, 
  Sliders, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Activity, 
  Code2, 
  Layers, 
  Zap 
} from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: () => void;
  onExploreDigitalTwin: () => void;
  onOpenDemoMode: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  onExploreDigitalTwin,
  onOpenDemoMode,
}) => {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Background Radial Glow & Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>AI-POWERED AIRCRAFT DIGITAL TWIN PLATFORM</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 font-mono tracking-tight leading-tight mb-6">
            Know What Your Aircraft Will Face <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Before It Flies.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-sans">
            UYAREE combines real-time aircraft telemetry, AI health intelligence, an interactive 3D digital twin, and scenario-based simulation to explore potential risks before they become critical.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02]"
            >
              <span>Launch UYAREE Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDigitalTwin}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono font-bold text-sm border border-cyan-500/40 transition-all"
            >
              <Box className="w-4 h-4" />
              <span>Explore Interactive 3D Twin</span>
            </button>

            <button
              onClick={onOpenDemoMode}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-mono font-bold text-sm border border-emerald-500/40 transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Guided Demo Mode</span>
            </button>
          </div>
        </div>

        {/* Hero Visual: Rotating 3D Aircraft Twin Preview */}
        <div className="relative max-w-5xl mx-auto h-[460px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl glow-cyan">
          <Aircraft3D
            subsystems={INITIAL_SUBSYSTEMS}
            selectedSubsystemId="engine2"
            onSelectSubsystem={onExploreDigitalTwin}
          />
        </div>
      </section>

      {/* 2. Problem Statement Section */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-2">The Aerospace Problem</span>
          <h2 className="text-3xl font-bold text-slate-100 font-mono">Turning Complex Telemetry into Actionable Insight</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
            Modern aircraft collect gigabytes of sensor data every flight. The challenge isn't collecting more data — it's transforming health telemetry into an intuitive picture of subsystem degradation, future risk, and maintenance priorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-mono mb-2">Unclear Subsystem Health</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Raw sensor streams lack contextual intelligence, forcing engineers to manually cross-examine temperature, vibration, and pressure signals.</p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-mono mb-2">Unknown What-If Risks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Without scenario simulation, engineers cannot evaluate how extreme desert heat or high throttle climb will impact degraded components.</p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 font-mono mb-2">Black-Box AI Models</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Aviation decisions require full transparency. Black-box ML predictions without clear root causes cannot be trusted in mission-critical environments.</p>
          </div>
        </div>
      </section>

      {/* 3. How UYAREE Works Section */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-2">Core Workflow</span>
          <h2 className="text-3xl font-bold text-slate-100 font-mono">How UYAREE Operates</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 relative">
            <span className="text-3xl font-extrabold font-mono text-cyan-500/30 block mb-2">01</span>
            <h4 className="text-sm font-bold font-mono text-slate-100 mb-1">Live Telemetry Ingestion</h4>
            <p className="text-xs text-slate-400">Streams engine temp, rotor vibration, oil pressure, and RPM telemetry in real-time.</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 relative">
            <span className="text-3xl font-extrabold font-mono text-cyan-500/30 block mb-2">02</span>
            <h4 className="text-sm font-bold font-mono text-slate-100 mb-1">3D Digital Twin Mapping</h4>
            <p className="text-xs text-slate-400">Visualizes aircraft state in 3D, automatically highlighting affected subsystems in real-time.</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 relative">
            <span className="text-3xl font-extrabold font-mono text-cyan-500/30 block mb-2">03</span>
            <h4 className="text-sm font-bold font-mono text-slate-100 mb-1">Scenario Simulation</h4>
            <p className="text-xs text-slate-400">Runs what-if physics simulations for hot takeoffs, sustained climbs, and extended cycles.</p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 relative">
            <span className="text-3xl font-extrabold font-mono text-cyan-500/30 block mb-2">04</span>
            <h4 className="text-sm font-bold font-mono text-slate-100 mb-1">Prioritized Recommendations</h4>
            <p className="text-xs text-slate-400">Delivers explainable AI root cause rationale and remaining useful life (RUL) estimates.</p>
          </div>
        </div>
      </section>

      {/* 4. Tech Stack Section */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-2">Built for Performance</span>
          <h2 className="text-3xl font-bold text-slate-100 font-mono">Technology Architecture</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FRONTEND</span>
            <span className="text-slate-100 font-bold text-sm">React + Vite + TS</span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">3D ENGINE</span>
            <span className="text-cyan-400 font-bold text-sm">Three.js WebGL</span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">ANALYTICS</span>
            <span className="text-slate-100 font-bold text-sm">Recharts + AI ML</span>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px]">STYLING</span>
            <span className="text-sky-400 font-bold text-sm">Tailwind CSS</span>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 px-4 sm:px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-cyan-400 -rotate-45" />
            <span className="font-bold text-slate-300">UYAREE Aerospace Platform</span>
          </div>
          <p className="max-w-md">
            <strong>Prototype Disclaimer:</strong> UYAREE is a proof of concept. It does not certify airworthiness, approve takeoff, or replace certified aviation systems.
          </p>
        </div>
      </footer>
    </div>
  );
};
