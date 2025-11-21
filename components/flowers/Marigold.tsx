"use client";

import { useRef } from "react";
import { Group } from "three";

interface MarigoldProps {
  color: string;
}

export default function Marigold({ color }: MarigoldProps) {
  const groupRef = useRef<Group>(null);

  const petalCount = 20;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Leaves */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          position={[0, -0.2 + i * 0.15, 0]}
          rotation={[0, (i * Math.PI) / 2, Math.PI / 4]}
          castShadow
        >
          <coneGeometry args={[0.1, 0.2, 3]} />
          <meshStandardMaterial color="#4a7c2a" />
        </mesh>
      ))}

      {/* Petals in layers */}
      {[0, 1, 2].map((layer) => (
        <group key={layer} position={[0, 0.1 + layer * 0.02, 0]}>
          {Array.from({ length: petalCount }).map((_, i) => {
            const angle = (i / petalCount) * Math.PI * 2;
            const radius = 0.1 + layer * 0.03;

            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  0,
                  Math.sin(angle) * radius,
                ]}
                rotation={[0, angle, 0]}
                castShadow
              >
                <boxGeometry args={[0.04, 0.08, 0.02]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.6}
                  metalness={0.1}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Center */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
}

