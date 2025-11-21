"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createPetalGeometry } from "@/lib/flowerGeometries";
import { createMattePetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface MarigoldProps {
  color: string;
}

export default function Marigold({ color }: MarigoldProps) {
  const groupRef = useRef<Group>(null);

  const petalGeometry = useMemo(() => createPetalGeometry(0.08, 0.12, 0.2), []);
  const petalMaterial = useMemo(() => createMattePetalMaterial(color), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.1, 0.2), []);

  const petalCount = 20;
  const layers = 3;

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

      {/* Petals in layers */}
      {Array.from({ length: layers }).map((_, layer) => (
        <group key={layer} position={[0, 0.1 + layer * 0.02, 0]}>
          {Array.from({ length: petalCount }).map((_, i) => {
            const angle = (i / petalCount) * Math.PI * 2;
            const radius = 0.1 + layer * 0.03;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return (
              <mesh
                key={i}
                position={[x, 0, z]}
                rotation={[0, angle, 0]}
                castShadow
              >
                <primitive object={petalGeometry} attach="geometry" />
                <primitive object={petalMaterial} attach="material" />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Center */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
    </group>
  );
}
