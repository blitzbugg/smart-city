import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

function WindTurbine({ position }: { position: [number, number, number] }) {
  const bladeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z += delta * 2;
    }
  });

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 3, 8]} />
        <meshStandardMaterial color="#e8e8e8" flatShading />
      </mesh>
      {/* Hub */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#f0f0f0" flatShading />
      </mesh>
      {/* Blades */}
      <group ref={bladeRef} position={[0, 3, 0.15]}>
        {[0, 120, 240].map((angle) => (
          <mesh key={angle} rotation={[0, 0, (angle * Math.PI) / 180]}>
            <boxGeometry args={[0.12, 1.4, 0.03]} />
            <meshStandardMaterial color="#ffffff" flatShading />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function RenewableEnergyPlant({ onClick }: Props) {
  return (
    <group position={[0, 0, -11]} onClick={onClick}>
      {/* Solar panels */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0]} rotation={[-0.4, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.05, 0.8]} />
          <meshStandardMaterial color="#1e3a5f" flatShading />
        </mesh>
      ))}
      {/* Panel supports */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={`s${i}`} position={[x, 0.2, 0.1]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 6]} />
          <meshStandardMaterial color="#d1d5db" flatShading />
        </mesh>
      ))}
      {/* Wind turbines */}
      <WindTurbine position={[-3, 0, 1]} />
      <WindTurbine position={[3, 0, 0.5]} />
      <WindTurbine position={[0, 0, 2.5]} />
      {/* Base platform */}
      <mesh position={[0, -0.1, 0.5]} receiveShadow>
        <boxGeometry args={[8, 0.15, 5]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>
    </group>
  );
}
