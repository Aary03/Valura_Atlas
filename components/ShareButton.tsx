"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ url, title: document.title }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-1.5 font-body text-xs transition-colors ${
        copied ? "text-green" : "text-ink-3 hover:text-ink-2"
      }`}
      aria-label="Share lesson"
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
    </button>
  );
}
