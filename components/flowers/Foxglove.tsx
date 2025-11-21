"use client";

import { useRef } from "react";
import { Group } from "three";

interface FoxgloveProps {
  color: string;
}

export default function Foxglove({ color }: FoxgloveProps) {
  const groupRef = useRef<Group>(null);

  const flowerCount = 15;

  return (
    <group ref={groupRef}>
      {/* Tall stem */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Leaves at base */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -0.4, 0]}
          rotation={[0, (i / 3) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <coneGeometry args={[0.12, 0.25, 3]} />
          <meshStandardMaterial color="#4a7c2a" />
        </mesh>
      ))}

      {/* Bell-shaped flowers up the stem */}
      {Array.from({ length: flowerCount }).map((_, i) => {
        const flowerY = -0.3 + (i / flowerCount) * 0.8;
        const angle = (i / flowerCount) * Math.PI * 2;
        const radius = 0.03;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              flowerY,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, angle, Math.PI / 2]}
            castShadow
          >
            <coneGeometry args={[0.04, 0.08, 8]} />
            <meshStandardMaterial
              color={color}
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

