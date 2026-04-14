"use client";

import { ChevronDown } from "lucide-react";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function LandingHero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden dot-grid"
      style={{ backgroundColor: "#FFFFFC" }}
    >
      {/* Mint glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(circle, #B4E3C8 0%, transparent 70%)",
          opacity: 0.35,
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Eyebrow */}
        <div className="inline-flex items-center font-body text-xs font-medium tracking-wide px-4 py-1.5 rounded-full mb-6"
          style={{
            backgroundColor: "rgba(180,227,200,0.40)",
            border: "1px solid rgba(5,160,73,0.20)",
            color: "#05A049",
            letterSpacing: "0.08em",
          }}
        >
          FREE · STRUCTURED · FOR INDIAN INVESTORS
        </div>

        {/* Headline */}
        <h1
          className="font-title font-bold leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "#00111B" }}
        >
          The world is your
          <br />
          <span className="relative inline-block">
            portfolio.
            {/* Wavy SVG underline */}
            <svg
              aria-hidden
              viewBox="0 0 280 10"
              fill="none"
              preserveAspectRatio="none"
              className="absolute w-full"
              style={{ bottom: -4, left: 0, height: 10 }}
            >
              <path
                d="M0 5 Q35 0, 70 5 Q105 10, 140 5 Q175 0, 210 5 Q245 10, 280 5"
                stroke="#05A049"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="font-body text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: "rgba(0,17,27,0.60)" }}
        >
          Atlas teaches Indian investors how to think globally — the
          regulations, the routes, the risks, and the returns. Five modules.
          No jargon.
        </p>

        {/* CTA row */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
          <button
            onClick={() => scrollTo("#access")}
            className="font-body text-base font-semibold text-white h-12 px-8 rounded-full transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "#05A049",
              boxShadow: "0 8px 24px rgba(5,160,73,0.20)",
            }}
          >
            Start learning free →
          </button>
          <button
            onClick={() => scrollTo("#modules")}
            className="font-body text-base h-12 px-8 rounded-full transition-all duration-200"
            style={{
              border: "1px solid rgba(0,17,27,0.15)",
              color: "#00111B",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,17,27,0.40)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,17,27,0.15)")}
          >
            Explore modules ↓
          </button>
        </div>

        {/* Trust row */}
        <div
          className="flex items-center justify-center gap-3 flex-wrap font-body text-xs"
          style={{ color: "rgba(0,17,27,0.40)" }}
        >
          <span>Regulated by IFSCA</span>
          <span style={{ color: "rgba(0,17,27,0.25)" }}>·</span>
          <span>GIFT City, Gandhinagar</span>
          <span style={{ color: "rgba(0,17,27,0.25)" }}>·</span>
          <span>Free for Valura users</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: "rgba(0,17,27,0.25)" }}
      >
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
