# 🌸 Gorgeous Flower Field Website - Design Prompt

## Vision
Create a visually stunning, interactive flower field website that transports users into a beautiful virtual garden. The website should feature a harmonious collection of flowers and plants that create an enchanting, immersive experience.

## Core Requirements

### Visual Design
- **Stunning Aesthetics**: The website should be visually captivating with high-quality graphics, smooth animations, and a cohesive color palette
- **Garden Composition**: Feature a variety of flowers including:
  - **Roses** (various colors: red, pink, white, yellow)
  - **Spider Lilies** (red, white varieties)
  - **Complementary Plants**:
    - Lavender (purple blooms)
    - Foxgloves (tall spikes)
    - Marigolds (bright yellow/orange)
    - Liatris (Blazing Star - purple spikes)
    - Rudbeckia (Black-eyed Susan - yellow with dark centers)
    - Peonies (soft pink/white)
    - Sunflowers (bright yellow)
    - Hydrangeas (blue/pink clusters)

### Interactive Features
- **Click Animations**: Each flower should have unique, delightful animations when clicked:
  - Petals blooming/opening
  - Gentle swaying motion
  - Particle effects (pollen, sparkles, petals floating)
  - Color transitions
  - Scale/rotation effects
  - Sound effects (optional, subtle)
- **Hover Effects**: Subtle animations on hover to indicate interactivity
- **Camera Movement**: Smooth camera controls to explore the garden from different angles

### Technical Stack

#### 3D Rendering & Graphics
- **React Three Fiber** (`@react-three/fiber`): React renderer for Three.js
- **Drei** (`@react-three/drei`): Useful helpers for React Three Fiber (controls, effects, etc.)
- **Three.js**: Core 3D graphics library
- **GLTF/GLB Models**: Use 3D flower models or procedurally generate flowers

#### Animation Libraries
- **Framer Motion**: Smooth React animations for UI elements and transitions
- **GSAP (GreenSock)**: Complex, high-performance animations for flower interactions
- **React Spring**: Physics-based animations for natural movement

#### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible component library
- **CSS Variables**: For theming and dynamic colors

#### Additional Enhancements
- **Particle Systems**: For pollen, petals, sparkles
- **Post-processing Effects**: Bloom, depth of field, color grading
- **Responsive Design**: Mobile-first approach with touch controls
- **Performance Optimization**: Lazy loading, level-of-detail (LOD) for flowers

### User Experience
- **Loading States**: Beautiful loading animation while assets load
- **Smooth Performance**: 60fps animations, optimized rendering
- **Accessibility**: Keyboard navigation, screen reader support
- **Mobile Support**: Touch-friendly interactions, responsive layout
- **Dark/Light Mode**: Optional theme switching

### Design Principles
- **Natural Beauty**: Colors and compositions should feel organic and harmonious
- **Delightful Interactions**: Every click should feel rewarding and magical
- **Performance First**: Beautiful but performant, even on mid-range devices
- **Progressive Enhancement**: Core experience works everywhere, enhanced features for capable devices

## Implementation Approach

1. **Foundation Setup**
   - Next.js project with TypeScript
   - Configure Tailwind CSS and shadcn/ui
   - Set up React Three Fiber environment

2. **3D Scene Setup**
   - Create base garden scene with ground plane
   - Implement lighting (directional, ambient, point lights)
   - Add skybox/background (gradient or sky texture)
   - Set up camera controls (OrbitControls)

3. **Flower Components**
   - Create reusable flower components
   - Implement procedural flower generation or use 3D models
   - Add variety in colors, sizes, and positions
   - Implement click detection and animation triggers

4. **Animation System**
   - Create animation presets for different flower types
   - Implement particle effects for interactions
   - Add smooth transitions and easing

5. **Polish & Optimization**
   - Add post-processing effects
   - Optimize rendering performance
   - Test across devices and browsers
   - Add loading states and error handling

## Success Criteria
- ✅ Visually stunning and immersive experience
- ✅ Smooth 60fps animations
- ✅ Unique, delightful click animations for each flower
- ✅ Beautiful variety of flowers creating a harmonious garden
- ✅ Responsive and accessible
- ✅ Fast loading and optimized performance

