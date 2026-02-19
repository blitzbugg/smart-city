import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onClick?: () => void;
  congestion?: number;
}

function MovingCar({ startPos, speed, color }: { startPos: [number, number, number]; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.z += delta * speed;
      if (ref.current.position.z > 5) ref.current.position.z = -5;
      if (ref.current.position.z < -5) ref.current.position.z = 5;
    }
  });

  return (
    <mesh ref={ref} position={startPos} castShadow>
      <boxGeometry args={[0.3, 0.2, 0.5]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

function getCongestionColor(congestion: number): string {
  if (congestion < 40) return "#34d399";
  if (congestion < 70) return "#fbbf24";
  return "#f87171";
}

export default function TransportHub({ onClick, congestion = 32 }: Props) {
  const roadColor = getCongestionColor(congestion);

  return (
    <group position={[11, 0, 0]} onClick={onClick}>
      {/* Main building */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2, 2, 1.8]} />
        <meshStandardMaterial color="#f0f0f0" flatShading />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.15, 0]}>
        <boxGeometry args={[2.3, 0.3, 2.1]} />
        <meshStandardMaterial color="#e0e0e0" flatShading />
      </mesh>
      {/* Road */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.5, 12]} />
        <meshStandardMaterial color={roadColor} flatShading transparent opacity={0.6} />
      </mesh>
      {/* Road markings */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 12]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
      {/* Moving cars */}
      <MovingCar startPos={[0.3, 0.2, -3]} speed={2} color="#6ee7b7" />
      <MovingCar startPos={[-0.3, 0.2, 1]} speed={-1.5} color="#fcd34d" />
      <MovingCar startPos={[0.3, 0.2, 3]} speed={1.8} color="#93c5fd" />
      {/* Platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[4, 0.15, 4]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>
    </group>
  );
}
