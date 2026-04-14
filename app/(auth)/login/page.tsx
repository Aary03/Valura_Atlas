"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      setError("Incorrect email or password. Please try again.");
    } else {
      router.push("/explore");
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-white rounded-2xl border border-line shadow-sm p-8">
        <div className="mb-8">
          <h1 className="font-title text-2xl font-bold text-navy mb-1">
            Welcome back
          </h1>
          <p className="font-body text-sm text-ink-2">
            Sign in to continue your learning journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-sm font-medium text-ink mb-1.5">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full font-body text-sm text-ink bg-white border border-line rounded-xl px-4 py-3 outline-none transition-colors focus:border-green placeholder:text-ink-3"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-ink mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your password"
                className="w-full font-body text-sm text-ink bg-white border border-line rounded-xl px-4 py-3 pr-11 outline-none transition-colors focus:border-green placeholder:text-ink-3"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink-2 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <span className="font-body text-sm text-red-600">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-body text-sm font-semibold text-white h-12 rounded-xl transition-all disabled:opacity-60"
            style={{ backgroundColor: "#05A049" }}
          >
            {loading ? "Signing in…" : (
              <>
                Sign in
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <p className="font-body text-sm text-ink-2 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-green font-medium hover:underline">
            Create one free
          </Link>
        </p>
      </div>

      <p className="font-body text-xs text-ink-3 text-center mt-5">
        Regulated by IFSCA · GIFT City, Gandhinagar
      </p>
    </div>
  );
}
