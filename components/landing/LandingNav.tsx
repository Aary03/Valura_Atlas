"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Why Atlas", href: "#why" },
  { label: "Modules", href: "#modules" },
  { label: "How it works", href: "#how" },
  { label: "For Platforms", href: "#platforms" },
];

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function LandingNav() {
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,252,0.92)" : "rgba(255,255,252,0.80)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,17,27,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-1"
          >
            <span className="font-title text-xl font-bold" style={{ color: "#00111B" }}>
              Atlas
            </span>
            <span className="font-body text-sm font-medium ml-1.5" style={{ color: "#05A049" }}>
              by Valura
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-body text-sm px-4 py-2 rounded-lg transition-colors"
                style={{ color: "rgba(0,17,27,0.55)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00111B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,17,27,0.55)")}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="font-body text-sm px-5 h-9 rounded-full transition-all duration-200 inline-flex items-center"
              style={{
                border: "1px solid rgba(0,17,27,0.20)",
                color: "#00111B",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#05A049";
                (e.currentTarget as HTMLElement).style.color = "#05A049";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,17,27,0.20)";
                (e.currentTarget as HTMLElement).style.color = "#00111B";
              }}
            >
              Log in
            </a>
            <a
              href="/signup"
              className="font-body text-sm font-medium text-white px-5 h-9 rounded-full shadow-sm transition-all duration-200 hover:opacity-90 inline-flex items-center"
              style={{ backgroundColor: "#05A049" }}
            >
              Get started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#00111B" }}
            onClick={() => setMobile(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobile && (
        <div className="fixed inset-0 z-50 md:hidden" style={{ backgroundColor: "#FFFFFC" }}>
          <div className="flex flex-col h-full px-6 py-6">
            <div className="flex items-center justify-between mb-10">
              <span className="font-title text-xl font-bold" style={{ color: "#00111B" }}>Atlas</span>
              <button onClick={() => setMobile(false)} style={{ color: "#00111B" }}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => { setMobile(false); setTimeout(() => scrollTo(l.href), 50); }}
                  className="font-body text-xl font-medium text-left py-3 transition-colors"
                  style={{ color: "rgba(0,17,27,0.70)" }}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 pb-6">
              <a
                href="/login"
                className="font-body text-base font-medium w-full h-12 rounded-full inline-flex items-center justify-center"
                style={{ border: "1px solid rgba(0,17,27,0.20)", color: "#00111B" }}
              >
                Log in
              </a>
              <a
                href="/signup"
                className="font-body text-base font-semibold text-white w-full h-12 rounded-full inline-flex items-center justify-center"
                style={{ backgroundColor: "#05A049" }}
              >
                Get started free
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
