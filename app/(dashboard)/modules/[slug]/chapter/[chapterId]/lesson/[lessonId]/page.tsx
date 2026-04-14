import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { QUIZ_QUESTIONS } from "@/lib/quizContent";
import { EXERCISE_PROMPTS } from "@/lib/exerciseContent";
import Breadcrumb from "@/components/Breadcrumb";
import LessonBody from "@/components/LessonBody";
import LessonQuiz from "@/components/LessonQuiz";
import LessonExercise from "@/components/LessonExercise";
import LessonNav from "@/components/LessonNav";
import ShareButton from "@/components/ShareButton";
import { Clock } from "lucide-react";

interface Props {
  params: {
    slug: string;
    chapterId: string;
    lessonId: string;
  };
}

async function getPageData(slug: string, chapterId: string, lessonId: string) {
  // Fetch the current lesson with its chapter + module
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      chapter: {
        include: {
          module: true,
        },
      },
    },
  });

  if (
    !lesson ||
    lesson.chapterId !== chapterId ||
    lesson.chapter.module.slug !== slug
  ) {
    return null;
  }

  // All lessons for this module in reading order (for prev/next + total count)
  const allChapters = await db.chapter.findMany({
    where: { moduleId: lesson.chapter.moduleId },
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        select: { id: true, title: true, order: true, chapterId: true },
      },
    },
  });

  // Flatten into an ordered lesson list
  const flatLessons = allChapters.flatMap((ch) =>
    ch.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      chapterId: l.chapterId,
      slug,
    }))
  );

  const currentIndex = flatLessons.findIndex((l) => l.id === lessonId);

  const makePath = (l: (typeof flatLessons)[number]) =>
    `/modules/${slug}/chapter/${l.chapterId}/lesson/${l.id}`;

  const prevLesson =
    currentIndex > 0
      ? { href: makePath(flatLessons[currentIndex - 1]), label: flatLessons[currentIndex - 1].title }
      : null;

  const nextLesson =
    currentIndex < flatLessons.length - 1
      ? { href: makePath(flatLessons[currentIndex + 1]), label: flatLessons[currentIndex + 1].title }
      : null;

  return {
    lesson,
    chapter: lesson.chapter,
    mod: lesson.chapter.module,
    prevLesson,
    nextLesson,
    lessonIndexInModule: currentIndex + 1, // 1-based
    totalLessonsInModule: flatLessons.length,
    // Position within the chapter (0-based) — derived from the chapter's flat lesson list
    lessonIndexInChapter:
      allChapters
        .find((ch) => ch.id === chapterId)
        ?.lessons.findIndex((l) => l.id === lessonId) ?? currentIndex,
  };
}

export default async function LessonPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  void session; // auth guard is in the parent layout

  const data = await getPageData(params.slug, params.chapterId, params.lessonId);
  if (!data) notFound();

  const { lesson, chapter, mod, prevLesson, nextLesson, lessonIndexInModule, totalLessonsInModule, lessonIndexInChapter } = data;

  // Pick a quiz question based on lesson position
  const moduleQuestions = QUIZ_QUESTIONS[mod.slug] ?? [];
  const quizQuestion =
    moduleQuestions.length > 0
      ? moduleQuestions[lessonIndexInChapter % moduleQuestions.length]
      : null;

  // Show exercise block on every last lesson in a chapter (index 0 = first lesson)
  const showExercise = !nextLesson || (nextLesson && lessonIndexInChapter % 3 === 2);
  const exercisePrompt = EXERCISE_PROMPTS[mod.slug];

  return (
    <>
      {/* ── Sub-bar: breadcrumb + meta ─────────────── */}
      <div
        className="sticky top-16 z-40 w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-4 overflow-hidden"
        style={{
          backgroundColor: "#00111B",
          borderBottom: "1px solid rgba(255,255,252,0.06)",
        }}
      >
        <Breadcrumb
          items={[
            { label: "Explore", href: "/explore" },
            { label: mod.title, href: `/modules/${mod.slug}` },
            { label: chapter.title, href: `/modules/${mod.slug}` },
            { label: lesson.title },
          ]}
        />

        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
          <span className="hidden sm:flex items-center gap-1.5 font-body text-sm text-cream/50">
            <Clock className="w-3.5 h-3.5" />
            {lesson.readTime} min read
          </span>
          <ShareButton />
        </div>
      </div>

      {/* ── Article body ───────────────────────────── */}
      <article className="max-w-2xl mx-auto px-5 sm:px-6 py-10 pb-16">
        {/* Lesson title */}
        <h1 className="font-title text-3xl md:text-4xl font-bold text-cream leading-snug mb-6">
          {lesson.title}
        </h1>

        {/* Chapter context pill */}
        <div className="flex items-center gap-2 mb-8">
          <span
            className="font-body text-xs px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,252,0.06)",
              color: "rgba(255,255,252,0.45)",
            }}
          >
            {chapter.title}
          </span>
          <span
            className="font-body text-xs"
            style={{ color: "rgba(255,255,252,0.25)" }}
          >
            ·
          </span>
          <span
            className="font-body text-xs"
            style={{ color: "rgba(255,255,252,0.25)" }}
          >
            {lesson.readTime} min
          </span>
        </div>

        {/* Body content */}
        <LessonBody content={lesson.content} />

        {/* Quiz */}
        {quizQuestion && <LessonQuiz question={quizQuestion} />}

        {/* Exercise */}
        {showExercise && exercisePrompt && (
          <LessonExercise prompt={exercisePrompt} />
        )}

        {/* Navigation */}
        <LessonNav
          lessonId={lesson.id}
          moduleSlug={mod.slug}
          currentIndex={lessonIndexInModule}
          totalLessons={totalLessonsInModule}
          prev={prevLesson}
          next={nextLesson}
        />
      </article>
    </>
  );
}
