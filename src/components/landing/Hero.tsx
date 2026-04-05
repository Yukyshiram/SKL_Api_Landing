"use client";

import { useEffect, useRef } from "react";

function GatewayCard() {
  const latRef = useRef<HTMLDivElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const thrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const latHeights = [10,16,14,18,22,28,24,20,26,28,24,28,22,26,28];
    const errHeights = [4,3,5,3,4,3,4,2,3,4,3,3,4,3,3];
    const thrHeights = [18,22,20,26,28,28,28,26,28,28,26,28,28,26,28];

    function makeBars(ref: React.RefObject<HTMLDivElement | null>, heights: number[]) {
      if (!ref.current) return;
      ref.current.innerHTML = "";
      heights.forEach((h, i) => {
        const b = document.createElement("div");
        b.style.cssText = `
          width:5px; height:${h}px; border-radius:1px;
          background:#2f8fb5; flex-shrink:0; align-self:flex-end;
          opacity:${(0.25 + (h / 30) * 0.75).toFixed(2)};
          transform:scaleY(0); transform-origin:bottom;
          transition:transform 0.5s ease ${i * 40}ms;
        `;
        ref.current!.appendChild(b);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          b.style.transform = "scaleY(1)";
        }));
      });
    }

    makeBars(latRef, latHeights);
    makeBars(errRef, errHeights);
    makeBars(thrRef, thrHeights);
  }, []);

  return (
    <div
      style={{
        background: "#00080D",
        border: "1px solid #234554",
        borderRadius: "20px",
        overflow: "hidden",
        fontFamily: "var(--font-geist-mono), 'Courier New', monospace",
        position: "relative",
        width: "100%",
      }}
    >
      {/* top accent line */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, #2f8fb5, #46a6cc, transparent)",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid #17313d",
          background: "#01161b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 28, height: 28,
              border: "1px solid #2f8fb5",
              borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" stroke="#2f8fb5" strokeWidth="1"/>
              <rect x="8" y="1" width="5" height="5" stroke="#46a6cc" strokeWidth="1" opacity="0.5"/>
              <rect x="1" y="8" width="5" height="5" stroke="#46a6cc" strokeWidth="1" opacity="0.5"/>
              <rect x="8" y="8" width="5" height="5" stroke="#2f8fb5" strokeWidth="1"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#eaf4f8", letterSpacing: "0.1em", margin: 0 }}>
              Production Gateway
            </p>
            <p style={{ fontSize: 10, color: "#6f8794", letterSpacing: "0.08em", margin: "2px 0 0" }}>
              us-east-1 · HTTPS · p95
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex", alignItems: "center", gap: 6,
            border: "1px solid rgba(47,143,181,0.4)",
            borderRadius: 99, padding: "4px 12px",
            fontSize: 10, fontWeight: 600, letterSpacing: "0.16em",
            color: "#eaf4f8", textTransform: "uppercase",
            background: "rgba(47,143,181,0.12)",
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%", background: "#2f8fb5", flexShrink: 0,
              animation: "sklPulse 1.4s ease-in-out infinite",
            }}
          />
          Healthy
        </div>
      </div>

      {/* Request / Response */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#17313d", borderBottom: "1px solid #17313d" }}>
        {/* Request */}
        <div style={{ background: "#00080D", padding: "14px 16px" }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2f8fb5", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            Request
            <span style={{ fontSize: 9, background: "rgba(47,143,181,0.12)", border: "1px solid rgba(47,143,181,0.3)", color: "#46a6cc", padding: "1px 6px", borderRadius: 4, letterSpacing: "0.06em", textTransform: "none" }}>
              POST /v1/events
            </span>
            <span style={{ flex: 1, height: 1, background: "#17313d", display: "block" }} />
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.85, color: "#a9bdc8" }}>
            <div><span style={{ color: "#6f8794" }}>auth&nbsp;&nbsp;&nbsp;</span><span style={{ color: "#46a6cc" }}>Bearer</span> sk_live_xxx</div>
            <div><span style={{ color: "#6f8794" }}>type&nbsp;&nbsp;&nbsp;</span>application/json</div>
          </div>
          <div style={{ height: 8 }} />
          <div style={{ fontSize: 11, lineHeight: 1.85 }}>
            <div style={{ color: "#17313d" }}>{"{"}</div>
            <div><span style={{ color: "#6f8794" }}>&nbsp;"source"&nbsp;&nbsp;</span><span style={{ color: "#a9bdc8" }}>"checkout"</span></div>
            <div><span style={{ color: "#6f8794" }}>&nbsp;"event"&nbsp;&nbsp;&nbsp;</span><span style={{ color: "#46a6cc" }}>"payment_succeeded"</span></div>
            <div><span style={{ color: "#6f8794" }}>&nbsp;"tenant"&nbsp;&nbsp;</span><span style={{ color: "#a9bdc8" }}>"acme-prod"</span></div>
            <div style={{ color: "#17313d" }}>{"}"}</div>
          </div>
        </div>

        {/* Response */}
        <div style={{ background: "#00080D", padding: "14px 16px", borderLeft: "1px solid #17313d" }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2f8fb5", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            Response
            <span style={{ fontSize: 9, background: "rgba(169,189,200,0.06)", border: "1px solid rgba(169,189,200,0.2)", color: "#a9bdc8", padding: "1px 6px", borderRadius: 4, letterSpacing: "0.06em", textTransform: "none" }}>
              202 Accepted
            </span>
            <span style={{ flex: 1, height: 1, background: "#17313d", display: "block" }} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#eaf4f8", marginBottom: 8, letterSpacing: "0.04em" }}>
            HTTP/1.1 <span style={{ color: "#2f8fb5" }}>202</span>
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.85, color: "#a9bdc8" }}>
            <div><span style={{ color: "#6f8794" }}>x-req-id&nbsp;&nbsp;</span>req_7fb88a42</div>
            <div><span style={{ color: "#6f8794" }}>x-latency&nbsp;</span><span style={{ color: "#eaf4f8" }}>28ms</span></div>
          </div>
          <div style={{ height: 8 }} />
          <div style={{ fontSize: 11, lineHeight: 1.85 }}>
            <div style={{ color: "#17313d" }}>{"{"}</div>
            <div><span style={{ color: "#6f8794" }}>&nbsp;"status"&nbsp;&nbsp;</span><span style={{ color: "#46a6cc" }}>"accepted"</span></div>
            <div><span style={{ color: "#6f8794" }}>&nbsp;"queued"&nbsp;&nbsp;</span><span style={{ color: "#eaf4f8" }}>true</span></div>
            <div><span style={{ color: "#6f8794" }}>&nbsp;"region"&nbsp;&nbsp;</span><span style={{ color: "#a9bdc8" }}>"us-east-1"</span></div>
            <div style={{ color: "#17313d" }}>{"}"}</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "#17313d", borderBottom: "1px solid #17313d" }}>
        {[
          { label: "Latency", value: "28", unit: "ms", ref: latRef },
          { label: "Error rate", value: "0.02", unit: "%", ref: errRef },
          { label: "Throughput", value: "8.4", unit: "k/m", ref: thrRef },
        ].map(({ label, value, unit, ref }) => (
          <div key={label} style={{ background: "#00080D", padding: "12px 14px" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f8794", margin: "0 0 6px" }}>{label}</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: "#eaf4f8", letterSpacing: "-0.02em", margin: 0 }}>
              {value}<span style={{ fontSize: 11, color: "#6f8794", marginLeft: 1 }}>{unit}</span>
            </p>
            <div ref={ref} style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28, marginTop: 8 }} />
          </div>
        ))}
      </div>

      {/* Module pills */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#17313d", borderBottom: "1px solid #17313d" }}>
        {[
          { name: "Modules", status: "12 live", accent: true },
          { name: "Visibility", status: "Full trace", accent: false },
          { name: "Auth", status: "Scoped", accent: false },
          { name: "Uptime", status: "99.98%", accent: true },
        ].map(({ name, status, accent }) => (
          <div key={name} style={{ background: "#01161b", padding: "10px 12px" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f8794", margin: "0 0 4px" }}>{name}</p>
            <p style={{ fontSize: 11, fontWeight: 600, color: accent ? "#2f8fb5" : "#eaf4f8", margin: 0 }}>{status}</p>
          </div>
        ))}
      </div>

      {/* Footer ticker */}
      <div style={{ padding: "9px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#01161b", overflow: "hidden" }}>
        <div style={{ fontSize: 9, color: "#234554", letterSpacing: "0.12em", overflow: "hidden", whiteSpace: "nowrap", flex: 1 }}>
          <span style={{ display: "inline-block", animation: "sklTicker 14s linear infinite" }}>
            SYS_OK · AUTH_PASS · QUEUE_HEALTHY · LATENCY_NOMINAL · SYS_OK · AUTH_PASS · QUEUE_HEALTHY · LATENCY_NOMINAL ·&nbsp;
          </span>
        </div>
        <span style={{ fontSize: 9, color: "rgba(47,143,181,0.25)", letterSpacing: "0.1em", flexShrink: 0, marginLeft: 12 }}>
          req_7fb88a42
        </span>
      </div>

      <style>{`
        @keyframes sklPulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes sklTicker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative isolate overflow-hidden bg-hero-base"
      aria-label="Next SKL Api Hero"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-16 sm:px-10 sm:py-20 lg:min-h-screen lg:px-16 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">

          {/* Left — copy */}
          <div className="relative space-y-8 lg:pr-4">
            <div className="space-y-4">
              <span className="pill pill-primary px-4 py-1.5 text-[11px] tracking-[0.22em]">
                Infrastructure for modern integrations
              </span>
              <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[4.35rem] lg:leading-[0.93]">
                Next SKL Api: infrastructure your product can trust.
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-8 text-foreground-secondary sm:text-lg lg:text-[1.08rem] lg:leading-9">
                Secure modules, stable contracts, and operational visibility for product, platform, and operations teams building serious digital products.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#final-cta" className="btn btn-primary h-12 px-6">Get Access</a>
              <a href="#flow" className="btn btn-secondary h-12 px-6">Explore Docs</a>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4">
              {['Stable contracts', 'Scoped authentication', 'Production-ready', 'Operational visibility'].map((item) => (
                <div key={item} className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — futuristic gateway card */}
          <div className="relative lg:pl-2">
            <GatewayCard />
          </div>

        </div>
      </div>
    </section>
  );
}