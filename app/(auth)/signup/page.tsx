"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!name.trim()) return "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    router.push("/explore");
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl border border-line shadow-sm p-8">
        <div className="mb-8">
          <h1 className="font-title text-2xl font-bold text-navy mb-1">
            Create your account
          </h1>
          <p className="font-body text-sm text-ink-2">
            Free access to all modules. No credit card needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-sm font-medium text-ink mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Arjun Sharma"
              className="w-full font-body text-sm text-ink bg-white border border-line rounded-xl px-4 py-3 outline-none transition-colors focus:border-green placeholder:text-ink-3"
            />
          </div>

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
                placeholder="At least 8 characters"
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
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <span className="font-body text-sm text-red-600">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-body text-sm font-semibold text-white h-12 rounded-xl transition-all disabled:opacity-60"
            style={{ backgroundColor: "#05A049" }}
          >
            {loading ? "Creating account…" : (
              <>
                Create account
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <p className="font-body text-sm text-ink-2 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-green font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <p className="font-body text-xs text-ink-3 text-center mt-5">
        Regulated by IFSCA · GIFT City, Gandhinagar
      </p>
    </div>
  );
}
