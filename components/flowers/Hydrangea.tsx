"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createSmallFlowerGeometry } from "@/lib/flowerGeometries";
import { createPetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface HydrangeaProps {
  color: string;
}

export default function Hydrangea({ color }: HydrangeaProps) {
  const groupRef = useRef<Group>(null);

  const flowerGeometry = useMemo(() => createSmallFlowerGeometry(0.022), []);
  const flowerMaterial = useMemo(() => createPetalMaterial(color, { roughness: 0.6 }), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.12, 0.25), []);

  const clusterCount = 60;
  const clusterRadius = 0.18;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Large leaves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.12, 0]}
          rotation={[0, (i / 5) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <primitive object={leafGeometry} attach="geometry" />
          <primitive object={leafMaterial} attach="material" />
        </mesh>
      ))}

      {/* Dense cluster of small flowers - hydrangea characteristic */}
      {Array.from({ length: clusterCount }).map((_, i) => {
        const angle1 = (i / clusterCount) * Math.PI * 2;
        const angle2 = Math.acos(2 * Math.random() - 1); // Uniform sphere distribution
        const radius = Math.random() * clusterRadius;
        const x = Math.sin(angle2) * Math.cos(angle1) * radius;
        const y = Math.cos(angle2) * radius;
        const z = Math.sin(angle2) * Math.sin(angle1) * radius;
        const flowerRotation = Math.random() * Math.PI * 2;

        return (
          <mesh
            key={i}
            position={[x, 0.2 + y, z]}
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
