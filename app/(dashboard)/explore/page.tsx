import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { BarChart2, BookOpen, Clock, ArrowRight } from "lucide-react";

// ─── Per-module gradient configs ─────────────────────────
const MODULE_GRADIENTS = [
  { from: "#0D3B2E", to: "#05A049" },
  { from: "#0D2A3B", to: "#0A6B8A" },
  { from: "#1A1A0D", to: "#4A7C10" },
  { from: "#2B1A0D", to: "#A04505" },
  { from: "#1A0D2B", to: "#6B0A8A" },
];

// ─── Decorative SVG overlays per module ──────────────────
const MODULE_ICONS = [
  // Globe rings
  <svg key="0" viewBox="0 0 120 120" fill="none" className="absolute bottom-0 right-0 w-28 h-28 opacity-10">
    <circle cx="80" cy="80" r="50" stroke="white" strokeWidth="1.5"/>
    <ellipse cx="80" cy="80" rx="20" ry="50" stroke="white" strokeWidth="1.5"/>
    <line x1="30" y1="80" x2="130" y2="80" stroke="white" strokeWidth="1.5"/>
    <line x1="80" y1="30" x2="80" y2="130" stroke="white" strokeWidth="1.5"/>
  </svg>,
  // Chart bars
  <svg key="1" viewBox="0 0 120 120" fill="none" className="absolute bottom-0 right-0 w-28 h-28 opacity-10">
    <rect x="20" y="70" width="18" height="40" rx="3" fill="white"/>
    <rect x="50" y="45" width="18" height="65" rx="3" fill="white"/>
    <rect x="80" y="25" width="18" height="85" rx="3" fill="white"/>
  </svg>,
  // Exchange arrows
  <svg key="2" viewBox="0 0 120 120" fill="none" className="absolute bottom-0 right-0 w-28 h-28 opacity-10">
    <path d="M20 45 L90 45 L75 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M100 75 L30 75 L45 90" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="100" cy="45" r="6" fill="white"/>
    <circle cx="20" cy="75" r="6" fill="white"/>
  </svg>,
  // Dollar / stock candlestick
  <svg key="3" viewBox="0 0 120 120" fill="none" className="absolute bottom-0 right-0 w-28 h-28 opacity-10">
    <line x1="30" y1="20" x2="30" y2="100" stroke="white" strokeWidth="1.5"/>
    <rect x="22" y="40" width="16" height="30" rx="2" fill="white"/>
    <line x1="65" y1="30" x2="65" y2="100" stroke="white" strokeWidth="1.5"/>
    <rect x="57" y="50" width="16" height="35" rx="2" fill="white"/>
    <line x1="100" y1="20" x2="100" y2="90" stroke="white" strokeWidth="1.5"/>
    <rect x="92" y="35" width="16" height="40" rx="2" fill="white"/>
  </svg>,
  // Shield / document
  <svg key="4" viewBox="0 0 120 120" fill="none" className="absolute bottom-0 right-0 w-28 h-28 opacity-10">
    <path d="M60 15 L100 30 L100 65 C100 88 60 105 60 105 C60 105 20 88 20 65 L20 30 Z" stroke="white" strokeWidth="1.5"/>
    <path d="M42 60 L55 73 L80 48" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

const LEVEL_BADGE: Record<string, string> = {
  Beginner: "text-mint",
  Intermediate: "text-amber-300",
};

// ─── Data fetching ────────────────────────────────────────
async function getPageData(userId: string) {
  const [modules, userProgress] = await Promise.all([
    db.module.findMany({
      orderBy: { order: "asc" },
      include: {
        chapterList: {
          include: { lessons: { select: { id: true } } },
        },
      },
    }),
    db.progress.findMany({
      where: { userId },
      select: { lessonId: true },
    }),
  ]);

  const completedSet = new Set(userProgress.map((p) => p.lessonId));

  const modulesWithProgress = modules.map((mod) => {
    const totalLessons = mod.chapterList.reduce(
      (sum, ch) => sum + ch.lessons.length,
      0
    );
    const completedLessons = mod.chapterList.reduce(
      (sum, ch) =>
        sum + ch.lessons.filter((l) => completedSet.has(l.id)).length,
      0
    );
    const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const started = completedLessons > 0;

    // Strip chapterList to avoid sending lesson ids to the client
    const { chapterList: _, ...rest } = mod;
    return { ...rest, totalLessons, completedLessons, pct, started };
  });

  const totalChapters = modules.reduce((s, m) => s + m.chapters, 0);

  return { modules: modulesWithProgress, totalChapters };
}

// ─── Page ─────────────────────────────────────────────────
export default async function ExplorePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id ?? "";

  const { modules, totalChapters } = await getPageData(userId);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="w-full px-6 py-16"
        style={{
          background: "linear-gradient(135deg, #00111B 0%, #0D2D45 100%)",
          borderBottom: "1px solid rgba(255,255,252,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <p
            className="font-heading text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            style={{ color: "#B4E3C8" }}
          >
            Valura Atlas
          </p>

          {/* Headline */}
          <h1 className="font-title text-4xl md:text-5xl font-bold text-cream leading-tight mb-4 max-w-2xl">
            Navigate global markets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-green">
              with clarity.
            </span>
          </h1>

          {/* Subtext */}
          <p className="font-body text-base text-cream/65 max-w-xl leading-relaxed mb-10">
            Structured learning for Indian investors who want to grow beyond
            borders.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center gap-4">
            {[
              { value: `${modules.length} Modules` },
              { value: `${totalChapters} Chapters` },
              { value: "Self-paced" },
            ].map(({ value }) => (
              <div
                key={value}
                className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full"
                style={{
                  background: "rgba(255,255,252,0.04)",
                  border: "1px solid rgba(255,255,252,0.06)",
                }}
              >
                {/* Mint left accent */}
                <span
                  className="w-0.5 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#B4E3C8" }}
                />
                <span className="font-body text-sm text-cream/70">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Module grid ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="font-heading text-2xl font-semibold text-cream mb-8">
          All Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, i) => {
            const gradient = MODULE_GRADIENTS[i % MODULE_GRADIENTS.length];
            const icon = MODULE_ICONS[i % MODULE_ICONS.length];

            return (
              <article
                key={mod.id}
                className="group flex flex-col rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#0A2236",
                  border: "1px solid rgba(255,255,252,0.08)",
                }}
              >
                {/* ── Image / gradient area ── */}
                <div
                  className="relative h-[200px] flex-shrink-0 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                  }}
                >
                  {/* Noise texture overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
                      backgroundSize: "200px 200px",
                    }}
                  />
                  {/* Decorative icon */}
                  <div className="absolute inset-0">{icon}</div>
                  {/* Module index watermark */}
                  <span
                    className="absolute top-4 left-5 font-title text-6xl font-bold leading-none select-none"
                    style={{ color: "rgba(255,255,255,0.08)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Level badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex items-center font-body text-xs px-3 py-1 rounded-full ${LEVEL_BADGE[mod.level] ?? "text-cream/80"}`}
                      style={{ background: "rgba(255,255,255,0.10)" }}
                    >
                      {mod.level}
                    </span>
                  </div>
                  {/* Started badge */}
                  {mod.started && (
                    <div className="absolute bottom-4 left-5">
                      <span
                        className="inline-flex items-center gap-1.5 font-body text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(5,160,73,0.20)",
                          border: "1px solid rgba(5,160,73,0.30)",
                          color: "#B4E3C8",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green" />
                        In progress · {mod.pct}%
                      </span>
                    </div>
                  )}
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-heading font-semibold text-lg text-cream leading-snug mb-1 group-hover:text-mint transition-colors">
                    {mod.title}
                  </h3>
                  <p className="font-body text-sm text-cream/65 leading-relaxed line-clamp-2 flex-1">
                    {mod.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-5 mt-4 mb-5 text-xs font-body text-cream/50">
                    <span className="flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 flex-shrink-0" />
                      {mod.level}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                      {mod.chapters} chapters
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      {mod.duration}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/modules/${mod.slug}`}
                    className="group/btn w-full h-11 rounded-xl font-body text-sm font-medium text-white flex items-center justify-center gap-2 transition-colors bg-green hover:bg-[#03803A]"
                  >
                    {mod.started ? "Continue module" : "View module"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* ── Progress bar ── */}
                {mod.started && (
                  <div
                    className="h-0.5 w-full flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,252,0.05)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${mod.pct}%`,
                        backgroundColor: "#B4E3C8",
                      }}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
