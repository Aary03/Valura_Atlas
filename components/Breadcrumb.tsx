import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-cream/20 text-sm select-none" aria-hidden>
                  ›
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className="text-sm font-body"
                  style={{ color: isLast ? "#B4E3C8" : "rgba(255,255,252,0.45)" }}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-body transition-colors hover:text-cream/70"
                  style={{ color: "rgba(255,255,252,0.45)" }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
