"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createRoundedPetalGeometry } from "@/lib/flowerGeometries";
import { createGlossyPetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface PeonyProps {
  color: string;
}

export default function Peony({ color }: PeonyProps) {
  const groupRef = useRef<Group>(null);

  const petalGeometry = useMemo(() => createRoundedPetalGeometry(0.1, 0.16), []);
  const petalMaterial = useMemo(() => createGlossyPetalMaterial(color), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.12, 0.25), []);

  const petalCount = 28;
  const layers = 5;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Leaves */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.15, 0]}
          rotation={[0, (i / 4) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <primitive object={leafGeometry} attach="geometry" />
          <primitive object={leafMaterial} attach="material" />
        </mesh>
      ))}

      {/* Multiple dense layers of petals - peony characteristic */}
      {Array.from({ length: layers }).map((_, layer) => {
        const layerPetalCount = petalCount - layer * 3;
        const layerRadius = 0.08 + layer * 0.035;
        const layerY = 0.15 + layer * 0.06;
        const layerRotation = layer * 0.4;

        return (
          <group key={layer} position={[0, layerY, 0]}>
            {Array.from({ length: layerPetalCount }).map((_, i) => {
              const angle = (i / layerPetalCount) * Math.PI * 2 + layerRotation;
              const radius = layerRadius;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const petalAngle = angle;
              const petalTilt = (layer / layers) * Math.PI / 3;

              return (
                <mesh
                  key={i}
                  position={[x, 0, z]}
                  rotation={[petalTilt, petalAngle, Math.PI / 8]}
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
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.3} />
      </mesh>
    </group>
  );
}
