import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs font-body overflow-hidden">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1 min-w-0">
            {i > 0 && <span className="text-ink-3 flex-shrink-0">›</span>}
            {isLast || !item.href ? (
              <span
                className={`truncate ${isLast ? "text-green font-medium" : "text-ink-3"}`}
                style={{ maxWidth: isLast ? "12ch" : undefined }}
                title={item.label}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-ink-3 hover:text-ink-2 transition-colors flex-shrink-0 hidden sm:inline"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
