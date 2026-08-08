import React, { useState } from 'react';
import { compareWhatIfScenarios } from '../../services/simulationEngine';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Sliders, ArrowRight } from 'lucide-react';

interface WhatIfComparisonProps {
  onBackToSimulation: () => void;
}

export const WhatIfComparison: React.FC<WhatIfComparisonProps> = ({ onBackToSimulation }) => {
  const [tempA, setTempA] = useState(25);
  const [loadA, setLoadA] = useState(85);
  const [cyclesA, setCyclesA] = useState(50);

  const [tempB, setTempB] = useState(45);
  const [loadB, setLoadB] = useState(115);
  const [cyclesB, setCyclesB] = useState(50);

  const comparison = compareWhatIfScenarios(
    'Scenario A — Standard Operations',
    tempA,
    loadA,
    cyclesA,
    'Scenario B — Extreme Desert High-Load',
    tempB,
    loadB,
    cyclesB
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSimulation}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
            title="Back to Simulation Sandbox"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-0.5">Decision Support Tool</span>
            <h1 className="text-2xl font-bold text-slate-100 font-mono">What-If Side-by-Side Comparison</h1>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          SIDE-BY-SIDE ANALYTICS
        </span>
      </div>

      {/* Side-by-Side Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario A Card */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 flex flex-col justify-between tech-corner">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">SCENARIO A</span>
                <h3 className="text-lg font-bold text-slate-100 font-mono">Standard Operating Conditions</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                RISK: {comparison.scenarioA.risk}
              </span>
            </div>

            {/* Config controls */}
            <div className="space-y-3 mb-6 font-mono text-xs">
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Ambient Temp:</span>
                <span className="text-slate-100 font-bold">{tempA} °C</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Engine Throttle Load:</span>
                <span className="text-slate-100 font-bold">{loadA} %</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Forecast Cycles:</span>
                <span className="text-slate-100 font-bold">+{cyclesA} Cycles</span>
              </div>
            </div>

            {/* Output Health Index */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center mb-4">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">PROJECTED HEALTH RESULT</span>
              <span className="text-4xl font-extrabold font-mono text-emerald-400">
                {comparison.scenarioA.projectedHealth}%
              </span>
            </div>
          </div>
        </div>

        {/* Scenario B Card */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-red-500/40 p-6 flex flex-col justify-between glow-red">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-red-400 uppercase block mb-1">SCENARIO B</span>
                <h3 className="text-lg font-bold text-slate-100 font-mono">High Temp + High Engine Load</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                RISK: {comparison.scenarioB.risk}
              </span>
            </div>

            {/* Config controls */}
            <div className="space-y-3 mb-6 font-mono text-xs">
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Ambient Temp:</span>
                <span className="text-amber-400 font-bold">{tempB} °C</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Engine Throttle Load:</span>
                <span className="text-red-400 font-bold">{loadB} %</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Forecast Cycles:</span>
                <span className="text-slate-100 font-bold">+{cyclesB} Cycles</span>
              </div>
            </div>

            {/* Output Health Index */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center mb-4">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">PROJECTED HEALTH RESULT</span>
              <span className="text-4xl font-extrabold font-mono text-red-400">
                {comparison.scenarioB.projectedHealth}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Insights Box */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-cyan-500/40 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider">
            Comparative AI Key Takeaways
          </h3>
        </div>

        <ul className="space-y-2.5">
          {comparison.insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
