"use client";

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

type TrustPillar = {
  title: 'Security' | 'Performance' | 'Scalability';
  description: string;
  bullets: string[];
};

const pillars: TrustPillar[] = [
  {
    title: 'Security',
    description: 'Access control and data isolation built for production-grade multi-tenant environments.',
    bullets: [
      'Rotatable API keys with per-service scopes.',
      'Per-request audit trails with full traceability.',
      'Policy controls by tenant and environment.',
    ],
  },
  {
    title: 'Performance',
    description: 'Predictable response behavior under load for critical operations and high-volume flows.',
    bullets: [
      'Low-latency performance across core endpoints.',
      'Asynchronous processing for traffic spikes.',
      'Consistent contracts to reduce retries.',
    ],
  },
  {
    title: 'Scalability',
    description: 'Modular architecture designed to scale by domain without breaking existing integrations.',
    bullets: [
      'Selective scaling by module and region.',
      'Explicit versioning for evolutionary changes.',
      'Stable operations through sustained growth.',
    ],
  },
];

const cardContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function TrustCore() {
  return (
    <section id="trust-core" className="relative isolate overflow-hidden border-b border-white/10 bg-[#05070c] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-slate-900/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-black/30" />
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Trust Core"
          title="Security, performance, and scalability as your operating baseline"
          description="SKL API is built for teams that need real technical reliability, not marketing promises."
          align="left"
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.title}
              variants={cardReveal}
              className="rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(148,163,184,0.05),rgba(15,23,42,0.22))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/28 hover:shadow-[0_16px_35px_-24px_rgba(34,211,238,0.45)]"
            >
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-slate-100">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300/90">{pillar.description}</p>

              <ul className="mt-5 space-y-2.5">
                {pillar.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm leading-6 text-slate-300/85">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-200/80" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
