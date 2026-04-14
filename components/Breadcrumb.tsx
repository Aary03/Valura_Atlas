import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs font-body flex-wrap">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink-3">›</span>}
            {isLast || !item.href ? (
              <span className={isLast ? "text-green font-medium" : "text-ink-3"}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-ink-3 hover:text-ink-2 transition-colors"
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
