"use client";

import { useRef } from "react";
import { Group } from "three";

interface PeonyProps {
  color: string;
}

export default function Peony({ color }: PeonyProps) {
  const groupRef = useRef<Group>(null);

  const petalCount = 24;
  const layers = 4;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Leaves */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.15, 0]}
          rotation={[0, (i / 3) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <coneGeometry args={[0.12, 0.25, 3]} />
          <meshStandardMaterial color="#4a7c2a" />
        </mesh>
      ))}

      {/* Multiple layers of petals */}
      {Array.from({ length: layers }).map((_, layer) => (
        <group key={layer} position={[0, 0.2 + layer * 0.05, 0]}>
          {Array.from({ length: petalCount }).map((_, i) => {
            const angle = (i / petalCount) * Math.PI * 2;
            const radius = 0.1 + layer * 0.04;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return (
              <mesh
                key={i}
                position={[x, 0, z]}
                rotation={[0, angle, Math.PI / 6]}
                castShadow
              >
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.7}
                  metalness={0.05}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Center */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}

