"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export default function Ground() {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[16, 16, 32, 32]} />
      <meshStandardMaterial
        color="#7cb342"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

