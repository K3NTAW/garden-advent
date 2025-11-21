"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import GardenScene from "./GardenScene";

export default function FlowerGarden() {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="bg-gradient-to-b from-sky-200 via-blue-100 to-green-50"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ffd700" />
          <pointLight position={[10, 5, -10]} intensity={0.5} color="#ff69b4" />
          
          <GardenScene />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={30}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.2}
          />
          
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 mb-2">🌸 Flower Garden</h1>
        <p className="text-sm text-gray-600">Click on any flower to see it bloom!</p>
        <p className="text-xs text-gray-500 mt-1">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}
