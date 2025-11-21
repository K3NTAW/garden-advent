"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import * as THREE from "three";

export default function Fountain() {
  const groupRef = useRef<Group>(null);
  const waterRef = useRef<Mesh>(null);
  const waterRef2 = useRef<Mesh>(null);
  const waterRef3 = useRef<Mesh>(null);

  // Animate water with multiple layers
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (waterRef.current) {
      waterRef.current.position.y = 0.1 + Math.sin(time * 2) * 0.02;
      waterRef.current.rotation.z += 0.001;
    }
    
    if (waterRef2.current) {
      waterRef2.current.position.y = 0.35 + Math.sin(time * 2.5) * 0.015;
      waterRef2.current.rotation.z -= 0.0015;
    }
    
    if (waterRef3.current) {
      waterRef3.current.position.y = 0.7 + Math.sin(time * 3) * 0.01;
      waterRef3.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base foundation */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.25, 32]} />
        <meshStandardMaterial 
          color="#6b7a9f" 
          roughness={0.2} 
          metalness={0.7}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Base decorative rim */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <torusGeometry args={[0.9, 0.03, 16, 32]} />
        <meshStandardMaterial 
          color="#8b9dc3" 
          roughness={0.1} 
          metalness={0.8}
        />
      </mesh>

      {/* Middle tier */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.65, 0.85, 0.35, 32]} />
        <meshStandardMaterial 
          color="#8b9dc3" 
          roughness={0.25} 
          metalness={0.6}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* Middle tier decorative bands */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.25 + i * 0.15, 0]} castShadow>
          <torusGeometry args={[0.75 - i * 0.05, 0.02, 16, 32]} />
          <meshStandardMaterial 
            color="#a8b5d1" 
            roughness={0.1} 
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Top tier */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.65, 0.35, 32]} />
        <meshStandardMaterial 
          color="#b8c5e0" 
          roughness={0.3} 
          metalness={0.5}
          envMapIntensity={1.0}
        />
      </mesh>

      {/* Top tier decorative rim */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <torusGeometry args={[0.5, 0.025, 16, 32]} />
        <meshStandardMaterial 
          color="#c9d4e8" 
          roughness={0.1} 
          metalness={0.9}
        />
      </mesh>

      {/* Central spout column */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.3, 16]} />
        <meshStandardMaterial 
          color="#d4dff0" 
          roughness={0.2} 
          metalness={0.7}
        />
      </mesh>

      {/* Top decorative finial */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <coneGeometry args={[0.1, 0.15, 8]} />
        <meshStandardMaterial 
          color="#e0e8f5" 
          roughness={0.15} 
          metalness={0.8}
        />
      </mesh>

      {/* Water in base pool */}
      <mesh
        ref={waterRef}
        position={[0, 0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[0.85, 32]} />
        <meshStandardMaterial
          color="#4a90e2"
          transparent
          opacity={0.75}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Water in middle tier */}
      <mesh
        ref={waterRef2}
        position={[0, 0.4, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[0.6, 32]} />
        <meshStandardMaterial
          color="#5ba0f2"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Water in top tier */}
      <mesh
        ref={waterRef3}
        position={[0, 0.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial
          color="#6bb6ff"
          transparent
          opacity={0.65}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Main water spouts from top */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.18;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <WaterSpout 
            key={`spout-${i}`} 
            position={[x, 1.15, z]} 
            angle={angle}
            delay={i * 0.1}
          />
        );
      })}

      {/* Secondary spouts from middle tier */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <WaterSpout 
            key={`spout-mid-${i}`} 
            position={[x, 0.85, z]} 
            angle={angle}
            delay={i * 0.15}
            size={0.015}
            height={0.25}
          />
        );
      })}

      {/* Decorative spheres around base */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.55;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={`sphere-${i}`}
            position={[x, 0.12, z]}
            castShadow
          >
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial 
              color="#c9d4e8" 
              roughness={0.1} 
              metalness={0.8}
            />
          </mesh>
        );
      })}

      {/* Decorative columns around middle tier */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.7;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={`column-${i}`}
            position={[x, 0.5, z]}
            castShadow
          >
            <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
            <meshStandardMaterial 
              color="#a8b5d1" 
              roughness={0.2} 
              metalness={0.7}
            />
          </mesh>
        );
      })}

      {/* Decorative finials on columns */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.7;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={`finial-${i}`}
            position={[x, 0.65, z]}
            castShadow
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial 
              color="#d4dff0" 
              roughness={0.1} 
              metalness={0.9}
            />
          </mesh>
        );
      })}

      {/* Decorative relief patterns on base */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={`relief-${i}`}
            position={[x, 0.13, z]}
            rotation={[0, angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <meshStandardMaterial 
              color="#7a8aad" 
              roughness={0.3} 
              metalness={0.6}
            />
          </mesh>
        );
      })}

      {/* Water droplets/particles falling from spouts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <WaterDroplet 
          key={`droplet-${i}`}
          spoutIndex={i % 8}
          delay={i * 0.2}
        />
      ))}
    </group>
  );
}

function WaterSpout({ 
  position, 
  angle, 
  delay = 0,
  size = 0.02,
  height = 0.35
}: { 
  position: [number, number, number]; 
  angle: number;
  delay?: number;
  size?: number;
  height?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      meshRef.current.position.y = position[1] + Math.sin(time * 3 + angle * 10) * 0.08;
      meshRef.current.scale.y = 0.6 + Math.sin(time * 4 + delay) * 0.3;
      meshRef.current.rotation.z = Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <cylinderGeometry args={[size, size, height, 8]} />
      <meshStandardMaterial
        color="#6bb6ff"
        transparent
        opacity={0.85}
        roughness={0.05}
        metalness={0.95}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function WaterDroplet({ 
  spoutIndex, 
  delay 
}: { 
  spoutIndex: number; 
  delay: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const startY = useRef(1.15);
  const fallSpeed = useRef(0.02 + Math.random() * 0.01);
  const angle = (spoutIndex / 8) * Math.PI * 2;
  const radius = 0.18;
  const startX = Math.cos(angle) * radius;
  const startZ = Math.sin(angle) * radius;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      const y = startY.current - (time * fallSpeed.current) % 1.5;
      
      if (y < 0.1) {
        // Reset droplet
        meshRef.current.position.y = startY.current;
      } else {
        meshRef.current.position.y = y;
      }
      
      // Slight horizontal drift
      meshRef.current.position.x = startX + Math.sin(time * 2) * 0.05;
      meshRef.current.position.z = startZ + Math.cos(time * 2) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[startX, startY.current, startZ]} castShadow>
      <sphereGeometry args={[0.008, 6, 6]} />
      <meshStandardMaterial
        color="#6bb6ff"
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}
