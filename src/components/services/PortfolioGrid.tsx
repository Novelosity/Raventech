'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioProject } from '@/data/serviceData';
import { PortfolioCard } from './PortfolioCard';
import { CaseStudyModal } from './CaseStudyModal';

interface PortfolioGridProps {
  portfolio: PortfolioProject[];
  filters: string[];
  accent: 'violet' | 'cyan' | 'gold';
}

const accentPillActive = {
  violet: 'bg-violet text-white',
  cyan: 'bg-cyan text-void',
  gold: 'bg-gold text-void',
};

const BATCH_SIZE = 6;

export function PortfolioGrid({ portfolio, filters, accent }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for carousel vs grid
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [activeFilter]);

  const filtered =
    activeFilter === 'All'
      ? portfolio
      : portfolio.filter((p) => p.filter === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-10"
        >
          <p className="text-xs font-display tracking-[0.32em] uppercase text-violet/80 mb-3">
            Our Work
          </p>
          <h2 className="text-fluid-2xl font-headline font-bold text-white mb-3">Portfolio</h2>
          <p className="text-white/35 text-sm font-body max-w-xl leading-relaxed">
            All projects shown are sample/concept work for demonstration purposes. Results shown represent typical outcomes for real clients. All items are marked{' '}
            <span className="text-white/55">"Sample / Concept"</span> throughout.
          </p>
        </motion.div>

        {/* Filter chips */}
        <div
          className="flex gap-2 mb-8 md:mb-10 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative shrink-0 px-4 py-1.5 rounded-full text-xs font-display font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? accentPillActive[accent]
                    : 'glass border border-white/8 text-white/50 hover:text-white/80'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Portfolio — mobile carousel or desktop grid */}
        {isMobile ? (
          /* Mobile: horizontal snap carousel */
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
            style={{ scrollbarWidth: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <div
                  key={project.id}
                  className="snap-start shrink-0"
                  style={{ width: '85vw' }}
                >
                  <PortfolioCard
                    project={project}
                    accent={accent}
                    onClick={() => setSelectedProject(project)}
                    index={i}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Desktop: 3-col grid */
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((project, i) => (
                  <PortfolioCard
                    key={project.id}
                    project={project}
                    accent={accent}
                    onClick={() => setSelectedProject(project)}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-white/30 font-display"
              >
                No projects in this category yet.
              </motion.div>
            )}

            {/* Load more */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-10"
              >
                <button
                  onClick={() => setVisibleCount((c) => c + BATCH_SIZE)}
                  className="px-7 py-3 rounded-full glass border border-white/10 text-white/60 hover:text-white hover:border-white/25 font-display text-sm tracking-wider transition-all duration-300"
                >
                  Load More
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Case study modal */}
      <CaseStudyModal
        project={selectedProject}
        accent={accent}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
