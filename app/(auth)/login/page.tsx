"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/explore");
    router.refresh();
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      {/* Card */}
      <div
        className="rounded-2xl border border-white/10 p-10"
        style={{ backgroundColor: "#0A2236" }}
      >
        {/* Wordmark */}
        <div className="mb-8 text-center">
          <h1 className="font-title text-3xl font-bold text-cream tracking-tight">
            Atlas
          </h1>
          <p className="text-xs text-cream/40 font-body mt-1 tracking-widest uppercase">
            by Valura
          </p>
          <p className="font-body text-cream/55 text-sm mt-4 leading-relaxed">
            Navigate the world of global investing
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-8" />

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-heading font-semibold text-cream/55 tracking-wide uppercase"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 px-4 rounded-xl bg-transparent border border-white/10 text-cream text-sm font-body placeholder:text-cream/20 focus:outline-none focus:border-green transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-heading font-semibold text-cream/55 tracking-wide uppercase"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 pr-11 rounded-xl bg-transparent border border-white/10 text-cream text-sm font-body placeholder:text-cream/20 focus:outline-none focus:border-green transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm font-body text-red-400/90 bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl font-heading font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            style={{ backgroundColor: "#05A049" }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              <>
                Sign in
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm font-body text-cream/35">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-mint hover:text-mint/80 transition-colors font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
