import { motion } from "framer-motion";
import { Building2, Zap, Car, Recycle, Droplets, ShoppingBag, Wheat, Home } from "lucide-react";

interface Props {
  onSelect: (building: string) => void;
  selected: string | null;
}

const MODULES = [
  { id: "governance", label: "Governance", icon: Building2 },
  { id: "renewable", label: "Energy", icon: Zap },
  { id: "transport", label: "Transport", icon: Car },
  { id: "waste", label: "Waste", icon: Recycle },
  { id: "water", label: "Water", icon: Droplets },
  { id: "mall", label: "Mall", icon: ShoppingBag },
  { id: "agriculture", label: "Agriculture", icon: Wheat },
  { id: "housing", label: "Housing", icon: Home },
];

export default function ModuleList({ onSelect, selected }: Props) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      {MODULES.map((mod) => {
        const Icon = mod.icon;
        const isActive = selected === mod.id;
        return (
          <motion.button
            key={mod.id}
            onClick={() => onSelect(mod.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              glass-panel rounded-xl p-3 flex items-center gap-2 transition-all cursor-pointer
              ${isActive ? "ring-2 ring-primary bg-primary/10" : "hover:bg-secondary/80"}
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-xs font-body ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {mod.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
