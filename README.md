# 🌸 Gorgeous Flower Field Website

A visually stunning, interactive 3D flower garden website built with Next.js, React Three Fiber, and Three.js. Experience a beautiful virtual garden with various flowers that bloom and animate when clicked.

## Features

- **10 Different Flower Types**: Roses, Spider Lilies, Lavender, Foxgloves, Marigolds, Liatris, Rudbeckia, Peonies, Sunflowers, and Hydrangeas
- **Interactive Animations**: Click any flower to see it bloom with unique animations
- **Particle Effects**: Beautiful particle systems for pollen, petals, and sparkles
- **3D Scene**: Immersive 3D garden with smooth camera controls
- **Post-Processing**: Bloom and depth of field effects for enhanced visuals
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Performance**: Optimized for 60fps animations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Three.js** - 3D graphics library
- **GSAP** - High-performance animations
- **Framer Motion** - React animations
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd flower-site
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Click** on any flower to see it bloom with animations
- **Hover** over flowers to see subtle scale effects
- **Drag** to rotate the camera around the garden
- **Scroll** to zoom in and out
- **Pan** to move the camera

## Project Structure

```
flower-site/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── flowers/            # Individual flower components
│   ├── FlowerGarden.tsx    # Main garden component
│   ├── GardenScene.tsx     # 3D scene setup
│   ├── Ground.tsx          # Ground plane
│   ├── LoadingScreen.tsx   # Loading state
│   └── ParticleEffect.tsx  # Particle system
├── lib/                    # Utility functions
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript types
│   └── flowers.ts          # Flower type definitions
└── public/                 # Static assets
```

## Customization

### Adding New Flowers

1. Create a new component in `components/flowers/`
2. Add the flower type to `types/flowers.ts`
3. Import and add it to the `FLOWER_COMPONENTS` mapping in `components/flowers/Flower.tsx`
4. Add flower configurations to `components/GardenScene.tsx`

### Adjusting Colors

Flower colors are passed as props. You can modify the color values in `GardenScene.tsx`:

```typescript
{ type: "rose", position: [-3, 0, -2], color: "#dc2626", scale: 1.2 }
```

### Performance Optimization

- The scene uses LOD (Level of Detail) principles
- Particle effects are limited and optimized
- Post-processing effects can be disabled on lower-end devices
- Consider reducing flower count for mobile devices

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with love for beautiful, interactive web experiences
- Inspired by nature's beauty and the joy of gardens

# garden-advent
