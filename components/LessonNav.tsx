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
  currentIndex: number;   // 1-based
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
    <div
      className="flex items-center gap-4 mt-14 pt-8"
      style={{ borderTop: "1px solid rgba(255,255,252,0.08)" }}
    >
      {/* Previous */}
      {prev ? (
        <a
          href={prev.href}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 font-body text-sm text-cream/70 hover:text-cream px-6 py-2.5 rounded-xl transition-colors"
          style={{ border: "1px solid rgba(255,255,252,0.15)" }}
        >
          ← Previous
        </a>
      ) : (
        <div className="w-28" />
      )}

      {/* Progress indicator */}
      <div className="flex-1 text-center">
        <p className="font-body text-xs text-cream/40">
          Lesson {currentIndex} of {totalLessons}
        </p>
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1 mt-1.5">
          {Array.from({ length: totalLessons }).map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i + 1 === currentIndex ? "16px" : "6px",
                height: "6px",
                backgroundColor:
                  i + 1 < currentIndex
                    ? "#05A049"
                    : i + 1 === currentIndex
                    ? "#B4E3C8"
                    : "rgba(255,255,252,0.12)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Next / Finish */}
      {next ? (
        <button
          onClick={handleNext}
          disabled={loading}
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-white px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60 bg-green hover:bg-[#03803A]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving…
            </span>
          ) : (
            <>Next →</>
          )}
        </button>
      ) : (
        <button
          onClick={handleFinish}
          disabled={loading}
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-white px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60 bg-green hover:bg-[#03803A]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving…
            </span>
          ) : (
            <>Finish chapter ✓</>
          )}
        </button>
      )}
    </div>
  );
}
