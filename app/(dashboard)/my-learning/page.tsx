import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ArrowRight, CheckCircle2, BookOpen, Clock, Zap } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────

async function getPageData(userId: string) {
  // All modules with chapter → lesson structure + user progress in parallel
  const [modules, progressRows] = await Promise.all([
    db.module.findMany({
      orderBy: { order: "asc" },
      include: {
        chapterList: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              select: { id: true, title: true, readTime: true, chapterId: true },
            },
          },
        },
      },
    }),
    db.progress.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      select: { lessonId: true, completedAt: true },
    }),
  ]);

  const completedMap = new Map(progressRows.map((p) => [p.lessonId, p.completedAt]));
  const completedIds = new Set(completedMap.keys());

  // Per-module stats
  const moduleStats = modules.map((mod) => {
    const allLessons = mod.chapterList.flatMap((ch) =>
      ch.lessons.map((l) => ({ ...l }))
    );
    const totalLessons = allLessons.length;
    const completedLessons = allLessons.filter((l) => completedIds.has(l.id)).length;
    const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const started = completedLessons > 0;
    const finished = totalLessons > 0 && completedLessons === totalLessons;

    // Most recently completed lesson in this module
    let lastCompletedAt: Date | null = null;
    let lastLesson: { id: string; title: string; chapterId: string } | null = null;
    for (const l of allLessons) {
      const completedAt = completedMap.get(l.id);
      if (completedAt && (!lastCompletedAt || completedAt > lastCompletedAt)) {
        lastCompletedAt = completedAt;
        lastLesson = l;
      }
    }

    // Next lesson to read = first lesson without a progress record
    const nextLesson = allLessons.find((l) => !completedIds.has(l.id)) ?? null;
    const firstChapterId = mod.chapterList[0]?.id ?? null;
    const firstLessonId = mod.chapterList[0]?.lessons[0]?.id ?? null;

    const continueHref = nextLesson
      ? `/modules/${mod.slug}/chapter/${nextLesson.chapterId}/lesson/${nextLesson.id}`
      : firstLessonId && firstChapterId
      ? `/modules/${mod.slug}/chapter/${firstChapterId}/lesson/${firstLessonId}`
      : `/modules/${mod.slug}`;

    // Estimated time: sum of readTime for all lessons
    const totalMinutes = allLessons.reduce((s, l) => s + l.readTime, 0);
    const completedMinutes = allLessons
      .filter((l) => completedIds.has(l.id))
      .reduce((s, l) => s + l.readTime, 0);

    return {
      mod: {
        id: mod.id,
        slug: mod.slug,
        title: mod.title,
        level: mod.level,
        chapters: mod.chapters,
      },
      totalLessons,
      completedLessons,
      pct,
      started,
      finished,
      lastCompletedAt,
      lastLesson,
      nextLesson,
      continueHref,
      totalMinutes,
      completedMinutes,
    };
  });

  // Global stats
  const modulesStarted = moduleStats.filter((m) => m.started).length;
  const totalLessonsCompleted = progressRows.length;
  const totalMinutesRead = moduleStats.reduce((s, m) => s + m.completedMinutes, 0);

  // Most recently active module
  const activeModule = moduleStats
    .filter((m) => m.started && !m.finished)
    .sort((a, b) =>
      (b.lastCompletedAt?.getTime() ?? 0) - (a.lastCompletedAt?.getTime() ?? 0)
    )[0] ?? moduleStats.find((m) => m.started) ?? null;

  return {
    moduleStats,
    modulesStarted,
    totalLessonsCompleted,
    totalMinutesRead,
    activeModule,
  };
}

// ─── Helpers ──────────────────────────────────────────────

function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ─── Module gradient map ──────────────────────────────────
const MODULE_GRADIENTS: Record<number, { from: string; to: string }> = {
  0: { from: "#0D3B2E", to: "#05A049" },
  1: { from: "#0D2A3B", to: "#0A6B8A" },
  2: { from: "#1A1A0D", to: "#4A7C10" },
  3: { from: "#2B1A0D", to: "#A04505" },
  4: { from: "#1A0D2B", to: "#6B0A8A" },
};

// ─── Page ─────────────────────────────────────────────────

