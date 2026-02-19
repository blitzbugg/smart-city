import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

export default function SmartAgricultureZone({ onClick }: Props) {
  const sprinklerRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (sprinklerRef.current) {
      sprinklerRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group position={[6, 0, -6]} onClick={onClick}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[5, 0.2, 4]} />
        <meshStandardMaterial color="#bbf7d0" flatShading />
      </mesh>

      {/* Farm patches */}
      {[[-1, 0, -0.5], [1, 0, -0.5], [-1, 0, 1], [1, 0, 1]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.02, pos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.5, 1.2]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#86efac" : "#4ade80"}
            flatShading
          />
        </mesh>
      ))}

      {/* Crop rows (simple extruded lines) */}
      {[-1, 1].map((xOff) =>
        [-0.8, -0.4, 0, 0.4].map((z, j) => (
          <mesh key={`crop-${xOff}-${j}`} position={[xOff, 0.08, -0.5 + z * 1.2]}>
            <boxGeometry args={[1.2, 0.08, 0.06]} />
            <meshStandardMaterial color="#22c55e" flatShading />
          </mesh>
        ))
      )}

      {/* Small farmhouse */}
      <mesh position={[-1.8, 0.4, -1.2]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.6]} />
        <meshStandardMaterial color="#fafafa" flatShading />
      </mesh>
      {/* Farmhouse roof */}
      <mesh position={[-1.8, 0.9, -1.2]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.6, 0.4, 4]} />
        <meshStandardMaterial color="#fb923c" flatShading />
      </mesh>

      {/* Solar irrigation pump */}
      <group position={[2, 0, -1.2]}>
        {/* Panel */}
        <mesh position={[0, 0.5, 0]} rotation={[-0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.02, 0.4]} />
          <meshStandardMaterial color="#1e3a5f" flatShading />
        </mesh>
        {/* Stand */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
          <meshStandardMaterial color="#a3a3a3" flatShading />
        </mesh>
      </group>

      {/* Rotating sprinkler */}
      <group position={[0, 0.3, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.04, 0.3, 6]} />
          <meshStandardMaterial color="#a3a3a3" flatShading />
        </mesh>
        <group ref={sprinklerRef} position={[0, 0.15, 0]}>
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, i) => (
            <mesh key={i} rotation={[0, rot, 0]} position={[0.15, 0, 0]}>
              <boxGeometry args={[0.3, 0.02, 0.02]} />
              <meshStandardMaterial color="#60a5fa" flatShading />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
