# Smart City 2040 - Kerala-Inspired Eco City Digital Twin

A beautiful, interactive 3D digital twin of a futuristic Kerala-inspired eco city built with React and Three.js. Experience a living, breathing smart city with real-time metrics, infrastructure monitoring, and immersive low-poly visuals.

![Smart City 2040](https://img.shields.io/badge/React-18.3.1-blue) ![Three.js](https://img.shields.io/badge/Three.js-0.160.1-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)

## 🌟 Features

- **3D Interactive City**: Explore a dense, living Kerala-inspired eco city with low-poly aesthetics
- **Real-time Simulation**: Live metrics for energy, water, waste, transport, health, safety, education, and more
- **Infrastructure Monitoring**: Click on buildings to view detailed KPIs, charts, and insights
- **Dynamic Elements**: Moving vehicles, NPCs, animated clouds, and living city elements
- **Road Network**: Complete road infrastructure with traffic signals, zebra crossings, and vehicle flow
- **Kerala Elements**: Coconut trees, paddy fields, canals, fishing boats, and traditional architecture
- **Responsive UI**: Beautiful Tailwind-based interface with glassmorphism panels

## 🏗️ City Infrastructure

- **Governance Tower** - Central AI-powered administration hub
- **Renewable Energy Plant** - Solar & wind power generation
- **Transport Hub** - Autonomous transit & logistics center
- **Waste Management** - Smart recycling & waste processing
- **Water Management** - Smart water distribution & flood monitoring
- **Smart Mall Complex** - Commercial activity center
- **Agriculture Zone** - Sustainable farming & food production
- **Housing Sector** - Residential monitoring & smart living
- **Hospital Complex** - Healthcare & emergency response
- **Police Station** - Safety & law enforcement
- **Fire Station** - Emergency fire response
- **Education Centers** - Schools, colleges & digital literacy

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **3D Graphics**: Three.js 0.160.1, @react-three/fiber, @react-three/drei
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn** or **pnpm**

### Installing Node.js

If you don't have Node.js installed, you can install it using:

**Option 1: Using nvm (Recommended)**
```bash
# Install nvm from https://github.com/nvm-sh/nvm#installing-and-updating
# Then install Node.js
nvm install 18
nvm use 18
```

**Option 2: Direct Download**
Download and install from [nodejs.org](https://nodejs.org/)

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd smart-city
```

### Step 2: Install Dependencies

```bash
npm install
```

or if you're using yarn:

```bash
yarn install
```

or if you're using pnpm:

```bash
pnpm install
```

### Step 3: Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is occupied).

Open your browser and navigate to the URL shown in the terminal.

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. You can preview the production build locally using:

```bash
npm run preview
```

## 📁 Project Structure

```
smart-city/
├── src/
│   ├── components/
│   │   ├── city/          # 3D city components
│   │   │   ├── GovernanceTower.tsx
│   │   │   ├── RenewableEnergyPlant.tsx
│   │   │   ├── TransportHub.tsx
│   │   │   ├── RoadNetwork.tsx
│   │   │   ├── HospitalComplex.tsx
│   │   │   ├── PoliceStation.tsx
│   │   │   ├── FireStation.tsx
│   │   │   ├── EducationCenter.tsx
│   │   │   ├── NPC.tsx
│   │   │   └── ...
│   │   └── panels/         # UI panels
│   │       ├── TopBar.tsx
│   │       ├── InfoPanel.tsx
│   │       ├── ModuleList.tsx
│   │       └── CityHealthBar.tsx
│   ├── scenes/
│   │   └── CityScene.tsx   # Main 3D scene
│   ├── hooks/
│   │   └── useCitySimulation.ts  # City metrics simulation
│   ├── data/
│   │   └── mockData.ts     # Building data & KPIs
│   ├── pages/
│   │   └── Index.tsx       # Main page
│   └── App.tsx             # Root component
├── public/                  # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎮 How to Use

1. **Explore the City**: Use your mouse to rotate, zoom, and pan around the 3D city
2. **Click Buildings**: Click on any building to view detailed metrics and KPIs
3. **Monitor Metrics**: Watch real-time updates for city health, energy, water, traffic, and more
4. **Navigate Modules**: Use the left sidebar to quickly jump to different city modules

## 🎨 Visual Style

- **Low-poly aesthetic** - Clean, geometric 3D models inspired by Clash of Clans
- **Kerala 2040 theme** - Futuristic yet realistic eco-city design
- **Bright daylight** - Vibrant colors with eco-green and white accents
- **Top-down view** - Optimized for strategic city overview

## 🤝 Contributors

This project was developed by:

- **Ananthapadmanabhan M**
- **Abel Varghese John**
- **Tristin Shaju**
- **Josson Jose Joseph**

## 📝 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Build Errors

If you encounter build errors:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   ```

### Performance Issues

- Ensure you're using a modern browser (Chrome, Firefox, Edge, Safari)
- For best performance, use a dedicated graphics card
- Reduce browser zoom if experiencing lag

## 📚 Additional Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🚧 Future Enhancements

- [ ] Add more interactive elements
- [ ] Implement day/night cycle
- [ ] Add weather effects
- [ ] Expand NPC behaviors
- [ ] Add more building types
- [ ] Implement data persistence

---

**Enjoy exploring Smart City 2040!** 🌆✨
