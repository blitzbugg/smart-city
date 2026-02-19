import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Coconut tree — trunk + frond cluster (Kerala feel) */
function CoconutTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 1.6, 6]} />
        <meshStandardMaterial color="#78716c" flatShading />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.35, 6, 6]} />
        <meshStandardMaterial color="#22c55e" flatShading />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.12, 6, 6]} />
        <meshStandardMaterial color="#a3a3a3" flatShading />
      </mesh>
    </group>
  );
}

/** Paddy field grid cell */
function PaddyCell({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.2, 1.2]} />
      <meshStandardMaterial color="#84cc16" flatShading />
    </mesh>
  );
}

/** Irrigation canal segment */
function CanalSegment({ position, length, rotation }: { position: [number, number, number]; length: number; rotation: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, length]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.85} flatShading />
      </mesh>
    </group>
  );
}

/** Small fishing boat in water */
function FishingBoat() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = 9 + Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
      ref.current.position.z = -9.5 + Math.cos(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });
  return (
    <group ref={ref} position={[9, -0.05, -9.5]}>
      <mesh rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.12, 1]} />
        <meshStandardMaterial color="#78350f" flatShading />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.06, 0.4, 0.06]} />
        <meshStandardMaterial color="#78716c" flatShading />
      </mesh>
      <mesh position={[0, 0.45, 0]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[0.35, 0.5]} />
        <meshStandardMaterial color="#fef3c7" flatShading />
      </mesh>
    </group>
  );
}

/** Rainwater harvesting tank near housing */
function RainwaterTank({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 0.8, 8]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.08, 8]} />
        <meshStandardMaterial color="#94a3b8" flatShading />
      </mesh>
    </group>
  );
}

const COCONUT_POSITIONS: [number, number, number][] = [
  [8, 0, -8], [9, 0, -7], [-8, 0, 8], [-7, 0, 9], [6, 0, 7], [7, 0, 6],
  [-9, 0, -6], [-8, 0, -7], [10, 0, 2], [4, 0, -9],
];
const PADDY_POSITIONS: [number, number, number][] = [
  [7, -0.1, -5], [8.2, -0.1, -5], [7, -0.1, -3.8], [8.2, -0.1, -3.8],
  [-7, -0.1, 6], [-5.8, -0.1, 6], [-7, -0.1, 7.2],
];

export default function KeralaExtras() {
  return (
    <group>
      {COCONUT_POSITIONS.map((pos, i) => (
        <CoconutTree key={i} position={pos} />
      ))}
      {PADDY_POSITIONS.map((pos, i) => (
        <PaddyCell key={i} position={pos} />
      ))}
      <CanalSegment position={[7.5, 0, -4.5]} length={3} rotation={0} />
      <CanalSegment position={[-6.5, 0, 6.5]} length={2.5} rotation={Math.PI / 2} />
      <FishingBoat />
      <RainwaterTank position={[1.5, 0, 8.5]} />
      <RainwaterTank position={[-2, 0, 9]} />
    </group>
  );
}
