"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

function validate(name: string, email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Full name is required.";
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  return errors;
}

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const errors = validate(name, email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setServerError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    // Auto sign-in after successful registration
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setServerError("Account created but sign-in failed. Please log in.");
      router.push("/login");
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
          {/* Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block text-xs font-heading font-semibold text-cream/55 tracking-wide uppercase"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="Aarav Shah"
              className={`w-full h-11 px-4 rounded-xl bg-transparent border text-cream text-sm font-body placeholder:text-cream/20 focus:outline-none transition-colors ${
                fieldErrors.name
                  ? "border-red-500/50 focus:border-red-500/70"
                  : "border-white/10 focus:border-green"
              }`}
            />
            {fieldErrors.name && (
              <p className="text-xs text-red-400/80 font-body">
                {fieldErrors.name}
              </p>
            )}
          </div>

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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
              }}
              placeholder="you@example.com"
              className={`w-full h-11 px-4 rounded-xl bg-transparent border text-cream text-sm font-body placeholder:text-cream/20 focus:outline-none transition-colors ${
                fieldErrors.email
                  ? "border-red-500/50 focus:border-red-500/70"
                  : "border-white/10 focus:border-green"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-red-400/80 font-body">
                {fieldErrors.email}
              </p>
            )}
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
                }}
                placeholder="Min. 8 characters"
                className={`w-full h-11 px-4 pr-11 rounded-xl bg-transparent border text-cream text-sm font-body placeholder:text-cream/20 focus:outline-none transition-colors ${
                  fieldErrors.password
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-white/10 focus:border-green"
                }`}
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
            {fieldErrors.password && (
              <p className="text-xs text-red-400/80 font-body">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Server error */}
          {serverError && (
            <p className="text-sm font-body text-red-400/90 bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-2.5">
              {serverError}
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
                Creating account…
              </span>
            ) : (
              <>
                Create account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm font-body text-cream/35">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-mint hover:text-mint/80 transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
