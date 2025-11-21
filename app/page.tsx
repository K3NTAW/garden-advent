"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";

const FlowerGarden = dynamic(() => import("@/components/FlowerGarden"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-screen relative">
      <Suspense fallback={<LoadingScreen />}>
        <FlowerGarden />
      </Suspense>
    </main>
  );
}

