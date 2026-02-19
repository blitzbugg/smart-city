import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

const HOUSE_POSITIONS: [number, number, number][] = [
  [-1.2, 0, -0.5],
  [0, 0, -0.5],
  [1.2, 0, -0.5],
  [-0.6, 0, 0.7],
  [0.6, 0, 0.7],
];

export default function SmartHousingSector({ onClick }: Props) {
  return (
    <group position={[0, 0, 11]} onClick={onClick}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>

      {/* Houses */}
      {HOUSE_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          {/* House body */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[0.6, 0.7, 0.5]} />
            <meshStandardMaterial color="#fafafa" flatShading />
          </mesh>
          {/* Green eco roof */}
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[0.7, 0.08, 0.6]} />
            <meshStandardMaterial color="#4ade80" flatShading />
          </mesh>
          {/* Window with warm glow */}
          <mesh position={[0, 0.35, 0.26]}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshStandardMaterial
              color="#fef3c7"
              emissive="#fbbf24"
              emissiveIntensity={0.4}
              flatShading
            />
          </mesh>
          {/* Door */}
          <mesh position={[0.15, 0.2, 0.26]}>
            <planeGeometry args={[0.1, 0.25]} />
            <meshStandardMaterial color="#d4d4d8" flatShading />
          </mesh>
        </group>
      ))}

      {/* Smart streetlights */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <group key={`light-${i}`} position={[x, 0, 0.1]}>
          {/* Pole */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1, 6]} />
            <meshStandardMaterial color="#a3a3a3" flatShading />
          </mesh>
          {/* Lamp */}
          <mesh position={[0, 1.05, 0]}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial
              color="#fef9c3"
              emissive="#facc15"
              emissiveIntensity={0.6}
              flatShading
            />
          </mesh>
          <pointLight position={[x, 1.1, 0.1]} color="#fef3c7" intensity={0.3} distance={2} />
        </group>
      ))}
    </group>
  );
}
