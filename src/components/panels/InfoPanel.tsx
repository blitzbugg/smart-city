import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  governanceData, renewableData, trafficData, wasteData,
  waterData, mallData, agricultureData, housingData,
} from "@/data/mockData";

interface Props {
  selectedBuilding: string | null;
  onClose: () => void;
}

interface BuildingData {
  name: string;
  description: string;
  insight: string;
  kpis: { label: string; value: number; unit: string }[];
  chartData: Record<string, string | number>[];
  chartLabel: string;
}

const DATA_MAP: Record<string, BuildingData> = {
  governance: governanceData,
  renewable: renewableData,
  transport: trafficData,
  waste: wasteData,
  water: waterData,
  mall: mallData,
  agriculture: agricultureData,
  housing: housingData,
};

const CHART_TYPE: Record<string, "line" | "bar"> = {
  governance: "line",
  renewable: "bar",
  transport: "line",
  waste: "bar",
  water: "line",
  mall: "bar",
  agriculture: "line",
  housing: "line",
};

export default function InfoPanel({ selectedBuilding, onClose }: Props) {
  const data = selectedBuilding ? DATA_MAP[selectedBuilding] : null;
  const chartType = selectedBuilding ? CHART_TYPE[selectedBuilding] : "line";

  if (!data) return null;

  const xKey = Object.keys(data.chartData[0])[0];
  const dataKeys = Object.keys(data.chartData[0]).filter((k) => k !== xKey);

  return (
    <AnimatePresence>
      {selectedBuilding && (
        <motion.div
          key="info-panel"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-4 top-20 bottom-4 w-[360px] z-50 glass-panel-strong rounded-2xl p-6 flex flex-col overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">{data.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {data.kpis.map((kpi) => (
              <div key={kpi.label} className="bg-secondary/60 rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground font-body">{kpi.label}</p>
                <p className="text-xl font-display font-bold text-primary mt-1">
                  {kpi.value}
                  <span className="text-xs text-muted-foreground ml-0.5">{kpi.unit}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Insight */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-6">
            <p className="text-xs font-body text-foreground/80 leading-relaxed">
              💡 {data.insight}
            </p>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-0">
            <h3 className="text-sm font-display font-semibold text-foreground mb-3">
              {data.chartLabel}
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "line" ? (
                  <LineChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 20% 88%)" />
                    <XAxis dataKey={xKey} tick={{ fontSize: 11 }} stroke="hsl(160 10% 45%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(160 10% 45%)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid hsl(150 20% 88%)",
                        borderRadius: "12px",
                        fontSize: 12,
                      }}
                    />
                    {dataKeys.map((key, i) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={i === 0 ? "hsl(152 56% 42%)" : "hsl(162 50% 48%)"}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <BarChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 20% 88%)" />
                    <XAxis dataKey={xKey} tick={{ fontSize: 11 }} stroke="hsl(160 10% 45%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(160 10% 45%)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid hsl(150 20% 88%)",
                        borderRadius: "12px",
                        fontSize: 12,
                      }}
                    />
                    {dataKeys.map((key, i) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        fill={i === 0 ? "hsl(152 56% 42%)" : "hsl(162 50% 48%)"}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
