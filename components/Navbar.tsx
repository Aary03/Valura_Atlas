"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavbarProps {
  userName: string;
}

const navLinks = [
  { label: "Explore", href: "/explore", match: ["/explore", "/modules"] },
  { label: "My Learning", href: "/my-learning", match: ["/my-learning"] },
];

export default function Navbar({ userName }: NavbarProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function isActive(match: string[]) {
    return match.some((m) => pathname.startsWith(m));
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-white border-b border-line"
        style={{ height: 64 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/explore" className="flex items-center gap-1.5">
            <span className="font-title text-lg font-bold text-navy">Atlas</span>
            <span
              className="text-xs font-medium px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
            >
              by Valura
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.match);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm px-4 py-2 rounded-lg transition-colors ${
                    active
                      ? "text-green font-semibold bg-green/8"
                      : "text-ink-2 hover:text-ink hover:bg-canvas"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Avatar dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-canvas rounded-xl px-2 py-1.5 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-semibold text-white select-none"
                  style={{ backgroundColor: "#05A049" }}
                >
                  {initials}
                </div>
                <span className="hidden md:block font-body text-sm text-ink-2 max-w-[120px] truncate">
                  {userName.split(" ")[0]}
                </span>
                <ChevronDown size={14} className="text-ink-3 hidden md:block" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl border border-line shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-line">
                    <p className="font-body text-xs text-ink-3">Signed in as</p>
                    <p className="font-body text-sm text-ink font-medium truncate">
                      {userName}
                    </p>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full text-left font-body text-sm text-red-600 px-4 py-3 hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-ink-2 hover:bg-canvas transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-line">
              <span className="font-title text-base font-bold text-navy">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-ink-2 hover:bg-canvas transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.match);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block font-body text-sm px-4 py-3 rounded-xl transition-colors ${
                      active
                        ? "text-green font-semibold bg-green/8"
                        : "text-ink-2 hover:bg-canvas"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="px-4 pb-6 border-t border-line pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-body text-sm font-semibold text-white"
                  style={{ backgroundColor: "#05A049" }}
                >
                  {initials}
                </div>
                <span className="font-body text-sm text-ink truncate">{userName}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full font-body text-sm text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-colors text-center"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
