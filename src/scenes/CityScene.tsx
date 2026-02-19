import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import GovernanceTower from "@/components/city/GovernanceTower";
import RenewableEnergyPlant from "@/components/city/RenewableEnergyPlant";
import TransportHub from "@/components/city/TransportHub";
import WasteManagementCenter from "@/components/city/WasteManagementCenter";
import WaterManagementSystem from "@/components/city/WaterManagementSystem";
import SmartMallComplex from "@/components/city/SmartMallComplex";
import SmartAgricultureZone from "@/components/city/SmartAgricultureZone";
import SmartHousingSector from "@/components/city/SmartHousingSector";
import RoadNetwork from "@/components/city/RoadNetwork";
import HospitalComplex from "@/components/city/HospitalComplex";
import PoliceStation from "@/components/city/PoliceStation";
import FireStation from "@/components/city/FireStation";
import EducationCenter from "@/components/city/EducationCenter";
import ExpandedHousingSector from "@/components/city/ExpandedHousingSector";
import NPC from "@/components/city/NPC";
import KeralaExtras from "@/components/city/KeralaExtras";
import CityDensity from "@/components/city/CityDensity";
import type { CityMetrics } from "@/hooks/useCitySimulation";

interface Props {
  onBuildingClick: (building: string) => void;
  metrics: CityMetrics;
}

const TERRAIN_SIZE = 120;
const NUM_BOUNDARY_TREES = 24;
const BOUNDARY_R = 52;

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[TERRAIN_SIZE, TERRAIN_SIZE]} />
        <meshStandardMaterial color="#a7f3d0" flatShading />
      </mesh>
      {/* Gentle elevation patches */}
      <mesh position={[-20, 0.15, -25]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 20]} />
        <meshStandardMaterial color="#bbf7d0" flatShading />
      </mesh>
      <mesh position={[25, 0.12, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 22]} />
        <meshStandardMaterial color="#a7f3d0" flatShading />
      </mesh>
      <mesh position={[0, 0.08, -35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 15]} />
        <meshStandardMaterial color="#b8f0c4" flatShading />
      </mesh>
    </group>
  );
}

