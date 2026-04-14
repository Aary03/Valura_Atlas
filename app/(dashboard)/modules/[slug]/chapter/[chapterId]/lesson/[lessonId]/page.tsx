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
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      chapter: {
        include: { module: true },
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
    lessonIndexInModule: currentIndex + 1,
    totalLessonsInModule: flatLessons.length,
    lessonIndexInChapter:
      allChapters
        .find((ch) => ch.id === chapterId)
        ?.lessons.findIndex((l) => l.id === lessonId) ?? currentIndex,
  };
}

export default async function LessonPage({ params }: Props) {
  void await getServerSession(authOptions);

  const data = await getPageData(params.slug, params.chapterId, params.lessonId);
  if (!data) notFound();

  const { lesson, chapter, mod, prevLesson, nextLesson, lessonIndexInModule, totalLessonsInModule, lessonIndexInChapter } = data;

  const moduleQuestions = QUIZ_QUESTIONS[mod.slug] ?? [];
  const quizQuestion =
    moduleQuestions.length > 0
      ? moduleQuestions[lessonIndexInChapter % moduleQuestions.length]
      : null;

  const showExercise = !nextLesson || lessonIndexInChapter % 3 === 2;
  const exercisePrompt = EXERCISE_PROMPTS[mod.slug];

  return (
    <>
      {/* Sub-bar */}
      <div className="sticky top-16 z-40 w-full bg-white border-b border-line px-4 sm:px-6 py-3 flex items-center justify-between gap-4 overflow-hidden">
        <Breadcrumb
          items={[
            { label: "Explore", href: "/explore" },
            { label: mod.title, href: `/modules/${mod.slug}` },
            { label: chapter.title, href: `/modules/${mod.slug}` },
            { label: lesson.title },
          ]}
        />
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="hidden sm:flex items-center gap-1.5 font-body text-xs text-ink-3">
            <Clock size={13} />
            {lesson.readTime} min read
          </span>
          <ShareButton />
        </div>
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-5 sm:px-6 py-10 pb-16">
        {/* Chapter label */}
        <div className="flex items-center gap-2 mb-5">
          <span className="font-body text-xs font-medium text-ink-3 bg-surface-2 border border-line px-2.5 py-1 rounded-full">
            {chapter.title}
          </span>
          <span className="text-line-2 text-xs">·</span>
          <span className="font-body text-xs text-ink-3">{lesson.readTime} min read</span>
        </div>

        {/* Title */}
        <h1 className="font-title text-3xl md:text-4xl font-bold text-navy leading-snug mb-8">
          {lesson.title}
        </h1>

        {/* Body */}
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
