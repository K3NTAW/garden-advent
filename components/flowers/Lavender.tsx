"use client";

import { useRef } from "react";
import { Group } from "three";

interface LavenderProps {
  color: string;
}

export default function Lavender({ color }: LavenderProps) {
  const groupRef = useRef<Group>(null);

  const spikeCount = 8;
  const flowersPerSpike = 12;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Leaves */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          position={[0, -0.2 + i * 0.15, 0]}
          rotation={[0, (i * Math.PI) / 3, Math.PI / 6]}
          castShadow
        >
          <coneGeometry args={[0.1, 0.2, 3]} />
          <meshStandardMaterial color="#4a7c2a" />
        </mesh>
      ))}

      {/* Flower spikes */}
      {Array.from({ length: spikeCount }).map((_, spikeIndex) => {
        const spikeY = 0.1 + (spikeIndex / spikeCount) * 0.4;
        const spikeAngle = (spikeIndex / spikeCount) * Math.PI * 2;
        const spikeRadius = 0.05;

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

              return (
                <mesh
                  key={flowerIndex}
                  position={[0, flowerY, 0]}
                  castShadow
                >
                  <sphereGeometry args={[0.02, 6, 6]} />
                  <meshStandardMaterial
                    color={color}
                    roughness={0.4}
                    metalness={0.1}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

