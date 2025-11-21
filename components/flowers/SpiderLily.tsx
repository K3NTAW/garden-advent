"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createLongPetalGeometry } from "@/lib/flowerGeometries";
import { createTranslucentPetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface SpiderLilyProps {
  color: string;
}

export default function SpiderLily({ color }: SpiderLilyProps) {
  const groupRef = useRef<Group>(null);

  const petalGeometry = useMemo(() => createLongPetalGeometry(0.05, 0.45, 0.15), []);
  const petalMaterial = useMemo(() => createTranslucentPetalMaterial(color), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.1, 0.3), []);

  const petalCount = 6;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Leaves at base */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[0, -0.3, 0]}
            rotation={[0, angle, Math.PI / 4]}
            castShadow
          >
            <primitive object={leafGeometry} attach="geometry" />
            <primitive object={leafMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Long, curved petals - spider lily characteristic */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const radius = 0.05;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Curved outward and backward
        const petalRotationY = angle;
        const petalRotationX = -Math.PI / 6; // Curved backward
        const petalRotationZ = (i % 2 === 0 ? 1 : -1) * Math.PI / 12; // Slight twist

        return (
          <mesh
            key={i}
            position={[x, 0.2, z]}
            rotation={[petalRotationX, petalRotationY, petalRotationZ]}
            castShadow
          >
            <primitive object={petalGeometry} attach="geometry" />
            <primitive object={petalMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Long stamens extending outward */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.08;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const stamenLength = 0.2;
        const stamenAngle = angle + Math.PI / 12;

        return (
          <mesh
            key={i}
            position={[x, 0.25, z]}
            rotation={[0, stamenAngle, Math.PI / 6]}
            castShadow
          >
            <cylinderGeometry args={[0.004, 0.004, stamenLength, 6]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        );
      })}

      {/* Anthers at tips */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.08;
        const stamenLength = 0.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const stamenAngle = angle + Math.PI / 12;

        return (
          <mesh
            key={`anther-${i}`}
            position={[
              x + Math.cos(stamenAngle) * stamenLength * 0.9,
              0.25 + Math.sin(Math.PI / 6) * stamenLength * 0.9,
              z + Math.sin(stamenAngle) * stamenLength * 0.9,
            ]}
            castShadow
          >
            <sphereGeometry args={[0.008, 6, 6]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        );
      })}
    </group>
  );
}
