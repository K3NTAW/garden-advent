"use client";

import { useRef } from "react";
import { Group } from "three";

interface RudbeckiaProps {
  color: string;
}

export default function Rudbeckia({ color }: RudbeckiaProps) {
  const groupRef = useRef<Group>(null);

  const petalCount = 12;

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

      {/* Petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const radius = 0.12;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.1,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.05, 0.15, 0.02]} />
            <meshStandardMaterial
              color={color}
              roughness={0.6}
              metalness={0.1}
            />
          </mesh>
        );
      })}

      {/* Dark center */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