function BoundaryTrees() {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < NUM_BOUNDARY_TREES; i++) {
    const a = (i / NUM_BOUNDARY_TREES) * Math.PI * 2;
    positions.push([Math.cos(a) * BOUNDARY_R, 0, Math.sin(a) * BOUNDARY_R]);
  }
  return (
    <>
      {positions.map((pos, i) => (
        <group key={`b-${i}`} position={pos}>
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

function InnerTrees() {
  const positions: [number, number, number][] = [
    [-3, 0, -6], [3, 0, -7], [-4, 0, 5], [6, 0, 6],
    [-7, 0, -5], [7, 0, -4], [-5, 0, 8], [9, 0, 4],
    [-8, 0, 3], [4, 0, 9], [-6, 0, -7], [6, 0, 6],
    [-7, 0, 7], [8, 0, -7], [-9, 0, 5], [9, 0, -4],
    [0, 0, 9], [-9, 0, -9], [7, 0, 8], [-4, 0, -9],
    [2, 0, 6], [-5, 0, -5], [5, 0, -3], [-6, 0, 4], [1, 0, -6],
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

/** Water body — canal / small river section (between zones) */
function WaterBody() {
  return (
    <group>
      <mesh position={[12, -0.18, -10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.9} flatShading />
      </mesh>
      <mesh position={[-12, -0.18, 9]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 5]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.9} flatShading />
      </mesh>
    </group>
  );
}

/** Cloud layer — gentle drift, used after intro */
function CloudLayer() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.position.x = Math.sin(t * 0.015) * 2;
      ref.current.position.z = Math.cos(t * 0.012) * 1.5;
    }
  });
  return (
    <group ref={ref} position={[0, 18, 0]}>
      {[[-10, 0, -6], [6, 0, 4], [0, 0, 10], [-4, 0, -11], [11, 0, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6 + i * 0.5, 4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.28} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Initial load: clouds drift in from the sides, fade in with stagger, then hand off to CloudLayer */
function CloudIntro({ onComplete }: { onComplete: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const done = useRef(false);
  const start = useRef<number | null>(null);

  const cloudData: [number, number, number, number, number, number][] = [
    [-22, 0, -8, 8, 5, 0],
    [20, 0, 3, 7, 4.5, 0.3],
    [-8, 0, 18, 6, 4, 0.6],
    [16, 0, -14, 7, 4, 0.2],
    [-14, 0, 6, 6, 4.5, 0.5],
  ];

  useFrame((state) => {
    if (done.current) return;
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    const elapsed = t - start.current;
    const dur = 4.5;

    if (elapsed >= dur) {
      done.current = true;
      onComplete();
      return;
    }

    const u = Math.min(1, elapsed / dur);
    const easeIn = 1 - (1 - u) * (1 - u);

    if (groupRef.current) {
      groupRef.current.position.y = 12 + 6 * easeIn;
      groupRef.current.position.x = (1 - easeIn) * -8 + Math.sin(elapsed * 0.4) * 0.5;
      groupRef.current.position.z = (1 - easeIn) * 3 + Math.cos(elapsed * 0.3) * 0.4;
    }

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh?.material) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const fadeDelay = cloudData[i][5];
      const fadeStart = 0.2 + fadeDelay * 0.6;
      const fadeDur = 1.2;
      const opacity =
        elapsed > fadeStart
          ? Math.min(1, (elapsed - fadeStart) / fadeDur) * 0.35
          : 0;
      mat.opacity = opacity;
    });
  });

  return (
    <group ref={groupRef} position={[0, 12, 0]}>
      {cloudData.map(([x, y, z, w, h], i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[x, y, z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Slight zoom-in intro then hand over to OrbitControls */
function CameraIntro({ onComplete }: { onComplete: () => void }) {
  const { camera } = useThree();
  const done = useRef(false);
  const start = useRef<number | null>(null);

  useFrame((state) => {
    if (done.current) return;
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    const dur = 2.5;
    const elapsed = t - start.current;
    if (elapsed >= dur) {
      done.current = true;
      onComplete();
      return;
    }
    const u = Math.min(1, elapsed / dur);
    const ease = 1 - (1 - u) * (1 - u);
    const from = 28;
    const to = 20;
    const dist = from + (to - from) * ease;
    const angle = Math.PI / 4;
    camera.position.set(
      Math.sin(angle) * dist * 0.7,
      dist * 0.65,
      Math.cos(angle) * dist * 0.7
    );
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}

const NPC_PATHS: [number, number, number][][] = (() => {
  const base = [
    [-8, 0, 8], [-4, 0, 8], [0, 0, 6], [4, 0, 8], [8, 0, 8],
    [8, 0, 4], [8, 0, 0], [4, 0, 0], [0, 0, 0], [-4, 0, 0], [-8, 0, 0],
    [-8, 0, -4], [-4, 0, -4], [0, 0, -4], [4, 0, -4], [8, 0, -4],
    [4, 0, -8], [0, 0, -8], [-4, 0, -8], [-8, 0, -4], [-8, 0, 8],
  ];
  const mallPath = [[-11.2, 0, 7.5], [-10.5, 0, 7.2], [-11.2, 0, 6.8], [-11.2, 0, 7.5]];
  const schoolPath = [[5.2, 0, 11.2], [5.5, 0, 11.5], [5.8, 0, 11.2], [5.2, 0, 10.8], [5.2, 0, 11.2]];
  const parkPath = [[0.5, 0, 12.5], [0, 0, 12.2], [-0.5, 0, 12.5], [0, 0, 12.8], [0.5, 0, 12.5]];
  const crossPath = [[-6, 0, 9], [-5, 0, 9], [-6, 0, 9]];
  const paths = [base, mallPath, schoolPath, parkPath, crossPath];
  const out: [number, number, number][][] = [];
  for (let i = 0; i < 22; i++) {
    out.push(paths[i % paths.length]);
  }
  return out;
})();

const NPC_COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#fbbf24", "#f97316", "#94a3b8", "#22c55e"];

function NPCs() {
  return (
    <>
      {NPC_PATHS.slice(0, 22).map((path, i) => (
        <NPC
          key={i}
          path={path}
          speed={0.12 + (i % 5) * 0.02}
          shirtColor={NPC_COLORS[i % NPC_COLORS.length]}
          heightScale={0.9 + (i % 3) * 0.1}
        />
      ))}
    </>
  );
}

export default function CityScene({ onBuildingClick, metrics }: Props) {
  const [introDone, setIntroDone] = useState(false);
  const [cloudIntroDone, setCloudIntroDone] = useState(false);

  return (
    <Canvas
      shadows
      camera={{ position: [22, 18, 22], fov: 45 }}
      style={{ background: "linear-gradient(180deg, #e0f7fa 0%, #f0fdf4 50%, #ecfdf5 100%)" }}
    >
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={80}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
        color="#fffbeb"
      />
      <hemisphereLight intensity={0.4} color="#87ceeb" groundColor="#d1fae5" />

      <Ground />
      <WaterBody />
      <BoundaryTrees />
      <InnerTrees />
      <RoadNetwork />
      {!cloudIntroDone && <CloudIntro onComplete={() => setCloudIntroDone(true)} />}
      {cloudIntroDone && <CloudLayer />}

      {!introDone && <CameraIntro onComplete={() => setIntroDone(true)} />}
      {introDone && (
        <OrbitControls
          enablePan={false}
          minDistance={12}
          maxDistance={55}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 6}
          enableDamping
          dampingFactor={0.08}
        />
      )}

      <GovernanceTower onClick={() => onBuildingClick("governance")} />
      <RenewableEnergyPlant onClick={() => onBuildingClick("renewable")} />
      <TransportHub
        onClick={() => onBuildingClick("transport")}
        congestion={metrics.trafficCongestion}
      />
      <WasteManagementCenter
        onClick={() => onBuildingClick("waste")}
        binFillLevels={metrics.binFillLevels}
      />
      <WaterManagementSystem
        onClick={() => onBuildingClick("water")}
        waterLevel={metrics.waterLevel}
      />
      <SmartMallComplex onClick={() => onBuildingClick("mall")} />
      <SmartAgricultureZone onClick={() => onBuildingClick("agriculture")} />
      <SmartHousingSector onClick={() => onBuildingClick("housing")} />

      <HospitalComplex onClick={() => onBuildingClick("hospital")} />
      <PoliceStation onClick={() => onBuildingClick("police")} />
      <FireStation onClick={() => onBuildingClick("fire")} />
      <EducationCenter onClick={() => onBuildingClick("education")} />
      <ExpandedHousingSector onClick={() => onBuildingClick("housing")} />

      <KeralaExtras />
      <CityDensity />
      <NPCs />
    </Canvas>
  );
}
