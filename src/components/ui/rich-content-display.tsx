import { useMemo } from "react";
import { markdownToHtml } from "@/lib/rich-text";

interface RichContentDisplayProps {
  content?: string | null;
  className?: string;
}

/**
 * Universal component for rendering rich formatted text (HTML or legacy Markdown)
 * with consistent typography and zero raw markdown syntax visible to the user.
 */
export function RichContentDisplay({ content, className = "" }: RichContentDisplayProps) {
  const html = useMemo(() => {
    if (!content) return "";
    return markdownToHtml(content);
  }, [content]);

  if (!html) return null;

  return (
    <div
      className={`prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-400 hover:prose-a:underline prose-blockquote:border-l-2 prose-blockquote:border-emerald-500/60 prose-blockquote:pl-4 prose-blockquote:italic prose-code:text-emerald-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl text-zinc-200 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
