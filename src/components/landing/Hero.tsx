"use client";

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: 'easeOut' as const },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: 'easeOut' as const, delay: 0.12 },
  },
};

const floatingVariants = {
  idle: {
    y: [0, -8, 0],
    rotate: [0, 0.25, 0],
    transition: {
      duration: 8.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut' as const,
    },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowLeftRef = useRef<HTMLDivElement | null>(null);
  const glowRightRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const panelWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let isMounted = true;
    let cleanupMatchMedia: (() => void) | undefined;

    const setupBackgroundMotion = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      if (!isMounted || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (glowLeftRef.current) {
          gsap.to(glowLeftRef.current, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.25,
            },
          });
        }

        if (glowRightRef.current) {
          gsap.to(glowRightRef.current, {
            yPercent: -7,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.35,
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
              scrub: 1.15,
            },
          });
        }

        if (panelWrapRef.current) {
          gsap.to(panelWrapRef.current, {
            yPercent: -3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      });

      cleanupMatchMedia = () => mm.revert();
    };

    setupBackgroundMotion();

    return () => {
      isMounted = false;
      cleanupMatchMedia?.();
    };
  }, [prefersReducedMotion]);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#05070c]"
      aria-label="SKL API Hero"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-slate-900/24 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(59,130,246,0.13),transparent_28%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.62),transparent_55%)]" />
        <motion.div
          ref={glowLeftRef}
          className="absolute -left-28 top-10 h-136 w-136 rounded-full bg-cyan-500/12 blur-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.95, ease: 'easeOut' }}
        />
        <motion.div
          ref={glowRightRef}
          className="absolute -right-28 top-28 h-144 w-xl rounded-full bg-blue-600/12 blur-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.05, ease: 'easeOut', delay: 0.05 }}
        />
        <motion.div
          ref={gridRef}
          className="absolute inset-0 opacity-55 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-size-[54px_54px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent via-[#05070c]/68 to-[#05070c]" />
        <div className="absolute inset-x-0 -bottom-px h-20 bg-linear-to-b from-transparent to-black/45" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-16 sm:px-10 sm:py-20 lg:min-h-screen lg:px-16 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
          <motion.div
            className="relative space-y-8 lg:pr-4"
            variants={copyContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.div variants={copyItem} className="space-y-4">
              <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                Infrastructure for modern integrations
              </span>

              <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-slate-50 sm:text-5xl lg:text-[4.35rem] lg:leading-[0.93]">
                Build on infrastructure your product can trust.
              </h1>

              <p className="max-w-2xl text-pretty text-base leading-8 text-slate-300/90 sm:text-lg lg:text-[1.08rem] lg:leading-9">
                Secure modules, stable contracts, and production-ready workflows for teams building serious digital products.
              </p>
            </motion.div>

            <motion.div variants={copyItem} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#final-cta"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-cyan-300/30 bg-linear-to-b from-cyan-300/18 to-cyan-300/10 px-6 text-sm font-semibold text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_36px_-16px_rgba(6,182,212,0.72)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/45 hover:from-cyan-300/24 hover:to-cyan-300/14 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_18px_44px_-18px_rgba(6,182,212,0.72)]"
              >
                Get Access
              </a>
              <a
                href="#integration-flow"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/9 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_28px_-20px_rgba(255,255,255,0.22)]"
              >
                Explore Docs
              </a>
            </motion.div>

            <motion.div variants={copyItem} className="grid gap-2.5 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4">
              {['Stable contracts', 'Scoped authentication', 'Production-ready', 'Operational visibility'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-2 text-sm text-slate-300/90 backdrop-blur-sm transition duration-300 hover:border-white/15 hover:bg-white/6"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-200/85 shadow-[0_0_0_4px_rgba(34,211,238,0.08)]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            ref={panelWrapRef}
            className="relative lg:pl-2"
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute -inset-6 rounded-4xl bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_32%)] blur-2xl"
              animate={prefersReducedMotion ? undefined : { opacity: [0.5, 0.72, 0.5] }}
              transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const }}
            />

            <motion.div
              variants={panelVariants}
              className="relative overflow-hidden rounded-4xl border border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(2,6,23,0.96))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_32px_90px_-28px_rgba(2,6,23,0.92)] sm:p-5"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-cyan-300/10 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.09),transparent_42%)]" />
                <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
              </div>

              <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-slate-100">Production Gateway</p>
                  <p className="mt-1 text-xs text-slate-400">us-east-1 · HTTPS · p95 28ms</p>
                </div>
                <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-200">
                  Healthy
                </span>
              </div>

              <div className="relative mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/80">Request</p>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300">POST /v1/events</span>
                  </div>
                  <pre className="overflow-x-auto text-[13px] leading-6 text-slate-200">
                    <code>{`Authorization: Bearer sk_live_xxx
Content-Type: application/json

{
  "source": "checkout",
  "event": "payment_succeeded",
  "tenantId": "acme-prod",
  "timestamp": "2026-04-03T18:24:00Z"
}`}</code>
                  </pre>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/80">Response</p>
                      <span className="text-xs text-slate-400">Accepted</span>
                    </div>
                    <pre className="mt-3 overflow-x-auto text-[13px] leading-6 text-slate-200">
                      <code>{`HTTP/1.1 202
x-request-id: req_7fb88a42
x-latency-ms: 28

{
  "status": "accepted",
  "queued": true,
  "region": "us-east-1"
}`}</code>
                    </pre>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      variants={floatingVariants}
                      animate={prefersReducedMotion ? undefined : 'idle'}
                      className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Modules</p>
                      <p className="mt-2 text-lg font-semibold text-slate-50">12 live</p>
                    </motion.div>
                    <motion.div
                      variants={floatingVariants}
                      animate={prefersReducedMotion ? undefined : 'idle'}
                      transition={{ delay: 0.4 }}
                      className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Visibility</p>
                      <p className="mt-2 text-lg font-semibold text-slate-50">Full trace</p>
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.div
                className="relative mt-4 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,27,0.82),rgba(4,8,16,0.94))] p-4"
                animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' as const }}
              >
                <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                  <span>System health</span>
                  <span>Live telemetry</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Latency', value: '28ms' },
                    { label: 'Errors', value: '0.02%' },
                    { label: 'Throughput', value: '8.4k/min' },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-white/10 bg-white/4 px-3 py-3">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{metric.label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-100">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}