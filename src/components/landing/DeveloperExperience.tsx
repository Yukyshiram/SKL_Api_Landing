'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

type TabId = 'curl' | 'javascript' | 'typescript';

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'curl', label: 'cURL' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
];

const snippets: Record<TabId, string> = {
  curl: `curl -X POST https://api.skl.dev/v1/events/ingest \\
  -H "Authorization: Bearer sk_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "source": "checkout",
    "event": "payment_succeeded",
    "tenantId": "acme-prod"
  }'`,
  javascript: `const response = await fetch('https://api.skl.dev/v1/events/ingest', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer sk_live_xxx',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    source: 'checkout',
    event: 'payment_succeeded',
    tenantId: 'acme-prod',
  }),
});

const data = await response.json();`,
  typescript: `type IngestEvent = {
  source: 'checkout' | 'billing' | 'auth';
  event: string;
  tenantId: string;
};

const payload: IngestEvent = {
  source: 'checkout',
  event: 'payment_succeeded',
  tenantId: 'acme-prod',
};

const res = await skl.events.ingest(payload);`,
};

const mockResponse = `{
  "status": "accepted",
  "requestId": "req_7fb88a42",
  "queued": true,
  "region": "us-east-1",
  "latencyMs": "<measured>"
}`;

export default function DeveloperExperience() {
  const [activeTab, setActiveTab] = useState<TabId>('curl');

  return (
    <motion.section
      id="developer-experience"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#05070c] py-20 sm:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-slate-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-black/30" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:px-16">
        <motion.div
          className="space-y-8"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionHeading
            eyebrow="Developer Experience"
            title="Integrate SKL API with minimal friction and full control"
            description="Clear SDKs, predictable contracts, and observability from the first request so your team can iterate with confidence."
            align="left"
          />

          <ul className="space-y-3 text-sm text-slate-300/90 sm:text-base">
            <li className="rounded-lg border border-white/10 bg-white/3 px-4 py-3">Typed errors with stable domain-level codes.</li>
            <li className="rounded-lg border border-white/10 bg-white/3 px-4 py-3">Native idempotency for critical operations.</li>
            <li className="rounded-lg border border-white/10 bg-white/3 px-4 py-3">Explicit versioning for safe iterative change.</li>
          </ul>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.92))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:p-5"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
        >
          <motion.div
            className="mb-4 flex flex-wrap gap-2 border-b border-white/10 pb-4"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'relative overflow-hidden rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition',
                    isActive
                      ? 'border-cyan-300/35 bg-cyan-300/10 text-cyan-100'
                      : 'border-white/12 bg-white/4 text-slate-300 hover:border-white/20 hover:bg-white/8',
                  ].join(' ')}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-dev-tab"
                      className="absolute inset-0 rounded-md border border-cyan-200/35"
                      transition={{ type: 'spring', stiffness: 360, damping: 30, mass: 0.5 }}
                    />
                  ) : null}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>

          <div className="space-y-4">
            <motion.div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 p-4" layout>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">Request Example</p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.pre
                  key={`request-${activeTab}`}
                  className="overflow-x-auto text-[13px] leading-6 text-slate-200"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24 }}
                >
                  <motion.code
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {snippets[activeTab]}
                  </motion.code>
                </motion.pre>
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`request-highlight-${activeTab}`}
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-200/50"
                  initial={{ opacity: 0, scaleX: 0.7 }}
                  animate={{ opacity: [0, 0.45, 0], scaleX: [0.7, 1, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                />
              </AnimatePresence>
            </motion.div>

            <motion.div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 p-4" layout>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">JSON Response</p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.pre
                  key={`response-${activeTab}`}
                  className="overflow-x-auto text-[13px] leading-6 text-slate-200"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, delay: 0.02 }}
                >
                  <motion.code
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: [0.9, 1] }}
                    transition={{ duration: 0.24 }}
                  >
                    {mockResponse}
                  </motion.code>
                </motion.pre>
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`response-highlight-${activeTab}`}
                  className="pointer-events-none absolute inset-0 rounded-xl border border-cyan-200/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.32, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65 }}
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
