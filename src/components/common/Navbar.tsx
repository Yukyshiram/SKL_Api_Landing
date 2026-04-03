"use client";

import { useState } from 'react';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Product', href: '#modules-grid' },
  { label: 'Capabilities', href: '#capabilities-story' },
  { label: 'Developers', href: '#developer-experience' },
  { label: 'Security', href: '#trust-core' },
  { label: 'Docs', href: '#integration-flow' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/62 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10 lg:px-16">
        <a href="#hero" className="text-sm font-semibold tracking-[0.18em] text-slate-100 transition-colors hover:text-white">
          SKL API
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-2 py-1 text-sm font-medium text-slate-300/90 transition-all duration-200 hover:bg-white/4 hover:text-slate-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#final-cta"
            className="inline-flex h-10 items-center rounded-xl border border-cyan-300/28 bg-linear-to-b from-cyan-300/14 to-cyan-300/8 px-4 text-sm font-semibold text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200/45 hover:from-cyan-300/18 hover:to-cyan-300/12 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_28px_-18px_rgba(34,211,238,0.45)]"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          className="inline-flex h-10 items-center rounded-xl border border-white/12 bg-white/4 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition-all duration-200 hover:border-white/18 hover:bg-white/6 lg:hidden"
        >
          Menu
        </button>
      </div>

      {isMenuOpen ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-slate-950/90 px-6 py-4 backdrop-blur-xl sm:px-10 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg border border-transparent px-2 py-2 text-sm font-medium text-slate-300/90 transition-all duration-200 hover:border-white/10 hover:bg-white/4 hover:text-slate-100"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#final-cta"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-xl border border-cyan-300/28 bg-linear-to-b from-cyan-300/14 to-cyan-300/8 px-4 text-sm font-semibold text-cyan-100 transition-all duration-200 hover:border-cyan-200/45 hover:from-cyan-300/18 hover:to-cyan-300/12 hover:text-white"
            >
              Get Started
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
