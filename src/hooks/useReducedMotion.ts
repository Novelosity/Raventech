/**
 * useReducedMotion.ts
 * Detects prefers-reduced-motion and touch/low-power devices
 */
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches
    );
  }, []);

  return isTouch;
}

export function useIsLowPower(): boolean {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    // Check connection speed
    const conn = (navigator as any).connection;
    if (conn && (conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g')) {
      setLowPower(true);
      return;
    }
    // Check device memory
    const mem = (navigator as any).deviceMemory;
    if (mem && mem <= 2) {
      setLowPower(true);
    }
  }, []);

  return lowPower;
}
