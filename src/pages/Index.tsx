import { useState } from "react";
import CityScene from "@/scenes/CityScene";
import TopBar from "@/components/panels/TopBar";
import InfoPanel from "@/components/panels/InfoPanel";
import ModuleList from "@/components/panels/ModuleList";
import { useCitySimulation } from "@/hooks/useCitySimulation";

const Index = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const metrics = useCitySimulation();

  const handleBuildingClick = (building: string) => {
    setSelectedBuilding((prev) => (prev === building ? null : building));
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <TopBar health={metrics.cityHealth} />
      <ModuleList onSelect={handleBuildingClick} selected={selectedBuilding} />
      <InfoPanel
        selectedBuilding={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
      />
      <CityScene onBuildingClick={handleBuildingClick} metrics={metrics} />
    </div>
  );
};

export default Index;
