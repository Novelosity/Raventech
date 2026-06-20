/**
 * utils.ts — Shared utility functions
 */

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp value between min and max */
export const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

/** Map a value from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
};

/** Split text into characters for animation */
export const splitChars = (text: string) =>
  text.split('').map((char, i) => ({ char, i }));

/** Split text into words for animation */
export const splitWords = (text: string) =>
  text.split(' ').map((word, i) => ({ word, i }));

/** Stagger delay for animations */
export const staggerDelay = (index: number, base = 0.04) => index * base;

/** Hex to RGB array */
export const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0, 0, 0];
};

/** Noise-like hash for seeded random */
export const seededRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

/** Class name combiner */
export const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

/** Debounce */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};
