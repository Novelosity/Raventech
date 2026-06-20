'use client';

/**
 * Cursor — Custom magnetic cursor with spring tracking
 * Scales and labels over interactive elements
 * Disabled on touch devices
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouch } from '@/hooks/useReducedMotion';
import { useScrollStore } from '@/store/scrollStore';

interface CursorState {
  scale: number;
  label: string;
  color: 'default' | 'violet' | 'cyan' | 'gold';
  blend: boolean;
}

export function Cursor() {
  const isTouch = useIsTouch();
  const setMouse = useScrollStore((s) => s.setMouse);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 35, mass: 0.5 };
  const dotSpring = { stiffness: 800, damping: 40, mass: 0.3 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  const [state, setState] = useState<CursorState>({
    scale: 1,
    label: '',
    color: 'default',
    blend: false,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // Update store for 3D parallax
      setMouse(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    const handleElementEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest('[data-cursor-scale]') as HTMLElement | null;
      if (el) {
        const scale = parseFloat(el.dataset.cursorScale ?? '1');
        const label = el.dataset.cursorLabel ?? '';
        const color = (el.dataset.cursorColor ?? 'default') as CursorState['color'];
        setState({ scale, label, color, blend: !!el.dataset.cursorBlend });
      } else {
        setState({ scale: 1, label: '', color: 'default', blend: false });
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseover', handleElementEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseover', handleElementEnter);
    };
  }, [isTouch, mouseX, mouseY, setMouse, visible]);

  if (isTouch) return null;

  const ringColors = {
    default: 'border-white/60',
    violet: 'border-violet',
    cyan: 'border-cyan',
    gold: 'border-gold',
  };

  return (
    <>
      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`rounded-full border ${ringColors[state.color]} flex items-center justify-center`}
          animate={{
            width: state.scale > 1 ? 64 * state.scale : 40,
            height: state.scale > 1 ? 64 * state.scale : 40,
            borderWidth: state.scale > 1.5 ? 1 : 1.5,
            backgroundColor:
              state.scale > 1
                ? state.color === 'violet'
                  ? 'rgba(124,58,237,0.15)'
                  : state.color === 'cyan'
                  ? 'rgba(34,211,238,0.15)'
                  : 'rgba(255,255,255,0.05)'
                : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {state.label && (
            <motion.span
              className="text-[10px] font-display font-semibold tracking-widest uppercase text-white"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {state.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: state.scale > 1 ? 4 : 5,
            height: state.scale > 1 ? 4 : 5,
            opacity: state.scale > 1 ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </>
  );
}
