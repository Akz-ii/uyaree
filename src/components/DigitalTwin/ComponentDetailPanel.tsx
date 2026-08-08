import React from 'react';
import { SubsystemHealth, SubsystemId } from '../../types/uyaree';
import { Activity, Thermometer, Zap, Gauge, AlertTriangle, ShieldCheck, ArrowRight, Play, Cpu } from 'lucide-react';

interface ComponentDetailPanelProps {
  subsystem: SubsystemHealth | null;
  onOpenSimulation: () => void;
  onOpenAIIntelligence: () => void;
}

export const ComponentDetailPanel: React.FC<ComponentDetailPanelProps> = ({
  subsystem,
  onOpenSimulation,
  onOpenAIIntelligence,
}) => {
  if (!subsystem) {
    return (
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[300px]">
        <Cpu className="w-12 h-12 text-slate-600 mb-3 animate-pulse" />
        <h3 className="font-mono text-sm text-slate-400 font-semibold uppercase tracking-wider">No Subsystem Selected</h3>
        <p className="text-xs text-slate-400 max-w-xs mt-1">Select any component on the 3D aircraft twin or from the subsystem bar to inspect real-time metrics.</p>
      </div>
    );
  }

  const isAttention = subsystem.status === 'ATTENTION';
  const isCritical = subsystem.status === 'CRITICAL';

  return (
    <div className={`bg-slate-900/80 backdrop-blur-md rounded-2xl border p-6 flex flex-col justify-between transition-all ${
      isCritical ? 'border-red-500/50 glow-red' : isAttention ? 'border-amber-500/50 glow-amber' : 'border-slate-800'
    }`}>
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">{subsystem.category}</span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] font-mono text-slate-400 uppercase">ID: {subsystem.id}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 font-mono">{subsystem.name}</h3>
          </div>

          <div className="text-right">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
              isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
              isAttention ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {isCritical ? <AlertTriangle className="w-3.5 h-3.5" /> : isAttention ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              {subsystem.status} ({subsystem.health}%)
            </span>
            <div className="mt-1 text-[11px] font-mono text-slate-400">
              Risk: <span className={subsystem.risk === 'HIGH' ? 'text-red-400 font-bold' : subsystem.risk === 'MEDIUM' ? 'text-amber-400 font-bold' : 'text-emerald-400'}>{subsystem.risk}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          {subsystem.description}
        </p>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Temperature */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                Temperature
              </span>
              {subsystem.id === 'engine2' && <span className="text-[10px] text-amber-400 font-bold">+9%</span>}
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">
              {subsystem.metrics.temperature} <span className="text-xs text-slate-400">°C</span>
            </div>
          </div>

          {/* Vibration */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Vibration
              </span>
              {subsystem.id === 'engine2' && <span className="text-[10px] text-red-400 font-bold">+18%</span>}
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">
              {subsystem.metrics.vibration} <span className="text-xs text-slate-400">g</span>
            </div>
          </div>

          {/* Oil Pressure */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-sky-400" />
                Oil Pressure
              </span>
              {subsystem.id === 'engine2' && <span className="text-[10px] text-amber-400 font-bold">-7%</span>}
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">
              {subsystem.metrics.pressure} <span className="text-xs text-slate-400">psi</span>
            </div>
          </div>

          {/* RPM */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                RPM Speed
              </span>
              <span className="text-[10px] text-slate-500 font-mono">NOMINAL</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100">
              {subsystem.metrics.rpm.toLocaleString()} <span className="text-xs text-slate-400">RPM</span>
            </div>
          </div>
        </div>

        {/* Specific AI Anomaly Warning for Engine 2 */}
        {subsystem.id === 'engine2' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 mb-6">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>AI DETECTED DEGRADATION PATTERN</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              Combined rotor vibration increase (+18%) and temperature spike (+9%) indicates potential bearing fatigue under high-stress operating conditions.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-4 border-t border-slate-800">
        <button
          onClick={onOpenSimulation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Simulate What-If Scenario</span>
        </button>

        <button
          onClick={onOpenAIIntelligence}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-semibold text-xs transition-colors"
        >
          <span>View Explainable AI Diagnosis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
