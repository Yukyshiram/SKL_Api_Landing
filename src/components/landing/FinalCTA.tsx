export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden border-b border-white/10 bg-[#05070c] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-slate-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-black/30" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/20 via-transparent to-black/32" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 text-center sm:px-10 lg:px-16">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-slate-100 sm:text-4xl lg:text-5xl">
          Build on an API foundation your engineering team can trust.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-slate-300/90 sm:text-lg">
          SKL API gives you the structure, reliability, and operational clarity to ship faster today and scale safely tomorrow.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#integration-flow"
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 text-sm font-semibold text-slate-100 transition hover:border-white/25 hover:bg-white/10"
          >
            View Docs
          </a>
          <a
            href="#hero"
            className="inline-flex h-11 items-center justify-center rounded-md border border-cyan-300/30 bg-linear-to-b from-cyan-300/18 to-cyan-300/10 px-6 text-sm font-semibold text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_-14px_rgba(6,182,212,0.65)] transition hover:border-cyan-200/45 hover:from-cyan-300/24 hover:to-cyan-300/14"
          >
            Start Building
          </a>
        </div>
      </div>
    </section>
  );
}
