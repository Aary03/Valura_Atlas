interface Props {
  content: string;
}

function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-navy font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="font-mono text-sm text-green bg-green/8 px-1.5 py-0.5 rounded"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function LessonBody({ content }: Props) {
  if (!content?.trim()) {
    return (
      <p className="font-body text-ink-3 italic">Lesson content coming soon.</p>
    );
  }

  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("> ")) {
          return (
            <div
              key={i}
              className="rounded-r-xl p-4 my-6 text-sm font-body leading-relaxed text-ink-2 bg-green/5"
              style={{ borderLeft: "3px solid #05A049" }}
            >
              {parseInline(trimmed.replace(/^> /, ""))}
            </div>
          );
        }

        return (
          <p
            key={i}
            className="font-body text-base leading-[1.85] text-ink-2"
          >
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
