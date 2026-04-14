"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markLessonComplete } from "@/app/actions/progress";

interface NavLesson {
  href: string;
  label: string;
}

interface Props {
  lessonId: string;
  moduleSlug: string;
  currentIndex: number;
  totalLessons: number;
  prev: NavLesson | null;
  next: NavLesson | null;
}

export default function LessonNav({
  lessonId,
  moduleSlug,
  currentIndex,
  totalLessons,
  prev,
  next,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleNext() {
    if (!next) return;
    setLoading(true);
    await markLessonComplete(lessonId, moduleSlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(next.href);
  }

  async function handleFinish() {
    setLoading(true);
    await markLessonComplete(lessonId, moduleSlug);
    router.push(`/modules/${moduleSlug}`);
  }

  return (
    <div className="flex items-center gap-3 mt-14 pt-8 border-t border-line">
      {prev ? (
        <a
          href={prev.href}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-1.5 font-body text-sm text-ink-2 hover:text-ink px-4 py-2.5 rounded-xl border border-line hover:border-line-2 transition-colors flex-shrink-0"
        >
          ← <span className="hidden sm:inline">Previous</span>
        </a>
      ) : (
        <div className="w-10 sm:w-28 flex-shrink-0" />
      )}

      <div className="flex-1 text-center min-w-0">
        <p className="font-body text-xs text-ink-3 mb-1.5">
          {currentIndex} / {totalLessons}
        </p>
        <div className="flex items-center justify-center gap-0.5 overflow-hidden">
          {Array.from({ length: Math.min(totalLessons, 12) }).map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all flex-shrink-0"
              style={{
                width: i + 1 === currentIndex ? 14 : 5,
                height: 5,
                backgroundColor:
                  i + 1 < currentIndex
                    ? "#05A049"
                    : i + 1 === currentIndex
                    ? "#00111B"
                    : "#E2E8F0",
              }}
            />
          ))}
        </div>
      </div>

      {next ? (
        <button
          onClick={handleNext}
          disabled={loading}
          className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-white px-4 py-2.5 rounded-xl disabled:opacity-60 transition-opacity flex-shrink-0"
          style={{ backgroundColor: "#05A049" }}
        >
          {loading ? (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><span className="hidden sm:inline">Next</span> →</>
          )}
        </button>
      ) : (
        <button
          onClick={handleFinish}
          disabled={loading}
          className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-white px-4 py-2.5 rounded-xl disabled:opacity-60 transition-opacity flex-shrink-0"
          style={{ backgroundColor: "#05A049" }}
        >
          {loading ? (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><span className="hidden sm:inline">Finish</span> ✓</>
          )}
        </button>
      )}
    </div>
  );
}
