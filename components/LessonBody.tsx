/**
 * Renders lesson content string with minimal markdown-like parsing:
 *   - Double newlines → paragraph breaks
 *   - Lines starting with "> " → green callout block
 *   - `backtick text` → inline code/acronym chip
 *   - **text** → bold
 */

interface Props {
  content: string;
}

function parseInline(text: string): React.ReactNode[] {
  // Split on **bold** and `code` patterns
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-cream font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="font-mono text-sm text-mint px-1.5 rounded"
          style={{ backgroundColor: "rgba(255,255,252,0.08)" }}
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
      <p className="font-body text-cream/30 italic">
        Lesson content coming soon.
      </p>
    );
  }

  // Split into blocks by double newline
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        // Callout block
        if (trimmed.startsWith("> ")) {
          const calloutText = trimmed.replace(/^> /, "");
          return (
            <div
              key={i}
              className="rounded-r-xl p-4 my-6 text-sm font-body leading-relaxed"
              style={{
                backgroundColor: "#0A2236",
                borderLeft: "4px solid #05A049",
                color: "rgba(255,255,252,0.85)",
              }}
            >
              {parseInline(calloutText)}
            </div>
          );
        }

        // Regular paragraph
        return (
          <p
            key={i}
            className="font-body text-base leading-[1.85]"
            style={{ color: "rgba(255,255,252,0.80)" }}
          >
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
