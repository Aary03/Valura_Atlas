"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function LessonExercise({ prompt }: { prompt: string }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mt-8 bg-white border border-line rounded-2xl p-6 shadow-sm">
      <p className="font-body text-xs font-semibold tracking-widest uppercase text-ink-3 mb-3">
        EXERCISE
      </p>
      <p className="font-body text-sm text-ink-2 leading-relaxed mb-4">
        {prompt}
      </p>

      {!submitted ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts here…"
            className="w-full font-body text-sm text-ink bg-surface-2 border border-line rounded-xl p-4 outline-none resize-none min-h-[100px] focus:border-green transition-colors placeholder:text-ink-3"
          />
          <button
            onClick={() => text.trim() && setSubmitted(true)}
            disabled={!text.trim()}
            className="mt-3 font-body text-sm font-semibold text-white px-5 py-2.5 rounded-xl disabled:opacity-40 transition-opacity"
            style={{ backgroundColor: "#05A049" }}
          >
            Submit reflection
          </button>
        </>
      ) : (
        <div className="flex items-center gap-3 bg-green/8 border border-green/20 rounded-xl p-4">
          <CheckCircle2 size={18} className="text-green flex-shrink-0" />
          <p className="font-body text-sm text-green font-medium">
            Saved! Keep going →
          </p>
        </div>
      )}
    </div>
  );
}
