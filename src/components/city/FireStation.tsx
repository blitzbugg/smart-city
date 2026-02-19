import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

function FireTruckLowPoly() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.3, 1.1]} />
        <meshStandardMaterial color="#dc2626" flatShading />
      </mesh>
      <mesh position={[0, 0.2, 0.35]}>
        <boxGeometry args={[0.45, 0.25, 0.5]} />
        <meshStandardMaterial color="#fef2f2" flatShading />
      </mesh>
      <mesh position={[0, 0.35, -0.35]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 6]} />
        <meshStandardMaterial color="#f97316" flatShading />
      </mesh>
      <mesh position={[0.2, 0.15, -0.5]}>
        <boxGeometry args={[0.06, 0.06, 0.4]} />
        <meshStandardMaterial color="#a3a3a3" flatShading />
      </mesh>
    </group>
  );
}

export default function FireStation({ onClick }: Props) {
  return (
    <group position={[-11, 0, -5]} onClick={onClick}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[3, 0.2, 2.5]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>

      {/* Red/white building */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2, 1.2, 1.8]} />
        <meshStandardMaterial color="#fef2f2" flatShading />
      </mesh>
      <mesh position={[0, 0.6, 0.91]}>
        <planeGeometry args={[1.8, 1]} />
        <meshStandardMaterial color="#dc2626" flatShading />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2.2, 0.1, 2]} />
        <meshStandardMaterial color="#fca5a5" flatShading />
      </mesh>

      {/* Garage door hint */}
      <mesh position={[0, 0.3, 0.91]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>

      {/* Fire truck */}
      <group position={[1.1, 0, 0.2]}>
        <FireTruckLowPoly />
      </group>
    </group>
  );
}
