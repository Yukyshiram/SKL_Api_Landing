export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden bg-background py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full glow-primary" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 text-center sm:px-10 lg:px-16">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
          Build on an API foundation your engineering team can trust.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-foreground-secondary sm:text-lg">
          Next SKL Api gives you the structure, reliability, and operational clarity to ship faster today and scale safely tomorrow.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#flow"
            className="btn btn-secondary h-11 px-6"
          >
            View Docs
          </a>
          <a
            href="#overview"
            className="btn btn-primary h-11 px-6"
          >
            Start Building
          </a>
        </div>
      </div>
    </section>
  );
}
