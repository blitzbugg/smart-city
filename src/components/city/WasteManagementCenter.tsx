import * as THREE from "three";

interface Props {
  onClick?: () => void;
  binFillLevels?: [number, number, number];
}

const BIN_COLORS = ["#34d399", "#fbbf24", "#f87171"];

function SmartBin({ position, fillLevel, color }: { position: [number, number, number]; fillLevel: number; color: string }) {
  const fillHeight = (fillLevel / 100) * 0.8;

  return (
    <group position={position}>
      {/* Bin body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#e8e8e8" flatShading transparent opacity={0.7} />
      </mesh>
      {/* Fill level */}
      <mesh position={[0, fillHeight / 2 + 0.1, 0]}>
        <boxGeometry args={[0.45, fillHeight, 0.45]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {/* Lid */}
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[0.55, 0.1, 0.55]} />
        <meshStandardMaterial color="#d1d5db" flatShading />
      </mesh>
    </group>
  );
}

export default function WasteManagementCenter({ onClick, binFillLevels = [35, 50, 20] }: Props) {
  return (
    <group position={[-7, 0, 0]} onClick={onClick}>
      {/* Main building */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2.5, 1.2, 2]} />
        <meshStandardMaterial color="#f5f5f5" flatShading />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[2.7, 0.15, 2.2]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>
      {/* Recycling symbol accent */}
      <mesh position={[0, 0.6, 1.01]}>
        <circleGeometry args={[0.3, 3]} />
        <meshStandardMaterial color="#34d399" flatShading side={THREE.DoubleSide} />
      </mesh>
      {/* Smart bins */}
      <SmartBin position={[-1, 0, 1.5]} fillLevel={binFillLevels[0]} color={BIN_COLORS[0]} />
      <SmartBin position={[0, 0, 1.5]} fillLevel={binFillLevels[1]} color={BIN_COLORS[1]} />
      <SmartBin position={[1, 0, 1.5]} fillLevel={binFillLevels[2]} color={BIN_COLORS[2]} />
      {/* Platform */}
      <mesh position={[0, -0.1, 0.5]} receiveShadow>
        <boxGeometry args={[4, 0.15, 4]} />
        <meshStandardMaterial color="#d1fae5" flatShading />
      </mesh>
    </group>
  );
}
