"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/lib/quizContent";

interface Props {
  question: QuizQuestion;
}

type Status = "idle" | "correct" | "wrong";

export default function LessonQuiz({ question }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  function handleCheck() {
    if (selected === null) return;
    setStatus(selected === question.correctIndex ? "correct" : "wrong");
  }

  function handleReset() {
    setSelected(null);
    setStatus("idle");
  }

  const submitted = status !== "idle";

  return (
    <div
      className="rounded-2xl p-6 mt-10"
      style={{
        backgroundColor: "#0D2A1A",
        border: "1px solid rgba(5,160,73,0.25)",
      }}
    >
      {/* Eyebrow */}
      <p
        className="font-heading text-xs font-semibold tracking-[0.18em] uppercase mb-3"
        style={{ color: "#B4E3C8" }}
      >
        Quick check
      </p>

      {/* Question */}
      <p className="font-heading text-base font-medium text-cream mb-5 leading-snug">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-2.5 mb-5">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;

          let borderColor = "rgba(255,255,252,0.10)";
          let bgColor = "rgba(255,255,252,0.05)";

          if (!submitted && isSelected) {
            borderColor = "rgba(5,160,73,0.70)";
            bgColor = "rgba(5,160,73,0.10)";
          } else if (submitted && isCorrect) {
            borderColor = "rgba(5,160,73,0.70)";
            bgColor = "rgba(5,160,73,0.10)";
          } else if (submitted && isSelected && !isCorrect) {
            borderColor = "rgba(239,68,68,0.50)";
            bgColor = "rgba(239,68,68,0.05)";
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className="w-full text-left px-4 py-3 rounded-xl font-body text-sm text-cream transition-all disabled:cursor-default"
              style={{ border: `1px solid ${borderColor}`, backgroundColor: bgColor }}
            >
              <span className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-colors"
                  style={{
                    borderColor: isSelected || (submitted && isCorrect) ? "#05A049" : "rgba(255,255,252,0.20)",
                    color: isSelected || (submitted && isCorrect) ? "#05A049" : "rgba(255,255,252,0.30)",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {status === "correct" && (
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3 mb-5 text-sm font-body"
          style={{ backgroundColor: "rgba(5,160,73,0.12)", border: "1px solid rgba(5,160,73,0.25)" }}
        >
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#B4E3C8" }} />
          <div>
            <span className="font-semibold" style={{ color: "#B4E3C8" }}>Correct! </span>
            <span className="text-cream/75">{question.explanation}</span>
          </div>
        </div>
      )}

      {status === "wrong" && (
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3 mb-5 text-sm font-body"
          style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)" }}
        >
          <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
          <div>
            <span className="font-semibold text-red-400">Not quite — </span>
            <span className="text-cream/75">{question.explanation}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className="font-body text-sm font-medium text-white px-6 py-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-green hover:bg-[#03803A]"
          >
            Check answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="font-body text-sm text-cream/50 hover:text-cream transition-colors px-2"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
