"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import * as THREE from "three";

export default function Fountain() {
  const groupRef = useRef<Group>(null);
  const waterRef = useRef<Mesh>(null);

  // Animate water
  useFrame((state) => {
    if (waterRef.current) {
      const time = state.clock.elapsedTime;
      waterRef.current.position.y = 0.1 + Math.sin(time * 2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
        <meshStandardMaterial color="#8b9dc3" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Middle tier */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.3, 32]} />
        <meshStandardMaterial color="#a8b5d1" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Top tier */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.6, 0.3, 32]} />
        <meshStandardMaterial color="#b8c5e0" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Water in base */}
      <mesh
        ref={waterRef}
        position={[0, 0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[0.75, 32]} />
        <meshStandardMaterial
          color="#4a90e2"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Water spout particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <WaterSpout key={i} position={[x, 0.85, z]} />
        );
      })}

      {/* Decorative elements */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={i}
            position={[x, 0.1, z]}
            castShadow
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#c9d4e8" roughness={0.2} metalness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

function WaterSpout({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * 3 + position[0] * 10) * 0.1;
      meshRef.current.scale.y = 0.5 + Math.sin(time * 4) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
      <meshStandardMaterial
        color="#6bb6ff"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

