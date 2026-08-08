import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { AircraftTelemetryPoint } from '../../types/uyaree';
import { Thermometer, Activity, Gauge, Zap, Radio } from 'lucide-react';

interface TelemetryChartsProps {
  telemetryHistory: AircraftTelemetryPoint[];
  isLiveStreaming: boolean;
}

export const TelemetryCharts: React.FC<TelemetryChartsProps> = ({
  telemetryHistory,
  isLiveStreaming,
}) => {
  const latest = telemetryHistory[telemetryHistory.length - 1] || {
    engineTemp: 704,
    vibration: 1.8,
    oilPressure: 38,
    rpm: 12580
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 mb-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">Real-Time Sensor Feeds</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 animate-pulse">
              <Radio className="w-3 h-3 text-cyan-400" />
              LIVE SIMULATION ACTIVE
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 font-mono">Engine 2 Telemetry & Anomaly Analysis</h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-400">Temp (°C):</span>
            <span className="text-slate-100 font-bold">{latest.engineTemp}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-slate-400">Vibration (g):</span>
            <span className="text-slate-100 font-bold">{latest.vibration}g</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span className="text-slate-400">Oil Press (psi):</span>
            <span className="text-slate-100 font-bold">{latest.oilPressure} psi</span>
          </div>
        </div>
      </div>

      {/* 4 Sensor Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Engine Core Temperature Chart */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-slate-200 uppercase">Engine Core Temperature</span>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">{latest.engineTemp} °C</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="timestamp" stroke="#64748B" tick={{ fontSize: 10 }} />
                <YAxis domain={[670, 740]} stroke="#64748B" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <ReferenceLine y={700} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Warn: 700°C', fill: '#EF4444', fontSize: 10 }} />
                <Line type="monotone" dataKey="engineTemp" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Rotor Vibration Chart */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-400" />
              <span className="text-xs font-mono font-bold text-slate-200 uppercase">Rotor Shaft Vibration</span>
            </div>
            <span className="text-xs font-mono text-red-400 font-bold">{latest.vibration} g (+18%)</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="timestamp" stroke="#64748B" tick={{ fontSize: 10 }} />
                <YAxis domain={[0.8, 2.4]} stroke="#64748B" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <ReferenceLine y={1.5} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Max: 1.5g', fill: '#EF4444', fontSize: 10 }} />
                <Line type="monotone" dataKey="vibration" stroke="#EF4444" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Oil Pressure Chart */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono font-bold text-slate-200 uppercase">Engine Lubrication Oil Pressure</span>
            </div>
            <span className="text-xs font-mono text-sky-400 font-bold">{latest.oilPressure} psi</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="timestamp" stroke="#64748B" tick={{ fontSize: 10 }} />
                <YAxis domain={[30, 55]} stroke="#64748B" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <ReferenceLine y={40} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'Min: 40psi', fill: '#F59E0B', fontSize: 10 }} />
                <Line type="monotone" dataKey="oilPressure" stroke="#38BDF8" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Engine RPM Speed Chart */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-slate-200 uppercase">Turbofan N1 Rotor Speed</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">{latest.rpm.toLocaleString()} RPM</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="timestamp" stroke="#64748B" tick={{ fontSize: 10 }} />
                <YAxis domain={[12000, 13000]} stroke="#64748B" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Line type="monotone" dataKey="rpm" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
