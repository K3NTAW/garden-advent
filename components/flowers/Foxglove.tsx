"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createBellGeometry } from "@/lib/flowerGeometries";
import { createPetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface FoxgloveProps {
  color: string;
}

export default function Foxglove({ color }: FoxgloveProps) {
  const groupRef = useRef<Group>(null);

  const bellGeometry = useMemo(() => createBellGeometry(0.05, 0.1), []);
  const bellMaterial = useMemo(() => createPetalMaterial(color, { roughness: 0.5 }), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.12, 0.25), []);

  const flowerCount = 18;

  return (
    <group ref={groupRef}>
      {/* Tall stem */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Leaves at base */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0, -0.4, 0]}
          rotation={[0, (i / 4) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <primitive object={leafGeometry} attach="geometry" />
          <primitive object={leafMaterial} attach="material" />
        </mesh>
      ))}

      {/* Bell-shaped flowers up the stem */}
      {Array.from({ length: flowerCount }).map((_, i) => {
        const flowerY = -0.3 + (i / flowerCount) * 0.9;
        const angle = (i / flowerCount) * Math.PI * 2;
        const radius = 0.03 + (i % 2) * 0.01;
        const tilt = (i % 3 - 1) * 0.2;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              flowerY,
              Math.sin(angle) * radius,
            ]}
            rotation={[tilt, angle, Math.PI / 2]}
            castShadow
          >
            <primitive object={bellGeometry} attach="geometry" />
            <primitive object={bellMaterial} attach="material" />
          </mesh>
        );
      })}
    </group>
  );
}
