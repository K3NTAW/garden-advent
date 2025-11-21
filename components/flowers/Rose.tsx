"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createRoundedPetalGeometry } from "@/lib/flowerGeometries";
import { createGlossyPetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface RoseProps {
  color: string;
}

export default function Rose({ color }: RoseProps) {
  const groupRef = useRef<Group>(null);

  // Create petal geometry once
  const petalGeometry = useMemo(() => createRoundedPetalGeometry(0.12, 0.18), []);
  const petalMaterial = useMemo(() => createGlossyPetalMaterial(color), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.12, 0.25), []);

  const petalCount = 16;
  const layers = 4;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Leaves with realistic shape */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        const yPos = -0.4 + i * 0.2;
        return (
          <mesh
            key={i}
            position={[0, yPos, 0]}
            rotation={[0, angle, Math.PI / 6]}
            castShadow
          >
            <primitive object={leafGeometry} attach="geometry" />
            <primitive object={leafMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Rose petals in layers - outer to inner */}
      {Array.from({ length: layers }).map((_, layer) => {
        const layerPetalCount = petalCount - layer * 2;
        const layerRadius = 0.12 + layer * 0.04;
        const layerY = 0.15 + layer * 0.08;
        const layerRotation = layer * 0.3;

        return (
          <group key={layer} position={[0, layerY, 0]}>
            {Array.from({ length: layerPetalCount }).map((_, i) => {
              const angle = (i / layerPetalCount) * Math.PI * 2 + layerRotation;
              const radius = layerRadius;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const petalAngle = angle;
              const petalTilt = (layer / layers) * Math.PI / 4;

              return (
                <mesh
                  key={i}
                  position={[x, 0, z]}
                  rotation={[petalTilt, petalAngle, 0]}
                  castShadow
                >
                  <primitive object={petalGeometry} attach="geometry" />
                  <primitive object={petalMaterial} attach="material" />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* Center with stamens */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.3} />
      </mesh>
      
      {/* Stamens */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.03;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, 0.52, Math.sin(angle) * radius]}
            castShadow
          >
            <cylinderGeometry args={[0.003, 0.003, 0.05, 6]} />
            <meshStandardMaterial color="#ffaa00" />
          </mesh>
        );
      })}
    </group>
  );
}
