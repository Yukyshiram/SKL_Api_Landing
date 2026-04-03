"use client";

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const copyContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: 'easeOut' as const },
  },
};

const visualItem = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: 'easeOut' as const, delay: 0.1 },
  },
};

const floatingCard = {
  idle: {
    y: [0, -6, 0],
    transition: {
      duration: 7.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut' as const,
    },
  },
};

type NodeSpec = {
  label: string;
  tone: 'cyan' | 'blue' | 'slate';
  position: string;
  detail: string;
};

const nodes: NodeSpec[] = [
  { label: 'Modules', tone: 'cyan', position: 'left-8 top-16', detail: 'Domain-based' },
  { label: 'Telemetry', tone: 'blue', position: 'right-10 top-24', detail: 'Live signals' },
  { label: 'Contracts', tone: 'slate', position: 'left-12 bottom-20', detail: 'Stable schemas' },
  { label: 'Regions', tone: 'cyan', position: 'right-14 bottom-16', detail: 'Multi-region' },
];

export default function PlatformShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let isMounted = true;
    let cleanupMatchMedia: (() => void) | undefined;

    const setupMotion = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      if (!isMounted || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (ambientGlowRef.current) {
          gsap.to(ambientGlowRef.current, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        if (gridRef.current) {
          gsap.to(gridRef.current, {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          });
        }
      });

      cleanupMatchMedia = () => mm.revert();
    };

    setupMotion();

    return () => {
      isMounted = false;
      cleanupMatchMedia?.();
    };
  }, [prefersReducedMotion]);

  return (
    <motion.section
      ref={sectionRef}
      id="platform-showcase"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#05070c] py-20 sm:py-24 lg:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' as const } } }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-slate-900/22 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.64),transparent_56%)]" />
        <motion.div
          ref={ambientGlowRef}
          className="absolute -left-28 top-14 h-140 w-140 rounded-full bg-cyan-500/12 blur-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        <div ref={gridRef} className="absolute inset-0 opacity-55 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-size-[56px_56px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent via-[#05070c]/70 to-[#05070c]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <motion.div className="space-y-8" variants={copyContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.28 }}>
            <motion.div variants={copyItem} className="space-y-4">
              <SectionHeading
                eyebrow="Platform Showcase"
                title="A platform layer built for real product operations."
                description="SKL API connects modular services, operational signals, and stable contracts into one platform surface your team can scale with confidence."
                align="left"
              />
            </motion.div>

            <motion.div variants={copyItem} className="space-y-3 max-w-xl">
              {[
                'Domain-based modules with explicit ownership',
                'Request traceability across every production path',
                'Operational visibility without dashboard clutter',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-200/85 shadow-[0_0_0_4px_rgba(34,211,238,0.08)]" aria-hidden="true" />
                  <p className="text-sm leading-6 text-slate-300/92">{item}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={copyItem} className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Control', value: 'Operational' },
                { label: 'Visibility', value: 'Request-level' },
                { label: 'Scale', value: 'Production-ready' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.7),rgba(2,6,23,0.9))] p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={visualItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            className="relative"
          >
            <motion.div
              aria-hidden="true"
              className="absolute -inset-7 rounded-[2.25rem] bg-[radial-gradient(circle_at_35%_25%,rgba(34,211,238,0.16),transparent_36%),radial-gradient(circle_at_80%_16%,rgba(59,130,246,0.13),transparent_30%)] blur-2xl"
              animate={prefersReducedMotion ? undefined : { opacity: [0.55, 0.78, 0.55] }}
              transition={prefersReducedMotion ? undefined : { duration: 8.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const }}
            />

            <motion.div
              variants={visualItem}
              className="relative overflow-hidden rounded-4xl border border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(2,6,23,0.96))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_36px_100px_-34px_rgba(2,6,23,0.9)] sm:p-6"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-cyan-300/10 via-cyan-300/4 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_42%)]" />
                <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-white/5 blur-2xl" />
              </div>

              <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-slate-100">Operational Surface</p>
                  <p className="mt-1 text-xs text-slate-400">Modules · Signals · Contracts</p>
                </div>
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-100">
                  Live topology
                </span>
              </div>

              <div className="relative mt-5 min-h-112 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,27,0.82),rgba(4,8,16,0.96))] p-4 sm:p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_56%)]" />
                <div className="absolute inset-x-10 top-8 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-white/8 to-transparent" />

                <div className="relative h-full min-h-96">
                  <motion.div
                    animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
                    transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const }}
                    className="absolute left-1/2 top-1/2 w-[18rem] -translate-x-1/2 -translate-y-1/2 sm:w-[20rem]"
                  >
                    <div className="rounded-3xl border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(15,23,42,0.55))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_-30px_rgba(34,211,238,0.35)]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/80">Platform Core</p>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                          <span className="text-sm text-slate-200">Contract Gateway</span>
                          <span className="text-xs text-emerald-200">Stable</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                          <span className="text-sm text-slate-200">Telemetry Mesh</span>
                          <span className="text-xs text-cyan-100">Tracing</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                          <span className="text-sm text-slate-200">Module Registry</span>
                          <span className="text-xs text-slate-300">12 active</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {nodes.map((node) => {
                    const toneClasses =
                      node.tone === 'cyan'
                        ? 'border-cyan-300/22 bg-cyan-300/10 text-cyan-100 shadow-[0_14px_40px_-24px_rgba(34,211,238,0.36)]'
                        : node.tone === 'blue'
                          ? 'border-blue-300/20 bg-blue-300/10 text-sky-100 shadow-[0_14px_40px_-24px_rgba(59,130,246,0.34)]'
                          : 'border-white/10 bg-white/5 text-slate-100 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.55)]';

                    return (
                      <motion.div
                        key={node.label}
                        className={`absolute ${node.position} w-36 rounded-2xl border p-3 backdrop-blur-sm ${toneClasses}`}
                        animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
                        transition={prefersReducedMotion ? undefined : { duration: 7.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const }}
                      >
                        <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">{node.label}</p>
                        <p className="mt-2 text-sm font-semibold">{node.detail}</p>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    className="absolute left-8 top-24 w-36 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
                    animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
                    transition={prefersReducedMotion ? undefined : { duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const, delay: 0.2 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Latency</p>
                    <p className="mt-2 text-lg font-semibold text-slate-100">28ms</p>
                  </motion.div>

                  <motion.div
                    className="absolute right-8 bottom-24 w-40 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
                    animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
                    transition={prefersReducedMotion ? undefined : { duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const, delay: 0.35 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Uptime</p>
                    <p className="mt-2 text-lg font-semibold text-slate-100">99.99%</p>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-10 left-12 w-36 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
                    animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
                    transition={prefersReducedMotion ? undefined : { duration: 7.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const, delay: 0.45 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Throughput</p>
                    <p className="mt-2 text-lg font-semibold text-slate-100">8.4k/min</p>
                  </motion.div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  'Module coordination across services',
                  'Production telemetry without clutter',
                  'Clear system posture at a glance',
                ].map((caption) => (
                  <div key={caption} className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-300/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    {caption}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