export default async function MyLearningPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id ?? "";
  const userName = session?.user?.name ?? null;

  const {
    moduleStats,
    modulesStarted,
    totalLessonsCompleted,
    totalMinutesRead,
    activeModule,
  } = await getPageData(userId);

  const hasStarted = modulesStarted > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* ── Header ──────────────────────────────────── */}
      <div className="mb-10">
        <h1 className="font-title text-3xl font-bold text-cream">
          {greeting()}{userName ? `, ${userName.split(" ")[0]}` : ""}.
        </h1>
        <p className="font-body text-base mt-2" style={{ color: "rgba(255,255,252,0.55)" }}>
          {hasStarted ? "Here's where you left off." : "Start a module to begin tracking your progress."}
        </p>
      </div>

      {/* ── Stat cards ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          {
            icon: BookOpen,
            label: "Modules started",
            value: String(modulesStarted),
          },
          {
            icon: Zap,
            label: "Lessons completed",
            value: String(totalLessonsCompleted),
          },
          {
            icon: Clock,
            label: "Time spent",
            value: totalMinutesRead > 0 ? formatMinutes(totalMinutesRead) : "—",
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{
              backgroundColor: "#0A2236",
              border: "1px solid rgba(255,255,252,0.08)",
            }}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,252,0.40)" }} />
              <span
                className="font-body text-xs uppercase tracking-widest"
                style={{ color: "rgba(255,255,252,0.45)" }}
              >
                {label}
              </span>
            </div>
            <p className="font-heading text-3xl font-semibold text-cream leading-none">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Continue learning ───────────────────────── */}
      {activeModule && (
        <section className="mb-12">
          <h2 className="font-heading text-base font-semibold text-cream/60 uppercase tracking-widest text-xs mb-4">
            Continue learning
          </h2>

          <div
            className="rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            style={{
              backgroundColor: "#0A2236",
              border: "1px solid rgba(255,255,252,0.08)",
            }}
          >
            {/* Gradient banner */}
            {(() => {
              const idx = moduleStats.findIndex((m) => m.mod.id === activeModule.mod.id);
              const g = MODULE_GRADIENTS[idx] ?? MODULE_GRADIENTS[0];
              return (
                <div
                  className="w-full sm:w-48 h-28 sm:h-auto flex-shrink-0 relative"
                  style={{ background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)` }}
                >
                  <span
                    className="absolute bottom-3 left-4 font-title text-5xl font-bold leading-none select-none"
                    style={{ color: "rgba(255,255,255,0.08)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })()}

            {/* Body */}
            <div className="flex-1 p-6 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="font-body text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,252,0.07)", color: "rgba(255,255,252,0.50)" }}
                  >
                    {activeModule.mod.level}
                  </span>
                  <span className="font-body text-xs" style={{ color: "rgba(255,255,252,0.25)" }}>
                    {activeModule.completedLessons} of {activeModule.totalLessons} lessons done
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-cream text-xl leading-snug mb-3">
                  {activeModule.mod.title}
                </h3>

                {/* Progress bar */}
                <div
                  className="w-full rounded-full mb-1"
                  style={{ height: "6px", backgroundColor: "rgba(255,255,252,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${activeModule.pct}%`, backgroundColor: "#B4E3C8" }}
                  />
                </div>
                <p className="font-body text-xs" style={{ color: "rgba(255,255,252,0.35)" }}>
                  {activeModule.pct}% complete
                </p>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                {activeModule.nextLesson && (
                  <p className="font-body text-sm" style={{ color: "rgba(255,255,252,0.45)" }}>
                    Next up:{" "}
                    <span className="text-cream/70">
                      {activeModule.nextLesson.title}
                    </span>
                  </p>
                )}
                <Link
                  href={activeModule.continueHref}
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-white px-5 py-2.5 rounded-xl transition-colors bg-green hover:bg-[#03803A] flex-shrink-0"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── All modules progress ─────────────────────── */}
      <section>
        <h2 className="font-heading text-base font-semibold text-cream/60 uppercase tracking-widest text-xs mb-4">
          All modules
        </h2>

        <div className="flex flex-col gap-3">
          {moduleStats.map((ms, i) => {
            const g = MODULE_GRADIENTS[i] ?? MODULE_GRADIENTS[0];

            return (
              <Link
                key={ms.mod.id}
                href={ms.started ? ms.continueHref : `/modules/${ms.mod.slug}`}
                className="group flex items-center gap-5 px-5 py-4 rounded-xl transition-all"
                style={{
                  backgroundColor: "#0A2236",
                  border: "1px solid rgba(255,255,252,0.08)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(180,227,200,0.20)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,252,0.08)")
                }
              >
                {/* Colour swatch */}
                <div
                  className="w-9 h-9 rounded-lg flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)` }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <p className="font-body text-sm text-cream truncate group-hover:text-mint transition-colors">
                      {ms.mod.title}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {ms.finished ? (
                        <span className="flex items-center gap-1 font-body text-xs" style={{ color: "#B4E3C8" }}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Complete
                        </span>
                      ) : (
                        <span className="font-body text-xs" style={{ color: "rgba(255,255,252,0.35)" }}>
                          {ms.completedLessons}/{ms.totalLessons} lessons
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div
                    className="w-full rounded-full overflow-hidden"
                    style={{ height: "6px", backgroundColor: "rgba(255,255,252,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${ms.pct}%`,
                        backgroundColor: ms.finished ? "#B4E3C8" : "#05A049",
                      }}
                    />
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                  style={{ color: "rgba(255,255,252,0.20)" }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Empty state ─────────────────────────────── */}
      {!hasStarted && (
        <div
          className="rounded-2xl px-6 py-16 text-center mt-8"
          style={{
            backgroundColor: "#0A2236",
            border: "1px solid rgba(255,255,252,0.06)",
          }}
        >
          <p className="font-heading font-semibold text-xl text-cream/30 mb-2">
            No progress yet
          </p>
          <p className="font-body text-sm text-cream/20 mb-6">
            Complete your first lesson to see your learning tracked here.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-white px-6 py-2.5 rounded-xl bg-green hover:bg-[#03803A] transition-colors"
          >
            Browse modules <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
