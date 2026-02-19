import * as THREE from "three";

/** Electric pole along road */
function ElectricPole({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 2.4, 6]} />
        <meshStandardMaterial color="#57534e" flatShading />
      </mesh>
      <mesh position={[0, 2.5, 0.15]}>
        <boxGeometry args={[0.8, 0.04, 0.04]} />
        <meshStandardMaterial color="#78716c" flatShading />
      </mesh>
      <mesh position={[0, 2.3, 0.15]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#fbbf24" flatShading />
      </mesh>
    </group>
  );
}

/** Small signboard */
function Signboard({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
        <meshStandardMaterial color="#57534e" flatShading />
      </mesh>
      <mesh position={[0, 0.85, 0.08]}>
        <boxGeometry args={[0.25, 0.2, 0.03]} />
        <meshStandardMaterial color="#fef3c7" flatShading />
      </mesh>
    </group>
  );
}

/** Bus stop shelter */
function BusStop({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#94a3b8" flatShading />
      </mesh>
      <mesh position={[0.25, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
        <meshStandardMaterial color="#64748b" flatShading />
      </mesh>
      <mesh position={[-0.25, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
        <meshStandardMaterial color="#64748b" flatShading />
      </mesh>
      <mesh position={[0, 0.75, 0]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.5]} />
        <meshStandardMaterial color="#cbd5e1" flatShading />
      </mesh>
    </group>
  );
}

/** EV charging station */
function EVChargingStation({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.25]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
      <mesh position={[0, 0.35, 0.08]}>
        <cylinderGeometry args={[0.04, 0.04, 0.25, 6]} />
        <meshStandardMaterial color="#22c55e" flatShading />
      </mesh>
      <mesh position={[0, 0.25, 0.15]}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshStandardMaterial color="#34d399" flatShading />
      </mesh>
    </group>
  );
}

/** Small temple/church/mosque silhouette (low detail) */
function SmallPlaceOfWorship({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.5]} />
        <meshStandardMaterial color="#fef3c7" flatShading />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.4]} />
        <meshStandardMaterial color="#78716c" flatShading />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.35, 6]} />
        <meshStandardMaterial color="#fbbf24" flatShading />
      </mesh>
    </group>
  );
}

const POLE_POSITIONS: [number, number, number][] = [
  [6, 0, 0], [-6, 0, 0], [0, 0, 6], [0, 0, -6], [8, 0, 4], [-8, 0, 4], [4, 0, 9], [-6, 0, 8],
];
const SIGN_POSITIONS: [number, number, number, number][] = [
  [8, 0, 2, 0], [-7, 0, 8, Math.PI / 4], [0, 0, 9, 0],
];
const BUS_STOP_POSITIONS: [number, number, number][] = [
  [9, 0, 4], [-9, 0, 5], [3, 0, 11],
];

export default function CityDensity() {
  return (
    <group>
      {POLE_POSITIONS.map((pos, i) => (
        <ElectricPole key={i} position={pos as [number, number, number]} />
      ))}
      {SIGN_POSITIONS.map((data, i) => (
        <Signboard key={i} position={[data[0], data[1], data[2]]} rotation={data[3]} />
      ))}
      {BUS_STOP_POSITIONS.map((pos, i) => (
        <BusStop key={i} position={pos} />
      ))}
      <EVChargingStation position={[6, 0, 6]} />
      <SmallPlaceOfWorship position={[-12, 0, 5]} />
      <SmallPlaceOfWorship position={[12, 0, -6]} />
    </group>
  );
}
