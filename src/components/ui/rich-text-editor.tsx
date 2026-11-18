"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Link2,
  Unlink,
  Minus,
  Undo2,
  Redo2,
  RemoveFormatting,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { markdownToHtml } from "@/lib/rich-text";

interface RichTextEditorProps {
  id?: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  minHeight?: string;
  required?: boolean;
  className?: string;
  onChange?: (html: string) => void;
}

export function RichTextEditor({
  id,
  name,
  defaultValue = "",
  placeholder = "Write and format your content using the toolbar buttons...",
  minHeight = "240px",
  required = false,
  className = "",
  onChange,
}: RichTextEditorProps) {
  const [htmlValue, setHtmlValue] = useState("");
  const [isLinkPromptOpen, setIsLinkPromptOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-sky-400 underline hover:text-sky-300 font-medium",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: defaultValue ? markdownToHtml(defaultValue) : "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id: id || name,
        class:
          "prose prose-invert max-w-none text-zinc-100 p-4 sm:p-5 focus:outline-none leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-100 prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-sky-400 prose-blockquote:border-l-2 prose-blockquote:border-sky-500/60 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-300 prose-pre:bg-zinc-950/90 prose-pre:border prose-pre:border-zinc-800 prose-pre:p-4 prose-pre:rounded-xl prose-code:text-sky-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-hr:border-zinc-800",
        style: `min-height: ${minHeight};`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.isEmpty ? "" : editor.getHTML();
      setHtmlValue(html);
      onChange?.(html);
    },
  });

  // Keep internal state aligned if defaultValue changes
  useEffect(() => {
    if (editor && defaultValue !== undefined) {
      const initialHtml = defaultValue ? markdownToHtml(defaultValue) : "";
      if (editor.getHTML() !== initialHtml && editor.isEmpty) {
        editor.commands.setContent(initialHtml);
        setHtmlValue(initialHtml);
      }
    }
  }, [defaultValue, editor]);

  const handleApplyLink = () => {
    if (!editor) return;
    if (linkUrl.trim()) {
      let url = linkUrl.trim();
      if (!/^https?:\/\//i.test(url) && !url.startsWith("/") && !url.startsWith("#")) {
        url = `https://${url}`;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setLinkUrl("");
    setIsLinkPromptOpen(false);
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div
      className={`w-full rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-xl focus-within:border-sky-500/50 transition-colors flex flex-col ${className}`}
    >
      {/* Tiptap Visual Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-zinc-900/90 border-b border-zinc-800/90 rounded-t-2xl overflow-x-auto scrollbar-none flex-wrap">
        {/* Paragraph & Headings */}
        <div className="flex items-center gap-1 pr-2 border-r border-zinc-800">
          <button
            type="button"
            title="Normal Paragraph"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().setParagraph().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("paragraph") && !editor?.isActive("heading")
                ? "bg-sky-500/20 text-sky-400 font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Pilcrow className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 1"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer font-bold ${
              editor?.isActive("heading", { level: 1 })
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 2"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer font-bold ${
              editor?.isActive("heading", { level: 2 })
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer font-bold ${
              editor?.isActive("heading", { level: 3 })
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Heading3 className="h-4 w-4" />
          </button>
        </div>

        {/* Inline Formatting */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Bold (Ctrl+B)"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleBold().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("bold")
                ? "bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleItalic().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("italic")
                ? "bg-sky-500/20 text-sky-400 font-semibold border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Underline (Ctrl+U)"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleUnderline().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("underline")
                ? "bg-sky-500/20 text-sky-400 font-semibold border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleStrike().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("strike")
                ? "bg-sky-500/20 text-sky-400 font-semibold border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Strikethrough className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Inline Code"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleCode().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("code")
                ? "bg-sky-500/20 text-sky-400 font-mono border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Code className="h-4 w-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Bulleted List"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleBulletList().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("bulletList")
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Numbered List"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleOrderedList().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("orderedList")
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Blockquote"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleBlockquote().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("blockquote")
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Code Block"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleCodeBlock().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("codeBlock")
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <FileCode className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Divider Line"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().setHorizontalRule().run();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Insert Link"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsLinkPromptOpen((prev) => !prev);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("link") || isLinkPromptOpen
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Link2 className="h-4 w-4" />
          </button>
          {editor?.isActive("link") && (
            <button
              type="button"
              title="Remove Link"
              onMouseDown={(e) => {
                e.preventDefault();
                handleRemoveLink();
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Unlink className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* History & Clear */}
        <div className="flex items-center gap-1 pl-2">
          <button
            type="button"
            title="Undo (Ctrl+Z)"
            disabled={!editor?.can().undo()}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().undo().run();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Redo (Ctrl+Y)"
            disabled={!editor?.can().redo()}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().redo().run();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Clear Formatting"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().unsetAllMarks().clearNodes().run();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Inline Link Prompt Drawer */}
      {isLinkPromptOpen && (
        <div className="p-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Link2 className="h-4 w-4 text-sky-400 shrink-0 ml-1" />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyLink();
              } else if (e.key === "Escape") {
                e.preventDefault();
                setIsLinkPromptOpen(false);
              }
            }}
            placeholder="Type or paste URL (e.g. https://example.com)..."
            autoFocus
            className="flex-1 h-8 px-3 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              handleApplyLink();
            }}
            className="h-8 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-black text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Apply</span>
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsLinkPromptOpen(false);
            }}
            className="h-8 px-2.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Tiptap Editor Content Area */}
      <div className="relative flex-1">
        <EditorContent editor={editor} />
      </div>

      {/* Synchronized hidden input for standard Next.js Server Actions */}
      <input type="hidden" name={name} value={htmlValue} required={required} />
    </div>
  );
}
