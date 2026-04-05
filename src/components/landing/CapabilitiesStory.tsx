"use client";

import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../ui/SectionHeading';

type CapabilityStep = {
  id: string;
  title: string;
  summary: string;
  panelTitle: string;
  panelBody: string;
  metrics: Array<{ label: string; value: string }>;
};

const DESKTOP_QUERY = '(min-width: 1024px)';
const MOBILE_QUERY = '(max-width: 1023px)';
const PANEL_ANIMATION_FROM = { opacity: 0.7, y: 8 };
const PANEL_ANIMATION_TO = { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' };

const classes = {
  section: 'relative isolate overflow-hidden bg-background py-20 sm:py-24',
  wrapper: 'mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-16',
  grid: 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14',
  storyColumn: 'relative space-y-4 lg:pl-6',
  stepCardBase: 'rounded-2xl border px-5 py-6 sm:px-6',
  stepCardTransition:
    'transition-[color,background-color,border-color,opacity,transform,box-shadow] duration-500 ease-out',
  stepCardInactive: 'border-border-subtle bg-surface lg:translate-x-1 lg:scale-[0.985] lg:opacity-60',
  stepCardActive:
    'border-border-strong bg-surface-elevated lg:translate-x-0 lg:scale-100 lg:opacity-100 lg:shadow-[var(--shadow-card-hover)]',
  stepIndexBase:
    'inline-flex h-7 min-w-7 items-center justify-center rounded-full border px-2 text-[11px] font-semibold tracking-[0.12em]',
  stepIndexTransition: 'transition-colors duration-300',
  stepIndexInactive: 'border-border-subtle text-foreground-secondary',
  stepIndexActive: 'border-border-strong text-foreground-secondary lg:border-primary lg:text-primary-foreground',
  stepTitle: 'text-lg font-semibold tracking-[-0.01em] text-foreground',
  stepSummary: 'max-w-2xl text-sm leading-7 text-foreground-secondary sm:text-base',
  mobilePanel: 'mt-5 rounded-xl border border-border-subtle bg-surface p-4 lg:hidden',
  mobileMetricCard: 'rounded-lg border border-border-subtle bg-surface px-2.5 py-2.5',
  desktopAside: 'hidden lg:sticky lg:top-24 lg:block lg:h-fit',
  desktopPanel: 'surface-panel relative overflow-hidden p-5 sm:p-6',
  desktopMetricCard: 'rounded-xl border border-border-subtle bg-surface px-3 py-3',
};

function cx(...values: Array<string | false>): string {
  return values.filter(Boolean).join(' ');
}

const steps: CapabilityStep[] = [
  {
    id: '01',
    title: 'Define domain boundaries',
    summary: 'Model each module with explicit contracts and clear ownership by team.',
    panelTitle: 'Domain Contract Map',
    panelBody:
      'Next SKL Api organizes capabilities into independent domains to reduce coupling and support incremental evolution.',
    metrics: [
      { label: 'Modules', value: 'Domain-based' },
      { label: 'Shared Contracts', value: 'Explicitly managed' },
      { label: 'Version Drift', value: 'Actively controlled' },
    ],
  },
  {
    id: '02',
    title: 'Compose reliable flows',
    summary: 'Chain critical operations with idempotency and consistent transactional rules.',
    panelTitle: 'Flow Orchestration Layer',
    panelBody:
      'Each request passes through validation, business rules, and event queues with end-to-end traceability.',
    metrics: [
      { label: 'Retries', value: 'safe' },
      { label: 'Idempotency', value: 'native' },
      { label: 'Failures', value: 'observed and bounded' },
    ],
  },
  {
    id: '03',
    title: 'Ship with observability',
    summary: 'Expose request IDs, latency context, and logs for production debugging.',
    panelTitle: 'Operational Signals',
    panelBody:
      'Structured logs, endpoint metrics, and correlated traces accelerate diagnostics without guesswork.',
    metrics: [
      { label: 'Latency', value: 'Measured continuously' },
      { label: 'Traceability', value: 'full' },
      { label: 'Alerting', value: 'real-time' },
    ],
  },
  {
    id: '04',
    title: 'Scale without rewrites',
    summary: 'Increase throughput by module and region without breaking existing integrations.',
    panelTitle: 'Scalability Profile',
    panelBody:
      'The modular architecture scales critical components selectively while keeping contracts stable.',
    metrics: [
      { label: 'Throughput', value: 'Elastic by module' },
      { label: 'Regions', value: 'Multi-region ready' },
      { label: 'Uptime', value: 'SLA-defined' },
    ],
  },
];

export default function CapabilitiesStory() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const activeStep = steps[activeStepIndex];
  const progressPercent = ((activeStepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    let isMounted = true;
    let cleanupMatchMedia: (() => void) | undefined;

    const setupScrollTrigger = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add(DESKTOP_QUERY, () => {
        stepRefs.current.forEach((stepElement, index) => {
          if (!stepElement) return;

          ScrollTrigger.create({
            trigger: stepElement,
            start: 'top center+=48',
            end: 'bottom center',
            onEnter: () => setActiveStepIndex(index),
            onEnterBack: () => setActiveStepIndex(index),
          });
        });
      });

      mm.add(MOBILE_QUERY, () => {
        setActiveStepIndex(0);
      });

      cleanupMatchMedia = () => mm.revert();
    };

    setupScrollTrigger();

    return () => {
      isMounted = false;
      cleanupMatchMedia?.();
    };
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;

    let isMounted = true;
    const currentProgressPercent = ((activeStepIndex + 1) / steps.length) * 100;

    const animatePanel = async () => {
      const { gsap } = await import('gsap');
      if (!isMounted || !panelRef.current) return;

      const titleElement = panelRef.current.querySelector('[data-panel-title]');
      const bodyElement = panelRef.current.querySelector('[data-panel-body]');
      const metricElements = panelRef.current.querySelectorAll('[data-panel-metric]');
      const progressFillElement = panelRef.current.querySelector('[data-progress-fill]');
      const panelGlowElement = panelRef.current.querySelector('[data-panel-glow]');

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

      timeline.fromTo(panelRef.current, PANEL_ANIMATION_FROM, PANEL_ANIMATION_TO);

      timeline.fromTo(
        [titleElement, bodyElement],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.06 },
        0.06
      );

      timeline.fromTo(
        metricElements,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.24, stagger: 0.05 },
        0.1
      );

      if (panelGlowElement) {
        timeline.fromTo(panelGlowElement, { opacity: 0.1 }, { opacity: 0.35, duration: 0.28 }, 0.02);
      }

      if (progressFillElement) {
        timeline.to(progressFillElement, { width: `${currentProgressPercent}%`, duration: 0.3 }, 0.04);
      }
    };

    animatePanel();

    return () => {
      isMounted = false;
    };
  }, [activeStepIndex]);

  return (
    <section id="capabilities-story" className={classes.section}>
      <div className={classes.wrapper}>
        <SectionHeading
          eyebrow="Capabilities Story"
          title="A technical narrative built for product, platform, and operations"
          description="Next SKL Api combines modularity, consistency, and observability so every growth stage starts from a stable base."
          align="left"
        />

        <div className={classes.grid}>
          <div className={classes.storyColumn}>
            <div className="pointer-events-none absolute bottom-2 left-0 top-2 hidden w-px bg-border-subtle lg:block" />
            <div
              className="pointer-events-none absolute left-0 top-2 hidden w-px bg-primary lg:block"
              style={{ height: `${Math.max(10, progressPercent - 2)}%` }}
            />

            {steps.map((step, index) => {
              const isActive = index === activeStepIndex;

              return (
                <article
                  key={step.id}
                  data-step-index={index}
                  ref={(element) => {
                    stepRefs.current[index] = element;
                  }}
                  className={cx(
                    classes.stepCardBase,
                    classes.stepCardTransition,
                    isActive ? classes.stepCardActive : classes.stepCardInactive
                  )}
                >
                  <span
                    className={cx(
                      'absolute -left-[1.05rem] top-7 hidden h-2.5 w-2.5 rounded-full ring-4 ring-background transition-all duration-300 lg:block',
                      isActive ? 'bg-primary' : 'bg-border-subtle'
                    )}
                    aria-hidden="true"
                  />

                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className={cx(
                        classes.stepIndexBase,
                        classes.stepIndexTransition,
                        isActive ? classes.stepIndexActive : classes.stepIndexInactive
                      )}
                    >
                      {step.id}
                    </span>
                    <h3 className={classes.stepTitle}>{step.title}</h3>
                  </div>

                  <p className={classes.stepSummary}>{step.summary}</p>

                  <div className={classes.mobilePanel}>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                      Step {step.id}
                    </p>
                    <h4 className="text-base font-semibold tracking-[-0.01em] text-foreground">{step.panelTitle}</h4>
                    <p className="mt-3 text-sm leading-7 text-foreground-secondary">{step.panelBody}</p>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {step.metrics.map((metric) => (
                        <div key={metric.label} className={classes.mobileMetricCard}>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">{metric.label}</p>
                          <p className="mt-1 text-xs font-semibold text-foreground">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className={classes.desktopAside}>
            <div ref={panelRef} className={classes.desktopPanel}>
              <div className="pointer-events-none absolute inset-0">
                <div data-panel-glow className="absolute -top-14 -right-16 h-44 w-44 rounded-full glow-primary" />
                <div className="absolute inset-x-0 top-0 h-24 panel-sheen" />
              </div>

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                Active Step {activeStep.id}
              </p>

              <div className="mb-4 space-y-2.5">
                <div className="h-1 overflow-hidden rounded-full bg-border-subtle">
                  <div
                    data-progress-fill
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  {steps.map((step, index) => (
                    <span
                      key={`progress-${step.id}`}
                      className={cx(
                        'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                        index <= activeStepIndex ? 'bg-primary' : 'bg-border-subtle'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <h4 data-panel-title className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                {activeStep.panelTitle}
              </h4>
              <p data-panel-body className="mt-4 text-sm leading-7 text-foreground-secondary sm:text-base">
                {activeStep.panelBody}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {activeStep.metrics.map((metric) => (
                  <div key={metric.label} data-panel-metric className={classes.desktopMetricCard}>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">{metric.label}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground sm:text-base">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
