"use client";

import { useRef } from "react";
import { Group } from "three";
import * as THREE from "three";

interface SpiderLilyProps {
  color: string;
}

export default function SpiderLily({ color }: SpiderLilyProps) {
  const groupRef = useRef<Group>(null);

  const petalCount = 6;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Long, curved petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const radius = 0.2;

        return (
          <mesh
            key={i}
            position={[0, 0.2, 0]}
            rotation={[0, angle, Math.PI / 6]}
            castShadow
          >
            <coneGeometry args={[0.03, 0.4, 8]} />
            <meshStandardMaterial
              color={color}
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
        );
      })}

      {/* Stamens */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.05;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={i} position={[x, 0.4, z]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.15, 6]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        );
      })}
    </group>
  );
}

