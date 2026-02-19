import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

/** Single eco home with optional solar */
function EcoHome({
  position,
  hasSolar,
}: {
  position: [number, number, number];
  hasSolar?: boolean;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.55, 0.7, 0.45]} />
        <meshStandardMaterial color="#fafafa" flatShading />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.65, 0.07, 0.55]} />
        <meshStandardMaterial color="#4ade80" flatShading />
      </mesh>
      <mesh position={[0, 0.35, 0.23]}>
        <planeGeometry args={[0.18, 0.18]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fbbf24" emissiveIntensity={0.3} flatShading />
      </mesh>
      <mesh position={[0.12, 0.18, 0.23]}>
        <planeGeometry args={[0.08, 0.22]} />
        <meshStandardMaterial color="#d4d4d8" flatShading />
      </mesh>
      {hasSolar && (
        <mesh position={[0.25, 0.6, 0]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.2, 0.02, 0.25]} />
          <meshStandardMaterial color="#1e3a5f" flatShading />
        </mesh>
      )}
    </group>
  );
}

/** Small apartment block */
function ApartmentBlock({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.9, 1.8, 0.7]} />
        <meshStandardMaterial color="#f0f0f0" flatShading />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <boxGeometry args={[0.95, 0.08, 0.75]} />
        <meshStandardMaterial color="#6ee7b7" flatShading />
      </mesh>
      {[0.2, 0.5, 0.8, 1.1, 1.4].map((y, i) => (
        <mesh key={i} position={[0.2, y, 0.36]}>
          <planeGeometry args={[0.15, 0.2]} />
          <meshStandardMaterial color="#bfdbfe" flatShading />
        </mesh>
      ))}
    </group>
  );
}

  /** Streetlight */
  function Streetlight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 6]} />
        <meshStandardMaterial color="#a3a3a3" flatShading />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#fef9c3" emissive="#facc15" emissiveIntensity={0.5} flatShading />
      </mesh>
    </group>
  );
}

/** Small park with bench and tree */
function SmallPark({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#86efac" flatShading />
      </mesh>
      <mesh position={[0.3, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.15]} />
        <meshStandardMaterial color="#78716c" flatShading />
      </mesh>
      <mesh position={[-0.3, 0.25, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.5, 6]} />
        <meshStandardMaterial color="#a3a3a3" flatShading />
      </mesh>
      <mesh position={[-0.3, 0.65, 0]}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#6ee7b7" flatShading />
      </mesh>
    </group>
  );
}

/** Children playing — simple looping position shift */
function ChildrenPlaying({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.position.x = position[0] + Math.sin(t * 1.5) * 0.15;
      ref.current.position.z = position[2] + Math.cos(t * 1.2) * 0.12;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#fef3c7" flatShading />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.15, 6]} />
        <meshStandardMaterial color="#34d399" flatShading />
      </mesh>
    </group>
  );
}

/** Pedestrian path strip */
function PedestrianPath({ position, rotation, width, length }: { position: [number, number, number]; rotation: number; width: number; length: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, -0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#e7e5e4" flatShading />
      </mesh>
    </group>
  );
}

// Cluster positions relative to sector center [0, 0, 8] — we position ExpandedHousingSector at [0,0,8] and spread around
const ECO_HOME_POSITIONS: [number, number, number][] = [
  [-2, 0, 0.5], [-1.2, 0, 0.5], [-0.4, 0, 0.5], [0.4, 0, 0.5], [1.2, 0, 0.5], [2, 0, 0.5],
  [-2, 0, -0.3], [-1.2, 0, -0.3], [-0.4, 0, -0.3], [0.4, 0, -0.3], [1.2, 0, -0.3],
  [-1.5, 0, 1.2], [-0.5, 0, 1.2], [0.5, 0, 1.2], [1.5, 0, 1.2],
  [-1.5, 0, -0.9], [0, 0, -0.9], [1.5, 0, -0.9],
];
const APARTMENT_POSITIONS: [number, number, number][] = [
  [-2.8, 0, -0.5], [2.8, 0, 0.2],
];
const PARK_POSITIONS: [number, number, number][] = [
  [0, 0, -1.5], [-2.2, 0, 0.8], [2.2, 0, -0.8],
];
const STREETLIGHT_POSITIONS: [number, number, number][] = [
  [-2.5, 0, 0], [0, 0, 0.8], [2.5, 0, -0.5], [-1, 0, -1.2], [1, 0, 1.5],
];
const CHILDREN_POSITION: [number, number, number] = [0, 0, -1.4];

export default function ExpandedHousingSector({ onClick }: Props) {
  return (
    <group position={[0, 0, 8]} onClick={onClick}>
      {/* Base platform — larger than original housing */}
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <boxGeometry args={[8, 0.2, 6]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>

      {/* Clusters of eco homes */}
      {ECO_HOME_POSITIONS.map((pos, i) => (
        <EcoHome key={i} position={pos} hasSolar={i % 3 === 0} />
      ))}

      {/* Apartment blocks */}
      {APARTMENT_POSITIONS.map((pos, i) => (
        <ApartmentBlock key={i} position={pos} />
      ))}

      {/* Small parks */}
      {PARK_POSITIONS.map((pos, i) => (
        <SmallPark key={i} position={pos} />
      ))}

      {/* Streetlights */}
      {STREETLIGHT_POSITIONS.map((pos, i) => (
        <Streetlight key={i} position={pos} />
      ))}

      {/* Pedestrian paths */}
      <PedestrianPath position={[0, 0, 0]} rotation={0} width={0.4} length={5} />
      <PedestrianPath position={[0, 0, 0]} rotation={Math.PI / 2} width={0.4} length={7} />

      {/* Children playing */}
      <ChildrenPlaying position={CHILDREN_POSITION} />
    </group>
  );
}
