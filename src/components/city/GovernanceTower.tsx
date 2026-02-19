import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

export default function GovernanceTower({ onClick }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]} onClick={onClick} ref={groupRef}>
      {/* Main tower */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[1.6, 5, 1.6]} />
        <meshStandardMaterial color="#f0f0f0" flatShading />
      </mesh>
      {/* Green accent strip */}
      <mesh position={[0.81, 2.5, 0]}>
        <boxGeometry args={[0.08, 5, 1.2]} />
        <meshStandardMaterial color="#34d399" flatShading />
      </mesh>
      {/* Top section */}
      <mesh position={[0, 5.3, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 2]} />
        <meshStandardMaterial color="#e8e8e8" flatShading />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 6]} />
        <meshStandardMaterial color="#34d399" flatShading />
      </mesh>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.2, 2.5]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>
      {/* Windows */}
      {[1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-0.81, i * 1.1, 0.5]}>
          <boxGeometry args={[0.02, 0.4, 0.3]} />
          <meshStandardMaterial color="#a7f3d0" emissive="#a7f3d0" emissiveIntensity={0.3} flatShading />
        </mesh>
      ))}
    </group>
  );
}
