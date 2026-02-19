export const governanceData = {
  name: "Governance Tower",
  description: "Central AI-powered governance & administration hub",
  insight: "All governance systems operational. Policy compliance at 96%.",
  kpis: [
    { label: "Safety Score", value: 87, unit: "%" },
    { label: "Response Time", value: 1.2, unit: "min" },
    { label: "Active Policies", value: 142, unit: "" },
  ],
  chartData: [
    { month: "Jan", efficiency: 78, satisfaction: 82 },
    { month: "Feb", efficiency: 80, satisfaction: 85 },
    { month: "Mar", efficiency: 82, satisfaction: 83 },
    { month: "Apr", efficiency: 85, satisfaction: 88 },
    { month: "May", efficiency: 83, satisfaction: 86 },
    { month: "Jun", efficiency: 87, satisfaction: 89 },
  ],
  chartLabel: "Governance Efficiency",
};

export const renewableData = {
  name: "Renewable Energy Plant",
  description: "Solar & wind power generation facility",
  insight: "Solar output peaking. Wind generation stable at 85% capacity.",
  kpis: [
    { label: "Solar Output", value: 4.2, unit: "MW" },
    { label: "Wind Output", value: 2.8, unit: "MW" },
    { label: "Grid Efficiency", value: 94, unit: "%" },
  ],
  chartData: [
    { hour: "6AM", solar: 10, wind: 45 },
    { hour: "9AM", solar: 55, wind: 38 },
    { hour: "12PM", solar: 92, wind: 42 },
    { hour: "3PM", solar: 78, wind: 50 },
    { hour: "6PM", solar: 35, wind: 55 },
    { hour: "9PM", solar: 5, wind: 48 },
  ],
  chartLabel: "Energy Generation (% capacity)",
};

export const trafficData = {
  name: "Transport Hub",
  description: "Autonomous transit & logistics center",
  insight: "Traffic flow optimal. Congestion below threshold during peak hours.",
  kpis: [
    { label: "Congestion Level", value: 32, unit: "%" },
    { label: "Avg Speed", value: 45, unit: "km/h" },
    { label: "Active Vehicles", value: 1284, unit: "" },
  ],
  chartData: [
    { time: "7AM", congestion: 65, flow: 40 },
    { time: "9AM", congestion: 85, flow: 25 },
    { time: "12PM", congestion: 45, flow: 60 },
    { time: "3PM", congestion: 55, flow: 50 },
    { time: "6PM", congestion: 90, flow: 20 },
    { time: "9PM", congestion: 30, flow: 75 },
  ],
  chartLabel: "Traffic Flow Analysis",
};

export const wasteData = {
  name: "Waste Management Center",
  description: "Smart recycling & waste processing facility",
  insight: "Recycling rate above target. Bin capacity at safe levels.",
  kpis: [
    { label: "Recycling Rate", value: 78, unit: "%" },
    { label: "Daily Processed", value: 12.5, unit: "tons" },
    { label: "Bin Capacity", value: 62, unit: "%" },
  ],
  chartData: [
    { day: "Mon", recycled: 85, landfill: 15 },
    { day: "Tue", recycled: 78, landfill: 22 },
    { day: "Wed", recycled: 82, landfill: 18 },
    { day: "Thu", recycled: 90, landfill: 10 },
    { day: "Fri", recycled: 75, landfill: 25 },
    { day: "Sat", recycled: 88, landfill: 12 },
  ],
  chartLabel: "Waste Distribution",
};

export const waterData = {
  name: "Water Management System",
  description: "Smart water distribution & flood monitoring — Kerala-style",
  insight: "Water reserves stable. Flood risk low. Quality index excellent.",
  kpis: [
    { label: "Water Level", value: 72, unit: "%" },
    { label: "Daily Usage", value: 8.4, unit: "ML" },
    { label: "Quality Index", value: 91, unit: "%" },
  ],
  chartData: [
    { hour: "6AM", level: 80, usage: 12 },
    { hour: "9AM", level: 74, usage: 28 },
    { hour: "12PM", level: 68, usage: 35 },
    { hour: "3PM", level: 65, usage: 30 },
    { hour: "6PM", level: 70, usage: 22 },
    { hour: "9PM", level: 76, usage: 10 },
  ],
  chartLabel: "Water Level & Usage",
};

export const mallData = {
  name: "Smart Mall Complex",
  description: "Commercial economic activity monitoring center",
  insight: "High mall energy usage detected. Footfall trending upward.",
  kpis: [
    { label: "Footfall", value: 3420, unit: "" },
    { label: "Energy Use", value: 1.8, unit: "MW" },
    { label: "Occupancy", value: 74, unit: "%" },
  ],
  chartData: [
    { hour: "10AM", footfall: 120, energy: 40 },
    { hour: "12PM", footfall: 340, energy: 65 },
    { hour: "2PM", footfall: 450, energy: 78 },
    { hour: "4PM", footfall: 380, energy: 70 },
    { hour: "6PM", footfall: 520, energy: 85 },
    { hour: "8PM", footfall: 290, energy: 55 },
  ],
  chartLabel: "Footfall & Energy Consumption",
};

