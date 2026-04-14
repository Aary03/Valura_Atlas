import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#00111B" }}
    >
      {/* Subtle glow */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(5,160,73,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <p
          className="font-title font-bold leading-none mb-4 select-none"
          style={{ fontSize: "clamp(6rem, 20vw, 10rem)", color: "rgba(255,255,252,0.06)" }}
          aria-hidden
        >
          404
        </p>

        <div className="-mt-8 md:-mt-12">
          <h1 className="font-title text-3xl md:text-4xl font-bold text-cream mb-3">
            This page doesn&apos;t exist.
          </h1>
          <p className="font-body text-base mb-8" style={{ color: "rgba(255,255,252,0.50)" }}>
            The URL you followed might be broken, or the page has moved.
          </p>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-white px-7 py-3 rounded-xl transition-colors bg-green hover:bg-[#03803A]"
          >
            Back to Explore
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
