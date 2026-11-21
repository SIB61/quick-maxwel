"use client";

import { useRef, useState } from "react";
import { Check, Copy, ExternalLink, FileText, Loader2, RefreshCw, Trash2, Upload } from "lucide-react";
import { UPLOAD_MAX_BYTES } from "@/lib/upload-client";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for browsers/contexts without the async clipboard API.
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
  }
}

/**
 * Uploads the user's CV straight to `<handle>/cv` in storage (saved immediately,
 * independent of the profile form) and lets them view, copy, replace or remove it.
 */
export function CvManager({ handle, initialCvUrl }: { handle: string; initialCvUrl: string | null }) {
  const [cvUrl, setCvUrl] = useState(initialCvUrl);
  const [busy, setBusy] = useState<"upload" | "remove" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setError(null);
    setNotice(null);
    if (file.type !== "application/pdf") {
      setError("Please choose a PDF file.");
      return;
    }
    if (file.size > UPLOAD_MAX_BYTES) {
      setError("File is too large. Maximum size is 4 MB.");
      return;
    }
    setBusy("upload");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/cv", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed. Please try again.");
      setNotice(cvUrl ? "CV replaced. The link stays the same." : "CV uploaded and published.");
      setCvUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setBusy(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = async () => {
    if (!window.confirm("Remove your CV? It will no longer be available on your portfolio or at its link.")) return;
    setError(null);
    setNotice(null);
    setBusy("remove");
    try {
      const res = await fetch("/api/cv", { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Could not remove the CV.");
      }
      setCvUrl(null);
      setNotice("CV removed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove the CV.");
    } finally {
      setBusy(null);
    }
  };

  const handleCopy = async () => {
    if (!cvUrl) return;
    await copyText(cvUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btn =
    "h-9 px-3 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait";

  return (
    <div className="space-y-2">
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        aria-label="Upload CV (PDF)"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />

      {cvUrl ? (
        <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="h-10 w-10 shrink-0 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-100">CV / Résumé (PDF)</p>
              <p className="text-xs text-zinc-500 font-mono truncate" title={cvUrl}>{cvUrl}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`/${handle}/cv`} target="_blank" rel="noopener noreferrer" className={btn}>
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View</span>
            </a>
            <button type="button" onClick={handleCopy} className={btn} aria-live="polite">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy link"}</span>
            </button>
            <button type="button" onClick={() => fileRef.current?.click()} disabled={busy !== null} className={btn}>
              {busy === "upload" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              <span>{busy === "upload" ? "Uploading…" : "Replace"}</span>
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={busy !== null}
              className={`${btn} hover:!border-red-500/40 hover:!bg-red-500/10 hover:text-red-400`}
            >
              {busy === "remove" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy !== null}
          className="w-full p-5 rounded-xl border border-dashed border-zinc-700 hover:border-sky-500/50 bg-zinc-950/40 hover:bg-sky-500/5 text-zinc-300 flex flex-col items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-wait"
        >
          {busy === "upload" ? <Loader2 className="h-5 w-5 animate-spin text-sky-400" /> : <Upload className="h-5 w-5 text-sky-400" />}
          <span className="text-sm font-semibold">{busy === "upload" ? "Uploading…" : "Upload your CV"}</span>
          <span className="text-xs text-zinc-500">PDF, up to 4 MB. Visitors can view and download it.</span>
        </button>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
      {notice && !error && <p className="text-xs text-emerald-400">{notice}</p>}
    </div>
  );
}
