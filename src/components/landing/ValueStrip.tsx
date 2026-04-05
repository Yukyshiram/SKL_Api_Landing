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
    <section id="value-strip" className="relative isolate overflow-hidden bg-background">
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
            className="surface-card surface-card-hover px-4 py-5"
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground">Modular architecture</h3>
            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              Decoupled domains that let product and platform evolve without team friction.
            </p>
          </motion.article>

          <motion.article
            variants={cardReveal}
            className="surface-card surface-card-hover px-4 py-5"
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground">Developer-first</h3>
            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              Clear contracts, predictable DX, and faster onboarding for engineering teams.
            </p>
          </motion.article>

          <motion.article
            variants={cardReveal}
            className="surface-card surface-card-hover px-4 py-5"
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground">Consistent responses</h3>
            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              Uniform payload and error structures for reliable integrations.
            </p>
          </motion.article>

          <motion.article
            variants={cardReveal}
            className="surface-card surface-card-hover px-4 py-5"
          >
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground">Built to scale</h3>
            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              Designed for high volume, sustained growth, and stable operations.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
