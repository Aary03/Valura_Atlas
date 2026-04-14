import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6 text-center">
      <div className="font-title text-[80px] sm:text-[120px] md:text-[180px] font-bold text-line leading-none select-none">
        404
      </div>
      <h1 className="font-title text-2xl font-bold text-navy mt-2 mb-2">
        This page doesn&apos;t exist.
      </h1>
      <p className="font-body text-sm text-ink-2 mb-8 max-w-xs">
        The page you&apos;re looking for may have been moved or deleted.
      </p>
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white px-6 py-3 rounded-xl transition-all hover:opacity-90"
        style={{ backgroundColor: "#05A049" }}
      >
        Back to Explore
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
