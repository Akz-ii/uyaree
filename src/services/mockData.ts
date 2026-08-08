import { 
  AircraftInfo, 
  SubsystemHealth, 
  AlertItem, 
  RecommendationCard, 
  SimulationScenario,
  DemoStep
} from '../types/uyaree';

export const DEFAULT_AIRCRAFT: AircraftInfo = {
  id: 'UY-001',
  model: 'Aero Twin X-900 (Commercial Jet Prototype)',
  tailNumber: 'N904UY',
  flightCycles: 1284,
  totalFlightHours: 3840,
  lastUpdated: '10:42 AM EST (Live Stream)',
  overallHealth: 94,
  status: 'HEALTHY',
  activeAlertsCount: 3,
  componentsAtRiskCount: 2,
};

export const INITIAL_SUBSYSTEMS: SubsystemHealth[] = [
  {
    id: 'engine1',
    name: 'Engine 1 (Port Turbofan)',
    category: 'Propulsion',
    health: 91,
    status: 'HEALTHY',
    risk: 'LOW',
    metrics: { temperature: 684, vibration: 1.1, pressure: 44, rpm: 12450 },
    position3D: [-2.2, 0.2, 0.5],
    description: 'CFM-style high-bypass turbofan engine operating well within nominal thermal and vibrational limits.'
  },
  {
    id: 'engine2',
    name: 'Engine 2 (Starboard Turbofan)',
    category: 'Propulsion',
    health: 76,
    status: 'ATTENTION',
    risk: 'HIGH',
    metrics: { temperature: 704, vibration: 1.8, pressure: 38, rpm: 12580 },
    position3D: [2.2, 0.2, 0.5],
    description: 'Elevated rotor imbalance causing +18% vibration trend, +9% core temp rise, and -7% oil pressure degradation.'
  },
  {
    id: 'hydraulics',
    name: 'Hydraulic System Alpha',
    category: 'Actuation',
    health: 96,
    status: 'HEALTHY',
    risk: 'LOW',
    metrics: { temperature: 185, vibration: 0.4, pressure: 3000, rpm: 0 },
    position3D: [0, -0.4, -0.8],
    description: 'Primary flight control hydraulic loop maintaining steady 3,000 PSI operating pressure.'
  },
  {
    id: 'fuel',
    name: 'Fuel System & Metering',
    category: 'Fuel Distribution',
    health: 94,
    status: 'HEALTHY',
    risk: 'LOW',
    metrics: { temperature: 42, vibration: 0.2, pressure: 65, rpm: 3200 },
    position3D: [0, 0, 0.8],
    description: 'Wing tank fuel pumps and cross-feed valves demonstrating stable flow distribution.'
  },
  {
    id: 'electrical',
    name: 'APU & Electrical Bus',
    category: 'Power Systems',
    health: 83,
    status: 'ATTENTION',
    risk: 'MEDIUM',
    metrics: { temperature: 74, vibration: 0.5, pressure: 0, rpm: 24200 },
    position3D: [0, 0.8, -4.2],
    description: 'APU generator 2 transient voltage fluctuation (+6%) during bus tie transfer.',
  },
  {
    id: 'landingGear',
    name: 'Main Landing Gear',
    category: 'Structures & Hydraulics',
    health: 93,
    status: 'HEALTHY',
    risk: 'LOW',
    metrics: { temperature: 78, vibration: 0.4, pressure: 1650, rpm: 0 },
    position3D: [0, -1.0, 0.2],
    description: 'Main gear brake pad wear index nominal at 28%. Oleo strut damping pressure steady.',
  },
  {
    id: 'flightControls',
    name: 'Fly-by-Wire Surfaces',
    category: 'Avionics & Actuation',
    health: 95,
    status: 'HEALTHY',
    risk: 'LOW',
    metrics: { temperature: 38, vibration: 0.3, pressure: 2950, rpm: 0 },
    position3D: [0, 0.4, 4.5],
    description: 'Elevator, rudder, and spoiler digital actuators reporting zero latency or lag.'
  },
  {
    id: 'avionics',
    name: 'Integrated Modular Avionics',
    category: 'Computers & Sensors',
    health: 99,
    status: 'HEALTHY',
    risk: 'LOW',
    metrics: { temperature: 34, vibration: 0.05, pressure: 0, rpm: 0 },
    position3D: [0, 0.6, 5.2],
    description: 'Redundant flight management computers and telemetry bus operating at 100% throughput.'
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-1092',
    aircraftId: 'UY-001',
    systemId: 'engine2',
    systemName: 'Engine 2 (Starboard Turbofan)',
    severity: 'HIGH',
    timestamp: '10:41:02 AM',
    reason: 'Abnormal vibration trend detected (+18% above baseline baseline threshold).',
    simulationImpact: 'Risk escalates from MEDIUM to HIGH under high-temperature takeoff conditions.',
    recommendedAction: 'Schedule engineering borescope inspection within 18 flight cycles.',
    confidence: 91,
  },
  {
    id: 'ALT-1088',
    aircraftId: 'UY-001',
    systemId: 'engine2',
    systemName: 'Engine 2 (Starboard Turbofan)',
    severity: 'MEDIUM',
    timestamp: '09:15:44 AM',
    reason: 'Slight oil pressure drop (-7% over last 40 flight hours).',
    simulationImpact: 'Accelerated bearing wear predicted under high throttle settings.',
    recommendedAction: 'Check oil filter transducer and monitor oil contamination index.',
    confidence: 84,
  },
  {
    id: 'ALT-1074',
    aircraftId: 'UY-001',
    systemId: 'landingGear',
    systemName: 'Main Landing Gear',
    severity: 'LOW',
    timestamp: 'Yesterday 04:30 PM',
    reason: 'Brake pad wear threshold alert approaching 45%.',
    simulationImpact: 'Minimal flight impact; scheduled maintenance item.',
    recommendedAction: 'Inspect brake assembly at next overnight hangar service.',
    confidence: 96,
  }
];

