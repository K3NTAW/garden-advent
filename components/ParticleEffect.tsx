"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, BufferGeometry, Float32BufferAttribute, PointsMaterial } from "three";

interface ParticleEffectProps {
  position: [number, number, number];
  color: string;
  count?: number;
}

export default function ParticleEffect({
  position,
  color,
  count = 30,
}: ParticleEffectProps) {
  const pointsRef = useRef<Points>(null);
  const geometryRef = useRef<BufferGeometry>(null);

  useEffect(() => {
    if (!geometryRef.current) return;

    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Random starting positions
      positions[i3] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = Math.random() * 0.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.5;

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = Math.random() * 0.03 + 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometryRef.current.setAttribute("position", new Float32BufferAttribute(positions, 3));
    (geometryRef.current as any).userData.velocities = velocities;
  }, [count]);

  useFrame(() => {
    if (!geometryRef.current) return;

    const positions = geometryRef.current.attributes.position.array as Float32Array;
    const velocities = (geometryRef.current as any).userData.velocities as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Gravity effect
      velocities[i3 + 1] -= 0.0005;

      // Reset if too far
      if (positions[i3 + 1] < -2) {
        positions[i3] = (Math.random() - 0.5) * 0.5;
        positions[i3 + 1] = 0.5;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.5;
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = Math.random() * 0.03 + 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      }
    }

    geometryRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

