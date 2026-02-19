import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  path: [number, number, number][];
  speed?: number;
  shirtColor: string;
  heightScale?: number;
}

/** Low-poly human: cylinder body + sphere head, different shirt colors, slow walk along path */
export default function NPC({ path, speed = 0.15, shirtColor, heightScale = 1 }: Props) {
  const ref = useRef<THREE.Group>(null);
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current || path.length < 2) return;
    progressRef.current += delta * speed;
    const len = path.length;
    const t = ((progressRef.current % len) + len) % len;
    const i0 = Math.floor(t) % len;
    const i1 = (i0 + 1) % len;
    const u = t - Math.floor(t);
    const x = path[i0][0] + (path[i1][0] - path[i0][0]) * u;
    const y = path[i0][1] + (path[i1][1] - path[i0][1]) * u;
    const z = path[i0][2] + (path[i1][2] - path[i0][2]) * u;
    ref.current.position.set(x, y, z);
    const dx = path[i1][0] - path[i0][0];
    const dz = path[i1][2] - path[i0][2];
    ref.current.rotation.y = -Math.atan2(dx, dz);
  });

  const h = 0.32 * heightScale;

  return (
    <group ref={ref}>
      {/* Body — cylinder */}
      <mesh position={[0, h * 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, h * 0.6, 6]} />
        <meshStandardMaterial color={shirtColor} flatShading />
      </mesh>
      {/* Head — sphere */}
      <mesh position={[0, h * 0.85, 0]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#fef3c7" flatShading />
      </mesh>
    </group>
  );
}
