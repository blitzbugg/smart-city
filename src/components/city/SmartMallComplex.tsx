import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

export default function SmartMallComplex({ onClick }: Props) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group position={[-5, 0, 5]} onClick={onClick}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>

      {/* Main mall building */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[3, 2, 2]} />
        <meshStandardMaterial color="#f0f0f0" flatShading />
      </mesh>

      {/* Glass front facade */}
      <mesh position={[0, 1, 1.01]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshStandardMaterial color="#bfdbfe" transparent opacity={0.35} flatShading />
      </mesh>

      {/* Roof accent */}
      <mesh position={[0, 2.05, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#a7f3d0" flatShading />
      </mesh>

      {/* Entrance overhang */}
      <mesh position={[0, 0.6, 1.3]}>
        <boxGeometry args={[1.2, 0.08, 0.5]} />
        <meshStandardMaterial color="#e8e8e8" flatShading />
      </mesh>

      {/* Entrance light */}
      <pointLight ref={lightRef} position={[0, 0.8, 1.5]} color="#fef3c7" intensity={0.5} distance={3} />

      {/* Parking area */}
      <mesh position={[0, -0.08, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 1.2]} />
        <meshStandardMaterial color="#d4d4d8" flatShading />
      </mesh>

      {/* Parking lines */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, -0.06, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.03, 0.8]} />
          <meshStandardMaterial color="#ffffff" flatShading />
        </mesh>
      ))}

      {/* Parked cars */}
      {[-0.4, 0.4].map((x, i) => (
        <group key={`car-${i}`} position={[x, 0.12, 2.2]}>
          <mesh>
            <boxGeometry args={[0.35, 0.2, 0.6]} />
            <meshStandardMaterial color={i === 0 ? "#e5e7eb" : "#d1d5db"} flatShading />
          </mesh>
          <mesh position={[0, 0.12, -0.05]}>
            <boxGeometry args={[0.3, 0.15, 0.35]} />
            <meshStandardMaterial color={i === 0 ? "#f3f4f6" : "#e5e7eb"} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}
