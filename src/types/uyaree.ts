export type SubsystemId = 
  | 'engine1'
  | 'engine2'
  | 'hydraulics'
  | 'fuel'
  | 'electrical'
  | 'landingGear'
  | 'flightControls'
  | 'avionics';

export type HealthStatus = 'HEALTHY' | 'ATTENTION' | 'CRITICAL';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface SubsystemHealth {
  id: SubsystemId;
  name: string;
  category: string;
  health: number; // 0 - 100
  status: HealthStatus;
  risk: RiskLevel;
  metrics: {
    temperature: number; // °C
    vibration: number; // g
    pressure: number; // psi
    rpm: number; // RPM
  };
  position3D: [number, number, number]; // [x, y, z] for 3D marker
  description: string;
}

export interface AircraftTelemetryPoint {
  timestamp: string;
  engineTemp: number;
  vibration: number;
  oilPressure: number;
  rpm: number;
  altitude: number;
  airspeed: number;
}

export interface AircraftInfo {
  id: string;
  model: string;
  tailNumber: string;
  flightCycles: number;
  totalFlightHours: number;
  lastUpdated: string;
  overallHealth: number;
  status: HealthStatus;
  activeAlertsCount: number;
  componentsAtRiskCount: number;
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  ambientTemp: number; // °C (-20 to 50)
  engineLoad: number; // % (50 to 120)
  flightCycles: number; // additional cycles (+10 to +200)
  altitudeFt: number;
}

export interface SimulationResult {
  currentHealth: number;
  projectedHealth: number;
  currentRisk: RiskLevel;
  projectedRisk: RiskLevel;
  mostAffectedSystem: string;
  rulCyclesEstimate: number;
  trajectory: Array<{
    cycle: number;
    baselineHealth: number;
    simulatedHealth: number;
  }>;
}

export interface WhatIfComparison {
  scenarioA: {
    name: string;
    risk: RiskLevel;
    projectedHealth: number;
    mostAffected: string;
  };
  scenarioB: {
    name: string;
    risk: RiskLevel;
    projectedHealth: number;
    mostAffected: string;
  };
  healthDelta: number;
  insights: string[];
}

export interface AIExplanation {
  what: string;
  why: string;
  confidenceScore: number; // e.g. 91%
  whatNext: string;
  evidence: {
    vibrationChange: string;
    tempChange: string;
    pressureChange: string;
  };
}

export interface AlertItem {
  id: string;
  aircraftId: string;
  systemId: SubsystemId;
  systemName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  reason: string;
  simulationImpact: string;
  recommendedAction: string;
  confidence: number;
  acknowledged?: boolean;
}

export interface RecommendationCard {
  id: string;
  priority: 'HIGH PRIORITY' | 'MEDIUM PRIORITY' | 'LOW PRIORITY';
  systemId: SubsystemId;
  systemName: string;
  risk: RiskLevel;
  confidence: number;
  rulEstimate: number; // cycles
  recommendation: string;
  evidenceSummary: string;
}

export interface DemoStep {
  step: number;
  title: string;
  description: string;
  activeTab: 'landing' | 'dashboard' | 'digitalTwin' | 'simulation' | 'intelligence' | 'alerts' | 'maintenance' | 'reports';
  highlightComponent?: SubsystemId;
  actionTrigger?: string;
}
