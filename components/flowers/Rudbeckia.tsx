"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createPetalGeometry } from "@/lib/flowerGeometries";
import { createMattePetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface RudbeckiaProps {
  color: string;
}

export default function Rudbeckia({ color }: RudbeckiaProps) {
  const groupRef = useRef<Group>(null);

  const petalGeometry = useMemo(() => createPetalGeometry(0.06, 0.14, 0.15), []);
  const petalMaterial = useMemo(() => createMattePetalMaterial(color), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.1, 0.2), []);

  const petalCount = 14;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Leaves */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -0.2 + i * 0.15, 0]}
          rotation={[0, (i / 3) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <primitive object={leafGeometry} attach="geometry" />
          <primitive object={leafMaterial} attach="material" />
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
            <primitive object={petalGeometry} attach="geometry" />
            <primitive object={petalMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Dark center - black-eyed susan characteristic */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Center texture detail */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = Math.random() * 0.04;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.11,
              Math.sin(angle) * radius,
            ]}
            castShadow
          >
            <boxGeometry args={[0.005, 0.005, 0.005]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        );
      })}
    </group>
  );
}