export const agricultureData = {
  name: "Smart Agriculture Zone",
  description: "Sustainable farming & food production system",
  insight: "Agriculture yield improving. Organic production at 68%.",
  kpis: [
    { label: "Crop Yield", value: 82, unit: "%" },
    { label: "Irrigation Eff.", value: 88, unit: "%" },
    { label: "Soil Health", value: 76, unit: "%" },
  ],
  chartData: [
    { month: "Jan", yield: 65, irrigation: 80 },
    { month: "Feb", yield: 70, irrigation: 82 },
    { month: "Mar", yield: 75, irrigation: 85 },
    { month: "Apr", yield: 82, irrigation: 88 },
    { month: "May", yield: 78, irrigation: 86 },
    { month: "Jun", yield: 85, irrigation: 90 },
  ],
  chartLabel: "Crop Yield & Irrigation",
};

export const housingData = {
  name: "Smart Housing Sector",
  description: "Residential monitoring & smart living ecosystem",
  insight: "Citizen happiness stable. Eco-home energy consumption optimal.",
  kpis: [
    { label: "Occupancy", value: 89, unit: "%" },
    { label: "Energy Use", value: 0.9, unit: "MW" },
    { label: "Happiness", value: 78, unit: "%" },
  ],
  chartData: [
    { month: "Jan", happiness: 72, energy: 1.1 },
    { month: "Feb", happiness: 74, energy: 1.0 },
    { month: "Mar", happiness: 76, energy: 0.95 },
    { month: "Apr", happiness: 78, energy: 0.9 },
    { month: "May", happiness: 75, energy: 0.92 },
    { month: "Jun", happiness: 80, energy: 0.88 },
  ],
  chartLabel: "Happiness & Energy",
};

export const hospitalData = {
  name: "Hospital Complex",
  description: "Smart healthcare & emergency response facility",
  insight: "Bed occupancy within range. Emergency response time below 5 min.",
  kpis: [
    { label: "Bed Occupancy", value: 72, unit: "%" },
    { label: "Emergency Response", value: 4.2, unit: "min" },
    { label: "Health Index", value: 84, unit: "%" },
  ],
  chartData: [
    { week: "W1", occupancy: 68, response: 4.8 },
    { week: "W2", occupancy: 72, response: 4.2 },
    { week: "W3", occupancy: 75, response: 4.5 },
    { week: "W4", occupancy: 70, response: 4.0 },
  ],
  chartLabel: "Occupancy & Response Time",
};

export const policeData = {
  name: "Police Station",
  description: "Safety & law enforcement monitoring",
  insight: "Patrol coverage high. Crime index below threshold.",
  kpis: [
    { label: "Active Cases", value: 12, unit: "" },
    { label: "Crime Index", value: 8, unit: "%" },
    { label: "Patrol Coverage", value: 92, unit: "%" },
  ],
  chartData: [
    { month: "Jan", cases: 15, coverage: 88 },
    { month: "Feb", cases: 12, coverage: 90 },
    { month: "Mar", cases: 10, coverage: 91 },
    { month: "Apr", cases: 12, coverage: 92 },
  ],
  chartLabel: "Cases & Patrol Coverage",
};

export const fireData = {
  name: "Fire Station",
  description: "Emergency fire response & risk monitoring",
  insight: "Response time under 4 min. Fire risk index low.",
  kpis: [
    { label: "Response Time", value: 3.5, unit: "min" },
    { label: "Fire Risk Index", value: 6, unit: "%" },
  ],
  chartData: [
    { month: "Jan", response: 4.0, risk: 8 },
    { month: "Feb", response: 3.8, risk: 7 },
    { month: "Mar", response: 3.5, risk: 6 },
  ],
  chartLabel: "Response Time & Fire Risk",
};

export const educationData = {
  name: "Education Centers",
  description: "Schools, colleges & digital literacy monitoring",
  insight: "Enrollment and digital literacy trending up.",
  kpis: [
    { label: "Enrollment Rate", value: 88, unit: "%" },
    { label: "Digital Literacy", value: 76, unit: "%" },
    { label: "Education Index", value: 82, unit: "%" },
  ],
  chartData: [
    { term: "T1", enrollment: 84, literacy: 72 },
    { term: "T2", enrollment: 86, literacy: 74 },
    { term: "T3", enrollment: 88, literacy: 76 },
  ],
  chartLabel: "Enrollment & Digital Literacy",
};
