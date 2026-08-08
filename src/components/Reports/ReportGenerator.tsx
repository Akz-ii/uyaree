import React, { useRef } from 'react';
import { AircraftInfo, SubsystemHealth } from '../../types/uyaree';
import { DEFAULT_AIRCRAFT, INITIAL_SUBSYSTEMS, INITIAL_RECOMMENDATIONS, INITIAL_ALERTS } from '../../services/mockData';
import { Printer, Download, FileText, CheckCircle2, ShieldCheck, AlertTriangle, Plane } from 'lucide-react';

interface ReportGeneratorProps {
  aircraft?: AircraftInfo;
  subsystems?: SubsystemHealth[];
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  aircraft = DEFAULT_AIRCRAFT,
  subsystems = INITIAL_SUBSYSTEMS,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden tech-corner print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">Engineering Documentation</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">PDF / PRINT READY</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 font-mono">Executive Health & Simulation Report</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Comprehensive report detailing overall aircraft state, subsystem health indexes, AI anomaly findings, simulation forecasts, and engineering recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div
        ref={reportRef}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8 print:bg-white print:text-black print:p-0 print:border-none shadow-2xl"
      >
        {/* Report Header Logo & Title */}
        <div className="flex items-center justify-between border-b border-slate-800 print:border-gray-300 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 print:bg-black print:text-white">
              <Plane className="w-6 h-6 -rotate-45" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold font-mono text-slate-100 print:text-black">UYAREE ENGINEERING REPORT</h2>
              <span className="text-xs font-mono text-cyan-400 print:text-gray-600 block">AI Aircraft Digital Twin & Predictive Maintenance</span>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-400 print:text-gray-600">
            <div>Report Ref: <strong className="text-slate-200 print:text-black">REP-2026-UY001</strong></div>
            <div>Date: <strong className="text-slate-200 print:text-black">{new Date().toLocaleDateString()}</strong></div>
            <div>Aircraft ID: <strong className="text-cyan-400 print:text-black">{aircraft.id} ({aircraft.tailNumber})</strong></div>
          </div>
        </div>

        {/* 1. Executive Summary Box */}
        <div className="bg-slate-950/60 print:bg-gray-100 p-5 rounded-xl border border-slate-800 print:border-gray-300">
          <h3 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider mb-2">1. Executive Summary</h3>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed font-sans">
            Aircraft UY-001 currently maintains an overall health index of <strong className="text-emerald-400 print:text-black">94%</strong> with 1,284 logged flight cycles. Background telemetry intelligence flagged an anomaly pattern in Engine 2 (Starboard Turbofan) characterized by elevated rotor vibration (+18%), temperature rise (+9%), and oil pressure degradation (-7%). Borescope engineering inspection is recommended within 18 flight cycles.
          </p>
        </div>

        {/* 2. Aircraft Subsystem Health Status Table */}
        <div>
          <h3 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider mb-3">2. Subsystem Health Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 print:border-gray-300 text-slate-400 print:text-gray-600">
                  <th className="py-2.5 px-3">Subsystem Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Health Score</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Metrics (Temp / Vibe / Press)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-gray-200">
                {subsystems.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-950/40">
                    <td className="py-2.5 px-3 font-bold text-slate-200 print:text-black">{sub.name}</td>
                    <td className="py-2.5 px-3 text-slate-400 print:text-gray-600">{sub.category}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-100 print:text-black">{sub.health}%</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sub.status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 print:text-red-600' :
                        sub.status === 'ATTENTION' ? 'bg-amber-500/20 text-amber-400 print:text-amber-600' :
                        'bg-emerald-500/20 text-emerald-400 print:text-green-600'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 print:text-gray-600">
                      {sub.metrics.temperature}°C / {sub.metrics.vibration}g / {sub.metrics.pressure}psi
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. AI Findings & Simulation Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/60 print:bg-gray-100 p-5 rounded-xl border border-slate-800 print:border-gray-300">
            <h3 className="text-xs font-mono font-bold text-amber-400 print:text-black uppercase tracking-wider mb-2">3. AI Health Intelligence Findings</h3>
            <ul className="space-y-2 text-xs text-slate-300 print:text-gray-800 font-sans">
              <li>• Engine 2 rotor shaft imbalance confirmed (vibration +18%).</li>
              <li>• Core temperature elevated by +9% above baseline nominal threshold.</li>
              <li>• AI confidence score: <strong>91% model certainty</strong>.</li>
            </ul>
          </div>

          <div className="bg-slate-950/60 print:bg-gray-100 p-5 rounded-xl border border-slate-800 print:border-gray-300">
            <h3 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider mb-2">4. Simulation Stress Forecast</h3>
            <ul className="space-y-2 text-xs text-slate-300 print:text-gray-800 font-sans">
              <li>• Hot Day Takeoff scenario (42°C, 105% load) projected health: <strong>76%</strong>.</li>
              <li>• Operational risk shifts from MEDIUM to HIGH.</li>
              <li>• Estimated RUL: <strong>18 flight cycles</strong>.</li>
            </ul>
          </div>
        </div>

        {/* 5. Prioritized Engineering Recommendations */}
        <div>
          <h3 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider mb-3">5. Prioritized Maintenance Action Plan</h3>
          <div className="space-y-3">
            {INITIAL_RECOMMENDATIONS.map((rec) => (
              <div key={rec.id} className="p-4 bg-slate-950/60 print:bg-gray-100 rounded-xl border border-slate-800 print:border-gray-300 flex items-start justify-between gap-4 font-mono text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-100 print:text-black">{rec.priority}: {rec.systemName}</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-cyan-400 print:text-black font-bold">RUL: {rec.rulEstimate} Cycles</span>
                  </div>
                  <p className="text-slate-300 print:text-gray-800 font-sans text-xs">{rec.recommendation}</p>
                </div>
                <span className="px-2 py-1 rounded bg-slate-800 print:bg-gray-200 text-slate-300 print:text-black text-[10px] shrink-0 font-bold">
                  {rec.risk} RISK
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-6 border-t border-slate-800 print:border-gray-300 text-center font-mono text-[10px] text-slate-500 print:text-gray-600">
          UYAREE Aircraft Digital Twin & Simulation Platform • Proof of Concept Hackathon Prototype • Not for Certified Flight Controls
        </div>
      </div>
    </div>
  );
};
