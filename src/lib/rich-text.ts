import sanitizeHtmlLib from "sanitize-html";

/**
 * Utility functions for rich-text handling, markdown-to-HTML conversion,
 * and safe content rendering across visual editors and public templates.
 */

/**
 * Checks if a string contains HTML markup tags.
 */
export function isHtmlContent(content: string): boolean {
  if (!content) return false;
  return /<\/?(p|h[1-6]|ul|ol|li|blockquote|strong|b|em|i|code|pre|a|hr|br|div|span)[^>]*>/i.test(content);
}

/**
 * Converts standard Markdown syntax to clean, semantic HTML.
 * Preserves existing HTML if already present.
 */
export function markdownToHtml(md: string): string {
  if (!md) return "";
  if (isHtmlContent(md)) {
    return md;
  }

  let text = md.replace(/\r\n/g, "\n");

  // Code blocks: ```...```
  text = text.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (_, _lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre><code>${escaped.trim()}</code></pre>`;
  });

  // Blockquotes
  text = text.replace(/^(?:> (.*)(?:\n|$))+/gm, (match) => {
    const lines = match
      .split("\n")
      .map((l) => l.replace(/^>\s?/, "").trim())
      .filter(Boolean);
    return `<blockquote><p>${lines.join("<br/>")}</p></blockquote>\n`;
  });

  // Headings
  text = text.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  text = text.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  text = text.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  text = text.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Horizontal rules
  text = text.replace(/^(?:---|\*\*\*|___)\s*$/gim, "<hr/>");

  // Lists: Unordered (- or *)
  text = text.replace(/(?:^(?:[-*] .*(?:\n|$)))+/gm, (match) => {
    const items = match
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("- ") || l.startsWith("* "))
      .map((l) => `<li>${l.slice(2).trim()}</li>`)
      .join("");
    return `<ul>${items}</ul>\n`;
  });

  // Lists: Ordered (1. 2. etc.)
  text = text.replace(/(?:^\d+\. .*(?:\n|$))+/gm, (match) => {
    const items = match
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /^\d+\.\s/.test(l))
      .map((l) => `<li>${l.replace(/^\d+\.\s+/, "").trim()}</li>`)
      .join("");
    return `<ol>${items}</ol>\n`;
  });

  // Inline formatting
  // Bold & Italic
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.*?)__/g, "<strong>$1</strong>");
  // Italic
  text = text.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  text = text.replace(/_([^_\n]+)_/g, "<em>$1</em>");
  // Strikethrough
  text = text.replace(/~~(.*?)~~/g, "<s>$1</s>");
  // Inline code
  text = text.replace(/`([^`\n]+)`/g, "<code>$1</code>");
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Paragraphs for remaining text blocks
  const blocks = text.split(/\n\s*\n/);
  const formattedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    // If already wrapped in HTML block tags, don't wrap in <p>
    if (/^<(h[1-6]|ul|ol|blockquote|pre|hr|div|p)/i.test(trimmed)) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
  });

  return formattedBlocks.filter(Boolean).join("\n");
}

/**
 * Strips scripts, event handlers, and unsafe URLs from user-authored HTML.
 * Every piece of rich content rendered on a public portfolio passes through
 * here, so one user can never inject executable markup into their page.
 */
export function sanitizeRichHtml(html: string): string {
  if (!html) return "";
  return sanitizeHtmlLib(html, {
    allowedTags: [
      "p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6",
      "strong", "b", "em", "i", "u", "s", "del", "mark", "sub", "sup",
      "ul", "ol", "li", "blockquote", "code", "pre", "a", "span", "div", "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height"],
      code: ["class"],
      ol: ["start"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.target
          ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
          : attribs,
      }),
    },
  });
}

/** Converts markdown (or passes through HTML) and sanitizes the result. */
export function renderRichContent(content: string): string {
  return sanitizeRichHtml(markdownToHtml(content));
}

/** Average adult silent-reading speed for technical prose. */
const WORDS_PER_MINUTE = 200;

/** Counts readable words in HTML or Markdown content (tags and syntax ignored). */
export function countWords(content: string): number {
  if (!content) return 0;
  const text = markdownToHtml(content)
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ");
  return text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

/** Estimates reading time from content, e.g. "4 min read" (minimum 1 minute). */
export function estimateReadTime(content: string): string {
  const minutes = Math.max(1, Math.ceil(countWords(content) / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
