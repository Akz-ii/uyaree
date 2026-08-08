import React from 'react';
import { 
  Plane, 
  Activity, 
  Box, 
  Sliders, 
  BrainCircuit, 
  AlertCircle, 
  Wrench, 
  FileText, 
  Play, 
  Home, 
  User, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { AircraftInfo } from '../../types/uyaree';

export type TabView = 
  | 'landing'
  | 'dashboard'
  | 'digitalTwin'
  | 'simulation'
  | 'intelligence'
  | 'alerts'
  | 'maintenance'
  | 'reports';

interface HeaderNavProps {
  currentTab: TabView;
  onTabChange: (tab: TabView) => void;
  aircraft: AircraftInfo;
  isLiveStreaming: boolean;
  onToggleLiveStream: () => void;
  onOpenDemoMode: () => void;
  onOpenAuth: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onTabChange,
  aircraft,
  isLiveStreaming,
  onToggleLiveStream,
  onOpenDemoMode,
  onOpenAuth,
}) => {
  const tabs: Array<{ id: TabView; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'digitalTwin', label: 'Digital Twin', icon: Box },
    { id: 'simulation', label: 'Simulation', icon: Sliders },
    { id: 'intelligence', label: 'AI Intelligence', icon: BrainCircuit },
    { id: 'alerts', label: 'Alerts (3)', icon: AlertCircle },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/90 backdrop-blur-xl border-b border-slate-800">
      {/* Top Status & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onTabChange('landing')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                <Plane className="w-5 h-5 text-cyan-400 -rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-extrabold tracking-wider text-slate-100 font-sans">
                  UYAREE
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  PROTOTYPE v1.0
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 block -mt-1">
                AI Aircraft Digital Twin & Simulation
              </span>
            </div>
          </button>
        </div>

        {/* Live Status & Aircraft Context Ticker */}
        <div className="hidden md:flex items-center gap-4 bg-slate-900/60 px-4 py-1.5 rounded-full border border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Aircraft:</span>
            <span className="text-cyan-300 font-bold">{aircraft.id} ({aircraft.tailNumber})</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Cycles:</span>
            <span className="text-slate-200">{aircraft.flightCycles.toLocaleString()}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>MongoDB Connected</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              HEALTHY ({aircraft.overallHealth}%)
            </span>
          </div>
        </div>

        {/* Action Buttons: Live Stream Toggle & Guided Demo */}
        <div className="flex items-center gap-2.5">
          {/* Live Telemetry Indicator & Toggle */}
          <button
            onClick={onToggleLiveStream}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
              isLiveStreaming
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Live Telemetry Feed Simulation"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLiveStreaming ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="hidden sm:inline">{isLiveStreaming ? 'LIVE TELEMETRY ON' : 'PAUSED'}</span>
          </button>

          {/* Guided Demo Button */}
          <button
            onClick={onOpenDemoMode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Launch Guided Demo</span>
          </button>

          {/* Login / Auth Modal Trigger */}
          <button
            onClick={onOpenAuth}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-xl transition-colors border border-transparent hover:border-slate-800"
            title="Login / Account"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between border-t border-slate-800/60 overflow-x-auto">
        <nav className="flex items-center space-x-1 py-1">
          {/* Landing Page Toggle */}
          <button
            onClick={() => onTabChange('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <span className="text-slate-800 px-1">|</span>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
