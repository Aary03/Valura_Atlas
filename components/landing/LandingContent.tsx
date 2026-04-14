"use client";

import { CheckCircle2, BookOpen, Clock, BarChart2, ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

/* ─────────────────────────────────────────────────────────── */
/* TICKER                                                      */
/* ─────────────────────────────────────────────────────────── */

const tickerItems = [
  "5 Learning Modules",
  "25+ Chapters",
  "Self-paced",
  "Free for all Valura users",
  "Beginner-friendly",
  "India's first global investing curriculum",
  "IFSCA Regulated",
];

function Ticker() {
  const items = [...tickerItems, ...tickerItems]; // duplicate for seamless loop
  return (
    <div
      id="stats"
      className="w-full overflow-hidden flex items-center"
      style={{ height: 72, backgroundColor: "#00111B" }}
    >
      <div className="animate-ticker flex items-center gap-0 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-body text-sm font-medium uppercase tracking-widest"
              style={{ color: "rgba(255,255,252,0.70)" }}
            >
              {item}
            </span>
            <span
              className="mx-8 text-xl font-bold select-none"
              style={{ color: "#B4E3C8" }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* WHY ATLAS                                                   */
/* ─────────────────────────────────────────────────────────── */

const features = [
  "Built for Indian residents under LRS and FEMA",
  "Covers everything from LRS basics to Schedule FA filing",
  "Written by practitioners, not textbook authors",
  "Free for all Valura India account holders",
];

const statCards = [
  { value: "₹0", label: "Cost to access", dark: false },
  { value: "5", label: "Structured modules", dark: false },
  { value: "$250K", label: "LRS limit you can deploy", dark: false },
  { value: "1", label: "Place to learn it all", dark: true },
];

function WhyAtlas() {
  return (
    <section id="why" className="py-24 px-6" style={{ backgroundColor: "#FFFFFC" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <FadeIn>
          <p
            className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#05A049" }}
          >
            WHY ATLAS
          </p>
          <h2
            className="font-heading text-4xl font-bold leading-snug mb-4"
            style={{ color: "#00111B" }}
          >
            98% of Indian portfolios never leave India.
          </h2>
          <div className="space-y-3 mb-8">
            {[
              "Not because it's a good decision — but because nobody explained the alternative clearly.",
              "Atlas is the curriculum we wish existed. Five structured modules covering the why, the how, the regulations, and the tax implications of investing globally as an Indian resident.",
              "Not a course. Not a newsletter. A proper body of knowledge you can actually act on.",
            ].map((p, i) => (
              <p key={i} className="font-body text-base leading-relaxed" style={{ color: "rgba(0,17,27,0.60)" }}>
                {p}
              </p>
            ))}
          </div>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} color="#05A049" className="mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm" style={{ color: "rgba(0,17,27,0.75)" }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Right — stat cards 2×2 */}
        <FadeIn delay={150}>
          <div className="grid grid-cols-2 gap-4">
            {statCards.map((c) => (
              <div
                key={c.label}
                className="card-hover rounded-2xl p-6"
                style={
                  c.dark
                    ? { backgroundColor: "#00111B" }
                    : {
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(0,17,27,0.08)",
                      }
                }
              >
                <div
                  className="font-title text-5xl font-bold leading-none mb-2"
                  style={{ color: c.dark ? "#B4E3C8" : "#05A049" }}
                >
                  {c.value}
                </div>
                <div
                  className="font-body text-sm"
                  style={{ color: c.dark ? "rgba(255,255,252,0.50)" : "rgba(0,17,27,0.50)" }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* MODULES                                                     */
/* ─────────────────────────────────────────────────────────── */

const modules = [
  {
    num: "01",
    numColor: "#05A049",
    level: "Beginner",
    meta: "4 chapters · 31 min",
    title: "Why Invest Beyond India",
    desc: "Does diversification mean more than owning different stocks?",
    slug: "why-invest-beyond-india",
  },
  {
    num: "02",
    numColor: "#2D9E6B",
    level: "Beginner",
    meta: "7 chapters · 1.8 hrs",
    title: "Accessing Global Markets",
    desc: "Investing globally is legal, accessible, and very doable for Indian residents.",
    slug: "accessing-global-markets",
  },
  {
    num: "03",
    numColor: "rgba(0,17,27,0.20)",
    level: "Beginner",
    meta: "4 chapters · 40 min",
    title: "Cross-Border Money Movement",
    desc: "Three forces shape your actual return: asset performance, currency, and costs.",
    slug: "cross-border-money-movement",
  },
  {
    num: "04",
    numColor: "#05A049",
    level: "Beginner",
    meta: "5 chapters · 1.5 hrs",
    title: "Understanding US Stocks",
    desc: "The US equity market is the largest and most liquid in the world.",
    slug: "understanding-us-stocks",
  },
  {
    num: "05",
    numColor: "#00111B",
    level: "Intermediate",
    meta: "5 chapters · 1.5 hrs",
    title: "Tax & Compliance for Global Investors",
    desc: "What the taxman thinks when you invest globally — and how to stay clean.",
    slug: "tax-compliance-global-investors",
  },
];

function Modules() {
  return (
    <section id="modules" className="py-24 px-6" style={{ backgroundColor: "#F4FBF7" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p
            className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#05A049" }}
          >
            THE CURRICULUM
          </p>
          <h2 className="font-heading text-4xl font-bold" style={{ color: "#00111B" }}>
            Five modules. One complete picture.
          </h2>
          <p
            className="font-body text-base mt-3 max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(0,17,27,0.55)" }}
          >
            From understanding why global diversification matters, to filing
            your Schedule FA — we cover the full journey.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {modules.map((m, i) => (
            <FadeIn key={m.num} delay={i * 80}>
              <div
                className="card-hover bg-white rounded-2xl px-8 py-6 flex items-center gap-8 cursor-pointer"
                style={{ border: "1px solid rgba(0,17,27,0.08)" }}
              >
                {/* Number */}
                <div
                  className="font-title text-6xl font-bold flex-shrink-0 select-none"
                  style={{ color: m.numColor, minWidth: 80 }}
                >
                  {m.num}
                </div>

                {/* Center */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="font-body text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: m.level === "Intermediate" ? "rgba(126,34,206,0.08)" : "rgba(5,160,73,0.10)",
                        color: m.level === "Intermediate" ? "#7E22CE" : "#05A049",
                      }}
                    >
                      {m.level}
                    </span>
                    <span
                      className="font-body text-xs"
                      style={{ color: "rgba(0,17,27,0.45)" }}
                    >
                      {m.meta}
                    </span>
                  </div>
                  <h3
                    className="font-heading text-xl font-semibold"
                    style={{ color: "#00111B" }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="font-body text-sm mt-1.5"
                    style={{ color: "rgba(0,17,27,0.55)" }}
                  >
                    {m.desc}
                  </p>
                </div>

                {/* Right CTA */}
                <div className="hidden md:flex items-center gap-1 font-body text-sm font-medium flex-shrink-0 transition-all"
                  style={{ color: "#05A049" }}>
                  Explore <ArrowRight size={14} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-12">
          <p className="font-body text-sm" style={{ color: "rgba(0,17,27,0.45)" }}>
            All modules are free for Valura account holders.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* HOW IT WORKS                                                */
/* ─────────────────────────────────────────────────────────── */

const steps = [
  {
    n: "1",
    title: "Read",
    body: "Each lesson is written like a thoughtful explainer — not a textbook. 2–5 minutes per lesson.",
  },
  {
    n: "2",
    title: "Test yourself",
    body: "Quick checks after each lesson make sure the concept actually sticks. No grades, no pressure.",
  },
  {
    n: "3",
    title: "Apply it",
    body: "Every chapter ends with a short reflection exercise — connecting the concept to your own portfolio.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6" style={{ backgroundColor: "#FFFFFC" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p
            className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#05A049" }}
          >
            HOW IT WORKS
          </p>
          <h2 className="font-heading text-4xl font-bold" style={{ color: "#00111B" }}>
            Learning that respects your time.
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="relative grid md:grid-cols-3 gap-10 md:gap-0">
            {/* Dashed connector line — desktop only */}
            <div
              className="hidden md:block absolute top-5 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)]"
              style={{ borderTop: "2px dashed #B4E3C8" }}
            />

            {steps.map((s) => (
              <div key={s.n} className="relative text-center md:px-10">
                {/* Number circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-title text-base font-bold relative z-10"
                  style={{
                    backgroundColor: "rgba(5,160,73,0.10)",
                    border: "1px solid rgba(5,160,73,0.20)",
                    color: "#05A049",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  className="font-heading text-lg font-semibold mb-2"
                  style={{ color: "#00111B" }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed max-w-xs mx-auto"
                  style={{ color: "rgba(0,17,27,0.55)" }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* EXPORT                                                      */
/* ─────────────────────────────────────────────────────────── */

export { Ticker, WhyAtlas, Modules, HowItWorks };
