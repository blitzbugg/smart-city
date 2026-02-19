import { useState, useEffect, useCallback } from "react";

export interface CityMetrics {
  renewableEfficiency: number;
  recyclingRate: number;
  transportEfficiency: number;
  safetyScore: number;
  cityHealth: number;
  trafficCongestion: number;
  binFillLevels: [number, number, number];
  solarOutput: number;
  windOutput: number;
  waterLevel: number;
  waterQuality: number;
  floodRisk: number;
  mallFootfall: number;
  mallOccupancy: number;
  mallEnergy: number;
  cropYield: number;
  irrigationEfficiency: number;
  soilHealth: number;
  citizenHappiness: number;
  housingOccupancy: number;
  housingEnergy: number;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function fluctuate(base: number, range: number) {
  return clamp(base + (Math.random() - 0.5) * range, 0, 100);
}

function calculateHealth(m: Omit<CityMetrics, "cityHealth">) {
  return Math.round(
    m.renewableEfficiency * 0.2 +
    m.recyclingRate * 0.15 +
    m.transportEfficiency * 0.2 +
    m.waterQuality * 0.15 +
    m.citizenHappiness * 0.15 +
    m.cropYield * 0.15
  );
}

export function useCitySimulation() {
  const [metrics, setMetrics] = useState<CityMetrics>(() => {
    const initial = {
      renewableEfficiency: 85,
      recyclingRate: 78,
      transportEfficiency: 72,
      safetyScore: 87,
      trafficCongestion: 32,
      binFillLevels: [35, 50, 20] as [number, number, number],
      solarOutput: 4.2,
      windOutput: 2.8,
      waterLevel: 72,
      waterQuality: 91,
      floodRisk: 12,
      mallFootfall: 3420,
      mallOccupancy: 74,
      mallEnergy: 1.8,
      cropYield: 82,
      irrigationEfficiency: 88,
      soilHealth: 76,
      citizenHappiness: 78,
      housingOccupancy: 89,
      housingEnergy: 0.9,
    };
    return { ...initial, cityHealth: calculateHealth(initial) };
  });

  const tick = useCallback(() => {
    setMetrics((prev) => {
      const next = {
        renewableEfficiency: fluctuate(prev.renewableEfficiency, 6),
        recyclingRate: fluctuate(prev.recyclingRate, 4),
        transportEfficiency: fluctuate(prev.transportEfficiency, 8),
        safetyScore: fluctuate(prev.safetyScore, 3),
        trafficCongestion: fluctuate(prev.trafficCongestion, 15),
        binFillLevels: prev.binFillLevels.map((f) =>
          clamp(f + Math.random() * 2, 0, 100)
        ) as [number, number, number],
        solarOutput: clamp(prev.solarOutput + (Math.random() - 0.5) * 0.5, 0, 8),
        windOutput: clamp(prev.windOutput + (Math.random() - 0.5) * 0.4, 0, 6),
        waterLevel: fluctuate(prev.waterLevel, 5),
        waterQuality: fluctuate(prev.waterQuality, 3),
        floodRisk: clamp(prev.floodRisk + (Math.random() - 0.4) * 8, 0, 100),
        mallFootfall: clamp(prev.mallFootfall + (Math.random() - 0.5) * 300, 500, 8000),
        mallOccupancy: fluctuate(prev.mallOccupancy, 10),
        mallEnergy: clamp(prev.mallEnergy + (Math.random() - 0.5) * 0.3, 0.5, 4),
        cropYield: clamp(prev.cropYield + Math.random() * 1.5, 0, 100),
        irrigationEfficiency: fluctuate(prev.irrigationEfficiency, 4),
        soilHealth: clamp(prev.soilHealth + (prev.waterQuality > 80 ? 0.3 : -0.5), 0, 100),
        citizenHappiness: clamp(
          prev.citizenHappiness + (prev.transportEfficiency > 70 ? 0.3 : -0.4) + (prev.waterQuality > 80 ? 0.2 : -0.3),
          0, 100
        ),
        housingOccupancy: fluctuate(prev.housingOccupancy, 3),
        housingEnergy: clamp(prev.housingEnergy + (Math.random() - 0.5) * 0.15, 0.3, 2),
      };
      return { ...next, cityHealth: calculateHealth(next) };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 5000);
    return () => clearInterval(interval);
  }, [tick]);

  return metrics;
}
