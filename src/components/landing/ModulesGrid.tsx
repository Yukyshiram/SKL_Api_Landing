"use client";

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

type ModuleItem = {
  name: string;
  description: string;
  tag: string;
};

const modules: ModuleItem[] = [
  {
    name: 'Auth & Access',
    description: 'Scopes, rotatable API keys, and environment-level access policies.',
    tag: 'Security Layer',
  },
  {
    name: 'Events Stream',
    description: 'Reliable event ingestion with idempotency and traceability.',
    tag: 'Async Pipeline',
  },
  {
    name: 'Billing Core',
    description: 'Billing cycles, proration, and consistent transactional states.',
    tag: 'Finance Domain',
  },
  {
    name: 'Tenant Engine',
    description: 'Multi-tenant isolation with per-account limits and configuration.',
    tag: 'Multi-Tenant',
  },
  {
    name: 'Observability',
    description: 'Metrics, request IDs, and auditing for production operations.',
    tag: 'Ops Insight',
  },
  {
    name: 'Workflow Hooks',
    description: 'Versioned webhooks to connect internal and external processes.',
    tag: 'Integration Surface',
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

export default function ModulesGrid() {
  return (
    <section id="modules-grid" className="border-y border-white/10 bg-[#05070c] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="SKL API Ecosystem"
          title="Modules designed to run as a real platform"
          description="Each module exposes clear contracts and predictable behavior so your architecture can scale without hidden technical debt."
          align="left"
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {modules.map((module) => (
            <motion.article
              key={module.name}
              variants={cardReveal}
              className="group rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(148,163,184,0.06),rgba(15,23,42,0.22))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/30 hover:shadow-[0_16px_35px_-24px_rgba(34,211,238,0.5)]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold tracking-[-0.01em] text-slate-100">{module.name}</h3>
                <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/8 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-cyan-100/90">
                  {module.tag}
                </span>
              </div>

              <p className="text-sm leading-7 text-slate-300/85">{module.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
