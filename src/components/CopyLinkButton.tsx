"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--foreground)] border border-[var(--border)] rounded-md hover:bg-[var(--border)] transition-colors"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
      {copied ? "Copied!" : "Copy Link"}
    </button>
  );
}
