"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createPetalGeometry } from "@/lib/flowerGeometries";
import { createMattePetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface SunflowerProps {
  color: string;
}

export default function Sunflower({ color }: SunflowerProps) {
  const groupRef = useRef<Group>(null);

  const petalGeometry = useMemo(() => createPetalGeometry(0.08, 0.22, 0.25), []);
  const petalMaterial = useMemo(() => createMattePetalMaterial(color), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.15, 0.3), []);

  const petalCount = 20;

  return (
    <group ref={groupRef}>
      {/* Tall stem */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Large leaves */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.2, 0]}
          rotation={[0, (i / 4) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <primitive object={leafGeometry} attach="geometry" />
          <primitive object={leafMaterial} attach="material" />
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
            <primitive object={petalGeometry} attach="geometry" />
            <primitive object={petalMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Large dark center */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Seeds on center - more realistic pattern */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = Math.random() * 0.06;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const seedY = 0.32 + (Math.random() - 0.5) * 0.01;

        return (
          <mesh
            key={i}
            position={[x, seedY, z]}
            castShadow
          >
            <boxGeometry args={[0.008, 0.008, 0.008]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#8b4513" : "#654321"} roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}
