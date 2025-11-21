"use client";

import { useRef } from "react";
import { Group } from "three";

interface SunflowerProps {
  color: string;
}

export default function Sunflower({ color }: SunflowerProps) {
  const groupRef = useRef<Group>(null);

  const petalCount = 16;

  return (
    <group ref={groupRef}>
      {/* Tall stem */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Large leaves */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.2, 0]}
          rotation={[0, (i / 3) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <coneGeometry args={[0.15, 0.3, 3]} />
          <meshStandardMaterial color="#4a7c2a" />
        </mesh>
      ))}

      {/* Large petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const radius = 0.15;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.3,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.06, 0.2, 0.02]} />
            <meshStandardMaterial
              color={color}
              roughness={0.6}
              metalness={0.1}
            />
          </mesh>
        );
      })}

      {/* Large dark center */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Seeds on center */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const radius = Math.random() * 0.06;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={i}
            position={[x, 0.32, z]}
            castShadow
          >
            <boxGeometry args={[0.01, 0.01, 0.01]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        );
      })}
    </group>
  );
}

