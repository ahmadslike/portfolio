"use client";

import { useState } from "react";

interface CopyEmailProps {
  email: string;
  labels: { copy: string; copied: string };
}

export default function CopyEmail({ email, labels }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <span className="font-mono text-sm text-foreground select-all">{email}</span>
      <button
        onClick={handleCopy}
        className={`text-xs transition-colors ${
          copied ? "text-[var(--success)]" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-live="polite"
      >
        {copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
