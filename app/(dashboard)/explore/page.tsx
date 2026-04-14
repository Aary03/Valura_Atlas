export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { BookOpen, Clock, BarChart2, ArrowRight } from "lucide-react";

const moduleAccents: Record<number, { bg: string; text: string }> = {
  0: { bg: "#DCFCE7", text: "#15803D" },
  1: { bg: "#DBEAFE", text: "#1D4ED8" },
  2: { bg: "#FEF9C3", text: "#A16207" },
  3: { bg: "#FFE4E6", text: "#BE123C" },
  4: { bg: "#F3E8FF", text: "#7E22CE" },
};

export const metadata = { title: "Explore Modules" };

export default async function ExplorePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;

  const [modules, progressRecords] = await Promise.all([
    db.module.findMany({ orderBy: { order: "asc" } }),
    userId
      ? db.progress.findMany({
          where: { userId },
          include: { lesson: { include: { chapter: true } } },
        })
      : Promise.resolve([]),
  ]);

  const lessonCounts = await Promise.all(
    modules.map((m) => db.lesson.count({ where: { chapter: { moduleId: m.id } } }))
  );

  const completedByModule: Record<string, Set<string>> = {};
  for (const p of progressRecords) {
    const modId = p.lesson.chapter.moduleId;
    if (!completedByModule[modId]) completedByModule[modId] = new Set();
    completedByModule[modId].add(p.lessonId);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      {/* Hero */}
      <div className="mb-8 md:mb-10">
        <p className="font-body text-xs font-semibold text-ink-3 tracking-widest uppercase mb-3">
          VALURA ATLAS
        </p>
        <h1 className="font-title text-3xl md:text-5xl font-bold text-navy leading-tight mb-3">
          Navigate global markets<br className="hidden sm:block" /> with clarity.
        </h1>
        <p className="font-body text-sm md:text-base text-ink-2 max-w-xl mb-5">
          Structured learning for Indian investors who want to grow beyond borders.
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {["5 Modules", "25+ Chapters", "Self-paced", "Free"].map((pill) => (
            <span key={pill} className="font-body text-xs font-medium text-ink-2 bg-white border border-line px-3 py-1.5 rounded-full">
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-lg md:text-xl font-semibold text-navy">All Modules</h2>
        <span className="font-body text-sm text-ink-3">{modules.length} modules</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {modules.map((mod, idx) => {
          const accent = moduleAccents[idx] ?? moduleAccents[0];
          const total = lessonCounts[idx] || 1;
          const done = completedByModule[mod.id]?.size ?? 0;
          const pct = Math.round((done / total) * 100);
          const started = done > 0;

          return (
            <Link
              key={mod.id}
              href={`/modules/${mod.slug}`}
              className="group bg-white rounded-2xl border border-line hover:border-line-2 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: accent.bg }} />
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-body text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: accent.bg, color: accent.text }}>
                    {mod.level}
                  </span>
                  {started && (
                    <span className="font-body text-xs text-green font-medium">{pct}% done</span>
                  )}
                </div>
                <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-1.5 group-hover:text-green transition-colors">
                  {mod.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-ink-2 line-clamp-2 mb-4 leading-relaxed">
                  {mod.description.split("\n\n")[0].slice(0, 100)}…
                </p>
                <div className="flex items-center gap-3 mb-4 text-xs text-ink-3">
                  <span className="flex items-center gap-1"><BookOpen size={11} />{mod.chapters} ch</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{mod.duration}</span>
                </div>
                {started && (
                  <div className="mb-4">
                    <div className="h-1.5 bg-canvas rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#05A049" }} />
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm font-medium text-green group-hover:gap-2.5 transition-all">
                  {started ? "Continue" : "View module"}
                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
