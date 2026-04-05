"use client";

import { useState } from 'react';
import Image from 'next/image';
import { SITE_LOGO_PATH, SITE_NAME } from '../../lib/site';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Flow', href: '#flow' },
  { label: 'Modules', href: '#modules' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Developers', href: '#developers' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background-deep shadow-nav">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10 lg:px-16">
        <a
          href="#overview"
          className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-foreground transition-colors hover:text-primary-foreground"
        >
          <Image
            src={SITE_LOGO_PATH}
            alt={`${SITE_NAME} logo`}
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />
          <span>{SITE_NAME}</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-2 py-1 text-sm font-medium text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#final-cta"
            className="btn btn-primary h-10 px-4"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          className="btn btn-secondary h-10 px-3 text-xs uppercase tracking-[0.12em] lg:hidden"
        >
          Menu
        </button>
      </div>

      {isMenuOpen ? (
        <div id="mobile-nav" className="border-t border-border-subtle bg-background-soft px-6 py-4 sm:px-10 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg border border-transparent px-2 py-2 text-sm font-medium text-foreground-secondary transition-colors hover:border-border-subtle hover:bg-surface-elevated hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#final-cta"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary mt-2 h-10"
            >
              Get Started
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
