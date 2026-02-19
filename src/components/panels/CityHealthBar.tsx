import { motion } from "framer-motion";

interface Props {
  health: number;
}

function getHealthColor(h: number) {
  if (h >= 75) return "health-bar-good";
  if (h >= 50) return "health-bar-warning";
  return "health-bar-danger";
}

function getHealthLabel(h: number) {
  if (h >= 75) return "Excellent";
  if (h >= 50) return "Moderate";
  return "Critical";
}

export default function CityHealthBar({ health }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-body text-muted-foreground whitespace-nowrap">City Health</span>
      <div className="w-32 h-2.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getHealthColor(health)}`}
          initial={{ width: 0 }}
          animate={{ width: `${health}%` }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        />
      </div>
      <span className="text-xs font-display font-semibold text-foreground">{health}%</span>
      <span className="text-[10px] font-body text-muted-foreground">{getHealthLabel(health)}</span>
    </div>
  );
}
