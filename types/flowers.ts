export type FlowerType =
  | "rose"
  | "spiderLily"
  | "lavender"
  | "foxglove"
  | "marigold"
  | "liatris"
  | "rudbeckia"
  | "peony"
  | "sunflower"
  | "hydrangea";

export interface FlowerProps {
  type: FlowerType;
  position: [number, number, number];
  color: string;
  scale?: number;
}

