"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

type IntegrationStep = {
  id: '01' | '02' | '03' | '04';
  title: 'Get Access' | 'Authenticate' | 'Send Requests' | 'Scale Securely';
  description: string;
  detail: string;
};

const integrationSteps: IntegrationStep[] = [
  {
    id: '01',
    title: 'Get Access',
    description: 'Provision your workspace and credentials for development and production environments.',
    detail: 'Includes separation by project, tenant, and key-rotation lifecycle.',
  },
  {
    id: '02',
    title: 'Authenticate',
    description: 'Configure authentication with API keys and scopes based on service-level permissions.',
    detail: 'Each request is signed and traceable for operational auditing.',
  },
  {
    id: '03',
    title: 'Send Requests',
    description: 'Consume consistent endpoints with stable contracts and domain-typed errors.',
    detail: 'Reduce retries and speed up integration across backend, platform, and product.',
  },
  {
    id: '04',
    title: 'Scale Securely',
    description: 'Scale traffic by module and region while maintaining security and continuous observability.',
    detail: 'Designed for sustained growth without breaking existing integrations.',
  },
];

const DESKTOP_QUERY = '(min-width: 1024px)';
const MOBILE_QUERY = '(max-width: 1023px)';

function cx(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export default function IntegrationFlow() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1);
  const sectionRef = useRef<HTMLElement | null>(null);
  const desktopSceneRef = useRef<HTMLDivElement | null>(null);
  const lastStepIndexRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    let cleanupMatchMedia: (() => void) | undefined;

    const setupDesktopScroll = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_QUERY, () => {
        if (!desktopSceneRef.current) return;

        const trigger = ScrollTrigger.create({
          trigger: desktopSceneRef.current,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 3.35, 1700)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              integrationSteps.length - 1,
              Math.floor(self.progress * integrationSteps.length)
            );

            if (nextIndex !== lastStepIndexRef.current) {
              setTransitionDirection(nextIndex > lastStepIndexRef.current ? 1 : -1);
              lastStepIndexRef.current = nextIndex;
            }

            setActiveStepIndex(nextIndex);
            setScrollProgress(self.progress);
          },
        });

        return () => trigger.kill();
      });

      mm.add(MOBILE_QUERY, () => {
        setActiveStepIndex(0);
        setScrollProgress(0);
        setTransitionDirection(1);
        lastStepIndexRef.current = 0;
      });

      cleanupMatchMedia = () => mm.revert();
    };

    setupDesktopScroll();

    return () => {
      isMounted = false;
      cleanupMatchMedia?.();
    };
  }, []);

  const progressPercent = Math.min(100, Math.max(0, scrollProgress * 100));
  const activeStep = integrationSteps[activeStepIndex];

  return (
    <section
      ref={sectionRef}
      id="flow"
      className="relative isolate overflow-hidden section-from-hero py-20 sm:py-24 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Integration Flow"
          title="Integrate Next SKL Api through a clear, technical, and reliable flow"
          description="From initial access to production scale, each step keeps contracts predictable and security by default."
          align="left"
        />

        <div className="relative">
          <div className="pointer-events-none absolute left-4 top-8 h-[calc(100%-4rem)] w-px bg-border-subtle sm:left-5 lg:hidden" />

          <div className="grid gap-5 lg:hidden">
            {integrationSteps.map((step) => (
              <article
                key={`mobile-${step.id}`}
                className="surface-card p-5 shadow-none"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary text-[11px] font-semibold tracking-[0.12em] text-primary-foreground">
                    {step.id}
                  </span>
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">{step.title}</h3>
                </div>

                <p className="text-sm leading-7 text-foreground-secondary">{step.description}</p>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{step.detail}</p>
              </article>
            ))}
          </div>

          <div ref={desktopSceneRef} className="hidden lg:block">
            <div className="flex min-h-[calc(100vh-8rem)] items-center py-8">
              <div className="mx-auto w-full max-w-4xl space-y-7">
                <div className="surface-card p-4 shadow-none">
                  <div className="mb-3 h-1 overflow-hidden rounded-full bg-border-subtle">
                    <div
                      className="h-full rounded-full bg-primary transition-[width] duration-200"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {integrationSteps.map((step, index) => {
                      const isComplete = index <= activeStepIndex;

                      return (
                        <div
                          key={`progress-${step.id}`}
                          className={cx(
                            'flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300',
                            isComplete ? 'border-primary bg-surface-elevated' : 'border-border-subtle bg-surface'
                          )}
                        >
                          <span
                            className={cx(
                              'inline-flex h-7 min-w-7 items-center justify-center rounded-full border px-1.5 text-[10px] font-semibold tracking-[0.14em] transition-colors duration-300',
                              isComplete
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border-subtle bg-surface text-foreground-muted'
                            )}
                          >
                            {step.id}
                          </span>
                          <span
                            className={cx(
                              'text-xs font-medium tracking-[0.04em] transition-colors duration-300',
                              isComplete ? 'text-foreground' : 'text-foreground-muted'
                            )}
                          >
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="surface-panel relative flex min-h-128 items-center justify-center overflow-hidden rounded-3xl px-5 py-10 sm:px-8 sm:py-12 lg:min-h-144">
                  <div className="pointer-events-none absolute inset-0 panel-sheen" />

                  <AnimatePresence mode="wait" initial={false} custom={transitionDirection}>
                    <motion.article
                      key={activeStep.id}
                      custom={transitionDirection}
                      initial={{ opacity: 0, y: transitionDirection > 0 ? 16 : -16, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: transitionDirection > 0 ? -12 : 12, scale: 0.985 }}
                      transition={{ duration: 0.36, ease: 'easeOut' }}
                      className="surface-card border border-primary bg-surface-elevated relative w-full max-w-3xl p-7 sm:p-8 lg:p-10"
                    >
                      <div className="relative flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-primary text-[11px] font-semibold tracking-[0.14em] text-primary-foreground">
                          {activeStep.id}
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">Step {activeStep.id}</p>
                          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-[2rem]">
                            {activeStep.title}
                          </h3>
                        </div>
                      </div>

                      <div className="relative mt-6 max-w-2xl space-y-4">
                        <p className="text-base leading-8 text-foreground-secondary sm:text-[1.05rem] sm:leading-8">
                          {activeStep.description}
                        </p>
                        <p className="text-sm leading-7 text-foreground-muted sm:text-base sm:leading-8">
                          {activeStep.detail}
                        </p>
                      </div>

                      <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
                        <div className="surface-card p-4 shadow-none">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">Focus</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">{activeStep.id} / 04</p>
                        </div>
                        <div className="surface-card p-4 shadow-none">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">Mode</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">Pinned story</p>
                        </div>
                        <div className="surface-card p-4 shadow-none">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">Flow</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">Scroll-driven</p>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
