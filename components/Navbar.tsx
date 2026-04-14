"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";

interface NavbarProps {
  userName?: string | null;
  userEmail?: string | null;
}

const navLinks = [
  { label: "Explore", href: "/explore", match: ["/explore", "/modules"] },
  { label: "My Learning", href: "/my-learning", match: ["/my-learning"] },
  { label: "Community", href: "/community", match: ["/community"] },
];

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return (email?.[0] ?? "?").toUpperCase();
}

export default function Navbar({ userName, userEmail }: NavbarProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  function isActive(matchPaths: string[]) {
    return matchPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
  }

  const initials = getInitials(userName, userEmail);

  return (
    <>
      {/* ── Top bar ───────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 h-16 flex items-center"
        style={{
          backgroundColor: "#00111B",
          borderBottom: "1px solid rgba(255,255,252,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center">

          {/* ── Logo ── */}
          <Link href="/explore" className="flex items-baseline gap-2 flex-shrink-0 mr-10">
            <span className="font-title text-xl font-bold text-cream tracking-tight">
              Atlas
            </span>
            <span className="font-body text-xs text-mint/70 tracking-wide">
              by Valura
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((link) => {
              const active = isActive(link.match);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-body rounded-lg transition-colors ${
                    active
                      ? "text-green"
                      : "text-cream/55 hover:text-cream"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                      style={{ backgroundColor: "#05A049" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right side ── */}
          <div className="ml-auto flex items-center gap-3">

            {/* Avatar + dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 group"
                aria-label="User menu"
              >
                {/* Avatar circle */}
                <div className="w-8 h-8 rounded-full bg-navy-mid border border-white/10 group-hover:border-mint/30 flex items-center justify-center text-xs font-heading font-bold text-cream/80 transition-colors flex-shrink-0">
                  {initials}
                </div>
                <ChevronDown
                  className={`hidden md:block w-3.5 h-3.5 text-cream/30 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/8 shadow-2xl overflow-hidden"
                  style={{ backgroundColor: "#0A2236" }}
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-xs font-heading font-semibold text-cream/80 truncate">
                      {userName ?? "Account"}
                    </p>
                    {userEmail && (
                      <p className="text-xs font-body text-cream/35 truncate mt-0.5">
                        {userEmail}
                      </p>
                    )}
                  </div>

                  <div className="p-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-body text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-body text-cream/60 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden text-cream/60 hover:text-cream transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm transition-opacity md:hidden ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#0A2236", borderLeft: "1px solid rgba(255,255,252,0.06)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-navy-mid border border-white/10 flex items-center justify-center text-xs font-heading font-bold text-cream/80">
              {initials}
            </div>
            <div>
              <p className="text-sm font-heading font-semibold text-cream/90">
                {userName ?? "Account"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-cream/40 hover:text-cream transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.match);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-colors ${
                  active
                    ? "text-green bg-green/5 font-medium"
                    : "text-cream/55 hover:text-cream hover:bg-white/4"
                }`}
              >
                {link.label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-cream/55 hover:text-cream hover:bg-white/4 transition-colors"
          >
            <User className="w-4 h-4" />
            My Profile
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-cream/55 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
