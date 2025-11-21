"use client";

import { useMemo } from "react";
import { Mesh } from "three";

interface PathwayProps {
  start: [number, number, number];
  end: [number, number, number];
  width?: number;
}

export default function Pathway({ start, end, width = 1.5 }: PathwayProps) {
  const pathLength = useMemo(() => {
    const dx = end[0] - start[0];
    const dz = end[2] - start[2];
    return Math.sqrt(dx * dx + dz * dz);
  }, [start, end]);

  const angle = useMemo(() => {
    const dx = end[0] - start[0];
    const dz = end[2] - start[2];
    return Math.atan2(dx, dz);
  }, [start, end]);

  const centerX = (start[0] + end[0]) / 2;
  const centerZ = (start[2] + end[2]) / 2;

  // Create stone pattern
  const stones = useMemo(() => {
    const stoneCount = Math.floor(pathLength * 3);
    const stones: Array<{ x: number; z: number; size: number; rotation: number }> = [];

    for (let i = 0; i < stoneCount; i++) {
      const t = i / stoneCount;
      const baseX = start[0] + (end[0] - start[0]) * t;
      const baseZ = start[2] + (end[2] - start[2]) * t;
      
      // Add some randomness
      const offsetX = (Math.random() - 0.5) * width * 0.6;
      const offsetZ = (Math.random() - 0.5) * width * 0.6;
      
      stones.push({
        x: baseX + offsetX,
        z: baseZ + offsetZ,
        size: 0.15 + Math.random() * 0.1,
        rotation: Math.random() * Math.PI * 2,
      });
    }

    return stones;
  }, [start, end, pathLength, width]);

  return (
    <group>
      {/* Base path */}
      <mesh
        position={[centerX, 0.01, centerZ]}
        rotation={[0, angle, 0]}
        receiveShadow
      >
        <boxGeometry args={[width, 0.02, pathLength]} />
        <meshStandardMaterial
          color="#a0a0a0"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Individual stones */}
      {stones.map((stone, i) => (
        <mesh
          key={i}
          position={[stone.x, 0.02, stone.z]}
          rotation={[0, stone.rotation, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[stone.size, 0.03, stone.size * 0.8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#888888" : i % 3 === 1 ? "#999999" : "#777777"}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Gravel texture */}
      {Array.from({ length: Math.floor(pathLength * 10) }).map((_, i) => {
        const t = i / Math.floor(pathLength * 10);
        const baseX = start[0] + (end[0] - start[0]) * t;
        const baseZ = start[2] + (end[2] - start[2]) * t;
        const offsetX = (Math.random() - 0.5) * width * 0.8;
        const offsetZ = (Math.random() - 0.5) * width * 0.8;

        return (
          <mesh
            key={`gravel-${i}`}
            position={[baseX + offsetX, 0.015, baseZ + offsetZ]}
          >
            <sphereGeometry args={[0.01, 4, 4]} />
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#666666" : "#888888"}
              roughness={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