export const INITIAL_RECOMMENDATIONS: RecommendationCard[] = [
  {
    id: 'REC-01',
    priority: 'HIGH PRIORITY',
    systemId: 'engine2',
    systemName: 'Engine 2 (Starboard Turbofan)',
    risk: 'HIGH',
    confidence: 91,
    rulEstimate: 18,
    recommendation: 'Schedule targeted borescope engineering inspection for N1 shaft bearing & turbine blades.',
    evidenceSummary: 'Vibration increased to 1.8g (+18%), temperature reached 704°C (+9%), oil pressure dropped to 38 psi (-7%).'
  },
  {
    id: 'REC-02',
    priority: 'MEDIUM PRIORITY',
    systemId: 'hydraulics',
    systemName: 'Hydraulic System Alpha',
    risk: 'MEDIUM',
    confidence: 76,
    rulEstimate: 65,
    recommendation: 'Monitor hydraulic return pressure trend during high-load flap deployments.',
    evidenceSummary: 'Transient pressure dip recorded during previous climb sequence, within acceptable margin but degrading.'
  },
  {
    id: 'REC-03',
    priority: 'LOW PRIORITY',
    systemId: 'landingGear',
    systemName: 'Main Landing Gear',
    risk: 'LOW',
    confidence: 94,
    rulEstimate: 120,
    recommendation: 'Plan brake pad replacement during next scheduled A-Check.',
    evidenceSummary: 'Wear sensors indicate 42% pad consumption across main gear assemblies.'
  }
];

export const PRESET_SCENARIOS: SimulationScenario[] = [
  {
    id: 'takeoff-hot',
    name: 'Hot Day Takeoff (Desert Ops)',
    description: 'Simulate high ambient temperature (42°C) combined with maximum takeoff throttle (105% load).',
    ambientTemp: 42,
    engineLoad: 105,
    flightCycles: 25,
    altitudeFt: 5000,
  },
  {
    id: 'climb-steep',
    name: 'Steep Climb & Heavy Payload',
    description: 'High climb rate requiring sustained 98% engine thrust and maximum hydraulic actuation load.',
    ambientTemp: 28,
    engineLoad: 98,
    flightCycles: 40,
    altitudeFt: 25000,
  },
  {
    id: 'cruise-extended',
    name: 'Extended Long-Haul Cruise',
    description: 'Standard altitude (38,000 ft) cruise at 82% load across 150 consecutive flight cycles.',
    ambientTemp: -45,
    engineLoad: 82,
    flightCycles: 150,
    altitudeFt: 38000,
  },
  {
    id: 'extreme-stress',
    name: 'Extreme Stress Test (Hot + Overload)',
    description: 'Severe operational stress: 48°C ground temp, 115% engine overload, and +80 flight cycles.',
    ambientTemp: 48,
    engineLoad: 115,
    flightCycles: 80,
    altitudeFt: 12000,
  }
];

export const DEMO_NARRATIVE_STEPS: DemoStep[] = [
  {
    step: 1,
    title: 'Baseline Healthy Telemetry',
    description: 'Aircraft UY-001 is initialized with standard flight operations telemetry. Overall health is 94%.',
    activeTab: 'dashboard',
  },
  {
    step: 2,
    title: 'AI Anomaly Detection Trigger',
    description: 'UYAREE background AI continuously evaluates real-time sensor streams and flags subtle vibration anomalies.',
    activeTab: 'intelligence',
    highlightComponent: 'engine2',
  },
  {
    step: 3,
    title: 'Interactive 3D Twin Highlight',
    description: 'The 3D Digital Twin automatically highlights Engine 2 with an Amber pulse, focusing camera attention.',
    activeTab: 'digitalTwin',
    highlightComponent: 'engine2',
  },
  {
    step: 4,
    title: 'Component Inspection & Telemetry',
    description: 'Detailed inspection reveals Engine 2: 76% health, 704°C temp, 1.8g vibration (+18%), and 38 psi oil pressure.',
    activeTab: 'digitalTwin',
    highlightComponent: 'engine2',
  },
  {
    step: 5,
    title: 'Open Simulation Engine',
    description: 'Engineer opens the Simulation Sandbox to explore future behavior under high-stress operating conditions.',
    activeTab: 'simulation',
  },
  {
    step: 6,
    title: 'Run High-Temp Takeoff Scenario',
    description: 'Engineer configures "Hot Day Takeoff" (42°C, 105% load, +25 cycles) and executes RUN SIMULATION.',
    activeTab: 'simulation',
    actionTrigger: 'RUN_SIMULATION',
  },
  {
    step: 7,
    title: 'Simulation Output & Risk Shift',
    description: 'Simulation reveals projected health drop from 94% to 76%, elevating risk from MEDIUM to HIGH for Engine 2.',
    activeTab: 'simulation',
  },
  {
    step: 8,
    title: 'Explainable AI Root Cause',
    description: 'UYAREE explains WHY: "Vibration +18% and temp +9% combined with high ambient heat accelerates bearing fatigue."',
    activeTab: 'intelligence',
  },
  {
    step: 9,
    title: 'Prioritized Maintenance Recommendation',
    description: 'UYAREE generates HIGH PRIORITY action: "Schedule engineering borescope inspection within 18 cycles (RUL Estimate)".',
    activeTab: 'maintenance',
  },
  {
    step: 10,
    title: 'Generate Engineering Report',
    description: 'Complete diagnostic loop closed: Telemetry → AI → 3D Twin → Simulation → Recommendation → Export PDF Report.',
    activeTab: 'reports',
  }
];
