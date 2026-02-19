import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onClick?: () => void;
  waterLevel?: number;
}

export default function WaterManagementSystem({ onClick, waterLevel = 70 }: Props) {
  const flowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (flowRef.current) {
      flowRef.current.position.y = -0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const levelScale = waterLevel / 100;

  return (
    <group position={[5, 0, 5]} onClick={onClick}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>

      {/* Elevated water tank tower (Kerala-style) */}
      {/* Support pillars */}
      {[[-0.3, 0, -0.3], [0.3, 0, -0.3], [-0.3, 0, 0.3], [0.3, 0, 0.3]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 1.2, pos[2]]}>
          <cylinderGeometry args={[0.06, 0.08, 2.4, 6]} />
          <meshStandardMaterial color="#d4d4d4" flatShading />
        </mesh>
      ))}
      {/* Tank body */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.6, 1, 8]} />
        <meshStandardMaterial color="#e0e0e0" flatShading />
      </mesh>
      {/* Water inside tank */}
      <mesh position={[0, 2.2 + levelScale * 0.4, 0]}>
        <cylinderGeometry args={[0.58, 0.5, levelScale * 0.8, 8]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.6} flatShading />
      </mesh>
      {/* Tank roof */}
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[0.8, 0.5, 8]} />
        <meshStandardMaterial color="#f0f0f0" flatShading />
      </mesh>

      {/* Treatment plant building */}
      <mesh position={[-1, 0.4, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 1]} />
        <meshStandardMaterial color="#f5f5f5" flatShading />
      </mesh>
      <mesh position={[-1, 0.85, 0]}>
        <boxGeometry args={[0.9, 0.1, 1.1]} />
        <meshStandardMaterial color="#a7f3d0" flatShading />
      </mesh>

      {/* Water pipes */}
      {[[1, 0.1, 0], [-0.3, 0.1, 1.2], [0.5, 0.1, -1]].map((pos, i) => (
        <mesh key={`pipe-${i}`} position={[pos[0], pos[1], pos[2]]} rotation={[0, i * 1.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.5, 6]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.5} flatShading />
        </mesh>
      ))}

      {/* Animated water flow indicator */}
      <mesh ref={flowRef} position={[0.6, 0.15, 0]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} flatShading />
      </mesh>
    </group>
  );
}
