"use client";

import { useMemo } from "react";
import Ground from "./Ground";
import Flower from "./flowers/Flower";
import { FlowerType } from "@/types/flowers";
import Fountain from "./Fountain";
import Pathway from "./Pathway";

// Flower bed configuration - like a real garden with grouped flowers
interface FlowerBed {
  center: [number, number, number];
  radius: number;
  type: FlowerType;
  color: string;
  count: number;
  scale?: number;
}

const FLOWER_BEDS: FlowerBed[] = [
  // Rose beds - spread across garden
  {
    center: [0, 0, -3],
    radius: 0.8,
    type: "rose",
    color: "#dc2626",
    count: 9,
    scale: 1.1,
  },
  {
    center: [3, 0, -4],
    radius: 0.7,
    type: "rose",
    color: "#ec4899",
    count: 7,
    scale: 1.0,
  },
  {
    center: [-3, 0, -4],
    radius: 0.7,
    type: "rose",
    color: "#ffffff",
    count: 7,
    scale: 1.0,
  },
  {
    center: [5, 0, -2],
    radius: 0.7,
    type: "rose",
    color: "#f87171",
    count: 7,
    scale: 1.0,
  },

  // Spider Lily beds - spread out
  {
    center: [4, 0, 0],
    radius: 1.0,
    type: "spiderLily",
    color: "#dc2626",
    count: 11,
    scale: 1.0,
  },
  {
    center: [5, 0, -5],
    radius: 0.8,
    type: "spiderLily",
    color: "#ffffff",
    count: 9,
    scale: 0.9,
  },
  {
    center: [-4, 0, 3],
    radius: 0.9,
    type: "spiderLily",
    color: "#fca5a5",
    count: 9,
    scale: 0.9,
  },

  // Lavender beds - spread across
  {
    center: [-4, 0, 0],
    radius: 1.1,
    type: "lavender",
    color: "#9333ea",
    count: 13,
    scale: 0.9,
  },
  {
    center: [-5, 0, -3],
    radius: 0.9,
    type: "lavender",
    color: "#a855f7",
    count: 10,
    scale: 0.8,
  },
  {
    center: [0, 0, 5],
    radius: 1.0,
    type: "lavender",
    color: "#c084fc",
    count: 11,
    scale: 0.9,
  },

  // Peony beds - distributed
  {
    center: [0, 0, 3],
    radius: 1.0,
    type: "peony",
    color: "#f9a8d4",
    count: 11,
    scale: 1.2,
  },
  {
    center: [3, 0, 4],
    radius: 0.8,
    type: "peony",
    color: "#ffffff",
    count: 8,
    scale: 1.1,
  },
  {
    center: [-3, 0, 5],
    radius: 0.8,
    type: "peony",
    color: "#fce7f3",
    count: 8,
    scale: 1.1,
  },

  // Sunflower beds - spread out
  {
    center: [4, 0, -5],
    radius: 1.1,
    type: "sunflower",
    color: "#eab308",
    count: 8,
    scale: 1.3,
  },
  {
    center: [-5, 0, -4],
    radius: 1.0,
    type: "sunflower",
    color: "#fbbf24",
    count: 7,
    scale: 1.2,
  },
  {
    center: [6, 0, 2],
    radius: 1.0,
    type: "sunflower",
    color: "#fcd34d",
    count: 7,
    scale: 1.2,
  },

  // Hydrangea beds - distributed
  {
    center: [-5, 0, 2],
    radius: 1.0,
    type: "hydrangea",
    color: "#3b82f6",
    count: 7,
    scale: 1.1,
  },
  {
    center: [-3, 0, 4],
    radius: 0.8,
    type: "hydrangea",
    color: "#ec4899",
    count: 6,
    scale: 1.0,
  },
  {
    center: [4, 0, 5],
    radius: 0.9,
    type: "hydrangea",
    color: "#a855f7",
    count: 7,
    scale: 1.0,
  },

  // Foxglove beds - spread out
  {
    center: [5, 0, 3],
    radius: 0.9,
    type: "foxglove",
    color: "#ec4899",
    count: 11,
    scale: 1.2,
  },
  {
    center: [6, 0, 0],
    radius: 0.8,
    type: "foxglove",
    color: "#f472b6",
    count: 9,
    scale: 1.1,
  },
  {
    center: [-2, 0, 6],
    radius: 0.8,
    type: "foxglove",
    color: "#f9a8d4",
    count: 9,
    scale: 1.1,
  },

  // Marigold beds - distributed
  {
    center: [-4, 0, 4],
    radius: 0.9,
    type: "marigold",
    color: "#f59e0b",
    count: 12,
    scale: 1.0,
  },
  {
    center: [2, 0, 6],
    radius: 0.8,
    type: "marigold",
    color: "#f97316",
    count: 10,
    scale: 1.0,
  },
  {
    center: [-6, 0, -2],
    radius: 0.8,
    type: "marigold",
    color: "#fb923c",
    count: 9,
    scale: 1.0,
  },

  // Rudbeckia beds - spread out
  {
    center: [-3, 0, 3],
    radius: 0.8,
    type: "rudbeckia",
    color: "#eab308",
    count: 11,
    scale: 1.0,
  },
  {
    center: [3, 0, 5],
    radius: 0.8,
    type: "rudbeckia",
    color: "#fbbf24",
    count: 9,
    scale: 1.0,
  },
  {
    center: [-6, 0, 0],
    radius: 0.8,
    type: "rudbeckia",
    color: "#fcd34d",
    count: 9,
    scale: 1.0,
  },

  // Liatris beds - along edges and pathways
  {
    center: [1, 0, -6],
    radius: 0.7,
    type: "liatris",
    color: "#9333ea",
    count: 8,
    scale: 1.0,
  },
  {
    center: [-1, 0, -6],
    radius: 0.7,
    type: "liatris",
    color: "#a855f7",
    count: 8,
    scale: 1.0,
  },
  {
    center: [6, 0, 1],
    radius: 0.7,
    type: "liatris",
    color: "#c084fc",
    count: 8,
    scale: 1.0,
  },
  {
    center: [-6, 0, 1],
    radius: 0.7,
    type: "liatris",
    color: "#9333ea",
    count: 8,
    scale: 1.0,
  },
  {
    center: [0, 0, 6],
    radius: 0.7,
    type: "liatris",
    color: "#a855f7",
    count: 8,
    scale: 1.0,
  },
  {
    center: [0, 0, -6],
    radius: 0.7,
    type: "liatris",
    color: "#c084fc",
    count: 8,
    scale: 1.0,
  },
];

