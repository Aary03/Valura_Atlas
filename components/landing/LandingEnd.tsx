"use client";

import { Globe, ShieldCheck, BookOpen } from "lucide-react";
import FadeIn from "./FadeIn";

/* ─── LESSON PREVIEW ─────────────────────────────────────── */

function LessonPreview() {
  return (
    <section className="py-16 md:py-24 px-5" style={{ backgroundColor: "#00111B" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-10 md:mb-12">
          <p className="font-body text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "rgba(180,227,200,0.60)" }}>
            WHAT A LESSON LOOKS LIKE
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold" style={{ color: "#FFFFFC" }}>
            See it before you commit.
          </h2>
          <p className="font-body text-sm mt-3" style={{ color: "rgba(255,255,252,0.45)" }}>
            Here&apos;s a real excerpt from Module 1.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl md:rounded-3xl p-6 md:p-12"
              style={{ backgroundColor: "#0A2236", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-body text-xs mb-5" style={{ color: "rgba(180,227,200,0.50)" }}>
                Home › Why Invest Beyond India › Chapter 1
              </p>
              <h3 className="font-title text-xl md:text-2xl font-bold mb-2" style={{ color: "#FFFFFC" }}>
                More than just different stocks.
              </h3>
              <p className="font-body text-xs mb-6 flex items-center gap-1.5" style={{ color: "rgba(255,255,252,0.35)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                2 min read
              </p>
              <div className="space-y-4 mb-6">
                <p className="font-body text-sm leading-[1.85]" style={{ color: "rgba(255,255,252,0.70)" }}>
                  When most people say they&apos;re diversified, they mean they own ten stocks instead of one. But if all ten are listed on the NSE, denominated in rupees, and react to the same RBI policy decisions, you haven&apos;t diversified. You&apos;ve just spread your concentration across more tickers.
                </p>
                <p className="font-body text-sm leading-[1.85]" style={{ color: "rgba(255,255,252,0.70)" }}>
                  True diversification introduces exposure to different economies. When India has a bad quarter, the US might not. When the rupee weakens, dollar-denominated assets become more valuable in INR terms.
                </p>
              </div>
              <div className="rounded-r-xl p-4" style={{ backgroundColor: "rgba(5,160,73,0.10)", borderLeft: "4px solid #05A049" }}>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#B4E3C8" }}>
                  <strong style={{ color: "#B4E3C8" }}>Key idea:</strong> A portfolio can own 50 stocks and still have zero geographic diversification. The number of holdings is not the point.
                </p>
              </div>
            </div>

            {/* Locked */}
            <div className="relative rounded-2xl px-6 py-5 mt-3 overflow-hidden"
              style={{ backgroundColor: "#0A2236", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-body text-sm leading-[1.85]"
                style={{ color: "rgba(255,255,252,0.70)", filter: "blur(4px)", userSelect: "none", pointerEvents: "none" }}>
                The next concept explains why currency movements matter even when your underlying asset performs well...
              </p>
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: "linear-gradient(to top, #0A2236 30%, transparent 100%)" }}>
                <a href="/signup"
                  className="font-body text-sm font-medium text-white px-5 py-2.5 rounded-full hover:opacity-90 transition"
                  style={{ backgroundColor: "#05A049" }}>
                  Sign up to continue reading →
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PLATFORMS ──────────────────────────────────────────── */

function Platforms() {
  return (
    <section id="platforms" className="py-16 md:py-20 px-5" style={{ backgroundColor: "#F4FBF7" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center">
        <FadeIn>
          <p className="font-body text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#05A049" }}>
            FOR DISTRIBUTION PARTNERS
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: "#00111B" }}>
            Want to offer Atlas to your clients?
          </h2>
          <div className="space-y-3 max-w-sm">
            {[
              "Atlas is built on the Valura India IFSC platform — regulated by IFSCA out of GIFT City, Gandhinagar.",
              "If you're a wealth manager, RIA, or distribution partner, your clients can access Atlas as part of the Valura onboarding experience.",
              "We're currently onboarding channel partners across India.",
            ].map((p, i) => (
              <p key={i} className="font-body text-sm leading-relaxed" style={{ color: "rgba(0,17,27,0.60)" }}>{p}</p>
            ))}
          </div>
          <a href="mailto:partners@valura.ai"
            className="inline-block font-body text-sm font-medium mt-5 underline-offset-4 hover:underline"
            style={{ color: "#05A049" }}>
            Talk to the Valura team →
          </a>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="rounded-2xl p-6 md:p-8 text-center" style={{ backgroundColor: "#00111B" }}>
            <Globe size={36} color="#B4E3C8" className="mx-auto" />
            <h3 className="font-heading text-lg md:text-xl font-semibold mt-4 mb-2" style={{ color: "#FFFFFC" }}>
              Regulated &amp; ready
            </h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,252,0.50)" }}>
              IFSCA · GIFT City · FEMA Compliant · LRS Enabled
            </p>
            <a href="https://valura.ai" target="_blank" rel="noopener noreferrer"
              className="inline-block font-body text-sm mt-5 px-5 py-2.5 rounded-full transition"
              style={{ border: "1px solid rgba(180,227,200,0.30)", color: "#B4E3C8" }}>
              Learn about Valura →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── ACCESS CTA ─────────────────────────────────────────── */

const trustItems = [
  { icon: ShieldCheck, label: "IFSCA Regulated", sub: "Broker-dealer licensed in GIFT City SEZ" },
  { icon: Globe, label: "FEMA Compliant", sub: "LRS-enabled for all Indian residents" },
  { icon: BookOpen, label: "Free with your account", sub: "No separate subscription needed" },
];

function Access() {
  return (
    <section id="access" className="relative py-20 md:py-28 px-5 overflow-hidden text-center"
      style={{ backgroundColor: "#00111B" }}>
      <div aria-hidden className="pointer-events-none absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(700px,100vw)", height: 500,
          background: "radial-gradient(circle, #B4E3C8 0%, transparent 70%)", opacity: 0.15, filter: "blur(80px)", zIndex: 0 }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <FadeIn>
          <p className="font-body text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "rgba(180,227,200,0.60)" }}>
            READY TO START?
          </p>
          <h2 className="font-title font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)", color: "#FFFFFC" }}>
            Atlas lives inside Valura.
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-5 md:mt-6"
            style={{ color: "rgba(255,255,252,0.55)" }}>
            Atlas is a free feature of the Valura India platform. To access all modules, lessons, and your learning progress — sign in or create your Valura account.
          </p>

          <div className="mx-auto my-7" style={{ width: 60, height: 1, backgroundColor: "rgba(180,227,200,0.30)" }} />

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-2 mb-3">
            <a href="/signup"
              className="font-body text-base md:text-lg font-semibold text-white w-full sm:w-auto h-14 px-8 md:px-10 rounded-full inline-flex items-center justify-center hover:opacity-90 transition"
              style={{ backgroundColor: "#05A049", boxShadow: "0 20px 40px rgba(5,160,73,0.25)" }}>
              Create your free account →
            </a>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,252,0.30)" }}>
              Free access · All 5 modules · No credit card
            </p>
          </div>

          {/* Secondary CTA */}
          <a href="/login"
            className="font-body text-sm md:text-base w-full sm:w-auto h-12 px-8 rounded-full inline-flex items-center justify-center transition"
            style={{ border: "1px solid rgba(255,255,252,0.15)", color: "rgba(255,255,252,0.70)" }}>
            Already have an account? Sign in
          </a>

          {/* Trust grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 md:mt-16">
            {trustItems.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-2 text-left">
                <Icon size={22} color="#B4E3C8" className="flex-shrink-0" />
                <div>
                  <p className="font-body text-sm font-medium" style={{ color: "#FFFFFC" }}>{label}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: "rgba(255,255,252,0.40)" }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */

const learnLinks = [
  { label: "Why Atlas", href: "#why" },
  { label: "Modules", href: "#modules" },
  { label: "How it works", href: "#how" },
];

const valuraLinks = [
  { label: "About", href: "https://valura.ai/about" },
  { label: "Partner with us", href: "mailto:partners@valura.ai" },
  { label: "Contact", href: "mailto:hello@valura.ai" },
];

function LandingFooter() {
  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="px-5 py-10 md:py-12"
      style={{ backgroundColor: "#000D14", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-10 mb-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-1 mb-3">
              <span className="font-title text-base font-bold" style={{ color: "#FFFFFC" }}>Atlas</span>
              <span className="font-body text-sm font-medium ml-1" style={{ color: "#05A049" }}>by Valura</span>
            </div>
            <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,252,0.30)" }}>
              An educational platform for global investors, built by Valura India IFSC Private Limited.
            </p>
            <p className="font-body text-xs mt-2" style={{ color: "rgba(255,255,252,0.20)" }}>
              CIN: U64990GJ2025PTC169870
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10 md:gap-16">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,252,0.60)" }}>Learn</p>
              {learnLinks.map((l) => (
                <button key={l.label} onClick={() => scrollTo(l.href)}
                  className="font-body text-xs block mb-2 text-left transition"
                  style={{ color: "rgba(255,255,252,0.40)" }}>
                  {l.label}
                </button>
              ))}
            </div>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,252,0.60)" }}>Valura</p>
              {valuraLinks.map((l) => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="font-body text-xs block mb-2 transition"
                  style={{ color: "rgba(255,255,252,0.40)" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-start">
            <a href="/signup"
              className="font-body text-sm h-9 px-5 rounded-full inline-flex items-center transition"
              style={{ border: "1px solid rgba(5,160,73,0.40)", color: "#05A049" }}>
              Get started free →
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="font-body text-xs" style={{ color: "rgba(255,255,252,0.25)" }}>
            © 2025 Valura India IFSC Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use"].map((t) => (
              <a key={t} href="#" className="font-body text-xs" style={{ color: "rgba(255,255,252,0.25)" }}>{t}</a>
            ))}
            <p className="font-body text-xs" style={{ color: "rgba(255,255,252,0.20)" }}>Made in India 🇮🇳</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { LessonPreview, Platforms, Access, LandingFooter };
