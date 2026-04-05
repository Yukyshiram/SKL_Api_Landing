"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { API_BASE_URL } from "../../lib/site";

type TabId = "curl" | "javascript" | "typescript" | "python";

type DeveloperExperienceProps = {
  fullscreen?: boolean;
};

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "curl", label: "cURL" },
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
];

const snippets: Record<TabId, string> = {
  curl: `curl -X POST ${API_BASE_URL}/v1/events/ingest \
  -H "Authorization: Bearer sk_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "source": "checkout",
    "event": "payment_succeeded",
    "tenantId": "acme-prod"
  }'`,
  javascript: `const response = await fetch('${API_BASE_URL}/v1/events/ingest', {
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
  python: `import requests

response = requests.post(
    '${API_BASE_URL}/v1/events/ingest',
    headers={
        'Authorization': 'Bearer sk_live_xxx',
        'Content-Type': 'application/json',
    },
    json={
        'source': 'checkout',
        'event': 'payment_succeeded',
        'tenantId': 'acme-prod',
    },
)

data = response.json()`,
};

const mockResponse = `{
  "status": "accepted",
  "requestId": "req_7fb88a42",
  "queued": true,
  "region": "us-east-1",
  "latencyMs": "<measured>"
}`;

export default function DeveloperExperience({
  fullscreen = false,
}: DeveloperExperienceProps) {
  const [activeTab, setActiveTab] = useState<TabId>("curl");

  return (
    <motion.section
      id="developers"
      className={[
        "relative isolate overflow-hidden bg-background",
        fullscreen
          ? "h-screen py-12 sm:py-16 lg:flex lg:items-center lg:py-20"
          : "py-20 sm:py-24",
      ].join(" ")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full glow-primary opacity-60 sm:hidden" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-16">
        <motion.div
          className="space-y-8"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Developer Experience"
            title="Integrate Next SKL Api with minimal friction and full control"
            description="Clear SDKs, predictable contracts, and observability from the first request so your team can iterate with confidence."
            align="left"
          />

          <ul className="space-y-3 text-sm text-foreground-secondary sm:text-base">
            <li className="surface-card px-4 py-3 shadow-none">
              Typed errors with stable domain-level codes.
            </li>
            <li className="surface-card px-4 py-3 shadow-none">
              Native idempotency for critical operations.
            </li>
            <li className="surface-card px-4 py-3 shadow-none">
              Explicit versioning for safe iterative change.
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="surface-panel p-4 sm:p-5 lg:min-h-130"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
        >
          <motion.div
            className="mb-4 flex flex-wrap gap-2 border-b border-border-subtle pb-4"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "relative overflow-hidden rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border-subtle bg-surface text-foreground-secondary hover:border-border hover:bg-surface-elevated",
                  ].join(" ")}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-dev-tab"
                      className="absolute inset-0 rounded-md border border-primary"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 30,
                        mass: 0.5,
                      }}
                    />
                  ) : null}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>

          <div className="space-y-4">
            <motion.div
              className="surface-panel-muted relative overflow-hidden p-4"
              layout
            >
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-muted">
                Request Example
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.pre
                  key={`request-${activeTab}`}
                  className="overflow-x-auto text-[13px] leading-6 text-foreground-secondary"
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
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary"
                  initial={{ opacity: 0, scaleX: 0.7 }}
                  animate={{ opacity: [0, 0.45, 0], scaleX: [0.7, 1, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                />
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="surface-panel-muted relative overflow-hidden p-4"
              layout
            >
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-muted">
                JSON Response
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.pre
                  key={`response-${activeTab}`}
                  className="overflow-x-auto text-[13px] leading-6 text-foreground-secondary"
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
                  className="pointer-events-none absolute inset-0 rounded-xl border border-primary"
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