// Check if a point is on a pathway
const isOnPathway = (x: number, z: number): boolean => {
  const pathwayWidth = 1.5;
  const diagonalWidth = 1.2;
  const halfMainWidth = pathwayWidth / 2;
  const halfDiagWidth = diagonalWidth / 2;

  // Main pathways (cardinal directions)
  // North-South pathway
  if (Math.abs(x) < halfMainWidth && z >= -8 && z <= 1) return true;
  // South-North pathway  
  if (Math.abs(x) < halfMainWidth && z >= -1 && z <= 8) return true;
  // East-West pathway
  if (Math.abs(z) < halfMainWidth && x >= -1 && x <= 8) return true;
  // West-East pathway
  if (Math.abs(z) < halfMainWidth && x >= -8 && x <= 1) return true;

  // Diagonal pathways
  // Function to check distance from line segment
  const distanceToLineSegment = (
    px: number, pz: number,
    x1: number, z1: number,
    x2: number, z2: number
  ): number => {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const lengthSq = dx * dx + dz * dz;
    if (lengthSq === 0) {
      return Math.sqrt((px - x1) ** 2 + (pz - z1) ** 2);
    }
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (pz - z1) * dz) / lengthSq));
    const projX = x1 + t * dx;
    const projZ = z1 + t * dz;
    return Math.sqrt((px - projX) ** 2 + (pz - projZ) ** 2);
  };

  // Diagonal 1: [0.7, 0, 0.7] to [8, 0, -8]
  if (distanceToLineSegment(x, z, 0.7, 0.7, 8, -8) < halfDiagWidth) return true;
  // Diagonal 2: [-0.7, 0, 0.7] to [-8, 0, -8]
  if (distanceToLineSegment(x, z, -0.7, 0.7, -8, -8) < halfDiagWidth) return true;
  // Diagonal 3: [0.7, 0, -0.7] to [8, 0, 8]
  if (distanceToLineSegment(x, z, 0.7, -0.7, 8, 8) < halfDiagWidth) return true;
  // Diagonal 4: [-0.7, 0, -0.7] to [-8, 0, 8]
  if (distanceToLineSegment(x, z, -0.7, -0.7, -8, 8) < halfDiagWidth) return true;

  return false;
};

