"use client";

import { useRef } from "react";
import { Group } from "three";

interface LiatrisProps {
  color: string;
}

export default function Liatris({ color }: LiatrisProps) {
  const groupRef = useRef<Group>(null);

  const flowerCount = 20;

  return (
    <group ref={groupRef}>
      {/* Tall stem */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Narrow leaves */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.2, 0]}
          rotation={[0, (i / 3) * Math.PI * 2, Math.PI / 3]}
          castShadow
        >
          <boxGeometry args={[0.05, 0.15, 0.01]} />
          <meshStandardMaterial color="#4a7c2a" />
        </mesh>
      ))}

      {/* Small flowers up the spike */}
      {Array.from({ length: flowerCount }).map((_, i) => {
        const flowerY = -0.2 + (i / flowerCount) * 0.7;
        const angle = (i / flowerCount) * Math.PI * 2;
        const radius = 0.02;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              flowerY,
              Math.sin(angle) * radius,
            ]}
            castShadow
          >
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshStandardMaterial
              color={color}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

