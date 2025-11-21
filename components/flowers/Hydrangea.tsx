"use client";

import { useRef } from "react";
import { Group } from "three";

interface HydrangeaProps {
  color: string;
}

export default function Hydrangea({ color }: HydrangeaProps) {
  const groupRef = useRef<Group>(null);

  const clusterCount = 50;
  const clusterRadius = 0.15;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Large leaves */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.15, 0]}
          rotation={[0, (i / 4) * Math.PI * 2, Math.PI / 4]}
          castShadow
        >
          <coneGeometry args={[0.12, 0.25, 3]} />
          <meshStandardMaterial color="#4a7c2a" />
        </mesh>
      ))}

      {/* Cluster of small flowers */}
      {Array.from({ length: clusterCount }).map((_, i) => {
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI;
        const radius = Math.random() * clusterRadius;
        const x = Math.sin(angle2) * Math.cos(angle1) * radius;
        const y = Math.cos(angle2) * radius;
        const z = Math.sin(angle2) * Math.sin(angle1) * radius;

        return (
          <mesh
            key={i}
            position={[x, 0.2 + y, z]}
            castShadow
          >
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial
              color={color}
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

