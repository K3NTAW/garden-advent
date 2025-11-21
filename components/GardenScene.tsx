"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Ground from "./Ground";
import Flower from "./flowers/Flower";
import { FlowerType } from "@/types/flowers";

// Flower configuration with positions and types
const FLOWER_CONFIGS: Array<{
  type: FlowerType;
  position: [number, number, number];
  color: string;
  scale?: number;
}> = [
  // Roses
  { type: "rose", position: [-3, 0, -2], color: "#dc2626", scale: 1.2 },
  { type: "rose", position: [3, 0, -2], color: "#ec4899", scale: 1.1 },
  { type: "rose", position: [-1, 0, 1], color: "#ffffff", scale: 1.0 },
  { type: "rose", position: [1, 0, 1], color: "#fbbf24", scale: 1.0 },
  
  // Spider Lilies
  { type: "spiderLily", position: [-4, 0, 0], color: "#dc2626", scale: 1.0 },
  { type: "spiderLily", position: [4, 0, 0], color: "#ffffff", scale: 1.0 },
  { type: "spiderLily", position: [-2, 0, 3], color: "#dc2626", scale: 0.9 },
  
  // Lavender
  { type: "lavender", position: [-5, 0, -3], color: "#9333ea", scale: 1.0 },
  { type: "lavender", position: [5, 0, -3], color: "#9333ea", scale: 1.0 },
  { type: "lavender", position: [-3, 0, 4], color: "#a855f7", scale: 0.9 },
  
  // Foxgloves
  { type: "foxglove", position: [2, 0, -4], color: "#ec4899", scale: 1.2 },
  { type: "foxglove", position: [-2, 0, -4], color: "#f472b6", scale: 1.1 },
  
  // Marigolds
  { type: "marigold", position: [0, 0, -3], color: "#f59e0b", scale: 1.0 },
  { type: "marigold", position: [3, 0, 2], color: "#f97316", scale: 0.9 },
  
  // Liatris
  { type: "liatris", position: [5, 0, 2], color: "#9333ea", scale: 1.1 },
  { type: "liatris", position: [-5, 0, 2], color: "#a855f7", scale: 1.0 },
  
  // Rudbeckia
  { type: "rudbeckia", position: [0, 0, 4], color: "#eab308", scale: 1.0 },
  { type: "rudbeckia", position: [-1, 0, -1], color: "#fbbf24", scale: 0.9 },
  
  // Peonies
  { type: "peony", position: [2, 0, 0], color: "#f9a8d4", scale: 1.2 },
  { type: "peony", position: [-2, 0, -2], color: "#ffffff", scale: 1.1 },
  
  // Sunflowers
  { type: "sunflower", position: [4, 0, 3], color: "#eab308", scale: 1.3 },
  { type: "sunflower", position: [-4, 0, -1], color: "#fbbf24", scale: 1.2 },
  
  // Hydrangeas
  { type: "hydrangea", position: [1, 0, -2], color: "#3b82f6", scale: 1.1 },
  { type: "hydrangea", position: [-1, 0, 2], color: "#ec4899", scale: 1.0 },
];

export default function GardenScene() {
  return (
    <>
      <Ground />
      {FLOWER_CONFIGS.map((config, index) => (
        <Flower
          key={index}
          type={config.type}
          position={config.position}
          color={config.color}
          scale={config.scale || 1}
        />
      ))}
    </>
  );
}