// Generate flowers for each bed
const generateFlowerConfigs = (): Array<{
  type: FlowerType;
  position: [number, number, number];
  color: string;
  scale?: number;
}> => {
  const configs: Array<{
    type: FlowerType;
    position: [number, number, number];
    color: string;
    scale?: number;
  }> = [];

  FLOWER_BEDS.forEach((bed) => {
    let attempts = 0;
    let placed = 0;
    const maxAttempts = bed.count * 15; // Try more times to find valid scattered positions

    while (placed < bed.count && attempts < maxAttempts) {
      attempts++;
      // More scattered distribution - use linear random for even spread across entire bed area
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * bed.radius * 1.3; // Increase radius slightly and use linear distribution
      let x = bed.center[0] + Math.cos(angle) * distance;
      let z = bed.center[2] + Math.sin(angle) * distance;
      
      // Add extra random scatter
      x += (Math.random() - 0.5) * 0.4;
      z += (Math.random() - 0.5) * 0.4;
      
      // If on pathway, try to move it to the side
      if (isOnPathway(x, z)) {
        // Move perpendicular to the nearest pathway
        const offset = 1.0; // Move outside pathway width
        const perpAngle = angle + Math.PI / 2;
        x = bed.center[0] + Math.cos(angle) * distance + Math.cos(perpAngle) * offset;
        z = bed.center[2] + Math.sin(angle) * distance + Math.sin(perpAngle) * offset;
        
        // Add scatter after moving
        x += (Math.random() - 0.5) * 0.3;
        z += (Math.random() - 0.5) * 0.3;
        
        // If still on pathway after offset, skip this flower
        if (isOnPathway(x, z)) {
          continue;
        }
      }
      
      // More variation in scale
      const scale = (bed.scale || 1) * (0.8 + Math.random() * 0.4);

      configs.push({
        type: bed.type,
        position: [x, 0, z],
        color: bed.color,
        scale,
      });
      placed++;
    }
  });

  // Add some border flowers around the garden perimeter
  const borderFlowers: FlowerType[] = [
    "rose",
    "spiderLily",
    "lavender",
    "marigold",
    "rudbeckia",
  ];
  const borderColors: Record<FlowerType, string[]> = {
    rose: ["#dc2626", "#ec4899"],
    spiderLily: ["#dc2626", "#ffffff"],
    lavender: ["#9333ea", "#a855f7"],
    marigold: ["#f59e0b", "#f97316"],
    rudbeckia: ["#eab308", "#fbbf24"],
    foxglove: ["#ec4899"],
    liatris: ["#9333ea"],
    peony: ["#f9a8d4"],
    sunflower: ["#eab308"],
    hydrangea: ["#3b82f6"],
  };

  // Border flowers - evenly distributed around perimeter, avoiding pathways
  let borderPlaced = 0;
  let borderAttempts = 0;
  const maxBorderAttempts = 400; // Try many times to place evenly scattered border flowers

  while (borderPlaced < 50 && borderAttempts < maxBorderAttempts) {
    borderAttempts++;
    // More even distribution - prefer outer edges
    const angle = Math.random() * Math.PI * 2;
    const radius = 5.5 + Math.random() * 2.5; // Spread from middle to edge
    let x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.6; // Moderate scatter
    let z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.6; // Moderate scatter

    // If on pathway, try to move it to the side
    if (isOnPathway(x, z)) {
      const offset = 1.0; // Move outside pathway width
      const perpAngle = angle + Math.PI / 2;
      x = Math.cos(angle) * radius + Math.cos(perpAngle) * offset;
      z = Math.sin(angle) * radius + Math.sin(perpAngle) * offset;
      
      // Add more scatter after moving
      x += (Math.random() - 0.5) * 0.6;
      z += (Math.random() - 0.5) * 0.6;
      
      // If still on pathway, skip this flower
      if (isOnPathway(x, z)) {
        continue;
      }
    }

    const type = borderFlowers[Math.floor(Math.random() * borderFlowers.length)];
    const colors = borderColors[type];
    const color = colors[Math.floor(Math.random() * colors.length)];

    configs.push({
      type,
      position: [x, 0, z],
      color,
      scale: 0.6 + Math.random() * 0.5, // More scale variation
    });
    borderPlaced++;
  }

  return configs;
};

export default function GardenScene() {
  const flowerConfigs = useMemo(() => generateFlowerConfigs(), []);

  return (
    <>
      <Ground />
      
      {/* Fountain in the center */}
      <Fountain />
      
      {/* Main pathways leading from fountain to edge of world (16x16 = edges at ±8) */}
      <Pathway start={[0, 0, 1]} end={[0, 0, -8]} width={1.5} />
      <Pathway start={[1, 0, 0]} end={[8, 0, 0]} width={1.5} />
      <Pathway start={[-1, 0, 0]} end={[-8, 0, 0]} width={1.5} />
      <Pathway start={[0, 0, -1]} end={[0, 0, 8]} width={1.5} />
      
      {/* Diagonal pathways to corners */}
      <Pathway start={[0.7, 0, 0.7]} end={[8, 0, -8]} width={1.2} />
      <Pathway start={[-0.7, 0, 0.7]} end={[-8, 0, -8]} width={1.2} />
      <Pathway start={[0.7, 0, -0.7]} end={[8, 0, 8]} width={1.2} />
      <Pathway start={[-0.7, 0, -0.7]} end={[-8, 0, 8]} width={1.2} />
      
      {/* All flowers in beds */}
      {flowerConfigs.map((config, index) => (
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
