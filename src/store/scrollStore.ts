/**
 * scrollStore.ts
 * Global scroll progress store — single source of truth
 * synced between Lenis, Framer Motion, and R3F
 */
import { create } from 'zustand';

interface ScrollState {
  /** Normalized scroll progress [0, 1] */
  progress: number;
  /** Current scroll position in pixels */
  scrollY: number;
  /** Mouse position [x, y] normalized [-1, 1] */
  mouseX: number;
  mouseY: number;
  /** Whether the page is loaded */
  isLoaded: boolean;
  /** Whether the loader has finished */
  loaderDone: boolean;
  /** Active scene index [0-9] */
  activeScene: number;

  setProgress: (p: number) => void;
  setScrollY: (y: number) => void;
  setMouse: (x: number, y: number) => void;
  setLoaded: (v: boolean) => void;
  setLoaderDone: (v: boolean) => void;
  setActiveScene: (s: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  scrollY: 0,
  mouseX: 0,
  mouseY: 0,
  isLoaded: true,
  loaderDone: true,
  activeScene: 0,

  setProgress: (p) => set({ progress: p }),
  setScrollY: (y) => set({ scrollY: y }),
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
  setLoaded: (v) => set({ isLoaded: v }),
  setLoaderDone: (v) => set({ loaderDone: v }),
  setActiveScene: (s) => set({ activeScene: s }),
}));

/**
 * Scene breakpoints as [start, end] normalized [0, 1].
 * Hero is 500vh. Services are ~min-h-screen each.
 * Approximate total ≈ 500 + 720 + 160 + 120 + 60 = ~1560vh
 * Hero fraction ≈ 500/1560 ≈ 0.32
 * Each service section ≈ 120vh → 120/1560 ≈ 0.077
 */
export const SCENE_RANGES: [number, number][] = [
  [0.00, 0.32],  // 0: Hero         (500vh)
  [0.32, 0.40],  // 1: SEO
  [0.40, 0.48],  // 2: SMM
  [0.48, 0.56],  // 3: Graphic Design
  [0.56, 0.64],  // 4: Logo & Branding
  [0.64, 0.72],  // 5: Web Design & Dev
  [0.72, 0.80],  // 6: SaaS
  [0.80, 0.91],  // 7: Pricing
  [0.91, 1.00],  // 8: CTA
];

/** Get local scene progress [0, 1] from global progress */
export function getSceneProgress(global: number, sceneIndex: number): number {
  const [start, end] = SCENE_RANGES[sceneIndex] ?? [0, 1];
  return Math.max(0, Math.min(1, (global - start) / (end - start)));
}
