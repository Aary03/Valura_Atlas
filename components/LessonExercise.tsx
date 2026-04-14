"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  prompt: string;
}

export default function LessonExercise({ prompt }: Props) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!text.trim()) return;
    setSubmitted(true);
  }

  return (
    <div
      className="rounded-2xl p-6 mt-8"
      style={{
        backgroundColor: "#0D1F2A",
        border: "1px solid rgba(180,227,200,0.20)",
      }}
    >
      {/* Eyebrow */}
      <p
        className="font-heading text-xs font-semibold tracking-[0.18em] uppercase mb-3"
        style={{ color: "rgba(180,227,200,0.80)" }}
      >
        Exercise
      </p>

      {/* Prompt */}
      <p className="font-body text-sm text-cream/80 leading-relaxed mb-4">
        {prompt}
      </p>

      {!submitted ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts here…"
            rows={4}
            className="w-full font-body text-sm text-cream leading-relaxed bg-transparent rounded-xl p-3 resize-none outline-none transition-colors"
            style={{
              border: "1px solid rgba(255,255,252,0.15)",
              minHeight: "100px",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(180,227,200,0.40)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,252,0.15)")}
          />
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="mt-3 inline-flex items-center gap-2 font-body text-sm font-medium text-white px-6 py-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-green hover:bg-[#03803A]"
          >
            Submit reflection
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </>
      ) : (
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 font-body text-sm"
          style={{
            backgroundColor: "rgba(5,160,73,0.08)",
            border: "1px solid rgba(5,160,73,0.20)",
          }}
        >
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#B4E3C8" }} />
          <span className="text-cream/80">
            Saved! Keep going →
          </span>
        </div>
      )}
    </div>
  );
}
