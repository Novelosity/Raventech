'use client';

/**
 * Navigation — Sticky minimal nav with progress dots and magnetic logo
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useScrollStore, SCENE_RANGES } from '@/store/scrollStore';

const NAV_ITEMS = [
  { label: 'SEO', scene: 1 },
  { label: 'Social', scene: 2 },
  { label: 'Design', scene: 3 },
  { label: 'Branding', scene: 4 },
  { label: 'Web Dev', scene: 5 },
  { label: 'SaaS', scene: 6 },
  { label: 'Contact', scene: 7 },
];

export function Navigation() {
  const { scrollYProgress } = useScroll();
  const loaderDone = useScrollStore((s) => s.loaderDone);
  const progress = useScrollStore((s) => s.progress);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setScrolled(v > 0.02);
    });
    return unsub;
  }, [scrollYProgress]);

  const scrollToScene = (sceneIndex: number) => {
    const [start] = SCENE_RANGES[sceneIndex] ?? [0, 1];
    const total = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: start * total + 10, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {loaderDone && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'glass-dark shadow-glass' : ''
          }`}
        >
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-violet via-cyan to-violet"
            style={{ width: barWidth }}
          />

          <nav className="flex items-center justify-between px-6 md:px-10 py-4">
            {/* Logo */}
            <MagneticButton
              variant="ghost"
              className="p-0"
              onClick={() => scrollToScene(0)}
              cursorLabel="HOME"
            >
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                {/* Raven icon */}
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet to-cyan rounded-lg opacity-20" />
                  <svg viewBox="0 0 32 32" className="w-8 h-8 text-white relative z-10" fill="currentColor">
                    <path d="M16 2C9.4 2 4 7.4 4 14c0 4.4 2.2 8.3 5.6 10.6L8 30l4-2 2 2 2-2 2 2 2-2 4 2-1.6-5.4C25.8 22.3 28 18.4 28 14c0-6.6-5.4-12-12-12zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S6 19.5 6 14 10.5 4 16 4z" opacity="0.3"/>
                    <path d="M22 10c-1.5 0-2.8.8-3.5 2H13c-2.2 0-4 1.8-4 4s1.8 4 4 4h6l3 4 1-6c.6-.9 1-2 1-3.1C24 12.2 23.1 10 22 10z"/>
                  </svg>
                </div>
                <span className="font-display font-bold text-lg tracking-wider text-white">
                  RAVEN<span className="text-gradient-violet-cyan">TECH</span>
                </span>
              </motion.div>
            </MagneticButton>

            {/* Desktop nav dots + labels */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const [start, end] = SCENE_RANGES[item.scene] ?? [0, 1];
                const isActive = progress >= start && progress < end;
                return (
                  <button
                    key={item.scene}
                    onClick={() => scrollToScene(item.scene)}
                    className={`relative px-3 py-1.5 text-xs font-display font-medium tracking-wider uppercase transition-all duration-300 group ${
                      isActive ? 'text-cyan' : 'text-white/40 hover:text-white/80'
                    }`}
                    data-cursor-scale="1.5"
                  >
                    {/* Active underline */}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-px bg-cyan origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <MagneticButton
                variant="outline"
                className="text-xs py-2 px-5"
                onClick={() => scrollToScene(7)}
                cursorLabel="CONTACT"
              >
                Let&apos;s Talk
              </MagneticButton>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-0.5 bg-white origin-center"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-white"
                animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-white origin-center"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
              />
            </button>
          </nav>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden glass-dark border-t border-white/5 overflow-hidden"
              >
                <div className="flex flex-col py-4 px-6 gap-2">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.scene}
                      onClick={() => scrollToScene(item.scene)}
                      className="text-left py-3 px-4 text-white/70 hover:text-white font-display font-medium tracking-wider uppercase text-sm border-b border-white/5 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
