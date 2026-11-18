import { useMemo } from "react";
import { markdownToHtml } from "@/lib/rich-text";

interface RichContentDisplayProps {
  content?: string | null;
  className?: string;
}

/**
 * Universal component for rendering rich formatted text (HTML or legacy Markdown)
 * with consistent typography, beautiful styling, and zero raw markdown syntax visible to the user.
 */
export function RichContentDisplay({ content, className = "" }: RichContentDisplayProps) {
  const html = useMemo(() => {
    if (!content) return "";
    return markdownToHtml(content);
  }, [content]);

  if (!html) return null;

  return (
    <div
      className={`prose prose-invert max-w-none text-zinc-200 leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-100 prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-sky-400 hover:prose-a:text-sky-300 prose-a:underline prose-blockquote:border-l-2 prose-blockquote:border-sky-500/60 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-300 prose-code:text-sky-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:p-4 prose-pre:rounded-xl prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-1 prose-hr:border-zinc-800 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
