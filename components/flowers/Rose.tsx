"use client";

import { useRef } from "react";
import { Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RoseProps {
  color: string;
}

export default function Rose({ color }: RoseProps) {
  const groupRef = useRef<Group>(null);

  // Create rose petals in layers
  const petalCount = 12;
  const layers = 3;

  return (
    <group ref={groupRef}>
      {/* Stem */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Leaves */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          position={[0, -0.3 + i * 0.2, 0]}
          rotation={[0, (i * Math.PI) / 2, Math.PI / 4]}
          castShadow
        >
          <coneGeometry args={[0.15, 0.3, 3]} />
          <meshStandardMaterial color="#4a7c2a" />
        </mesh>
      ))}

      {/* Rose petals in layers */}
      {Array.from({ length: layers }).map((_, layer) => (
        <group key={layer} position={[0, 0.2 + layer * 0.1, 0]}>
          {Array.from({ length: petalCount }).map((_, i) => {
            const angle = (i / petalCount) * Math.PI * 2;
            const radius = 0.15 + layer * 0.05;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            return (
              <mesh
                key={i}
                position={[x, 0, z]}
                rotation={[0, angle, 0]}
                castShadow
              >
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.6}
                  metalness={0.1}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Center */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}

