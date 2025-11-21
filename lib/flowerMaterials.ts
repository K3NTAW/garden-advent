import * as THREE from "three";

/**
 * Creates a realistic petal material with gradient-like appearance
 */
export function createPetalMaterial(
  color: string,
  options: {
    roughness?: number;
    metalness?: number;
    emissive?: string;
    emissiveIntensity?: number;
  } = {}
): THREE.MeshStandardMaterial {
  const {
    roughness = 0.7,
    metalness = 0.1,
    emissive = color,
    emissiveIntensity = 0.1,
  } = options;

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness,
    metalness,
    emissive: new THREE.Color(emissive),
    emissiveIntensity,
    side: THREE.DoubleSide,
  });
}

/**
 * Creates a glossy petal material (for roses, peonies)
 */
export function createGlossyPetalMaterial(color: string): THREE.MeshStandardMaterial {
  return createPetalMaterial(color, {
    roughness: 0.4,
    metalness: 0.2,
    emissiveIntensity: 0.15,
  });
}

/**
 * Creates a matte petal material (for sunflowers, marigolds)
 */
export function createMattePetalMaterial(color: string): THREE.MeshStandardMaterial {
  return createPetalMaterial(color, {
    roughness: 0.9,
    metalness: 0.05,
    emissiveIntensity: 0.05,
  });
}

/**
 * Creates a translucent petal material (for spider lilies, delicate flowers)
 */
export function createTranslucentPetalMaterial(color: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.6,
    metalness: 0.15,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
  });
}

/**
 * Creates stem/leaf material
 */
export function createStemMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2d5016"),
    roughness: 0.9,
    metalness: 0.1,
  });
}

/**
 * Creates leaf material
 */
export function createLeafMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#4a7c2a"),
    roughness: 0.8,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
}

