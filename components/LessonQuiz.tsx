"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function LessonQuiz({ question }: { question: QuizQuestion }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === question.correctIndex;

  return (
    <div className="mt-10 bg-white border border-line rounded-2xl p-6 shadow-sm">
      <p className="font-body text-xs font-semibold tracking-widest uppercase text-ink-3 mb-3">
        QUICK CHECK
      </p>
      <p className="font-heading text-base font-semibold text-navy mb-5">
        {question.question}
      </p>

      <div className="space-y-2.5">
        {question.options.map((opt, i) => {
          let classes =
            "w-full text-left font-body text-sm px-4 py-3 rounded-xl border transition-all cursor-pointer ";

          if (!submitted) {
            classes +=
              selected === i
                ? "border-green bg-green/8 text-ink"
                : "border-line bg-surface-2 text-ink-2 hover:border-line-2";
          } else {
            if (i === question.correctIndex) {
              classes += "border-green bg-green/8 text-green font-medium";
            } else if (i === selected && !isCorrect) {
              classes += "border-red-300 bg-red-50 text-red-600";
            } else {
              classes += "border-line bg-surface-2 text-ink-3";
            }
          }

          return (
            <button
              key={i}
              className={classes}
              disabled={submitted}
              onClick={() => setSelected(i)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={() => selected !== null && setSubmitted(true)}
          disabled={selected === null}
          className="mt-5 font-body text-sm font-semibold text-white px-5 py-2.5 rounded-xl disabled:opacity-40 transition-opacity"
          style={{ backgroundColor: "#05A049" }}
        >
          Check answer
        </button>
      )}

      {submitted && (
        <div
          className={`mt-5 flex items-start gap-3 rounded-xl p-4 ${
            isCorrect ? "bg-green/8 border border-green/20" : "bg-red-50 border border-red-200"
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-green" />
          ) : (
            <XCircle size={18} className="mt-0.5 flex-shrink-0 text-red-500" />
          )}
          <div>
            <p className={`font-body text-sm font-semibold mb-0.5 ${isCorrect ? "text-green" : "text-red-600"}`}>
              {isCorrect ? "Correct!" : "Not quite."}
            </p>
            <p className="font-body text-sm text-ink-2">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
