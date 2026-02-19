import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GovernanceTower from "@/components/city/GovernanceTower";
import RenewableEnergyPlant from "@/components/city/RenewableEnergyPlant";
import TransportHub from "@/components/city/TransportHub";
import WasteManagementCenter from "@/components/city/WasteManagementCenter";
import WaterManagementSystem from "@/components/city/WaterManagementSystem";
import SmartMallComplex from "@/components/city/SmartMallComplex";
import SmartAgricultureZone from "@/components/city/SmartAgricultureZone";
import SmartHousingSector from "@/components/city/SmartHousingSector";
import type { CityMetrics } from "@/hooks/useCitySimulation";

interface Props {
  onBuildingClick: (building: string) => void;
  metrics: CityMetrics;
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#a7f3d0" flatShading />
    </mesh>
  );
}

function Trees() {
  const positions: [number, number, number][] = [
    [-4, 0, -3], [4, 0, -4], [-3, 0, 4], [5, 0, 5],
    [-8, 0, -6], [8, 0, -5], [-5, 0, 7], [10, 0, 3],
    [-10, 0, 2], [3, 0, 8], [-6, 0, -8], [6, 0, 7],
    [-8, 0, 8], [9, 0, -8], [-12, 0, 5], [12, 0, -3],
    [0, 0, 10], [-10, 0, -10], [8, 0, 9], [-3, 0, -10],
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.6, 6]} />
            <meshStandardMaterial color="#a3a3a3" flatShading />
          </mesh>
          <mesh position={[0, 0.9, 0]} castShadow>
            <icosahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#6ee7b7" flatShading />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Paths() {
  return (
    <>
      {/* Center to north */}
      <mesh position={[0, -0.15, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 6]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
      {/* Center to east */}
      <mesh position={[3.5, -0.15, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.6, 7]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
      {/* Center to west */}
      <mesh position={[-3.5, -0.15, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.6, 7]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
      {/* Center to south */}
      <mesh position={[0, -0.15, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 8]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
      {/* South-east path */}
      <mesh position={[3, -0.15, 3]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[0.6, 6]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
      {/* South-west path */}
      <mesh position={[-3, -0.15, 3]} rotation={[-Math.PI / 2, 0, -Math.PI / 4]}>
        <planeGeometry args={[0.6, 6]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
      {/* North-east path */}
      <mesh position={[3.5, -0.15, -3.5]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[0.6, 6]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
    </>
  );
}

export default function CityScene({ onBuildingClick, metrics }: Props) {
  return (
    <Canvas
      shadows
      camera={{ position: [18, 15, 18], fov: 45 }}
      style={{ background: "linear-gradient(180deg, #e0f7fa 0%, #f0fdf4 50%, #ecfdf5 100%)" }}
    >
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        color="#fffbeb"
      />
      <hemisphereLight intensity={0.4} color="#87ceeb" groundColor="#d1fae5" />

      <Ground />
      <Trees />
      <Paths />

      {/* Center → Governance */}
      <GovernanceTower onClick={() => onBuildingClick("governance")} />
      {/* North → Renewable */}
      <RenewableEnergyPlant onClick={() => onBuildingClick("renewable")} />
      {/* East → Transport */}
      <TransportHub
        onClick={() => onBuildingClick("transport")}
        congestion={metrics.trafficCongestion}
      />
      {/* West → Waste */}
      <WasteManagementCenter
        onClick={() => onBuildingClick("waste")}
        binFillLevels={metrics.binFillLevels}
      />
      {/* South-East → Water */}
      <WaterManagementSystem
        onClick={() => onBuildingClick("water")}
        waterLevel={metrics.waterLevel}
      />
      {/* South-West → Mall */}
      <SmartMallComplex onClick={() => onBuildingClick("mall")} />
      {/* North-East → Agriculture */}
      <SmartAgricultureZone onClick={() => onBuildingClick("agriculture")} />
      {/* South → Housing */}
      <SmartHousingSector onClick={() => onBuildingClick("housing")} />

      <OrbitControls
        enablePan={false}
        minDistance={10}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={Math.PI / 6}
      />
    </Canvas>
  );
}
