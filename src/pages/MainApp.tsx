import React, { useState, useEffect } from 'react';
import { HeaderNav, TabView } from '../components/Dashboard/HeaderNav';
import { HealthGauge } from '../components/Dashboard/HealthGauge';
import { TelemetryCharts } from '../components/Dashboard/TelemetryCharts';
import { Aircraft3D } from '../components/DigitalTwin/Aircraft3D';
import { ComponentDetailPanel } from '../components/DigitalTwin/ComponentDetailPanel';
import { SimulationPanel } from '../components/Simulation/SimulationPanel';
import { WhatIfComparison } from '../components/Simulation/WhatIfComparison';
import { ExplainableAI } from '../components/Intelligence/ExplainableAI';
import { AlertsPanel } from '../components/Alerts/AlertsPanel';
import { RecommendationCards } from '../components/Maintenance/RecommendationCards';
import { ReportGenerator } from '../components/Reports/ReportGenerator';
import { GuidedDemoBanner } from '../components/Demo/GuidedDemoBanner';
import { AuthModal } from './AuthModal';

import { DEFAULT_AIRCRAFT, INITIAL_SUBSYSTEMS } from '../services/mockData';
import { TelemetryEngine } from '../services/telemetryEngine';
import { SubsystemHealth, SubsystemId, AircraftTelemetryPoint } from '../types/uyaree';

interface MainAppProps {
  initialTab?: TabView;
}

export const MainApp: React.FC<MainAppProps> = ({ initialTab = 'digitalTwin' }) => {
  const [currentTab, setCurrentTab] = useState<TabView>(initialTab);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(false);

  // Subsystems State
  const [subsystems, setSubsystems] = useState<SubsystemHealth[]>(INITIAL_SUBSYSTEMS);
  const [selectedSubsystemId, setSelectedSubsystemId] = useState<SubsystemId | null>('engine2');

  // Sub-view overlays (e.g. what-if side by side)
  const [isWhatIfMode, setIsWhatIfMode] = useState(false);

  // Telemetry Stream Engine
  const [telemetryEngine] = useState(() => new TelemetryEngine());
  const [telemetryHistory, setTelemetryHistory] = useState<AircraftTelemetryPoint[]>(() => telemetryEngine.getHistory());
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  // Real-time telemetry tick loop
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const nextPoint = telemetryEngine.getNextPoint(false);
      setTelemetryHistory(prev => [...prev.slice(1), nextPoint]);

      // Dynamically update Engine 2 subsystem metrics with live feed values
      setSubsystems(prev => prev.map(sub => {
        if (sub.id === 'engine2') {
          return {
            ...sub,
            metrics: {
              temperature: nextPoint.engineTemp,
              vibration: nextPoint.vibration,
              pressure: nextPoint.oilPressure,
              rpm: nextPoint.rpm,
            }
          };
        }
        return sub;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, telemetryEngine]);

  const selectedSubsystem = subsystems.find(s => s.id === selectedSubsystemId) || null;

  const handleSelectSubsystem = (id: SubsystemId) => {
    setSelectedSubsystemId(id);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Mission Control Header Navigation */}
      <HeaderNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setIsWhatIfMode(false);
          setCurrentTab(tab);
        }}
        aircraft={DEFAULT_AIRCRAFT}
        isLiveStreaming={isLiveStreaming}
        onToggleLiveStream={() => setIsLiveStreaming(!isLiveStreaming)}
        onOpenDemoMode={() => setShowDemoBanner(true)}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* VIEW 1: EXECUTIVE DASHBOARD */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            <HealthGauge
              aircraft={DEFAULT_AIRCRAFT}
              onOpenAlerts={() => setCurrentTab('alerts')}
              onOpenDigitalTwin={() => setCurrentTab('digitalTwin')}
              onOpenSimulation={() => setCurrentTab('simulation')}
            />
            <TelemetryCharts
              telemetryHistory={telemetryHistory}
              isLiveStreaming={isLiveStreaming}
            />
          </div>
        )}

        {/* VIEW 2: 3D DIGITAL TWIN */}
        {currentTab === 'digitalTwin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 3D Model WebGL Canvas Container */}
            <div className="lg:col-span-8 min-h-[500px] h-full">
              <Aircraft3D
                subsystems={subsystems}
                selectedSubsystemId={selectedSubsystemId}
                onSelectSubsystem={handleSelectSubsystem}
              />
            </div>

            {/* Selected Component Detail Inspector Panel */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <ComponentDetailPanel
                subsystem={selectedSubsystem}
                onOpenSimulation={() => setCurrentTab('simulation')}
                onOpenAIIntelligence={() => setCurrentTab('intelligence')}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: SIMULATION SANDBOX & WHAT-IF */}
        {currentTab === 'simulation' && (
          isWhatIfMode ? (
            <WhatIfComparison
              onBackToSimulation={() => setIsWhatIfMode(false)}
            />
          ) : (
            <SimulationPanel
              onOpenWhatIfComparison={() => setIsWhatIfMode(true)}
              onOpenAIIntelligence={() => setCurrentTab('intelligence')}
            />
          )
        )}

        {/* VIEW 4: HEALTH INTELLIGENCE & EXPLAINABLE AI */}
        {currentTab === 'intelligence' && (
          <ExplainableAI
            subsystem={selectedSubsystem}
            onOpenMaintenance={() => setCurrentTab('maintenance')}
          />
        )}

        {/* VIEW 5: ALERTS & ANOMALY CENTER */}
        {currentTab === 'alerts' && (
          <AlertsPanel
            onOpenDigitalTwinComponent={(id) => {
              setSelectedSubsystemId(id as SubsystemId);
              setCurrentTab('digitalTwin');
            }}
          />
        )}

        {/* VIEW 6: MAINTENANCE RECOMMENDATIONS */}
        {currentTab === 'maintenance' && (
          <RecommendationCards
            onGenerateReport={() => setCurrentTab('reports')}
          />
        )}

        {/* VIEW 7: EXECUTIVE REPORTS */}
        {currentTab === 'reports' && (
          <ReportGenerator
            aircraft={DEFAULT_AIRCRAFT}
            subsystems={subsystems}
          />
        )}
      </main>

      {/* Guided Demo Story Banner Overlay */}
      {showDemoBanner && (
        <GuidedDemoBanner
          onNavigateTab={(tab) => {
            setIsWhatIfMode(false);
            setCurrentTab(tab);
          }}
          onSelectComponent={(id) => setSelectedSubsystemId(id)}
          onCloseDemo={() => setShowDemoBanner(false)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => setCurrentTab('dashboard')}
        onDirectDemoMode={() => {
          setShowDemoBanner(true);
          setCurrentTab('dashboard');
        }}
      />
    </div>
  );
};
