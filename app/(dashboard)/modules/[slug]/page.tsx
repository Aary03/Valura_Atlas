import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Breadcrumb from "@/components/Breadcrumb";
import { BarChart2, BookOpen, Clock, CheckCircle2, CheckCircle } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const mod = await db.module.findUnique({ where: { slug: params.slug } });
  return { title: mod?.title ?? "Module" };
}

export default async function ModulePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;

  const mod = await db.module.findUnique({
    where: { slug: params.slug },
    include: {
      chapterList: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!mod) notFound();

  const completedLessonIds = userId
    ? new Set(
        (await db.progress.findMany({ where: { userId }, select: { lessonId: true } }))
          .map((p) => p.lessonId)
      )
    : new Set<string>();

  let outcomes: string[] = [];
  try {
    outcomes = JSON.parse(mod.outcomes ?? "[]");
  } catch {
    outcomes = [];
  }

  const paragraphs = mod.description.split("\n\n").filter(Boolean);
  const firstChapter = mod.chapterList[0];
  const firstLesson = firstChapter?.lessons[0];
  const startHref = firstChapter && firstLesson
    ? `/modules/${mod.slug}/chapter/${firstChapter.id}/lesson/${firstLesson.id}`
    : "#";

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Explore", href: "/explore" },
          { label: mod.title },
        ]}
      />

      <div className="mt-6 flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        {/* ─── Left column ──────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <span
            className="font-body text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: mod.level === "Intermediate" ? "#F3E8FF" : "#DCFCE7",
              color: mod.level === "Intermediate" ? "#7E22CE" : "#15803D",
            }}
          >
            {mod.level}
          </span>

          <h1 className="font-title text-4xl md:text-5xl font-bold text-navy mt-4 leading-tight">
            {mod.title}
          </h1>
          <p className="font-body text-base text-ink-2 mt-3 leading-relaxed">
            {paragraphs[0]}
          </p>

          {/* Meta chips */}
          <div className="flex items-center gap-2 mt-5 flex-wrap">
            {[
              { icon: BarChart2, label: mod.level },
              { icon: BookOpen, label: `${mod.chapters} chapters` },
              { icon: Clock, label: mod.duration },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 font-body text-xs text-ink-2 bg-surface-2 border border-line px-3 py-1.5 rounded-full"
              >
                <Icon size={12} />
                {label}
              </span>
            ))}
          </div>

          <Link
            href={startHref}
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white h-11 px-6 rounded-xl mt-6 transition-all hover:opacity-90"
            style={{ backgroundColor: "#05A049" }}
          >
            Start learning →
          </Link>

          <hr className="my-8 border-line" />

          {/* About */}
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-navy mb-5">
              About this module
            </h2>
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="font-body text-base text-ink-2 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Chapters */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-navy mb-5">
              Chapters
            </h2>
            <div className="space-y-3">
              {mod.chapterList.map((chapter, ci) => {
                const allDone =
                  chapter.lessons.length > 0 &&
                  chapter.lessons.every((l) => completedLessonIds.has(l.id));
                const firstL = chapter.lessons[0];
                return (
                  <Link
                    key={chapter.id}
                    href={
                      firstL
                        ? `/modules/${mod.slug}/chapter/${chapter.id}/lesson/${firstL.id}`
                        : "#"
                    }
                    className="group flex items-center justify-between bg-white border border-line hover:border-line-2 rounded-xl px-5 py-4 transition-all hover:shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-body text-xs font-mono text-ink-3 w-6 text-center flex-shrink-0">
                        {String(ci + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-sm text-ink group-hover:text-navy transition-colors">
                        {chapter.title}
                      </span>
                    </div>
                    {allDone ? (
                      <CheckCircle size={16} color="#05A049" />
                    ) : (
                      <span className="font-body text-xs text-green font-medium group-hover:underline">
                        Start →
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Right sidebar ────────────────────────────────── */}
        <div className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-line p-6">
            <h3 className="font-heading text-base font-semibold text-navy mb-4">
              Skills you will gain
            </h3>
            <ul className="space-y-3">
              {outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" color="#05A049" />
                  <span className="font-body text-sm text-ink-2 leading-snug">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={startHref}
              className="flex items-center justify-center gap-2 font-body text-sm font-semibold text-white h-11 rounded-xl mt-6 transition-all hover:opacity-90"
              style={{ backgroundColor: "#05A049" }}
            >
              Start learning →
            </Link>
            <p className="font-body text-xs text-ink-3 text-center mt-3">
              Free for all Valura users
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
