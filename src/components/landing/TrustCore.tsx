"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

type TrustPillar = {
  title: "Security" | "Performance" | "Scalability";
  description: string;
  bullets: string[];
};

type TrustCoreProps = {
  overlap?: boolean;
  fullscreen?: boolean;
};

const pillars: TrustPillar[] = [
  {
    title: "Security",
    description:
      "Access control and data isolation built for production-grade multi-tenant environments.",
    bullets: [
      "Rotatable API keys with per-service scopes.",
      "Per-request audit trails with full traceability.",
      "Policy controls by tenant and environment.",
    ],
  },
  {
    title: "Performance",
    description:
      "Predictable response behavior under load for critical operations and high-volume flows.",
    bullets: [
      "Low-latency performance across core endpoints.",
      "Asynchronous processing for traffic spikes.",
      "Consistent contracts to reduce retries.",
    ],
  },
  {
    title: "Scalability",
    description:
      "Modular architecture designed to scale by domain without breaking existing integrations.",
    bullets: [
      "Selective scaling by module and region.",
      "Explicit versioning for evolutionary changes.",
      "Stable operations through sustained growth.",
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

export default function TrustCore({
  overlap = false,
  fullscreen = false,
}: TrustCoreProps) {
  return (
    <section
      id="trust-core"
      className={[
        "relative isolate overflow-hidden bg-background",
        overlap ? "-mt-8 rounded-t-3xl sm:mt-0 sm:rounded-none" : "",
        fullscreen
          ? overlap
            ? "h-screen pt-12 pb-16 sm:pb-20 lg:flex lg:items-center lg:pt-16 lg:pb-20"
            : "h-screen py-12 sm:py-16 lg:flex lg:items-center lg:py-20"
          : overlap
            ? "pt-12 pb-20 sm:pb-24 lg:pt-16 lg:pb-28"
            : "py-20 sm:py-24",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Trust Core"
          title="Security, performance, and scalability as your operating baseline"
          description="Next SKL Api is built for teams that need real technical reliability, not marketing promises."
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
              className="surface-card surface-card-hover p-5"
            >
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                {pillar.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {pillar.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-sm leading-6 text-foreground-secondary"
                  >
                    <span
                      className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary"
                      aria-hidden="true"
                    />
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