import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Breadcrumb from "@/components/Breadcrumb";
import {
  BarChart2,
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  Check,
} from "lucide-react";

interface Props {
  params: { slug: string };
}

async function getPageData(slug: string, userId: string) {
  const [mod, userProgress] = await Promise.all([
    db.module.findUnique({
      where: { slug },
      include: {
        chapterList: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              select: { id: true },
              orderBy: { order: "asc" },
            },
          },
        },
      },
    }),
    db.progress.findMany({
      where: { userId },
      select: { lessonId: true },
    }),
  ]);

  if (!mod) return null;

  const completedSet = new Set(userProgress.map((p) => p.lessonId));

  const chaptersWithStatus = mod.chapterList.map((ch) => {
    const totalLessons = ch.lessons.length;
    const completedLessons = ch.lessons.filter((l) =>
      completedSet.has(l.id)
    ).length;
    const completed = totalLessons > 0 && completedLessons === totalLessons;
    return { ...ch, completed, completedLessons, totalLessons };
  });

  // Parse outcomes from JSON string stored in DB
  let outcomes: string[] = [];
  try {
    outcomes = JSON.parse(mod.outcomes) as string[];
  } catch {
    outcomes = [];
  }

  // Split multi-paragraph description into array for rendering
  const aboutParagraphs = mod.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return { mod, chaptersWithStatus, outcomes, aboutParagraphs };
}

export default async function ModuleDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id ?? "";

  const data = await getPageData(params.slug, userId);
  if (!data) notFound();

  const { mod, chaptersWithStatus, outcomes, aboutParagraphs } = data;

  // First lesson of first chapter — used for the start CTA
  const firstChapter = chaptersWithStatus[0];
  const firstLessonId = firstChapter?.lessons?.[0]?.id;
  const startHref =
    firstChapter && firstLessonId
      ? `/modules/${mod.slug}/chapter/${firstChapter.id}/lesson/${firstLessonId}`
      : firstChapter
      ? `/modules/${mod.slug}/chapter/${firstChapter.id}`
      : "#";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Explore", href: "/explore" },
            { label: mod.title },
          ]}
        />
      </div>

      {/* ── Two-column layout ───────────────────────────
            On mobile: sidebar first (above chapters), then main content.
            On desktop: main content left (flex-1), sidebar right (sticky).
            We achieve this with flex-col-reverse on mobile + lg:flex-row. ── */}
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-14 items-start">

        {/* ── Left column ───────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <h1 className="font-title text-4xl font-bold text-cream leading-tight mb-3">
            {mod.title}
          </h1>

          {/* Short description — first paragraph only in header */}
          <p className="font-body text-base text-cream/70 leading-relaxed mt-3 mb-6 max-w-prose">
            {aboutParagraphs[0] ?? mod.description}
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 mb-7">
            {[
              { icon: BarChart2, label: mod.level },
              { icon: BookOpen, label: `${mod.chapters} Chapters` },
              { icon: Clock, label: mod.duration },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 font-body text-xs text-cream px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,252,0.08)" }}
              >
                <Icon className="w-3.5 h-3.5 text-cream/50 flex-shrink-0" />
                {label}
              </span>
            ))}
          </div>

          {/* Start CTA */}
          <Link
            href={startHref}
            className="inline-flex items-center gap-2 font-body text-base font-medium text-white h-12 px-8 rounded-xl transition-colors bg-green hover:bg-[#03803A]"
          >
            Start learning
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="border-b border-white/10 my-10" />

          {/* About section — all paragraphs */}
          {aboutParagraphs.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading text-xl font-semibold text-cream mb-5">
                About this module
              </h2>
              <div className="space-y-4">
                {aboutParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-base text-cream/70 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Chapters */}
          <section>
            <h2 className="font-heading text-xl font-semibold text-cream mb-5">
              Chapters
            </h2>

            {chaptersWithStatus.length > 0 ? (
              <div className="flex flex-col gap-3">
                {chaptersWithStatus.map((ch, ci) => {
                  const firstLesson = ch.lessons?.[0];
                  const chapterHref =
                    firstLesson
                      ? `/modules/${mod.slug}/chapter/${ch.id}/lesson/${firstLesson.id}`
                      : `/modules/${mod.slug}/chapter/${ch.id}`;

                  return (
                    <div
                      key={ch.id}
                      className="flex items-center justify-between px-5 py-4 rounded-xl"
                      style={{
                        backgroundColor: "#0A2236",
                        border: "1px solid rgba(255,255,252,0.08)",
                      }}
                    >
                      {/* Left */}
                      <div className="flex items-center gap-4 min-w-0 mr-4">
                        <span
                          className="font-mono text-sm flex-shrink-0 tabular-nums"
                          style={{ color: "#B4E3C8" }}
                        >
                          {String(ci + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p className="font-body text-base text-cream leading-snug truncate">
                            {ch.title}
                          </p>
                          {ch.totalLessons > 0 && (
                            <p className="font-body text-xs text-cream/35 mt-0.5">
                              {ch.completedLessons}/{ch.totalLessons} lesson
                              {ch.totalLessons !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex-shrink-0">
                        {ch.completed ? (
                          <span className="flex items-center gap-1.5 text-sm font-body text-mint">
                            <CheckCircle2 className="w-4 h-4" />
                            Done
                          </span>
                        ) : (
                          <Link
                            href={chapterHref}
                            className="flex items-center gap-1 text-sm font-body transition-colors hover:underline underline-offset-2"
                            style={{ color: "#B4E3C8" }}
                          >
                            {ch.completedLessons > 0 ? "Continue" : "Start chapter"}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="rounded-xl px-6 py-10 text-center"
                style={{
                  backgroundColor: "#0A2236",
                  border: "1px solid rgba(255,255,252,0.08)",
                }}
              >
                <p className="font-body text-cream/30">Chapters coming soon.</p>
              </div>
            )}
          </section>
        </div>

        {/* ── Right column — sticky sidebar ─────────── */}
        <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 lg:sticky lg:top-24">
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "#0A2236",
              border: "1px solid rgba(255,255,252,0.08)",
            }}
          >
            <h2 className="font-heading text-base font-semibold text-cream mb-5">
              Skills you will gain
            </h2>

            {outcomes.length > 0 ? (
              <ul className="space-y-3 mb-7">
                {outcomes.map((skill, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center bg-mint/10">
                      <Check
                        className="w-2.5 h-2.5"
                        style={{ color: "#B4E3C8" }}
                        strokeWidth={3}
                      />
                    </span>
                    <span className="font-body text-sm text-cream/80 leading-snug">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-body text-sm text-cream/40 mb-7">
                Learning outcomes coming soon.
              </p>
            )}

            <Link
              href={startHref}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-xl font-body text-sm font-medium text-white transition-colors bg-green hover:bg-[#03803A]"
            >
              Start learning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-center font-body text-xs text-cream/40 mt-4">
            Free for all Valura users
          </p>
        </aside>
      </div>
    </div>
  );
}
