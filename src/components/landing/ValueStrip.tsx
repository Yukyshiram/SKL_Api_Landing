"use client";

import { motion } from 'framer-motion';

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
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

export default function ValueStrip() {
  return (
    <section id="value-strip" className="relative isolate overflow-hidden border-b border-white/10 bg-[#05070c]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-900/16 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-black/24" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-16">
        <motion.div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.article
            variants={cardReveal}
            className="rounded-xl border border-white/12 bg-white/3 px-4 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/25 hover:shadow-[0_12px_30px_-20px_rgba(34,211,238,0.45)]"
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-slate-100">Modular architecture</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300/85">
              Decoupled domains that let product and platform evolve without team friction.
            </p>
          </motion.article>

          <motion.article
            variants={cardReveal}
            className="rounded-xl border border-white/12 bg-white/3 px-4 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/25 hover:shadow-[0_12px_30px_-20px_rgba(34,211,238,0.45)]"
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-slate-100">Developer-first</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300/85">
              Clear contracts, predictable DX, and faster onboarding for engineering teams.
            </p>
          </motion.article>

          <motion.article
            variants={cardReveal}
            className="rounded-xl border border-white/12 bg-white/3 px-4 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/25 hover:shadow-[0_12px_30px_-20px_rgba(34,211,238,0.45)]"
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-slate-100">Consistent responses</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300/85">
              Uniform payload and error structures for reliable integrations.
            </p>
          </motion.article>

          <motion.article
            variants={cardReveal}
            className="rounded-xl border border-white/12 bg-white/3 px-4 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/25 hover:shadow-[0_12px_30px_-20px_rgba(34,211,238,0.45)]"
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-slate-100">Built to scale</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300/85">
              Designed for high volume, sustained growth, and stable operations.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
