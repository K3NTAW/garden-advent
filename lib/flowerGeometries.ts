import * as THREE from "three";

/**
 * Creates a realistic petal shape using a custom curve
 */
export function createPetalGeometry(
  width: number = 0.1,
  length: number = 0.15,
  curvature: number = 0.3
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  
  // Create petal shape with curves
  const halfWidth = width / 2;
  const tipCurve = curvature;
  
  // Start at base (center)
  shape.moveTo(0, 0);
  
  // Left curve
  shape.quadraticCurveTo(-halfWidth * 0.5, length * 0.3, -halfWidth, length * 0.6);
  shape.quadraticCurveTo(-halfWidth * 0.7, length * 0.8, -halfWidth * 0.3, length);
  
  // Tip
  shape.quadraticCurveTo(0, length + tipCurve, halfWidth * 0.3, length);
  
  // Right curve
  shape.quadraticCurveTo(halfWidth * 0.7, length * 0.8, halfWidth, length * 0.6);
  shape.quadraticCurveTo(halfWidth * 0.5, length * 0.3, 0, 0);
  
  // Extrude to give thickness
  const extrudeSettings = {
    depth: 0.01,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.002,
    bevelSegments: 3,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

/**
 * Creates a rounded petal (for roses, peonies)
 */
export function createRoundedPetalGeometry(
  width: number = 0.12,
  length: number = 0.18
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  
  const halfWidth = width / 2;
  
  // Create heart/rounded petal shape
  shape.moveTo(0, 0);
  
  // Left side with smooth curve
  shape.bezierCurveTo(
    -halfWidth * 0.3, length * 0.2,
    -halfWidth * 0.8, length * 0.5,
    -halfWidth * 0.5, length * 0.85
  );
  shape.bezierCurveTo(
    -halfWidth * 0.2, length * 0.95,
    0, length,
    halfWidth * 0.2, length * 0.95
  );
  
  // Right side
  shape.bezierCurveTo(
    halfWidth * 0.5, length * 0.85,
    halfWidth * 0.8, length * 0.5,
    halfWidth * 0.3, length * 0.2
  );
  
  shape.lineTo(0, 0);
  
  const extrudeSettings = {
    depth: 0.015,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.003,
    bevelSegments: 4,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

/**
 * Creates a long, narrow petal (for spider lilies, lilies)
 */
export function createLongPetalGeometry(
  width: number = 0.04,
  length: number = 0.4,
  curve: number = 0.1
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  
  const halfWidth = width / 2;
  
  // Long, narrow petal with slight curve
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(-halfWidth * 0.3, length * 0.3, -halfWidth, length * 0.6);
  shape.quadraticCurveTo(-halfWidth * 0.5, length * 0.9, 0, length);
  shape.quadraticCurveTo(halfWidth * 0.5, length * 0.9, halfWidth, length * 0.6);
  shape.quadraticCurveTo(halfWidth * 0.3, length * 0.3, 0, 0);
  
  const extrudeSettings = {
    depth: 0.008,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.001,
    bevelSegments: 2,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

/**
 * Creates a small rounded flower (for lavender, hydrangea clusters)
 */
export function createSmallFlowerGeometry(
  size: number = 0.03
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  
  const petalCount = 5;
  const radius = size;
  
  for (let i = 0; i <= petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  
  const extrudeSettings = {
    depth: 0.005,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.001,
    bevelSegments: 2,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

/**
 * Creates a bell-shaped flower (for foxgloves)
 */
export function createBellGeometry(
  width: number = 0.06,
  length: number = 0.1
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  
  const halfWidth = width / 2;
  
  // Bell shape
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(-halfWidth * 0.3, length * 0.2, -halfWidth, length * 0.5);
  shape.quadraticCurveTo(-halfWidth * 0.5, length * 0.8, 0, length);
  shape.quadraticCurveTo(halfWidth * 0.5, length * 0.8, halfWidth, length * 0.5);
  shape.quadraticCurveTo(halfWidth * 0.3, length * 0.2, 0, 0);
  
  const extrudeSettings = {
    depth: 0.01,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.002,
    bevelSegments: 3,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

/**
 * Creates enhanced leaf geometry
 */
export function createLeafGeometry(
  width: number = 0.15,
  length: number = 0.3
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  
  const halfWidth = width / 2;
  
  // Leaf shape with pointed tip
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(-halfWidth * 0.3, length * 0.3, -halfWidth * 0.6, length * 0.6);
  shape.quadraticCurveTo(-halfWidth * 0.4, length * 0.85, 0, length);
  shape.quadraticCurveTo(halfWidth * 0.4, length * 0.85, halfWidth * 0.6, length * 0.6);
  shape.quadraticCurveTo(halfWidth * 0.3, length * 0.3, 0, 0);
  
  const extrudeSettings = {
    depth: 0.005,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.002,
    bevelSegments: 3,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

