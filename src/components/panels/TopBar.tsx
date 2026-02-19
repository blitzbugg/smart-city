import CityHealthBar from "./CityHealthBar";
import { Leaf } from "lucide-react";

interface Props {
  health: number;
}

export default function TopBar({ health }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 glass-panel-strong">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg eco-gradient flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-display font-bold text-foreground tracking-tight">
              SmartCity 2040
            </h1>
            <p className="text-[10px] font-body text-muted-foreground -mt-0.5">
              Kerala Eco Digital Twin
            </p>
          </div>
        </div>

        <CityHealthBar health={health} />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-health-good animate-pulse" />
            <span className="text-xs font-body text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
