import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Low-poly car moving along a path (path is array of [x,z] points, loops) */
function MovingVehicle({
  path,
  speed,
  color,
  size,
}: {
  path: [number, number][];
  speed: number;
  color: string;
  size: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current || path.length < 2) return;
    progressRef.current += delta * speed;
    const len = path.length;
    const t = ((progressRef.current % len) + len) % len;
    const i0 = Math.floor(t) % len;
    const i1 = (i0 + 1) % len;
    const u = t - Math.floor(t);
    const x = path[i0][0] + (path[i1][0] - path[i0][0]) * u;
    const z = path[i0][1] + (path[i1][1] - path[i0][1]) * u;
    ref.current.position.set(x, 0.02, z);
    const dx = path[i1][0] - path[i0][0];
    const dz = path[i1][1] - path[i0][1];
    ref.current.rotation.y = -Math.atan2(dx, dz);
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </group>
  );
}

/** Road segment: flat plane, optional center line */
function RoadSegment({
  position,
  rotation,
  width,
  length,
  color,
  hasCenterLine,
}: {
  position: [number, number, number];
  rotation: number;
  width: number;
  length: number;
  color: string;
  hasCenterLine?: boolean;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {hasCenterLine && (
        <mesh position={[0, -0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, length]} />
          <meshStandardMaterial color="#ffffff" flatShading />
        </mesh>
      )}
    </group>
  );
}

/** Roundabout around center (Governance Tower at 0,0) */
function Roundabout() {
  return (
    <group position={[0, -0.18, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[2.8, 4.2, 16]} />
        <meshStandardMaterial color="#4b5563" flatShading />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.8, 16]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
    </group>
  );
}

/** Simple traffic signal at intersection */
function TrafficSignal({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.8, 6]} />
        <meshStandardMaterial color="#374151" flatShading />
      </mesh>
      <mesh position={[0, 0.85, 0.08]}>
        <boxGeometry args={[0.15, 0.25, 0.06]} />
        <meshStandardMaterial color="#1f2937" flatShading />
      </mesh>
      <mesh position={[0, 0.82, 0.11]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} flatShading />
      </mesh>
    </group>
  );
}

/** Zebra crossing strip */
function ZebraCrossing({ position, rotation, length }: { position: [number, number, number]; rotation: number; length: number }) {
  const stripes = Math.max(4, Math.floor(length / 0.25));
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {Array.from({ length: stripes }).map((_, i) => (
        <mesh key={i} position={[0, -0.16, -length / 2 + (i + 0.5) * (length / stripes)]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, length / stripes * 0.7]} />
          <meshStandardMaterial color="#ffffff" flatShading />
        </mesh>
      ))}
    </group>
  );
}

const ARTERIAL_COLOR = "#374151";
const SECONDARY_COLOR = "#4b5563";
const STREET_COLOR = "#6b7280";

export default function RoadNetwork() {
  // Paths for vehicles (x, z in world space)
  const mainRingPath: [number, number][] = [
    [0, 5], [5, 5], [5, 0], [5, -5], [0, -5], [-5, -5], [-5, 0], [-5, 5], [0, 5],
  ];
  const eastWestPath: [number, number][] = [[-12, 0], [-5, 0], [5, 0], [12, 0], [-12, 0]];
  const busPath: [number, number][] = [[-8, 3], [0, 3], [8, 3], [8, -3], [0, -3], [-8, -3], [-8, 3]];
  const deliveryPath: [number, number][] = [[-5.5, 5.5], [-5, 5.2], [-4.5, 5.5], [-5.5, 5.5]];

  return (
    <group>
      {/* Roundabout near Governance Tower */}
      <Roundabout />

      {/* Main arterial (dark, wide) — N-S and E-W */}
      <RoadSegment position={[0, 0, -8]} rotation={0} width={1.4} length={16} color={ARTERIAL_COLOR} hasCenterLine />
      <RoadSegment position={[0, 0, 8]} rotation={0} width={1.4} length={16} color={ARTERIAL_COLOR} hasCenterLine />
      <RoadSegment position={[-8, 0, 0]} rotation={Math.PI / 2} width={1.4} length={16} color={ARTERIAL_COLOR} hasCenterLine />
      <RoadSegment position={[8, 0, 0]} rotation={Math.PI / 2} width={1.4} length={16} color={ARTERIAL_COLOR} hasCenterLine />

      {/* Secondary roads (medium) */}
      <RoadSegment position={[0, 0, 3]} rotation={0} width={0.9} length={6} color={SECONDARY_COLOR} hasCenterLine />
      <RoadSegment position={[3, 0, 0]} rotation={Math.PI / 2} width={0.9} length={6} color={SECONDARY_COLOR} hasCenterLine />
      <RoadSegment position={[-3, 0, 0]} rotation={Math.PI / 2} width={0.9} length={6} color={SECONDARY_COLOR} hasCenterLine />
      <RoadSegment position={[0, 0, -3]} rotation={0} width={0.9} length={6} color={SECONDARY_COLOR} hasCenterLine />
      <RoadSegment position={[6, 0, -6]} rotation={Math.PI / 4} width={0.9} length={5} color={SECONDARY_COLOR} />
      <RoadSegment position={[-6, 0, 6]} rotation={-Math.PI / 4} width={0.9} length={5} color={SECONDARY_COLOR} />

      {/* Residential streets (narrow) */}
      <RoadSegment position={[0, 0, 9]} rotation={0} width={0.5} length={4} color={STREET_COLOR} />
      <RoadSegment position={[-5.5, 0, 6.5]} rotation={Math.PI / 2} width={0.5} length={3} color={STREET_COLOR} />
      <RoadSegment position={[5.5, 0, 6.5]} rotation={Math.PI / 2} width={0.5} length={3} color={STREET_COLOR} />

      {/* Traffic signals at key intersections */}
      <TrafficSignal position={[5.5, 0, 0]} />
      <TrafficSignal position={[-5.5, 0, 0]} />
      <TrafficSignal position={[0, 0, 5.5]} />
      <TrafficSignal position={[0, 0, -5.5]} />

      {/* Zebra crossings near school/hospital (example positions) */}
      <ZebraCrossing position={[2, 0, 8.5]} rotation={0} length={0.8} />
      <ZebraCrossing position={[-4, 0, 3.5]} rotation={Math.PI / 2} length={0.7} />

      {/* Moving cars on main ring */}
      <MovingVehicle path={mainRingPath} speed={0.6} color="#6ee7b7" size={[0.28, 0.18, 0.48]} />
      <MovingVehicle path={mainRingPath} speed={0.45} color="#93c5fd" size={[0.28, 0.18, 0.48]} />
      <MovingVehicle path={mainRingPath} speed={0.55} color="#fcd34d" size={[0.28, 0.18, 0.48]} />
      <MovingVehicle path={eastWestPath} speed={0.5} color="#e5e7eb" size={[0.28, 0.18, 0.48]} />

      {/* Bus on main road */}
      <MovingVehicle path={busPath} speed={0.35} color="#3b82f6" size={[0.4, 0.28, 0.9]} />

      {/* Delivery vehicle near mall */}
      <MovingVehicle path={deliveryPath} speed={0.2} color="#f97316" size={[0.32, 0.22, 0.55]} />
    </group>
  );
}
