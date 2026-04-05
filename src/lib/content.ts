export const USE_CASES = [
  {
    title: "Event-driven billing flows",
    description:
      "Coordinate Billing Core with the Events Stream to keep payment and subscription activity consistent across products.",
  },
  {
    title: "Multi-tenant access control",
    description:
      "Scope API keys and tenant policies so every request respects isolation and environment-level access rules.",
  },
  {
    title: "Operational observability",
    description:
      "Track request IDs, latency context, and audit trails without losing visibility across modules and teams.",
  },
  {
    title: "Workflow automation",
    description:
      "Connect internal and external systems with versioned workflow hooks that keep contracts stable.",
  },
  {
    title: "Regional scale without rewrites",
    description:
      "Scale traffic by module and region while keeping the integration surface predictable.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is Next SKL Api?",
    answer:
      "Next SKL Api is an infrastructure-grade API platform for modular integrations, combining secure modules, stable contracts, and operational visibility.",
  },
  {
    question: "Who is Next SKL Api built for?",
    answer:
      "It is designed for product, platform, and operations teams that need predictable integrations and production-ready reliability.",
  },
  {
    question: "How do I get access?",
    answer:
      "Use the Get Access CTA to request credentials and align on your onboarding flow.",
  },
  {
    question: "What does authentication look like?",
    answer:
      "Authentication uses scoped API keys with per-request audit trails and environment-level access policies.",
  },
  {
    question: "What are the core modules?",
    answer:
      "Auth & Access, Events Stream, Billing Core, Tenant Engine, Observability, and Workflow Hooks make up the core surface.",
  },
  {
    question: "How does Next SKL Api handle scale?",
    answer:
      "Modules scale by domain and region, keeping contracts stable while throughput grows.",
  },
] as const;
