"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createSmallFlowerGeometry } from "@/lib/flowerGeometries";
import { createPetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface LiatrisProps {
  color: string;
}

export default function Liatris({ color }: LiatrisProps) {
  const groupRef = useRef<Group>(null);

  const flowerGeometry = useMemo(() => createSmallFlowerGeometry(0.018), []);
  const flowerMaterial = useMemo(() => createPetalMaterial(color, { roughness: 0.5 }), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.06, 0.2), []);

  const flowerCount = 25;

  return (
    <group ref={groupRef}>
      {/* Tall stem */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Narrow leaves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.15, 0]}
          rotation={[0, (i / 5) * Math.PI * 2, Math.PI / 3]}
          castShadow
        >
          <primitive object={leafGeometry} attach="geometry" />
          <primitive object={leafMaterial} attach="material" />
        </mesh>
      ))}

      {/* Small flowers up the spike - liatris characteristic */}
      {Array.from({ length: flowerCount }).map((_, i) => {
        const flowerY = -0.2 + (i / flowerCount) * 0.7;
        const angle = (i / flowerCount) * Math.PI * 2;
        const radius = 0.02 + (i % 2) * 0.01;
        const flowerRotation = angle;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              flowerY,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, flowerRotation, 0]}
            castShadow
          >
            <primitive object={flowerGeometry} attach="geometry" />
            <primitive object={flowerMaterial} attach="material" />
          </mesh>
        );
      })}
    </group>
  );
}
