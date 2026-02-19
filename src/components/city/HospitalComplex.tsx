import * as THREE from "three";

interface Props {
  onClick?: () => void;
}

export default function HospitalComplex({ onClick }: Props) {
  return (
    <group position={[-5, 0, 11]} onClick={onClick}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[3, 0.2, 2.5]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>

      {/* Main building — white + light green */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[2.2, 1.6, 1.8]} />
        <meshStandardMaterial color="#fafafa" flatShading />
      </mesh>
      <mesh position={[0, 0.8, 0.91]}>
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial color="#bbf7d0" flatShading />
      </mesh>

      {/* Red cross symbol */}
      <group position={[0, 0.8, 1.02]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.12, 0.02]} />
          <meshStandardMaterial color="#dc2626" flatShading />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.12, 0.5, 0.02]} />
          <meshStandardMaterial color="#dc2626" flatShading />
        </mesh>
      </group>

      {/* Roof accent */}
      <mesh position={[0, 1.65, 0]}>
        <boxGeometry args={[2.4, 0.1, 2]} />
        <meshStandardMaterial color="#86efac" flatShading />
      </mesh>

      {/* Ambulance parked outside */}
      <group position={[1.2, 0.15, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.25, 0.9]} />
          <meshStandardMaterial color="#ffffff" flatShading />
        </mesh>
        <mesh position={[0, 0.18, 0.1]}>
          <boxGeometry args={[0.4, 0.2, 0.5]} />
          <meshStandardMaterial color="#fef2f2" flatShading />
        </mesh>
        <mesh position={[0.15, 0.12, 0.46]}>
          <boxGeometry args={[0.15, 0.08, 0.08]} />
          <meshStandardMaterial color="#dc2626" flatShading />
        </mesh>
      </group>

      {/* Small entrance canopy */}
      <mesh position={[0, 0.5, 1.1]}>
        <boxGeometry args={[0.8, 0.06, 0.4]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>
    </group>
  );
}
