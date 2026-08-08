import mongoose from 'mongoose';

// 1. Aircraft Schema
const aircraftSchema = new mongoose.Schema({
  aircraftId: { type: String, required: true, unique: true },
  model: String,
  tailNumber: String,
  flightCycles: Number,
  totalFlightHours: Number,
  lastUpdated: String,
  overallHealth: Number,
  status: String,
  activeAlertsCount: Number,
  componentsAtRiskCount: Number,
}, { timestamps: true });

// 2. Subsystem Schema
const subsystemSchema = new mongoose.Schema({
  subsystemId: { type: String, required: true, unique: true },
  name: String,
  category: String,
  health: Number,
  status: String,
  risk: String,
  metrics: {
    temperature: Number,
    vibration: Number,
    pressure: Number,
    rpm: Number,
  },
  position3D: [Number],
  description: String,
}, { timestamps: true });

// 3. Telemetry Stream Schema
const telemetrySchema = new mongoose.Schema({
  timestamp: String,
  engineTemp: Number,
  vibration: Number,
  oilPressure: Number,
  rpm: Number,
  altitude: Number,
  airspeed: Number,
}, { timestamps: true });

// 4. Simulation Result Schema
const simulationSchema = new mongoose.Schema({
  scenarioName: String,
  ambientTemp: Number,
  engineLoad: Number,
  flightCycles: Number,
  currentHealth: Number,
  projectedHealth: Number,
  currentRisk: String,
  projectedRisk: String,
  mostAffectedSystem: String,
  rulCyclesEstimate: Number,
  trajectory: Array,
}, { timestamps: true });

// 5. Alert Schema
const alertSchema = new mongoose.Schema({
  alertId: { type: String, required: true, unique: true },
  aircraftId: String,
  systemId: String,
  systemName: String,
  severity: String,
  timestamp: String,
  reason: String,
  simulationImpact: String,
  recommendedAction: String,
  confidence: Number,
  acknowledged: { type: Boolean, default: false },
}, { timestamps: true });

export const Aircraft = mongoose.model('Aircraft', aircraftSchema);
export const Subsystem = mongoose.model('Subsystem', subsystemSchema);
export const Telemetry = mongoose.model('Telemetry', telemetrySchema);
export const Simulation = mongoose.model('Simulation', simulationSchema);
export const Alert = mongoose.model('Alert', alertSchema);
