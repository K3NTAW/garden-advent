"use client";

import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { FlowerProps } from "@/types/flowers";
import { gsap } from "gsap";
import Rose from "./Rose";
import SpiderLily from "./SpiderLily";
import Lavender from "./Lavender";
import Foxglove from "./Foxglove";
import Marigold from "./Marigold";
import Liatris from "./Liatris";
import Rudbeckia from "./Rudbeckia";
import Peony from "./Peony";
import Sunflower from "./Sunflower";
import Hydrangea from "./Hydrangea";
import ParticleEffect from "../ParticleEffect";

const FLOWER_COMPONENTS = {
  rose: Rose,
  spiderLily: SpiderLily,
  lavender: Lavender,
  foxglove: Foxglove,
  marigold: Marigold,
  liatris: Liatris,
  rudbeckia: Rudbeckia,
  peony: Peony,
  sunflower: Sunflower,
  hydrangea: Hydrangea,
};

export default function Flower({ type, position, color, scale = 1 }: FlowerProps) {
  const groupRef = useRef<Group>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const hoverScale = useRef(1);

  const FlowerComponent = FLOWER_COMPONENTS[type];

  // Gentle swaying animation
  useFrame((state) => {
    if (groupRef.current && !isAnimating) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.z = Math.sin(time * 0.5 + position[0]) * 0.05;
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8 + position[2]) * 0.1;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isAnimating) return;

    setIsAnimating(true);
    setShowParticles(true);

    if (groupRef.current) {
      // Bloom animation
      gsap.to(groupRef.current.scale, {
        x: scale * 1.3,
        y: scale * 1.3,
        z: scale * 1.3,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      // Rotation animation
      gsap.to(groupRef.current.rotation, {
        y: groupRef.current.rotation.y + Math.PI * 2,
        duration: 1,
        ease: "power2.out",
      });

      // Return to normal
      gsap.to(groupRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.8,
        delay: 0.5,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    }

    // Hide particles after animation
    setTimeout(() => setShowParticles(false), 2000);
  };

  const handlePointerEnter = () => {
    if (!isAnimating && groupRef.current) {
      gsap.to(hoverScale, {
        current: 1.1,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: () => {
          if (groupRef.current) {
            groupRef.current.scale.setScalar(scale * hoverScale.current);
          }
        },
      });
    }
  };

  const handlePointerLeave = () => {
    if (!isAnimating && groupRef.current) {
      gsap.to(hoverScale, {
        current: 1,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: () => {
          if (groupRef.current) {
            groupRef.current.scale.setScalar(scale * hoverScale.current);
          }
        },
      });
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <FlowerComponent color={color} />
      {showParticles && (
        <ParticleEffect
          position={[0, 0, 0]}
          color={color}
          count={30}
        />
      )}
    </group>
  );
}

