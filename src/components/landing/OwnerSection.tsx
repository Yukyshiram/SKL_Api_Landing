"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import {
  BRAND_NAME,
  OWNER_HANDLE,
  OWNER_LINKS,
  OWNER_NAME,
  SITE_NAME,
} from "../../lib/site";

// Hook para detectar cuando el elemento entra al viewport
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const cards = [
  {
    label: "Owner",
    title: OWNER_NAME,
    sub: OWNER_HANDLE,
  },
  {
    label: "Brand",
    title: BRAND_NAME,
    sub: `Infrastructure identity for ${SITE_NAME}.`,
  },
  {
    label: "Project",
    title: SITE_NAME,
    sub: "Modular API platform for production-grade integrations.",
  },
];

export default function OwnerSection() {
  const { ref, inView } = useInView();

  const ownerLinks = [
    { label: "GitHub", href: OWNER_LINKS.github },
    { label: "LinkedIn", href: OWNER_LINKS.linkedin },
    { label: "Instagram", href: OWNER_LINKS.instagram },
    { label: "Developer Site", href: OWNER_LINKS.website },
  ];

  return (
    <section id="owner" className="bg-background py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-16">

        {/* Heading — fade-up */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
          }}
          ref={ref}
        >
          <SectionHeading
            eyebrow="Owner"
            title={`Created by ${OWNER_NAME} for ${BRAND_NAME}`}
            description={`${SITE_NAME} is built and maintained with a focus on long-term platform reliability, clear contracts, and trustworthy operations.`}
            align="left"
          />
        </div>

        {/* Cards — staggered fade-up */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={card.label}
              className="surface-card surface-card-hover p-5 relative group overflow-hidden"
              style={{
                transition: `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
              }}
            >
              {/* Glow sweep on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(20,184,166,0.12) 0%, transparent 70%)",
                }}
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                {card.label}
              </p>
              <p className="mt-3 text-base font-semibold text-foreground">
                {card.title}
              </p>
              <p className="mt-2 text-sm text-foreground-secondary">{card.sub}</p>
            </article>
          ))}
        </div>

        {/* Links — fade-up, delayed */}
        <div
          className="flex flex-wrap items-center gap-3 transition-all duration-700 ease-out"
          style={{
            transitionDelay: "420ms",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-muted">
            Official links
          </span>
          <div className="flex flex-wrap gap-2">
            {ownerLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="chip transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                style={{ transitionDelay: `${500 + i * 60}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}