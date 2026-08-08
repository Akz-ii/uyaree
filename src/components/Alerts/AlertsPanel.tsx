import React, { useState } from 'react';
import { AlertItem } from '../../types/uyaree';
import { INITIAL_ALERTS } from '../../services/mockData';
import { AlertCircle, AlertTriangle, ShieldCheck, Filter, Clock, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

interface AlertsPanelProps {
  onOpenDigitalTwinComponent?: (systemId: string) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ onOpenDigitalTwinComponent }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(a => filterSeverity === 'ALL' || a.severity === filterSeverity);

  const handleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden tech-corner">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">Real-Time Anomaly Feed</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">3 ACTIVE ALERTS</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 font-mono">System Alerts & Anomaly Center</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Centralized dashboard of telemetry threshold breaches, AI anomaly detections, and simulation escalation warnings.
            </p>
          </div>

          {/* Severity Filter Controls */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterSeverity === sev
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Cards Stack */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const isHigh = alert.severity === 'HIGH' || alert.severity === 'CRITICAL';
          const isMed = alert.severity === 'MEDIUM';

          return (
            <div
              key={alert.id}
              className={`bg-slate-900/80 backdrop-blur-md rounded-2xl border p-6 transition-all ${
                alert.acknowledged ? 'opacity-60 border-slate-800' :
                isHigh ? 'border-red-500/40 glow-red' :
                isMed ? 'border-amber-500/40 glow-amber' : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase ${
                    isHigh ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                    isMed ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {alert.severity} RISK
                  </span>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 block font-semibold">{alert.id} • {alert.timestamp}</span>
                    <h3 className="text-lg font-bold text-slate-100 font-mono">{alert.systemName}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">AI Confidence: <strong className="text-emerald-400">{alert.confidence}%</strong></span>
                  {!alert.acknowledged ? (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold border border-slate-700 transition-colors"
                    >
                      Acknowledge
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-center gap-1 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Acknowledged
                    </span>
                  )}
                </div>
              </div>

              {/* Alert Content Details */}
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 uppercase text-[10px] block mb-0.5">REASON FOR ALERT</span>
                  <p className="text-slate-200 font-sans text-xs leading-relaxed">{alert.reason}</p>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-amber-400 uppercase text-[10px] block mb-0.5">SIMULATION & WHAT-IF IMPACT</span>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">{alert.simulationImpact}</p>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-cyan-400 uppercase text-[10px] block mb-0.5">RECOMMENDED ACTION</span>
                  <p className="text-cyan-200 font-sans text-xs leading-relaxed">{alert.recommendedAction}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
