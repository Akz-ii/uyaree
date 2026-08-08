export interface MongoStatus {
  isConnected: boolean;
  database: string;
}

const API_BASE = typeof window !== 'undefined' && (window.location.origin.includes('localhost:3000') || window.location.origin.includes('127.0.0.1:3000'))
  ? 'http://localhost:5000/api'
  : '/api';

export class MongoService {
  public static async checkHealth(): Promise<MongoStatus> {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        return { isConnected: true, database: data.database || 'MongoDB' };
      }
      return { isConnected: false, database: 'Offline' };
    } catch {
      return { isConnected: false, database: 'Offline' };
    }
  }

  public static async saveSimulationRun(simData: any): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/simulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simData),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  public static async acknowledgeAlert(alertId: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/alerts/acknowledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
