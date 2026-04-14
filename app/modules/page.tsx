export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, ChevronRight } from "lucide-react";
import { db } from "@/lib/db";

async function getModules() {
  return db.module.findMany({ orderBy: { order: "asc" } });
}

const levelColors: Record<string, string> = {
  Beginner: "text-mint border-mint/30 bg-mint/10",
  Intermediate: "text-amber-300 border-amber-300/30 bg-amber-300/10",
};

export default async function ModulesPage() {
  const modules = await getModules();

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-navy/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-title text-xl font-bold text-cream tracking-tight"
          >
            Valura <span className="text-mint">Atlas</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-cream/60 hover:text-cream transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-mint text-navy font-semibold px-4 py-2 rounded-lg hover:bg-mint/90 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-cream/40 hover:text-cream/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>
        </div>

        <div className="mb-12">
          <p className="font-heading text-mint text-sm uppercase tracking-widest mb-2">
            Full curriculum
          </p>
          <h1 className="font-title text-4xl md:text-5xl font-bold text-cream">
            All modules
          </h1>
          <p className="font-body text-cream/50 mt-3 max-w-lg">
            Work through the atlas in order, or jump to the module that&apos;s
            most relevant to where you are.
          </p>
        </div>

        {/* Module list */}
        <div className="flex flex-col gap-4">
          {modules.map((mod, i) => (
            <Link
              key={mod.id}
              href={`/modules/${mod.slug}`}
              className="group flex items-center gap-6 p-6 rounded-2xl bg-navy-light border border-white/5 hover:border-mint/20 hover:bg-navy-mid transition-all duration-300"
            >
              {/* Index */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy-mid border border-white/5 group-hover:border-mint/20 flex items-center justify-center font-title font-bold text-cream/30 group-hover:text-mint/60 transition-colors text-lg">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-heading font-bold text-cream group-hover:text-mint transition-colors truncate">
                    {mod.title}
                  </h2>
                  <span
                    className={`flex-shrink-0 text-xs font-heading font-semibold px-2 py-0.5 rounded-full border ${levelColors[mod.level] ?? ""}`}
                  >
                    {mod.level}
                  </span>
                </div>
                <p className="font-body text-sm text-cream/40 truncate">
                  {mod.description}
                </p>
              </div>

              {/* Meta */}
              <div className="hidden sm:flex flex-shrink-0 items-center gap-6 text-cream/30 text-sm font-body">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {mod.chapters} chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {mod.duration}
                </span>
              </div>

              <ChevronRight className="flex-shrink-0 w-4 h-4 text-cream/20 group-hover:text-mint/60 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
