import { SimulationResult, WhatIfComparison, RiskLevel } from '../types/uyaree';

export function runAircraftSimulation(
  ambientTemp: number,
  engineLoad: number,
  additionalCycles: number
): SimulationResult {
  // Baseline aircraft overall health
  const baseHealth = 94;
  
  // Calculate stress factors
  const tempStress = Math.max(0, (ambientTemp - 20) / 30); // 0 at 20°C, 1 at 50°C
  const loadStress = Math.max(0, (engineLoad - 80) / 40);  // 0 at 80%, 1 at 120%
  const cycleFactor = additionalCycles / 100;              // 0.25 to 2.0

  // Total degradation impact
  const totalImpact = (tempStress * 8 + loadStress * 12 + cycleFactor * 6);
  const projectedHealth = Math.max(45, Math.round(baseHealth - totalImpact));

  // Determine risk level
  let projectedRisk: RiskLevel = 'LOW';
  if (projectedHealth < 80 && projectedHealth >= 65) {
    projectedRisk = 'MEDIUM';
  } else if (projectedHealth < 65) {
    projectedRisk = 'HIGH';
  } else if (engineLoad > 100 || ambientTemp > 38) {
    projectedRisk = 'HIGH';
  }

  // Estimate Remaining Useful Life (RUL) in cycles
  // High stress reduces RUL faster
  const baseRUL = 18; // cycles for Engine 2 under current degradation
  const adjustedRUL = Math.max(5, Math.round(baseRUL * (1 - (tempStress * 0.4 + loadStress * 0.5))));

  // Generate trajectory points over 10 step intervals
  const trajectory: Array<{ cycle: number; baselineHealth: number; simulatedHealth: number }> = [];
  const steps = 10;
  const cycleStep = Math.round(additionalCycles / steps);

  for (let i = 0; i <= steps; i++) {
    const currentCycle = i * cycleStep;
    const normStep = i / steps;

    // Standard degradation rate
    const baselineH = Math.max(88, Math.round(baseHealth - normStep * 5));
    
    // Accelerated degradation rate under simulation conditions
    const simH = Math.max(45, Math.round(baseHealth - normStep * totalImpact));

    trajectory.push({
      cycle: currentCycle,
      baselineHealth: baselineH,
      simulatedHealth: simH,
    });
  }

  return {
    currentHealth: baseHealth,
    projectedHealth: projectedHealth,
    currentRisk: 'MEDIUM',
    projectedRisk: projectedRisk,
    mostAffectedSystem: 'Engine 2 (Starboard Turbofan)',
    rulCyclesEstimate: adjustedRUL,
    trajectory: trajectory
  };
}

export function compareWhatIfScenarios(
  scenAName: string,
  tempA: number,
  loadA: number,
  cyclesA: number,
  scenBName: string,
  tempB: number,
  loadB: number,
  cyclesB: number
): WhatIfComparison {
  const resultA = runAircraftSimulation(tempA, loadA, cyclesA);
  const resultB = runAircraftSimulation(tempB, loadB, cyclesB);

  const delta = resultA.projectedHealth - resultB.projectedHealth;

  const insights: string[] = [
    `Scenario B decreases projected health by ${Math.abs(delta)}% compared to Scenario A.`,
    `Engine 2 rotor thermal expansion accelerates by ${(Math.abs(tempB - tempA) * 1.4).toFixed(1)}% under higher ambient temp.`,
    `Operating at ${loadB}% throttle reduces remaining bearing fatigue life by ${Math.max(0, resultA.rulCyclesEstimate - resultB.rulCyclesEstimate)} cycles.`,
    `Recommended action: Avoid high throttle climbs until scheduled borescope maintenance.`
  ];

  return {
    scenarioA: {
      name: scenAName,
      risk: resultA.projectedRisk,
      projectedHealth: resultA.projectedHealth,
      mostAffected: resultA.mostAffectedSystem
    },
    scenarioB: {
      name: scenBName,
      risk: resultB.projectedRisk,
      projectedHealth: resultB.projectedHealth,
      mostAffected: resultB.mostAffectedSystem
    },
    healthDelta: delta,
    insights: insights
  };
}
