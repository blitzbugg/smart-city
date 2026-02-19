import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

/** Small low-poly student NPC (static or slight bounce) */
function StudentNPC({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#fef3c7" flatShading />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.2, 6]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </group>
  );
}

export default function EducationCenter({ onClick }: Props) {
  return (
    <group position={[5, 0, 11]} onClick={onClick}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[4, 0.2, 3.5]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>

      {/* School building (near housing) — main block */}
      <mesh position={[-0.6, 0.6, 0]} castShadow>
        <boxGeometry args={[1.8, 1.2, 1.5]} />
        <meshStandardMaterial color="#fafafa" flatShading />
      </mesh>
      <mesh position={[-0.6, 1.25, 0]}>
        <boxGeometry args={[1.9, 0.1, 1.6]} />
        <meshStandardMaterial color="#4ade80" flatShading />
      </mesh>
      {/* Windows */}
      {[0, 1].map((i) => (
        <mesh key={i} position={[-0.6, 0.5 + i * 0.5, 0.76]}>
          <planeGeometry args={[0.25, 0.3]} />
          <meshStandardMaterial color="#bfdbfe" flatShading />
        </mesh>
      ))}

      {/* College/tech institute (near center) — taller block */}
      <mesh position={[0.7, 0.9, 0]} castShadow>
        <boxGeometry args={[1.4, 1.8, 1.2]} />
        <meshStandardMaterial color="#f0f0f0" flatShading />
      </mesh>
      <mesh position={[0.7, 1.95, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.3]} />
        <meshStandardMaterial color="#34d399" flatShading />
      </mesh>
      <mesh position={[0.7, 0.7, 0.61]}>
        <planeGeometry args={[0.8, 0.2]} />
        <meshStandardMaterial color="#1e3a5f" flatShading />
      </mesh>

      {/* Playground — simple green field */}
      <mesh position={[0, -0.08, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshStandardMaterial color="#86efac" flatShading />
      </mesh>
      {/* Playground border */}
      <mesh position={[0, -0.06, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.75, 16]} />
        <meshStandardMaterial color="#4ade80" flatShading />
      </mesh>

      {/* Students as small NPCs */}
      <StudentNPC position={[0.2, 0, 1.4]} color="#60a5fa" />
      <StudentNPC position={[-0.3, 0, 1.5]} color="#a78bfa" />
      <StudentNPC position={[0.5, 0, 1.35]} color="#f472b6" />
      <StudentNPC position={[-0.5, 0, 1.3]} color="#34d399" />
    </group>
  );
}
