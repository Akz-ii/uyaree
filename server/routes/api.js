import express from 'express';
import { Aircraft, Subsystem, Telemetry, Simulation, Alert } from '../models/schemas.js';

const router = express.Router();

// GET /api/health - DB Connection check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', database: 'MongoDB', connected: true });
});

// GET /api/aircraft - Get Aircraft details
router.get('/aircraft', async (req, res) => {
  try {
    const aircraft = await Aircraft.findOne({ aircraftId: 'UY-001' });
    res.json(aircraft || {
      aircraftId: 'UY-001',
      model: 'Aero Twin X-900',
      tailNumber: 'N904UY',
      flightCycles: 1284,
      overallHealth: 94,
      status: 'HEALTHY'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/subsystems - Get all subsystem health records
router.get('/subsystems', async (req, res) => {
  try {
    const subsystems = await Subsystem.find({});
    res.json(subsystems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/telemetry - Get telemetry history
router.get('/telemetry', async (req, res) => {
  try {
    const telemetries = await Telemetry.find().sort({ createdAt: -1 }).limit(30);
    res.json(telemetries.reverse());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/simulation - Save simulation scenario run
router.post('/simulation', async (req, res) => {
  try {
    const simRecord = new Simulation(req.body);
    await simRecord.save();
    res.status(201).json({ message: 'Simulation saved to MongoDB', data: simRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/alerts - Fetch all alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find({}).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/alerts/acknowledge - Acknowledge an alert
router.post('/alerts/acknowledge', async (req, res) => {
  try {
    const { alertId } = req.body;
    const alert = await Alert.findOneAndUpdate({ alertId }, { acknowledged: true }, { new: true });
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
