import React from 'react';
import { AircraftInfo } from '../../types/uyaree';
import { ShieldCheck, AlertCircle, Cpu, Sliders, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HealthGaugeProps {
  aircraft: AircraftInfo;
  onOpenAlerts: () => void;
  onOpenDigitalTwin: () => void;
  onOpenSimulation: () => void;
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({
  aircraft,
  onOpenAlerts,
  onOpenDigitalTwin,
  onOpenSimulation,
}) => {
  const healthScore = aircraft.overallHealth;
  const strokeDashoffset = 440 - (440 * healthScore) / 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
      {/* 1. Main Aircraft Health Radial Gauge Card */}
      <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden tech-corner">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">System Health Index</span>
            <h2 className="text-lg font-bold text-slate-100 font-mono">Overall Aircraft Health</h2>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            OPERATIONAL
          </span>
        </div>

        {/* Circular SVG Progress Gauge */}
        <div className="flex items-center justify-center py-4 relative">
          <svg className="w-52 h-52 transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="104"
              cy="104"
              r="70"
              stroke="#1E293B"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Health Progress Ring */}
            <circle
              cx="104"
              cy="104"
              r="70"
              stroke="#00F0FF"
              strokeWidth="12"
              strokeDasharray="440"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Centered Health Percentage & Status */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-extrabold font-mono text-slate-100 tracking-tight">
              {healthScore}%
            </span>
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider mt-1">
              HEALTH INDEX
            </span>
          </div>
        </div>

        {/* Quick Aircraft Metadata Footer */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 text-center font-mono text-xs">
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block">AIRCRAFT</span>
            <span className="text-slate-200 font-bold">{aircraft.id}</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block">FLIGHT CYCLES</span>
            <span className="text-slate-200 font-bold">{aircraft.flightCycles.toLocaleString()}</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block">STATUS</span>
            <span className="text-emerald-400 font-bold">HEALTHY</span>
          </div>
        </div>
      </div>

      {/* 2. Key Operational KPI Cards Grid */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Active Alerts KPI */}
        <button
          onClick={onOpenAlerts}
          className="bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-amber-500/40 p-5 flex flex-col justify-between text-left transition-all group glow-amber"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              1 HIGH SEVERITY
            </span>
          </div>
          <div>
            <span className="text-3xl font-extrabold font-mono text-slate-100 block mb-1">
              03
            </span>
            <span className="text-xs font-mono text-slate-400 group-hover:text-amber-300 transition-colors">
              Active Alerts & Anomalies →
            </span>
          </div>
        </button>

        {/* Components at Risk KPI */}
        <button
          onClick={onOpenDigitalTwin}
          className="bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-cyan-500/40 p-5 flex flex-col justify-between text-left transition-all group glow-cyan"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              ENGINE 2 ATTENTION
            </span>
          </div>
          <div>
            <span className="text-3xl font-extrabold font-mono text-slate-100 block mb-1">
              02
            </span>
            <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
              Components at Risk →
            </span>
          </div>
        </button>

        {/* Simulation Engine Status KPI */}
        <button
          onClick={onOpenSimulation}
          className="bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-cyan-500/50 p-5 flex flex-col justify-between text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
              <Sliders className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              SANDBOX READY
            </span>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-slate-100 block mb-1">
              Ready
            </span>
            <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
              Run What-If Simulation →
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
