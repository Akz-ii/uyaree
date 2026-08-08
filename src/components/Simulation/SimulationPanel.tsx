import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { SimulationResult, SimulationScenario } from '../../types/uyaree';
import { PRESET_SCENARIOS } from '../../services/mockData';
import { runAircraftSimulation } from '../../services/simulationEngine';
import { Play, RotateCcw, AlertTriangle, ArrowRight, ShieldCheck, Cpu, Sliders } from 'lucide-react';

interface SimulationPanelProps {
  onOpenWhatIfComparison: () => void;
  onOpenAIIntelligence: () => void;
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({
  onOpenWhatIfComparison,
  onOpenAIIntelligence,
}) => {
  const [ambientTemp, setAmbientTemp] = useState(42);
  const [engineLoad, setEngineLoad] = useState(105);
  const [flightCycles, setFlightCycles] = useState(25);
  const [selectedPreset, setSelectedPreset] = useState<string>('takeoff-hot');

  const [isRunning, setIsRunning] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult>(
    runAircraftSimulation(42, 105, 25)
  );

  const handleSelectPreset = (preset: SimulationScenario) => {
    setSelectedPreset(preset.id);
    setAmbientTemp(preset.ambientTemp);
    setEngineLoad(preset.engineLoad);
    setFlightCycles(preset.flightCycles);
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runAircraftSimulation(ambientTemp, engineLoad, flightCycles);
      setSimulationResult(res);
      setIsRunning(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden tech-corner">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">Interactive Forecasting Sandbox</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">PRIMARY FEATURE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
              What happens if...?
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Simulate operational conditions, extreme weather, and high throttle regimes to predict subsystem degradation before it happens on real flights.
            </p>
          </div>

          <button
            onClick={onOpenWhatIfComparison}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30 transition-all shrink-0"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Side-by-Side What-If Comparison</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Scenarios & Parameter Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preset Scenario Cards */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
              Preset Operational Scenarios
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {PRESET_SCENARIOS.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 rounded-xl text-left font-mono transition-all border ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-slate-100 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200">{preset.name}</span>
                      <span className="text-[10px] text-cyan-400 font-semibold">{preset.ambientTemp}°C | {preset.engineLoad}% Load</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{preset.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Parameter Sliders */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-5">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Adjust Parameter Controls
            </h3>

            {/* Slider 1: Ambient Temperature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Ambient Temperature</span>
                <span className="text-cyan-400 font-bold">{ambientTemp} °C</span>
              </div>
              <input
                type="range"
                min="-20"
                max="50"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>-20°C (Polar)</span>
                <span>20°C (Standard)</span>
                <span>50°C (Desert)</span>
              </div>
            </div>

            {/* Slider 2: Engine Throttle Load */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Engine Throttle Load</span>
                <span className="text-amber-400 font-bold">{engineLoad} %</span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                value={engineLoad}
                onChange={(e) => setEngineLoad(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>50% (Idle)</span>
                <span>85% (Cruise)</span>
                <span>120% (Overload)</span>
              </div>
            </div>

            {/* Slider 3: Additional Flight Cycles */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Forecast Flight Cycles</span>
                <span className="text-sky-400 font-bold">+{flightCycles} Cycles</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={flightCycles}
                onChange={(e) => setFlightCycles(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>+10 Cycles</span>
                <span>+100 Cycles</span>
                <span>+200 Cycles</span>
              </div>
            </div>

            {/* Primary CTA: RUN SIMULATION */}
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className={`w-full py-3.5 px-6 rounded-xl font-mono font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isRunning
                  ? 'bg-cyan-500/30 text-cyan-300 cursor-wait'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 active:scale-[0.99]'
              }`}
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                  <span>Computing Simulation Trajectory...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>RUN SIMULATION</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Simulation Output & Trajectory Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Result Highlights */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                SIMULATION OUTPUT RESULTS
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SIMULATION COMPLETE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">CURRENT HEALTH</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{simulationResult.currentHealth}%</span>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">PROJECTED HEALTH</span>
                <span className={`text-xl font-bold font-mono ${
                  simulationResult.projectedHealth < 70 ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {simulationResult.projectedHealth}%
                </span>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">RISK SHIFT</span>
                <span className="text-sm font-bold font-mono text-slate-100 flex items-center gap-1 mt-1">
                  <span className="text-amber-400">{simulationResult.currentRisk}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span className="text-red-400 font-extrabold">{simulationResult.projectedRisk}</span>
                </span>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">MOST AFFECTED</span>
                <span className="text-xs font-bold font-mono text-amber-400 block truncate">
                  Engine 2
                </span>
              </div>
            </div>

            {/* Trajectory Forecast Chart (Baseline vs Simulated) */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-300 font-bold">
                  Health Degradation Trajectory (Cycles)
                </span>
                <div className="flex items-center gap-4 text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Baseline Trajectory
                  </span>
                  <span className="flex items-center gap-1 text-red-400 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Simulated Trajectory
                  </span>
                </div>
              </div>

              <div className="h-60 w-full bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={simulationResult.trajectory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="cycle" stroke="#64748B" tick={{ fontSize: 10 }} label={{ value: '+ Flight Cycles', position: 'insideBottomRight', offset: -5, fill: '#64748B', fontSize: 10 }} />
                    <YAxis domain={[40, 100]} stroke="#64748B" tick={{ fontSize: 10 }} label={{ value: 'Health %', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                      labelStyle={{ color: '#94A3B8' }}
                    />
                    <Line type="monotone" dataKey="baselineHealth" name="Baseline Health" stroke="#10B981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="simulatedHealth" name="Simulated Stress" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Warning Box */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold text-red-400 block mb-1">
                  CRITICAL RUL ESTIMATE: {simulationResult.rulCyclesEstimate} FLIGHT CYCLES
                </span>
                <p className="text-xs text-red-200/90 leading-relaxed">
                  High ambient temp ({ambientTemp}°C) combined with {engineLoad}% throttle load accelerates Engine 2 bearing fatigue by 3.2x. Inspection recommended before completing {simulationResult.rulCyclesEstimate} cycles.
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA to Explainable AI */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-slate-200 block">Want natural language rationale?</span>
              <span className="text-[11px] font-mono text-slate-400">View what caused this degradation prediction with Explainable AI.</span>
            </div>
            <button
              onClick={onOpenAIIntelligence}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40 transition-colors shrink-0"
            >
              Explain Result →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
