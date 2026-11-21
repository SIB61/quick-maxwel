"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UPLOAD_ACCEPT as ACCEPT, uploadToStorage, type UploadFolder } from "@/lib/upload-client";

interface FileUploadFieldProps {
  id: string;
  name: string;
  folder: UploadFolder;
  /** "image" accepts images only; "document" also accepts PDFs. */
  kind?: keyof typeof ACCEPT;
  defaultValue?: string | null;
  placeholder?: string;
  /** Preview shape for images. */
  previewShape?: "square" | "wide";
}

function isImageUrl(url: string) {
  return /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i.test(url) || /images\.|avatars\.|\/photo-/i.test(url);
}

/**
 * A URL field that can also be filled by uploading a file to storage.
 * The uploaded file's public URL is submitted under `name`, so existing
 * server actions keep receiving a plain URL string.
 */
export function FileUploadField({
  id,
  name,
  folder,
  kind = "image",
  defaultValue,
  placeholder = "Paste a URL or upload a file",
  previewShape = "wide",
}: FileUploadFieldProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      setValue(await uploadToStorage(file, folder, kind));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const showImagePreview = value && (kind === "image" || isImageUrl(value));
  const showFileChip = value && !showImagePreview;

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          id={id}
          name={name}
          type="url"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          placeholder={placeholder}
          className="h-11 flex-1 min-w-0 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-sky-500/40"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="h-11 shrink-0 px-3.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 inline-flex items-center gap-1.5 transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-wait"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span>{uploading ? "Uploading…" : "Upload"}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT[kind]}
          className="hidden"
          aria-label={`Upload file for ${name}`}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {showImagePreview && (
        <div className={`relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 ${previewShape === "square" ? "h-24 w-24" : "aspect-[16/9] w-full max-w-sm"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/70 text-zinc-200 hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Remove file"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {showFileChip && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 max-w-full">
          <FileText className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
          <a href={value} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
            {value.split("/").pop()}
          </a>
          <button type="button" onClick={() => setValue("")} className="text-zinc-500 hover:text-zinc-200 cursor-pointer" aria-label="Remove file">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
