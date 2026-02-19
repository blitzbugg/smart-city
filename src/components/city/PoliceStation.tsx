interface Props {
  onClick?: () => void;
}

export default function PoliceStation({ onClick }: Props) {
  return (
    <group position={[5, 0, 2]} onClick={onClick}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.2, 1.8]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>

      {/* Compact main building */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.6, 1, 1.4]} />
        <meshStandardMaterial color="#f5f5f5" flatShading />
      </mesh>

      {/* Blue signage strip */}
      <mesh position={[0, 0.5, 0.71]}>
        <planeGeometry args={[1.4, 0.35]} />
        <meshStandardMaterial color="#2563eb" flatShading />
      </mesh>
      <mesh position={[0, 0.52, 0.72]}>
        <planeGeometry args={[0.5, 0.12]} />
        <meshStandardMaterial color="#fef3c7" flatShading />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[1.7, 0.08, 1.5]} />
        <meshStandardMaterial color="#e5e7eb" flatShading />
      </mesh>

      {/* Parked patrol cars */}
      <group position={[-0.7, 0.12, 0.9]}>
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.2, 0.6]} />
          <meshStandardMaterial color="#3b82f6" flatShading />
        </mesh>
        <mesh position={[0, 0.12, -0.05]}>
          <boxGeometry args={[0.28, 0.15, 0.32]} />
          <meshStandardMaterial color="#93c5fd" flatShading />
        </mesh>
      </group>
      <group position={[0.7, 0.12, 0.9]}>
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.2, 0.6]} />
          <meshStandardMaterial color="#1e40af" flatShading />
        </mesh>
        <mesh position={[0, 0.12, -0.05]}>
          <boxGeometry args={[0.28, 0.15, 0.32]} />
          <meshStandardMaterial color="#60a5fa" flatShading />
        </mesh>
      </group>
    </group>
  );
}
