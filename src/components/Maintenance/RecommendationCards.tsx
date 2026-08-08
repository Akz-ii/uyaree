import React from 'react';
import { RecommendationCard } from '../../types/uyaree';
import { INITIAL_RECOMMENDATIONS } from '../../services/mockData';
import { Wrench, Clock, AlertTriangle, ShieldCheck, CheckCircle2, FileText, Info } from 'lucide-react';

interface RecommendationCardsProps {
  onGenerateReport: () => void;
}

export const RecommendationCards: React.FC<RecommendationCardsProps> = ({ onGenerateReport }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden tech-corner">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">Engineering Action Plan</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">PRIORITIZED RUL OUTPUT</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 font-mono">Maintenance Recommendations</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              AI-driven predictive maintenance recommendations ordered by urgency, estimated Remaining Useful Life (RUL), and operational risk factor.
            </p>
          </div>

          <button
            onClick={onGenerateReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Executive Report</span>
          </button>
        </div>
      </div>

      {/* Prototype Disclaimer Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3 text-xs text-slate-400 font-mono">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Prototype Disclaimer:</strong> UYAREE outputs are engineering estimates for research & demonstration purposes. Certified aircraft maintenance requires human sign-off.
        </span>
      </div>

      {/* Recommendation Cards Stack */}
      <div className="space-y-4">
        {INITIAL_RECOMMENDATIONS.map((card) => {
          const isHigh = card.priority === 'HIGH PRIORITY';
          const isMed = card.priority === 'MEDIUM PRIORITY';

          return (
            <div
              key={card.id}
              className={`bg-slate-900/80 backdrop-blur-md rounded-2xl border p-6 transition-all ${
                isHigh ? 'border-red-500/40 glow-red' : isMed ? 'border-amber-500/40 glow-amber' : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase ${
                    isHigh ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                    isMed ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {card.priority}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 font-mono">{card.systemName}</h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-400">RUL Estimate:</span>
                    <span className="text-cyan-300 font-bold">{card.rulEstimate} Cycles</span>
                  </div>
                  <div className="bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Confidence:</span> <span className="text-emerald-400 font-bold">{card.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div>
                  <span className="font-mono text-[11px] text-slate-400 block mb-1 uppercase font-bold">RECOMMENDED MAINTENANCE ACTION</span>
                  <p className="text-slate-100 font-semibold text-sm leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    {card.recommendation}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-slate-400 block mb-1 uppercase font-bold">TELEMETRY EVIDENCE SUMMARY</span>
                  <p className="text-slate-300 leading-relaxed">
                    {card.evidenceSummary}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
