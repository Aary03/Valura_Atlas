export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { CheckCircle2, BookOpen, Clock } from "lucide-react";

export const metadata = { title: "My Learning" };

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default async function MyLearningPage() {
  const session = await getServerSession(authOptions);
  const userId = ((session?.user as { id?: string })?.id) ?? "";
  const userName = session?.user?.name ?? "there";

  const [modules, progressRecords] = await Promise.all([
    db.module.findMany({
      orderBy: { order: "asc" },
      include: {
        chapterList: {
          orderBy: { order: "asc" },
          include: { lessons: { orderBy: { order: "asc" } } },
        },
      },
    }),
    db.progress.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      include: {
        lesson: {
          include: {
            chapter: { include: { module: true } },
          },
        },
      },
    }),
  ]);

  // Build per-module stats
  const completedLessonIds = new Set(progressRecords.map((p) => p.lessonId));

  const moduleStats = modules.map((mod) => {
    const allLessons = mod.chapterList.flatMap((c) => c.lessons);
    const total = allLessons.length;
    const done = allLessons.filter((l) => completedLessonIds.has(l.id)).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const started = done > 0;

    // Find the last lesson the user completed in this module
    const lastProgress = progressRecords.find(
      (p) => p.lesson.chapter.moduleId === mod.id
    );
    const lastLesson = lastProgress?.lesson;
    const lastChapter = lastLesson?.chapter;

    // Next lesson after the last completed one
    const flatLessons = mod.chapterList.flatMap((c) => c.lessons);
    const lastCompletedIdx = lastLesson
      ? flatLessons.findIndex((l) => l.id === lastLesson.id)
      : -1;
    const nextLesson =
      lastCompletedIdx >= 0 && lastCompletedIdx < flatLessons.length - 1
        ? flatLessons[lastCompletedIdx + 1]
        : flatLessons[0];
    const nextChapter = nextLesson
      ? mod.chapterList.find((c) => c.id === nextLesson.chapterId)
      : mod.chapterList[0];

    const continueHref =
      nextLesson && nextChapter
        ? `/modules/${mod.slug}/chapter/${nextChapter.id}/lesson/${nextLesson.id}`
        : `/modules/${mod.slug}`;

    return { mod, total, done, pct, started, continueHref, lastLesson, lastChapter };
  });

  const modulesStarted = moduleStats.filter((m) => m.started).length;
  const lessonsCompleted = completedLessonIds.size;
  const totalTime = lessonsCompleted * 7; // ~7 min avg per lesson

  const continueMod = moduleStats.find((m) => m.started && m.pct < 100);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-title text-3xl font-bold text-navy">
          {greeting()}, {userName.split(" ")[0]}.
        </h1>
        <p className="font-body text-base text-ink-2 mt-1">
          Here&apos;s where you left off.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Modules started", value: modulesStarted, icon: BookOpen },
          { label: "Lessons completed", value: lessonsCompleted, icon: CheckCircle2 },
          { label: "Minutes spent", value: totalTime, icon: Clock },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white border border-line rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} className="text-ink-3" />
              <span className="font-body text-xs text-ink-3 uppercase tracking-wide">
                {label}
              </span>
            </div>
            <div className="font-heading text-3xl font-semibold text-navy">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Continue learning */}
      {continueMod && (
        <div className="mb-8">
          <h2 className="font-heading text-lg font-semibold text-navy mb-4">
            Continue learning
          </h2>
          <div className="bg-white border border-line rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <span
                  className="font-body text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
                >
                  {continueMod.mod.level}
                </span>
                <h3 className="font-heading text-base font-semibold text-navy mt-2 mb-1">
                  {continueMod.mod.title}
                </h3>
                {continueMod.lastLesson && (
                  <p className="font-body text-sm text-ink-3 mb-3 truncate">
                    Last: {continueMod.lastLesson.title}
                  </p>
                )}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-body text-xs text-ink-3">
                      {continueMod.done} / {continueMod.total} lessons
                    </span>
                    <span className="font-body text-xs text-green font-medium">
                      {continueMod.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-canvas rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${continueMod.pct}%`,
                        backgroundColor: "#05A049",
                      }}
                    />
                  </div>
                </div>
                <Link
                  href={continueMod.continueHref}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90"
                  style={{ backgroundColor: "#05A049" }}
                >
                  Continue →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All modules */}
      <div>
        <h2 className="font-heading text-lg font-semibold text-navy mb-4">
          All modules
        </h2>
        <div className="space-y-3">
          {moduleStats.map((ms) => (
            <Link
              key={ms.mod.id}
              href={ms.started ? ms.continueHref : `/modules/${ms.mod.slug}`}
              className="group flex items-center gap-5 bg-white border border-line hover:border-line-2 hover:shadow-sm px-5 py-4 rounded-xl transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm font-medium text-navy truncate group-hover:text-green transition-colors">
                    {ms.mod.title}
                  </span>
                  {ms.pct === 100 ? (
                    <CheckCircle2 size={16} className="text-green flex-shrink-0" />
                  ) : (
                    <span className="font-body text-xs text-ink-3 flex-shrink-0">
                      {ms.done}/{ms.total}
                    </span>
                  )}
                </div>
                <div className="h-1.5 bg-canvas rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${ms.pct}%`,
                      backgroundColor: "#05A049",
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
