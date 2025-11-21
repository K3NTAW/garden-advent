"use client";

import { useMemo } from "react";
import { useRef } from "react";
import { Group } from "three";
import { createSmallFlowerGeometry } from "@/lib/flowerGeometries";
import { createPetalMaterial, createStemMaterial, createLeafMaterial } from "@/lib/flowerMaterials";
import { createLeafGeometry } from "@/lib/flowerGeometries";

interface LavenderProps {
  color: string;
}

export default function Lavender({ color }: LavenderProps) {
  const groupRef = useRef<Group>(null);

  const flowerGeometry = useMemo(() => createSmallFlowerGeometry(0.025), []);
  const flowerMaterial = useMemo(() => createPetalMaterial(color, { roughness: 0.5 }), [color]);
  const stemMaterial = useMemo(() => createStemMaterial(), []);
  const leafMaterial = useMemo(() => createLeafMaterial(), []);
  const leafGeometry = useMemo(() => createLeafGeometry(0.08, 0.18), []);

  const spikeCount = 10;
  const flowersPerSpike = 15;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
        <primitive object={stemMaterial} attach="material" />
      </mesh>

      {/* Leaves */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -0.2 + i * 0.15, 0]}
          rotation={[0, (i / 3) * Math.PI * 2, Math.PI / 6]}
          castShadow
        >
          <primitive object={leafGeometry} attach="geometry" />
          <primitive object={leafMaterial} attach="material" />
        </mesh>
      ))}

      {/* Flower spikes - more realistic clustering */}
      {Array.from({ length: spikeCount }).map((_, spikeIndex) => {
        const spikeY = 0.1 + (spikeIndex / spikeCount) * 0.4;
        const spikeAngle = (spikeIndex / spikeCount) * Math.PI * 2;
        const spikeRadius = 0.04 + Math.random() * 0.02;

        return (
          <group
            key={spikeIndex}
            position={[
              Math.cos(spikeAngle) * spikeRadius,
              spikeY,
              Math.sin(spikeAngle) * spikeRadius,
            ]}
          >
            {Array.from({ length: flowersPerSpike }).map((_, flowerIndex) => {
              const flowerY = (flowerIndex / flowersPerSpike) * 0.3;
              const flowerAngle = (flowerIndex / flowersPerSpike) * Math.PI * 2;
              const offset = (Math.random() - 0.5) * 0.01;

              return (
                <mesh
                  key={flowerIndex}
                  position={[offset, flowerY, offset]}
                  rotation={[0, flowerAngle, 0]}
                  castShadow
                >
                  <primitive object={flowerGeometry} attach="geometry" />
                  <primitive object={flowerMaterial} attach="material" />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
