import { AircraftTelemetryPoint } from '../types/uyaree';

export class TelemetryEngine {
  private history: AircraftTelemetryPoint[] = [];
  private baseTemp = 680;
  private baseVibration = 1.1;
  private baseOilPressure = 45;
  private baseRpm = 12400;

  constructor() {
    this.generateInitialHistory();
  }

  private generateInitialHistory() {
    const now = new Date();
    const points: AircraftTelemetryPoint[] = [];

    // Generate 20 historical points leading to current values (Engine 2 degradation pattern)
    for (let i = 19; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 3000);
      const timeStr = time.toTimeString().split(' ')[0];

      // Simulated degradation pattern from PRD:
      // Temp: 680 -> 684 -> 691 -> 700 -> 704
      // Vibration: 1.1 -> 1.2 -> 1.4 -> 1.6 -> 1.8
      // Oil Pressure: 45 -> 44 -> 42 -> 40 -> 38
      const progress = (19 - i) / 19; // 0 to 1

      const temp = Math.round(680 + progress * 24 + (Math.random() * 2 - 1));
      const vibration = parseFloat((1.1 + progress * 0.7 + (Math.random() * 0.08 - 0.04)).toFixed(2));
      const pressure = parseFloat((45 - progress * 7 + (Math.random() * 0.4 - 0.2)).toFixed(1));
      const rpm = Math.round(12400 + progress * 180 + Math.sin(i) * 50);

      points.push({
        timestamp: timeStr,
        engineTemp: temp,
        vibration: vibration,
        oilPressure: pressure,
        rpm: rpm,
        altitude: 32000 + Math.round(Math.sin(i * 0.5) * 400),
        airspeed: 480 + Math.round(Math.cos(i * 0.5) * 15)
      });
    }

    this.history = points;
  }

  public getNextPoint(isDegrading: boolean = false): AircraftTelemetryPoint {
    const last = this.history[this.history.length - 1];
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    let nextTemp = last.engineTemp;
    let nextVibe = last.vibration;
    let nextPress = last.oilPressure;
    let nextRpm = last.rpm;

    if (isDegrading) {
      nextTemp = Math.min(730, Math.round(last.engineTemp + Math.random() * 0.8));
      nextVibe = parseFloat(Math.min(2.5, last.vibration + Math.random() * 0.03).toFixed(2));
      nextPress = parseFloat(Math.max(28, last.oilPressure - Math.random() * 0.04).toFixed(1));
      nextRpm = Math.round(12580 + (Math.random() * 60 - 30));
    } else {
      // Gentle fluctuation around current state
      nextTemp = Math.round(704 + (Math.random() * 3 - 1.5));
      nextVibe = parseFloat((1.8 + (Math.random() * 0.06 - 0.03)).toFixed(2));
      nextPress = parseFloat((38 + (Math.random() * 0.4 - 0.2)).toFixed(1));
      nextRpm = Math.round(12580 + (Math.random() * 40 - 20));
    }

    const newPoint: AircraftTelemetryPoint = {
      timestamp: timeStr,
      engineTemp: nextTemp,
      vibration: nextVibe,
      oilPressure: nextPress,
      rpm: nextRpm,
      altitude: 32000 + Math.round((Math.random() * 100 - 50)),
      airspeed: 485 + Math.round((Math.random() * 4 - 2))
    };

    this.history.shift();
    this.history.push(newPoint);

    return newPoint;
  }

  public getHistory(): AircraftTelemetryPoint[] {
    return [...this.history];
  }
}
